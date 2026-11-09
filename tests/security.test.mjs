import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer as createNetServer} from 'node:net';
import {readFile} from 'node:fs/promises';
import {after, before, test} from 'node:test';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
import {AdminSessionStore, consumeIssuedOtp, getAdminPasswordFingerprint} from '../backend/security.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const serverEntry = path.join(root, 'backend', 'server.ts');
const mockBrevo = path.join(root, 'tests', 'mock-brevo.mjs');
const testEmail = 'security-test@example.invalid';
const configuredPassword = 'test-only-admin-secret';
const issuedOtps = new Map();
let child;
let baseUrl;
let serverOutput = '';

async function findAvailablePort() {
  const server = createNetServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const {port} = server.address();
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  return port;
}

async function startBackend(adminPassword, nodeEnv = 'test') {
  const port = await findAvailablePort();
  const env = {...process.env};
  env.PORT = String(port);
  env.NODE_ENV = nodeEnv;
  env.MONGODB_URI = '';
  env.ADMIN_EMAIL = testEmail;
  env.ADMIN_PASSWORD = adminPassword;
  env.BREVO_API_KEY = 'test-key-not-a-secret';
  env.BREVO_SENDER_EMAIL = 'security-test@example.invalid';
  const processChild = spawn(process.execPath, [
    '--import=tsx',
    `--import=${pathToFileURL(mockBrevo).href}`,
    serverEntry,
  ], {
    cwd: root,
    env,
    stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
  });
  let output = '';
  processChild.stdout.on('data', chunk => { output += chunk.toString(); });
  processChild.stderr.on('data', chunk => { output += chunk.toString(); });
  processChild.on('message', message => {
    if (message?.type === 'test-otp-issued') issuedOtps.set(message.email, message.otp);
  });

  const url = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 15000;
  while (Date.now() < deadline) {
    if (processChild.exitCode !== null) {
      throw new Error(`Backend exited during test startup: ${output}`);
    }
    try {
      const response = await fetch(`${url}/api/health`);
      if (response.ok) return {child: processChild, url, output: () => output};
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  processChild.kill();
  throw new Error(`Backend did not start in time: ${output}`);
}

async function stopBackend(processChild) {
  if (!processChild || processChild.exitCode !== null) return;
  processChild.kill();
  await new Promise(resolve => processChild.once('exit', resolve));
}

async function request(pathname, init) {
  return fetch(`${baseUrl}${pathname}`, init);
}

async function postJson(pathname, body, headers = {}) {
  return request(pathname, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', ...headers},
    body: JSON.stringify(body),
  });
}

function assertNoCredentialKeys(value) {
  if (Array.isArray(value)) {
    value.forEach(assertNoCredentialKeys);
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, nested] of Object.entries(value)) {
    assert.doesNotMatch(key, /password|otp|token/i);
    assertNoCredentialKeys(nested);
  }
}

before(async () => {
  const running = await startBackend(configuredPassword);
  child = running.child;
  baseUrl = running.url;
  serverOutput = running.output;
});

after(async () => {
  await stopBackend(child);
});

test('admin session and one-time OTP helper behavior', async () => {
  const passwordFingerprint = getAdminPasswordFingerprint(configuredPassword);
  const sessions = new AdminSessionStore();
  sessions.issue('valid', 2000, passwordFingerprint);
  sessions.issue('expired', 1000, passwordFingerprint);
  assert.equal(sessions.isValid('valid', 1500, passwordFingerprint), true);
  assert.equal(sessions.isValid('expired', 1500, passwordFingerprint), false);
  assert.equal(sessions.isValid('valid', 1500, getAdminPasswordFingerprint('rotated-secret')), false);
  assert.equal(getAdminPasswordFingerprint('  '), null);

  const records = [{email: testEmail, otp: '111222', expiresAt: new Date(5000)}];
  const collection = {
    async findOneAndDelete(query) {
      const index = records.findIndex(record =>
        record.email === query.email
        && record.otp === query.otp
        && record.expiresAt > query.expiresAt.$gt,
      );
      return index < 0 ? null : records.splice(index, 1)[0];
    },
  };
  assert.equal(await consumeIssuedOtp(collection, testEmail, '111222', new Date(4000)), true);
  assert.equal(await consumeIssuedOtp(collection, testEmail, '111222', new Date(4000)), false);
  records.push({email: testEmail, otp: '333444', expiresAt: new Date(5000)});
  assert.equal(await consumeIssuedOtp(collection, testEmail, '333444', new Date(5000)), false);
});

test('Vercel forwards API requests to Render without a homepage fallback', async () => {
  const config = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
  const proxyIndex = config.rewrites.findIndex(rewrite => rewrite.source === '/api/proxy/:path*');
  const apiIndex = config.rewrites.findIndex(rewrite => rewrite.source === '/api/:path*');

  assert.notEqual(proxyIndex, -1);
  assert.notEqual(apiIndex, -1);
  assert.ok(proxyIndex < apiIndex);
  assert.equal(config.rewrites.some(rewrite => rewrite.source === '/(.*)'), false);
  assert.equal(config.trailingSlash, false);
  assert.equal(
    config.rewrites[proxyIndex].destination,
    'https://indore-colleges-i560.onrender.com/api/:path*',
  );
  assert.ok(config.headers.some(rule =>
    rule.source === '/api/proxy/:path*'
    && rule.headers.some(header => header.key === 'Cache-Control' && header.value === 'no-store'),
  ));
});

test('counseling records require an admin token on every API request', async () => {
  const missing = await request('/api/counseling');
  assert.equal(missing.status, 401);
  assert.deepEqual(await missing.json(), {error: 'A valid admin session is required.'});

  const invalid = await request('/api/counseling', {
    headers: {Authorization: 'Bearer invalid-test-token'},
  });
  assert.equal(invalid.status, 401);

  const login = await postJson('/api/admin/login', {email: testEmail, password: configuredPassword});
  assert.equal(login.status, 200);
  const {token} = await login.json();
  assert.equal(typeof token, 'string');

  const authorized = await request('/api/counseling', {
    headers: {Authorization: `Bearer ${token}`},
  });
  assert.equal(authorized.status, 200);
  const records = await authorized.json();
  assert.equal(Array.isArray(records), true);
  assertNoCredentialKeys(records);

  const logout = await request('/api/admin/logout', {
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`},
  });
  assert.equal(logout.status, 200);
  const revoked = await request('/api/counseling', {
    headers: {Authorization: `Bearer ${token}`},
  });
  assert.equal(revoked.status, 401);
});

test('missing admin password fails closed and incorrect credentials are rejected', async () => {
  assert.equal(getAdminPasswordFingerprint(''), null);
  const incorrect = await postJson('/api/admin/login', {email: testEmail, password: 'wrong'});
  assert.equal(incorrect.status, 401);
});

test('email profile and history endpoints require a server session', async () => {
  const endpoints = [
    ['/api/users/profile/security-test%40example.invalid', 'GET'],
    ['/api/users/profile/security-test%40example.invalid', 'PUT'],
    ['/api/users/profile/security-test%40example.invalid', 'DELETE'],
    ['/api/users/history/security-test%40example.invalid', 'GET'],
    ['/api/users/sync-history', 'POST'],
  ];
  for (const [pathname, method] of endpoints) {
    const response = await request(pathname, {
      method,
      headers: {'Content-Type': 'application/json'},
      body: method === 'PUT' || method === 'POST' ? JSON.stringify({email: testEmail}) : undefined,
    });
    assert.equal(response.status, 401, `${method} ${pathname}`);
    assertNoCredentialKeys(await response.json());
  }
});

test('account data persists through the authenticated session and appears in admin dashboard', async () => {
  const send = await postJson('/api/auth/send-otp', {email: testEmail});
  assert.equal(send.status, 200);
  const otp = issuedOtps.get(testEmail);
  assert.match(otp, /^\d{6}$/);

  for (const invalidOtp of ['123456', '000000', '999999']) {
    if (invalidOtp === otp) continue;
    const invalid = await postJson('/api/auth/verify-otp', {
      email: testEmail,
      otp: invalidOtp,
      name: 'Test User',
      phone: '0000000000',
      courseInterested: 'Engineering',
      twelfthSubject: 'Science',
      address: 'Test Address',
    });
    assert.equal(invalid.status, 400);
  }

  const verified = await postJson('/api/auth/verify-otp', {
    email: testEmail,
    otp,
    name: 'Test User',
    phone: '0000000000',
    courseInterested: 'Engineering',
    twelfthSubject: 'Science',
    address: 'Test Address',
  });
  assert.equal(verified.status, 200);
  const result = await verified.json();
  assert.equal(result.user.email, testEmail);
  assert.equal('_id' in result.user, false);
  assert.equal('token' in result, false);
  const sessionCookie = verified.headers.get('set-cookie')?.split(';')[0];
  assert.match(sessionCookie, /^indore_user_session=[a-f0-9]{64}$/);
  assert.match(verified.headers.get('set-cookie'), /HttpOnly/i);
  assertNoCredentialKeys(result);

  const authenticatedHeaders = {Cookie: sessionCookie};
  const session = await request('/api/auth/session', {headers: authenticatedHeaders});
  assert.equal(session.status, 200);

  const wrongProfile = await request('/api/users/profile/another-user%40example.invalid', {
    headers: authenticatedHeaders,
  });
  assert.equal(wrongProfile.status, 403);
  const wrongUpdate = await request('/api/users/profile/another-user%40example.invalid', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', ...authenticatedHeaders},
    body: JSON.stringify({name: 'Unauthorized'}),
  });
  assert.equal(wrongUpdate.status, 403);
  const wrongDelete = await request('/api/users/profile/another-user%40example.invalid', {
    method: 'DELETE',
    headers: authenticatedHeaders,
  });
  assert.equal(wrongDelete.status, 403);

  const update = await request(`/api/users/profile/${encodeURIComponent(testEmail)}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json', ...authenticatedHeaders},
    body: JSON.stringify({
      fatherName: 'Test Father',
      fatherEmail: 'father@example.invalid',
      motherName: 'Test Mother',
      childName: 'Test Applicant',
      address: 'Test Address',
    }),
  });
  assert.equal(update.status, 200);
  assert.equal((await update.json()).user.fatherName, 'Test Father');

  const sync = await postJson('/api/users/sync-history', {
    shortlistedIds: ['iit-indore'],
    cartIds: ['davv'],
  }, authenticatedHeaders);
  assert.equal(sync.status, 200);

  const signedInEnquiry = await postJson('/api/counseling', {
    parentName: 'Test Parent',
    studentName: 'Test Applicant',
    studentClassOrDegree: 'Engineering',
    phone: '0000000000',
    email: 'another-user@example.invalid',
    preferredSlot: 'Morning',
    date: '2026-11-07',
    query: 'Account history linkage test',
  }, {
    ...authenticatedHeaders,
    Origin: 'http://localhost:3000',
  });
  assert.equal(signedInEnquiry.status, 201);

  const history = await request(`/api/users/history/${encodeURIComponent(testEmail)}`, {
    headers: authenticatedHeaders,
  });
  assert.equal(history.status, 200);
  const accountHistory = await history.json();
  assert.equal(accountHistory.counseling.length, 1);
  assert.equal(accountHistory.counseling[0].query, 'Account history linkage test');
  assert.deepEqual(accountHistory.callbacks, []);

  const adminLogin = await postJson('/api/admin/login', {email: testEmail, password: configuredPassword});
  const {token: adminToken} = await adminLogin.json();
  const adminUsers = await request('/api/admin/user-profiles', {
    headers: {Authorization: `Bearer ${adminToken}`},
  });
  assert.equal(adminUsers.status, 200);
  const [adminUser] = await adminUsers.json();
  assert.equal(adminUser.fatherName, 'Test Father');
  assert.equal(adminUser.fatherEmail, 'father@example.invalid');
  assert.equal(adminUser.childName, 'Test Applicant');
  assert.deepEqual(adminUser.shortlistedIds, ['iit-indore']);
  assert.deepEqual(adminUser.cartIds, ['davv']);
  assertNoCredentialKeys(adminUser);

  const reused = await postJson('/api/auth/verify-otp', {
    email: testEmail,
    otp,
    name: 'Test User',
    phone: '0000000000',
    courseInterested: 'Engineering',
    twelfthSubject: 'Science',
    address: 'Test Address',
  });
  assert.equal(reused.status, 400);
  assert.equal(serverOutput().includes(otp), false);

  const logout = await request('/api/auth/logout', {
    method: 'POST',
    headers: authenticatedHeaders,
  });
  assert.equal(logout.status, 200);
  const afterLogout = await request('/api/auth/session', {headers: authenticatedHeaders});
  assert.equal(afterLogout.status, 401);
});

test('public enquiries and partner registration remain available without exposing credentials', async () => {
  const enquiry = await postJson('/api/counseling', {
    parentName: 'Test Parent',
    studentName: 'Test Student',
    studentClassOrDegree: 'Engineering',
    phone: '0000000000',
    email: testEmail,
    preferredSlot: 'Morning',
    date: '2026-11-07',
    query: 'Security integration test',
  });
  assert.equal(enquiry.status, 201);
  assert.deepEqual(await enquiry.json(), {success: true});

  const registration = await postJson('/api/college-partner/register', {
    name: 'Test College',
    contactEmail: 'partner-test@example.invalid',
    contactPhone: '0000000000',
    password: 'must-not-be-stored-or-returned',
  });
  assert.equal(registration.status, 201);
  assert.deepEqual(await registration.json(), {success: true});

  const login = await postJson('/api/college-partner/login', {
    email: 'partner-test@example.invalid',
    password: 'must-not-be-stored-or-returned',
  });
  assert.equal(login.status, 503);

  const partnerRoutes = [
    ['/api/college-partner/my-registration/partner-test%40example.invalid', 'GET'],
    ['/api/college-partner/my-update-requests/cp-demo-1', 'GET'],
    ['/api/college-partner/cp-demo-1', 'PUT'],
    ['/api/college-partner/cp-demo-1', 'DELETE'],
    ['/api/college-partner/request-update', 'POST'],
  ];
  for (const [pathname, method] of partnerRoutes) {
    const response = await request(pathname, {
      method,
      headers: {'Content-Type': 'application/json'},
      body: method === 'PUT' || method === 'POST' ? JSON.stringify({name: 'Unauthorized'}) : undefined,
    });
    assert.equal(response.status, 401, `${method} ${pathname}`);
    assertNoCredentialKeys(await response.json());
  }

  const loginAdmin = await postJson('/api/admin/login', {email: testEmail, password: configuredPassword});
  const {token} = await loginAdmin.json();
  const partnerRecords = await request('/api/admin/all-registrations', {
    headers: {Authorization: `Bearer ${token}`},
  });
  assert.equal(partnerRecords.status, 200);
  assertNoCredentialKeys(await partnerRecords.json());

  const application = await postJson('/api/register-school', {
    name: 'Test School',
    type: 'School',
    category: 'Day School',
    boardOrAffiliation: 'CBSE',
    location: 'Indore',
    contactEmail: testEmail,
    contactPhone: '0000000000',
  });
  assert.equal(application.status, 201);
  assert.deepEqual(await application.json(), {success: true});

  const contact = await postJson('/api/contact', {
    name: 'Test Contact',
    email: testEmail,
    phone: '0000000000',
    message: 'Security integration test',
  });
  assert.equal(contact.status, 201);
  assert.deepEqual(await contact.json(), {success: true});

  const careerApplication = await postJson('/api/careers', {
    name: 'Test Candidate',
    email: testEmail,
    phone: '0000000000',
    pitch: 'Security integration test',
  });
  assert.equal(careerApplication.status, 201);
  assert.deepEqual(await careerApplication.json(), {success: true});
});
