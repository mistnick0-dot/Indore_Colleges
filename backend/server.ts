import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import nodemailer from 'nodemailer';
import { MongoClient, Db } from 'mongodb';
import cors from 'cors';
import { randomBytes, randomInt } from 'crypto';
import { INDORE_INSTITUTES } from '../frontend/src/data/indoreData.js';
import { CounselingRequest, CallbackRequest, Review, SchoolRegistrationRequest, CollegeUpdateRequest } from '../frontend/src/types.js';
import { createSitemapXml, getSitemapPaths } from '../shared/sitemap.js';
import { AdminSessionStore, consumeIssuedOtp, getAdminPasswordFingerprint, hashSessionToken } from './security.js';

dotenv.config();

// MongoDB Database Connection & Seeding System
const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    instituteId: 'daly-college',
    authorName: 'Vikram Singh Rathore',
    rating: 5,
    comment: 'An institution of supreme heritage and peerless sports facilities. My son has grown exceptionally confident here.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rev-2',
    instituteId: 'iit-indore',
    authorName: 'Prof. Alok Gupta',
    rating: 5,
    comment: 'Outstanding campus and research facility in Simrol. B.Tech placements and academic rigor are among the top in the country.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'rev-3',
    instituteId: 'shishukunj',
    authorName: 'Megha Jaiswal',
    rating: 4,
    comment: 'Great infrastructure, highly disciplined, and modern learning equipment. Buses are very well managed across Indore.',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_COUNSELING: CounselingRequest[] = [
  {
    id: 'req-1',
    parentName: 'Sanjay Malviya',
    studentName: 'Aarav Malviya',
    studentClassOrDegree: 'Class 9',
    phone: '+91 98270 12345',
    email: 'sanjay.m@gmail.com',
    preferredSlot: 'Morning (9 AM - 12 PM)',
    date: '2026-07-12',
    query: 'Looking for a premium CBSE day boarding school with good sports coaching, preferably near Indore Bypass.',
    status: 'pending',
    createdAt: new Date().toISOString()
  },
  {
    id: 'req-2',
    parentName: 'Preeti Sharma',
    studentName: 'Ishika Sharma',
    studentClassOrDegree: 'B.Tech CSE',
    phone: '+91 94250 56789',
    email: 'preeti.sharma@yahoo.com',
    preferredSlot: 'Afternoon (12 PM - 4 PM)',
    date: '2026-07-15',
    query: 'Need counseling regarding SGSITS placements and DAVV choice list.',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

const DEFAULT_CALLBACKS: CallbackRequest[] = [
  {
    id: 'cb-1',
    name: 'Ramesh Patel',
    phone: '+91 98260 44556',
    instituteId: 'daly-college',
    createdAt: new Date().toISOString()
  }
];

let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;
let isMongoConnecting = false;
const adminSessionTokens = new AdminSessionStore();
const ADMIN_SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const USER_SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const USER_SESSION_COOKIE = 'indore_user_session';

function getAllowedFrontendOrigins() {
  const configuredOrigins = (process.env.FRONTEND_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
  return new Set([
    'https://indorecolleges.in',
    'https://www.indorecolleges.in',
    'http://localhost:3000',
    'http://localhost:5173',
    ...configuredOrigins,
  ]);
}

function isAllowedFrontendOrigin(origin?: string) {
  return !origin || getAllowedFrontendOrigins().has(origin);
}

function readUserSessionCookie(cookieHeader?: string) {
  const cookie = cookieHeader?.split(';')
    .map(part => part.trim())
    .find(part => part.startsWith(`${USER_SESSION_COOKIE}=`));
  return cookie?.slice(USER_SESSION_COOKIE.length + 1) || null;
}

function setUserSessionCookie(res: express.Response, token: string) {
  const secure = process.env.NODE_ENV === 'production';
  res.append(
    'Set-Cookie',
    `${USER_SESSION_COOKIE}=${token}; HttpOnly; Path=/; Max-Age=${USER_SESSION_TTL_MS / 1000}; SameSite=${secure ? 'None; Secure' : 'Lax'}`,
  );
}

function clearUserSessionCookie(res: express.Response) {
  const secure = process.env.NODE_ENV === 'production';
  res.append(
    'Set-Cookie',
    `${USER_SESSION_COOKIE}=; HttpOnly; Path=/; Max-Age=0; SameSite=${secure ? 'None; Secure' : 'Lax'}`,
  );
}

function isAdminSession(authorizationHeader?: string): boolean {
  const token = authorizationHeader?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return false;

  return adminSessionTokens.isValid(
    token,
    Date.now(),
    getAdminPasswordFingerprint(process.env.ADMIN_PASSWORD),
  );
}

function stripCredentials(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(item => stripCredentials(item));
  }
  if (!value || typeof value !== 'object' || value instanceof Date) return value;

  return Object.fromEntries(
    Object.entries(value).filter(([key]) => !/(?:password|otp|token)/i.test(key))
      .map(([key, item]) => [key, stripCredentials(item)]),
  );
}

async function seedDatabase(db: Db) {
  try {
    const reviewsCol = db.collection('reviews');
    const reviewsCount = await reviewsCol.countDocuments();
    if (reviewsCount === 0) {
      await reviewsCol.insertMany(DEFAULT_REVIEWS);
      console.log('Seeded default reviews into MongoDB.');
    }

    const counselingCol = db.collection('counseling_requests');
    const counselingCount = await counselingCol.countDocuments();
    if (counselingCount === 0) {
      await counselingCol.insertMany(DEFAULT_COUNSELING);
      console.log('Seeded default counseling requests into MongoDB.');
    }

    const callbacksCol = db.collection('callback_requests');
    const callbacksCount = await callbacksCol.countDocuments();
    if (callbacksCount === 0) {
      await callbacksCol.insertMany(DEFAULT_CALLBACKS);
      console.log('Seeded default callback requests into MongoDB.');
    }
  } catch (err: any) {
    console.log('[SmartDB] Database seed check failed.');
  }
}

const DEFAULT_UPDATE_REQUESTS: CollegeUpdateRequest[] = [
  {
    id: 'cur-demo-1',
    collegeId: 'cp-demo-1',
    collegeName: 'Malwa Institute of Science & Technology',
    contactName: 'Dr. Jitendra Agarwal',
    contactEmail: 'partner@indorecolleges.org',
    contactPhone: '+91 731 2856000',
    updateNotes: 'Annual tuition fee revision for session 2026-27 and added Artificial Intelligence and Data Science laboratory facilities with Autonomous curriculum accreditation.',
    currentData: {
      name: 'Malwa Institute of Science & Technology',
      category: 'Engineering',
      boardOrAffiliation: 'RGPV / AICTE',
      location: 'Bypass Road',
      feePerAnnum: 72000,
      establishedYear: 2007,
      contactPhone: '+91 731 2856000',
      website: 'https://mistindore.ac.in',
      address: 'Index City, NH-59A, Nemawar Road, Indore, MP 452016',
      facilities: ['High-Tech Computer Labs', 'Wi-Fi Campus', 'Hostel Facility', 'Bus Transport Across Indore', 'Cafeteria', 'Sports Ground']
    },
    requestedChanges: {
      name: 'Malwa Institute of Science & Technology (Autonomous)',
      category: 'Engineering',
      boardOrAffiliation: 'RGPV / AICTE / Autonomous',
      location: 'Bypass Road',
      feePerAnnum: 85000,
      establishedYear: 2007,
      contactPhone: '+91 731 2856000',
      website: 'https://mistindore.ac.in',
      address: 'Index City, NH-59A, Nemawar Road, Indore, MP 452016',
      facilities: ['High-Tech Computer Labs', 'Wi-Fi Campus', 'Hostel Facility', 'Bus Transport Across Indore', 'Cafeteria', 'Sports Ground', 'AI & Machine Learning Center of Excellence', 'Incubation Center']
    },
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

const DEFAULT_COLLEGE_REGISTRATIONS: any[] = [
  {
    id: 'cp-demo-1',
    name: 'Malwa Institute of Science & Technology',
    category: 'Engineering',
    boardOrAffiliation: 'RGPV / AICTE',
    location: 'Bypass Road',
    feePerAnnum: 72000,
    establishedYear: 2007,
    contactName: 'Dr. Jitendra Agarwal',
    contactEmail: 'partner@indorecolleges.org',
    contactPhone: '+91 731 2856000',
    courses: ['B.Tech Computer Science & Engineering', 'B.Tech Artificial Intelligence & Data Science', 'M.Tech Software Engineering', 'MBA'],
    approvals: ['AICTE', 'RGPV', 'DTE MP'],
    highestPackage: '₹24 LPA',
    lowestPackage: '₹4.5 LPA',
    achievements: 'NBA Accredited Programs, NAAC A+ Grade, 100% Placement Assistance with 50+ Top Tech Recruiters',
    visionMission: 'Malwa Institute of Science and Technology (MIST) is a premier technical campus in Indore offering B.Tech and M.Tech programs with advanced computing and robotics facilities.',
    description: 'Malwa Institute of Science and Technology (MIST) is a premier technical campus in Indore offering B.Tech and M.Tech programs with advanced computing and robotics facilities.',
    facilities: ['High-Tech Computer Labs', 'Wi-Fi Campus', 'Hostel Facility', 'Bus Transport Across Indore', 'Cafeteria', 'Sports Ground', 'AI & Robotics Center of Excellence'],
    website: 'https://mistindore.ac.in',
    address: 'Index City, NH-59A, Nemawar Road, Indore, MP 452016',
    campusPhoto: '/malwa_institute_campus.jpg',
    status: 'approved',
    pendingUpdate: DEFAULT_UPDATE_REQUESTS[0],
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
  }
];

// Define global transient in-memory database fallback to ensure 100% application uptime
const fallbackData: Record<string, any[]> = {
  reviews: [...DEFAULT_REVIEWS],
  counseling_requests: [...DEFAULT_COUNSELING],
  callback_requests: [...DEFAULT_CALLBACKS],
  school_registrations: [],
  college_registrations: [...DEFAULT_COLLEGE_REGISTRATIONS],
  college_update_requests: [...DEFAULT_UPDATE_REQUESTS],
  users: [],
  otps: []
};

class SmartCollection {
  private colName: string;
  private realCol: any = null;

  constructor(colName: string, realCol?: any) {
    this.colName = colName;
    this.realCol = realCol;
  }

  private getFallbackArray(): any[] {
    if (!fallbackData[this.colName]) {
      fallbackData[this.colName] = [];
    }
    return fallbackData[this.colName];
  }

  find(query: any = {}) {
    const self = this;
    return {
      async toArray() {
        if (self.realCol) {
          try {
            return await self.realCol.find(query).toArray();
          } catch {
            console.warn(`[SmartDB Fallback] MongoDB find failed on '${self.colName}', falling back to memory.`);
          }
        }
        return self.filterMemory(query);
      },
      sort(sortObj: any) {
        return {
          async toArray() {
            if (self.realCol) {
              try {
                return await self.realCol.find(query).sort(sortObj).toArray();
              } catch {
                console.warn(`[SmartDB Fallback] MongoDB sort failed on '${self.colName}', falling back to memory.`);
              }
            }
            const arr = self.filterMemory(query);
            const sortKey = Object.keys(sortObj)[0];
            const sortDir = sortObj[sortKey];
            return arr.sort((a: any, b: any) => {
              const valA = a[sortKey];
              const valB = b[sortKey];
              if (valA === valB) return 0;
              if (valA == null) return 1;
              if (valB == null) return -1;
              const comparison = valA < valB ? -1 : 1;
              return sortDir === -1 ? -comparison : comparison;
            });
          }
        };
      }
    };
  }

  private filterMemory(query: any): any[] {
    const fallback = this.getFallbackArray();
    if (!query || Object.keys(query).length === 0) {
      return [...fallback];
    }
    return fallback.filter((item: any) => {
      for (const key of Object.keys(query)) {
        const condition = query[key];
        if (condition && typeof condition === 'object' && '$gt' in condition) {
          if (!(item[key] > condition.$gt)) return false;
        } else if (item[key] !== condition) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(query: any) {
    if (this.realCol) {
      try {
        return await this.realCol.findOne(query);
      } catch {
        console.warn(`[SmartDB Fallback] MongoDB findOne failed on '${this.colName}', falling back to memory.`);
      }
    }
    const matched = this.filterMemory(query);
    return matched.length > 0 ? matched[0] : null;
  }

  async insertOne(doc: any) {
    const fallback = this.getFallbackArray();
    if (!doc.id && !doc._id) {
      doc.id = `gen-${Date.now()}`;
    }
    
    // Always store in memory fallback to maintain offline integrity
    fallback.push(doc);

    if (this.realCol) {
      try {
        await this.realCol.insertOne(doc);
        return { acknowledged: true, insertedId: doc.id || doc._id };
      } catch {
        console.warn(`[SmartDB Fallback] MongoDB insertOne failed on '${this.colName}' (fallback memory preserved).`);
      }
    }
    return { acknowledged: true, insertedId: doc.id };
  }

  async updateOne(query: any, update: any, options: any = {}) {
    const fallback = this.getFallbackArray();
    const isUpsert = !!options.upsert;
    const setFields = update.$set || {};
    const insertFields = update.$setOnInsert || {};

    let matchedIdx = fallback.findIndex((item: any) => {
      for (const key of Object.keys(query)) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });

    if (matchedIdx !== -1) {
      fallback[matchedIdx] = { ...fallback[matchedIdx], ...setFields };
    } else if (isUpsert) {
      const newDoc = { ...query, ...insertFields, ...setFields };
      fallback.push(newDoc);
    }

    if (this.realCol) {
      try {
        await this.realCol.updateOne(query, update, options);
        return { acknowledged: true, modifiedCount: 1 };
      } catch {
        console.warn(`[SmartDB Fallback] MongoDB updateOne failed on '${this.colName}' (fallback memory updated).`);
      }
    }
    return { acknowledged: true, modifiedCount: 1 };
  }

  async deleteOne(query: any) {
    const fallback = this.getFallbackArray();
    let deletedCount = 0;
    const idx = fallback.findIndex((item: any) => {
      for (const key of Object.keys(query)) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });

    if (idx !== -1) {
      fallback.splice(idx, 1);
      deletedCount = 1;
    }

    if (this.realCol) {
      try {
        await this.realCol.deleteOne(query);
        return { acknowledged: true, deletedCount };
      } catch {
        console.warn(`[SmartDB Fallback] MongoDB deleteOne failed on '${this.colName}' (fallback memory updated).`);
      }
    }
    return { acknowledged: true, deletedCount };
  }

  async findOneAndDelete(query: any) {
    const fallback = this.getFallbackArray();
    const matchedIdx = fallback.findIndex((item: any) => {
      for (const key of Object.keys(query)) {
        const condition = query[key];
        if (condition && typeof condition === 'object' && '$gt' in condition) {
          if (!(item[key] > condition.$gt)) return false;
        } else if (item[key] !== condition) {
          return false;
        }
      }
      return true;
    });
    const fallbackRecord = matchedIdx === -1 ? null : fallback.splice(matchedIdx, 1)[0];

    if (this.realCol) {
      try {
        return await this.realCol.findOneAndDelete(query);
      } catch {
        console.warn(`[SmartDB Fallback] MongoDB OTP consume failed on '${this.colName}'.`);
      }
    }

    return fallbackRecord;
  }

  async deleteMany(query: any) {
    const fallback = this.getFallbackArray();
    const initialLen = fallback.length;
    
    const filtered = fallback.filter((item: any) => {
      for (const key of Object.keys(query)) {
        if (item[key] !== query[key]) return true; // keep
      }
      return false; // delete
    });
    
    fallbackData[this.colName] = filtered;
    const deletedCount = initialLen - filtered.length;

    if (this.realCol) {
      try {
        await this.realCol.deleteMany(query);
        return { acknowledged: true, deletedCount };
      } catch {
        console.warn(`[SmartDB Fallback] MongoDB deleteMany failed on '${this.colName}' (fallback memory updated).`);
      }
    }
    return { acknowledged: true, deletedCount };
  }

  async countDocuments() {
    if (this.realCol) {
      try {
        return await this.realCol.countDocuments();
      } catch {
        console.warn(`[SmartDB Fallback] MongoDB countDocuments failed on '${this.colName}'.`);
      }
    }
    return this.getFallbackArray().length;
  }
}

class SmartDb {
  private realDb: Db | null;

  constructor(realDb: Db | null) {
    this.realDb = realDb;
  }

  collection(name: string) {
    const realCol = this.realDb ? this.realDb.collection(name) : null;
    return new SmartCollection(name, realCol);
  }
}

let mongoAuthFailed = false;
let lastMongoAttemptTime = 0;
const MONGO_RETRY_INTERVAL_MS = 5 * 60 * 1000; // Cooldown 5 minutes on failed attempts

function isMongoConfigured(): boolean {
  const uri = process.env.MONGODB_URI;
  if (mongoAuthFailed || !uri || !uri.trim()) {
    return false;
  }

  // Check for common template placeholders
  const dummyKeywords = [
    '<password>',
    '<username>',
    'username:password',
    'your_mongo',
    'your_cluster',
    'example.com',
    'placeholder',
    'dummy'
  ];
  const uriLower = uri.toLowerCase();
  for (const kw of dummyKeywords) {
    if (uriLower.includes(kw)) {
      return false;
    }
  }
  return true;
}

async function getMongoDb(): Promise<any> {
  if (!isMongoConfigured()) {
    return new SmartDb(null);
  }

  if (mongoDb) {
    return new SmartDb(mongoDb);
  }

  if (isMongoConnecting) {
    return new SmartDb(null);
  }

  // Cooldown to avoid hammering connection on failures
  if (Date.now() - lastMongoAttemptTime < MONGO_RETRY_INTERVAL_MS) {
    return new SmartDb(null);
  }

  isMongoConnecting = true;
  lastMongoAttemptTime = Date.now();
  try {
    const uri = process.env.MONGODB_URI!;
    mongoClient = new MongoClient(uri, {
      connectTimeoutMS: 4000,
      serverSelectionTimeoutMS: 4000
    });
    await mongoClient.connect();
    mongoDb = mongoClient.db();
    console.log("[SmartDB] Successfully connected to MongoDB Atlas!");
    
    // Seed default records if empty in MongoDB
    await seedDatabase(mongoDb);
    
    isMongoConnecting = false;
    return new SmartDb(mongoDb);
  } catch (err: any) {
    isMongoConnecting = false;
    const errMsg = err?.message || String(err);
    if (
      errMsg.includes('bad auth') ||
      errMsg.includes('Authentication failed') ||
      errMsg.includes('auth failed') ||
      errMsg.includes('auth error')
    ) {
      mongoAuthFailed = true;
      console.log("[SmartDB] MongoDB Atlas authentication unverified or invalid. Operating seamlessly on dynamic in-memory database.");
    } else {
      console.log('[SmartDB] MongoDB Atlas connection failed. Operating on the in-memory fallback.');
    }
    return new SmartDb(null);
  }
}

async function getPersistentMongoDb(): Promise<any> {
  if (process.env.NODE_ENV === 'test') {
    return new SmartDb(null);
  }
  await getMongoDb();
  if (!mongoDb) {
    throw new Error('Persistent database is unavailable.');
  }
  return mongoDb;
}

// Mail SMTP helper with Nodemailer

function isSmtpConfigured(): boolean {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  
  if (!host || !user || !pass) {
    return false;
  }

  // Check for dummy or placeholder values
  const dummyKeywords = ['my_smtp', 'your_', 'example', 'placeholder', 'dummy', 'xxxx', 'test_user'];
  const userLower = user.toLowerCase();
  const passLower = pass.toLowerCase();
  const hostLower = host.toLowerCase();

  for (const kw of dummyKeywords) {
    if (userLower.includes(kw) || passLower.includes(kw) || hostLower.includes(kw)) {
      return false;
    }
  }
  return true;
}

async function sendVerificationEmail(email: string, otp: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'Indore Colleges';

  if (!apiKey || !senderEmail) {
    console.error('[Email] OTP delivery is not configured.');
    return { success: false, error: 'Unable to send the verification email. Please try again later.' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email }],
        subject: `[Indore Colleges] ${otp} is your verification code`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <h2 style="color: #2563eb; font-size: 24px; margin-bottom: 20px; font-weight: bold; text-align: center;">Indore Colleges</h2>
            <p style="font-size: 16px; color: #374151; line-height: 1.5;">Hello,</p>
            <p style="font-size: 16px; color: #374151; line-height: 1.5;">Please use the following One-Time Password (OTP) to complete your login or registration on Indore Colleges:</p>
            <div style="background-color: #f3f4f6; border-radius: 8px; padding: 15px; margin: 24px 0; text-align: center;"><span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #111827;">${otp}</span></div>
            <p style="font-size: 14px; color: #6b7280; line-height: 1.5; margin-top: 24px; text-align: center;">This OTP is valid for 2 minutes. Please do not share this OTP with anyone.</p>
          </div>
        `
      })
    });

    if (!response.ok) {
      const providerError = await response.text();
      throw new Error(`Brevo API ${response.status}: ${providerError}`);
    }

    console.log('OTP email sent successfully.');
    return { success: true };
  } catch (err: any) {
    console.error('[Email] OTP delivery failed.');
    return { success: false, error: 'Unable to send the verification email. Please try again later.' };
  }
}

// Mail Notification helper for filled forms (User gets confirmation, Admin gets lead alert)
async function sendFormNotifications(
  userEmail: string,
  userName: string,
  formType: string,
  formDataDetails: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const sender = process.env.SMTP_SENDER || 'no-reply@indorecolleges.org';
  const adminEmail = process.env.ADMIN_EMAIL || 'vishalsinghvicky95@gmail.com';

  const formatDetailsHtml = (details: Record<string, any>) => {
    return Object.entries(details)
      .map(([key, value]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
        return `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563; width: 40%; text-align: left;">${formattedKey}</td>
            <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937; text-align: left;">${value || 'N/A'}</td>
          </tr>
        `;
      })
      .join('');
  };

  const detailsHtml = formatDetailsHtml(formDataDetails);

  // 1. Email to User (Confirmation)
  const userMailOptions = {
    from: `"EduPath Indore" <${sender}>`,
    to: userEmail,
    subject: `[EduPath] We've received your ${formType}!`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #dc2626; font-size: 26px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">EduPath Indore</h2>
          <p style="color: #6b7280; font-size: 13px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Official Admissions Advisory Desk</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #f3f4f6; margin-bottom: 25px;" />
        <p style="font-size: 16px; color: #111827; line-height: 1.6; margin-top: 0;">Dear <strong>${userName}</strong>,</p>
        <p style="font-size: 15px; color: #374151; line-height: 1.6;">Thank you for reaching out to us. We have successfully received your <strong>${formType}</strong> request. Our expert academic counselors are already reviewing your requirements.</p>
        <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 8px; padding: 15px 20px; margin: 24px 0;">
          <p style="margin: 0; font-size: 14px; color: #991b1b; font-weight: bold;">What happens next?</p>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #7f1d1d; line-height: 1.5;">An Indore Colleges counselor will call you shortly on your provided contact number to discuss the perfect matched options, fee comparisons, and next steps.</p>
        </div>
        
        <h3 style="font-size: 15px; color: #111827; margin-top: 30px; margin-bottom: 12px; border-bottom: 2px solid #f3f4f6; padding-bottom: 6px;">Your Submission Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tbody>
            ${detailsHtml}
          </tbody>
        </table>

        <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">If you have any urgent queries, feel free to call our direct hotline at <a href="tel:+919811247700" style="color: #dc2626; text-decoration: none; font-weight: bold;">+91 9811247700</a>.</p>
        <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 30px 0;" />
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-bottom: 0;">Thank you,<br>The EduPath Indore Admissions Team<br><span style="font-size: 11px; color: #d1d5db;">Vijay Nagar Center, Scheme 54, Indore, MP</span></p>
      </div>
    `
  };

  // 2. Email to Admin (Lead Alert)
  const adminMailOptions = {
    from: `"EduPath Lead Alerts" <${sender}>`,
    to: adminEmail,
    subject: `🚨 [NEW LEAD] ${formType} from ${userName}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #f9fafb;">
        <div style="background-color: #111827; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 25px;">
          <h2 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: bold; letter-spacing: 0.5px;">New Admission Query Alert</h2>
          <span style="display: inline-block; background-color: #dc2626; color: #ffffff; font-size: 11px; font-weight: bold; padding: 3px 10px; border-radius: 99px; margin-top: 10px; text-transform: uppercase;">${formType}</span>
        </div>
        
        <p style="font-size: 15px; color: #374151; line-height: 1.6;">A new application form has been filled out on the EduPath Indore portal. Below are the complete contact details and requirements for immediate followup:</p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; margin: 20px 0;">
          <tbody>
            ${detailsHtml}
          </tbody>
        </table>

        <div style="background-color: #eff6ff; border-radius: 8px; padding: 15px; border: 1px solid #bfdbfe; margin-top: 25px; text-align: center;">
          <p style="margin: 0; font-size: 13px; color: #1e40af; font-weight: bold;">Action Required:</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e3a8a; line-height: 1.5;">Please call the lead back on the provided phone number within 2 hours. Keep the counseling dashboard updated with follow-up progress.</p>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
        <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-bottom: 0;">EduPath Indore CRM System &bull; Automatically generated alert.</p>
      </div>
    `
  };

  if (!isSmtpConfigured()) {
    const message = 'SMTP_HOST, SMTP_USER, and SMTP_PASS must be configured for email delivery.';
    console.error('[Email] Form notification delivery is not configured.');
    return { success: false, error: message };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: Number(port) === 465,
      auth: { user, pass }
    });

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    console.log('Form notifications sent successfully.');
    return { success: true };
  } catch {
    console.error('[Email] Form notification delivery failed.');
    return { success: false, error: 'Unable to send form notifications.' };
  }
}

// Mail Notification helper for accepted/approved college partners
async function sendCollegeAcceptanceEmail(email: string, collegeName: string): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const sender = process.env.SMTP_SENDER || 'no-reply@indorecolleges.org';

  if (!isSmtpConfigured()) {
    const message = 'SMTP_HOST, SMTP_USER, and SMTP_PASS must be configured for email delivery.';
    console.error(`[Email] College approval unavailable for ${email}: ${message}`);
    return { success: false, error: message };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: Number(port) === 465,
      auth: { user, pass }
    });

    const mailOptions = {
      from: `"Indore Colleges Portal" <${sender}>`,
      to: email,
      subject: `🎉 Congratulations! Your College "${collegeName}" has been Approved!`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #2563eb; font-size: 26px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">Indore Colleges Partner Portal</h2>
            <p style="color: #6b7280; font-size: 13px; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Partner Relations desk</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #f3f4f6; margin-bottom: 25px;" />
          <p style="font-size: 16px; color: #111827; line-height: 1.6; margin-top: 0;">Dear Administrator / Representative,</p>
          <p style="font-size: 15px; color: #374151; line-height: 1.6;">We are thrilled to inform you that your registration request for <strong>${collegeName}</strong> has been officially approved by our chief administrator!</p>
          <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 8px; padding: 15px 20px; margin: 24px 0;">
            <p style="margin: 0; font-size: 14px; color: #166534; font-weight: bold;">Status: Approved & Live</p>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #14532d; line-height: 1.5;">Your college has now been added to the official Indore Colleges directory list and is visible to all active applicants seeking admission counselors and shortlisting institutions!</p>
          </div>
          <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">You can log in to your College Portal at any time to update your college's basic info, fee structure, programs offered, or delete your partner profile should you choose to opt-out.</p>
          <hr style="border: 0; border-top: 1px solid #f3f4f6; margin: 30px 0;" />
          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-bottom: 0;">Warm regards,<br>The Indore Colleges Admissions Board</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`College approval email sent successfully to ${email}`);
    return { success: true };
  } catch (err: any) {
    const message = err?.message || String(err);
    console.error(`[Email] College approval failed for ${email}: ${message}`);
    return { success: false, error: message };
  }
}

// Mail Notification helper for approved college updates
async function sendCollegeUpdateApprovedEmail(email: string, collegeName: string, updatedFields: string[]): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const sender = process.env.SMTP_SENDER || 'no-reply@indorecolleges.org';

  if (!isSmtpConfigured()) {
    const message = 'SMTP_HOST, SMTP_USER, and SMTP_PASS must be configured for email delivery.';
    console.error(`[Email] College update unavailable for ${email}: ${message}`);
    return { success: false, error: message };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(port) || 587,
      secure: Number(port) === 465,
      auth: { user, pass }
    });

    const fieldsList = updatedFields.length > 0 ? updatedFields.map(f => `<li>${f}</li>`).join('') : '<li>Academic details and campus information</li>';

    const mailOptions = {
      from: `"Indore Colleges Portal" <${sender}>`,
      to: email,
      subject: `✅ Approved & Published: College Info Update for "${collegeName}"`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff;">
          <h2 style="color: #16a34a; font-size: 24px; margin: 0; font-weight: 800;">College Update Approved & Published!</h2>
          <p style="font-size: 15px; color: #374151; line-height: 1.6; margin-top: 15px;">Dear Administrator for <strong>${collegeName}</strong>,</p>
          <p style="font-size: 15px; color: #374151; line-height: 1.6;">Your recent college information update request has been reviewed, approved by the Indore Colleges administrative board, and successfully published to the live directory!</p>
          <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 8px; padding: 15px 20px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #166534; font-weight: bold;">Published Changes:</p>
            <ul style="margin: 8px 0 0 15px; font-size: 13px; color: #15803d; padding: 0;">
              ${fieldsList}
            </ul>
          </div>
          <p style="font-size: 14px; color: #4b5563;">Students browsing Indore Colleges can now view your latest verified fees, course offerings, and campus facilities.</p>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 30px;">Warm regards,<br>The Indore Colleges Admissions Board</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`College update approval email sent successfully to ${email}`);
    return { success: true };
  } catch (err: any) {
    const message = err?.message || String(err);
    console.error(`[Email] College update failed for ${email}: ${message}`);
    return { success: false, error: message };
  }
}

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("Warning: GEMINI_API_KEY is not defined in the environment. Chat assistant will run in simulator mode.");
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  const allowedFrontendOrigins = getAllowedFrontendOrigins();
  app.use(cors({
    origin: (origin, callback) => {
      callback(null, !origin || allowedFrontendOrigins.has(origin));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }));
  app.use(express.json({ limit: '12mb' }));

  // Health check endpoint for Render, uptime monitors, and load balancers
  app.get(['/api/health', '/health'], (req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'Indore Colleges Backend API',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Serve a sitemap from the same approved partner records used by the directory.
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const db = await getMongoDb();
      const approvedPartners = await db.collection('college_registrations').find({ status: 'approved' }).toArray();
      const partnerIds = approvedPartners
        .filter(partner => typeof partner.id === 'string' && typeof partner.name === 'string')
        .map(partner => partner.id);
      const collegePaths = INDORE_INSTITUTES
        .filter(institute => institute.type === 'college')
        .map(institute => `/college/${institute.id}`);

      res.header('Content-Type', 'application/xml; charset=utf-8');
      res.header('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
      return res.send(createSitemapXml(getSitemapPaths(collegePaths, partnerIds)));
    } catch (error) {
      console.error('Sitemap generation error:', error);
      const collegePaths = INDORE_INSTITUTES
        .filter(institute => institute.type === 'college')
        .map(institute => `/college/${institute.id}`);
      res.header('Content-Type', 'application/xml; charset=utf-8');
      return res.send(createSitemapXml(getSitemapPaths(collegePaths)));
    }
  });

  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    res.send("User-agent: *\nAllow: /\n\nSitemap: https://indorecolleges.in/sitemap.xml\n");
  });

  // API Route: Get all institutes
  app.get('/api/institutes', async (req, res) => {
    try {
      const db = await getMongoDb();
      const dbReviews = await db.collection('reviews').find().toArray();
      
      // Fetch approved colleges from partner portal registrations
      let approvedPartners: any[] = [];
      try {
        approvedPartners = await db.collection('college_registrations').find({ status: 'approved' }).toArray();
      } catch (e) {
        console.warn("Failed to fetch college_registrations, using empty list:", e);
      }

      const partnerInstitutes = approvedPartners.map((cp: any) => ({
        id: cp.id,
        name: cp.name,
        type: 'college',
        category: cp.category || 'Engineering',
        boardOrAffiliation: cp.boardOrAffiliation || 'UGC',
        location: cp.location || 'Vijay Nagar',
        feePerAnnum: Number(cp.feePerAnnum) || 0,
        rating: 5.0,
        totalReviews: 0,
        image: cp.campusPhoto || cp.image || '/malwa_institute_campus.jpg', // Default fallback image
        description: cp.visionMission || cp.description || `${cp.name} is a premier educational institution in Indore.`,
        facilities: (Array.isArray(cp.facilities) && cp.facilities.length > 0)
          ? cp.facilities 
          : ['Smart Classrooms', 'Computer Center', 'Central Library', 'Auditorium', 'Placement Cell', 'Wi-Fi Campus'],
        establishedYear: Number(cp.establishedYear) || new Date().getFullYear(),
        coordinates: { lat: 22.7196, lng: 75.8577 }, // Default central Indore
        contactEmail: cp.contactEmail,
        contactPhone: cp.contactPhone,
        website: cp.website || '',
        address: cp.address || `${cp.location}, Indore`,
        coursesList: Array.isArray(cp.courses) && cp.courses.length > 0
          ? cp.courses.map((c: string) => ({
              name: c,
              duration: (c.toLowerCase().includes('b.tech') || c.toLowerCase().includes('btech') || c.toLowerCase().includes('b.e')) ? '4 Years' : (c.toLowerCase().includes('mba') || c.toLowerCase().includes('m.tech') || c.toLowerCase().includes('mca')) ? '2 Years' : '3 Years',
              fees: cp.feePerAnnum ? `₹${Number(cp.feePerAnnum).toLocaleString('en-IN')}/year` : 'Standard Fees',
              specializations: []
            }))
          : [
              { name: 'Undergraduate & Postgraduate Programs', duration: '3-4 Years', fees: cp.feePerAnnum ? `₹${Number(cp.feePerAnnum).toLocaleString('en-IN')}/year` : 'On Request' }
            ],
        placements: {
          highest: cp.highestPackage ? (cp.highestPackage.toLowerCase().includes('lpa') || cp.highestPackage.includes('₹') ? cp.highestPackage : `INR ${cp.highestPackage}`) : 'INR 12.50 LPA',
          average: cp.lowestPackage ? `${cp.lowestPackage} (Min)` : 'INR 5.80 LPA',
          lowest: cp.lowestPackage ? (cp.lowestPackage.toLowerCase().includes('lpa') || cp.lowestPackage.includes('₹') ? cp.lowestPackage : `INR ${cp.lowestPackage}`) : 'INR 3.20 LPA',
          recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL', 'Accenture', 'Tech Mahindra']
        },
        approval: Array.isArray(cp.approvals) && cp.approvals.length > 0
          ? `${cp.approvals.join(', ')} Approved, Affiliated to ${cp.boardOrAffiliation || 'DAVV'}`
          : `${cp.boardOrAffiliation || 'UGC / AICTE'} Approved Institution`,
        updates: [
          `Admissions Open for ${new Date().getFullYear()}-${new Date().getFullYear() + 1} Academic Session.`,
          `Verified Partner Institution on Indore Colleges Directory.`
        ],
        brochureUrl: cp.brochureUrl || '',
        brochureFileName: cp.brochureFileName || '',
        achievements: cp.achievements || '',
        instagram: cp.instagram || '',
        isPartnerRegistered: true
      }));

      const instMap = new Map<string, any>();
      INDORE_INSTITUTES.forEach(inst => instMap.set(inst.id, { ...inst }));
      partnerInstitutes.forEach(partner => {
        const existing = instMap.get(partner.id);
        if (existing) {
          instMap.set(partner.id, { 
            ...existing, 
            ...partner, 
            image: partner.image || existing.image,
            isPartnerRegistered: true 
          });
        } else {
          instMap.set(partner.id, partner);
        }
      });

      const allCombined = Array.from(instMap.values());

      const institutesWithReviews = allCombined.map(inst => {
        const instReviews = dbReviews.filter((r: any) => r.instituteId === inst.id);
        if (instReviews.length === 0) return inst;
        
        const totalRating = instReviews.reduce((sum: number, r: any) => sum + r.rating, 0);
        const averageRating = parseFloat((totalRating / instReviews.length).toFixed(1));
        
        return {
          ...inst,
          rating: averageRating,
          totalReviews: instReviews.length
        };
      });

      // Sort so engineering colleges are at the top
      institutesWithReviews.sort((a, b) => {
        const isEngA = a.category === 'Engineering';
        const isEngB = b.category === 'Engineering';
        if (isEngA && !isEngB) return -1;
        if (!isEngA && isEngB) return 1;
        return 0;
      });

      res.json(institutesWithReviews);
    } catch (err: any) {
      console.error("Error in /api/institutes:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Get reviews for a specific institute
  app.get('/api/reviews/:instituteId', async (req, res) => {
    const { instituteId } = req.params;
    try {
      const db = await getMongoDb();
      const filtered = await db.collection('reviews').find({ instituteId }).toArray();
      res.json(filtered);
    } catch (err: any) {
      console.error("Error in fetching reviews:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // API Route: Post a review
  app.post('/api/reviews', async (req, res) => {
    const { instituteId, authorName, rating, comment } = req.body;
    
    if (!instituteId || !authorName || !rating || !comment) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      instituteId,
      authorName,
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('reviews').insertOne(newReview);
      res.status(201).json(newReview);
    } catch (err: any) {
      console.error("Error posting review:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  const attachVerifiedEmailToPublicSubmission = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const token = readUserSessionCookie(req.headers.cookie);
    if (!token || !isAllowedFrontendOrigin(req.get('origin'))) {
      return next();
    }

    try {
      const db = await getPersistentMongoDb();
      const session = await db.collection('user_sessions').findOne({
        tokenHash: hashSessionToken(token),
        expiresAt: { $gt: new Date() },
      });
      if (typeof session?.email === 'string') {
        res.locals.verifiedUserEmail = session.email;
      }
    } catch {
      console.warn('Unable to associate a public submission with the signed-in user.');
    }
    next();
  };

  // API Route: Get all counseling requests
  app.get('/api/counseling', async (req, res) => {
    if (!isAdminSession(req.headers.authorization)) {
      return res.status(401).json({ error: 'A valid admin session is required.' });
    }

    try {
      const db = await getMongoDb();
      const list = await db.collection('counseling_requests').find().sort({ createdAt: -1 }).toArray();
      res.json(list.map((request: CounselingRequest) => ({
        id: request.id,
        parentName: request.parentName,
        studentName: request.studentName,
        studentClassOrDegree: request.studentClassOrDegree,
        phone: request.phone,
        email: request.email,
        preferredSlot: request.preferredSlot,
        date: request.date,
        query: request.query,
        status: request.status,
        createdAt: request.createdAt,
      })));
    } catch (err: any) {
      console.error('MongoDB counseling request failed.');
      res.status(500).json({ error: 'Unable to load counseling requests.' });
    }
  });

  // API Route: Post a counseling request
  app.post('/api/counseling', attachVerifiedEmailToPublicSubmission, async (req, res) => {
    const { parentName, studentName, studentClassOrDegree, phone, email, preferredSlot, date, query } = req.body;

    if (!parentName || !studentClassOrDegree || !phone || !preferredSlot || !date) {
      return res.status(400).json({ error: 'Required fields are missing.' });
    }

    const newRequest: CounselingRequest = {
      id: `req-${Date.now()}`,
      parentName,
      studentName: studentName || '',
      studentClassOrDegree,
      phone,
      email: res.locals.verifiedUserEmail || (email ? email.trim().toLowerCase() : ''),
      preferredSlot,
      date,
      query: query || '',
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('counseling_requests').insertOne(newRequest);

      // Trigger user confirmation and admin notification emails asynchronously
      sendFormNotifications(
        newRequest.email,
        newRequest.parentName,
        'Counseling Slot Schedule',
        {
          parentName: newRequest.parentName,
          studentName: newRequest.studentName || 'N/A',
          studentClass: newRequest.studentClassOrDegree,
          phone: newRequest.phone,
          email: newRequest.email,
          preferredSlot: newRequest.preferredSlot,
          preferredDate: newRequest.date,
          additionalQueries: newRequest.query
        }
      ).catch(() => console.error('Counseling email notifications failed.'));

      res.status(201).json({ success: true });
    } catch (err: any) {
      console.error('MongoDB counseling submission failed.');
      res.status(500).json({ error: 'Unable to submit the counseling request.' });
    }
  });

  // API Route: Post a callback request
  app.post('/api/callback', attachVerifiedEmailToPublicSubmission, async (req, res) => {
    const { name, phone, instituteId, email, query } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }

    const newCallback: CallbackRequest & { email?: string; query?: string } = {
      id: `cb-${Date.now()}`,
      name,
      phone,
      instituteId,
      email: res.locals.verifiedUserEmail || (email ? email.trim().toLowerCase() : ''),
      query: query || 'General Home Consultation',
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('callback_requests').insertOne(newCallback);

      // Determine recipient email or fallback to admin
      const userNotificationEmail = newCallback.email || 'vishalsinghvicky95@gmail.com';

      // Trigger user confirmation and admin notification emails asynchronously
      sendFormNotifications(
        userNotificationEmail,
        newCallback.name,
        'Admission Callback Inquiry',
        {
          parentOrStudentName: newCallback.name,
          phone: newCallback.phone,
          email: newCallback.email || 'None Provided',
          targetedInstitute: newCallback.instituteId || 'General Inquiry / Home Page Consultation',
          userMessage: newCallback.query || 'Wants a callback for academic consultation.'
        }
      ).catch(() => console.error('Callback email notifications failed.'));

      res.status(201).json({ success: true });
    } catch {
      console.error('MongoDB callback request submission failed.');
      res.status(500).json({ error: 'Unable to submit the callback request.' });
    }
  });

  // API Route: School/College Registration (Register your school)
  app.post('/api/register-school', async (req, res) => {
    const { name, type, category, boardOrAffiliation, location, feePerAnnum, establishedYear, contactName, contactEmail, contactPhone, description, facilities } = req.body;

    if (!name || !type || !category || !boardOrAffiliation || !location || !contactEmail || !contactPhone) {
      return res.status(400).json({ error: 'Key institution fields and contact information are required.' });
    }

    const newReg: SchoolRegistrationRequest = {
      id: `reg-${Date.now()}`,
      name,
      type,
      category,
      boardOrAffiliation,
      location,
      feePerAnnum: Number(feePerAnnum) || 0,
      establishedYear: Number(establishedYear) || new Date().getFullYear(),
      contactName: contactName || '',
      contactEmail,
      contactPhone,
      description: description || '',
      facilities: Array.isArray(facilities) ? facilities : [],
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    try {
      const db = await getMongoDb();
      await db.collection('school_registrations').insertOne(newReg);

      // Trigger institution confirmation and admin notification emails asynchronously
      sendFormNotifications(
        newReg.contactEmail,
        newReg.contactName,
        'Institution Registration Request',
        {
          institutionName: newReg.name,
          institutionType: newReg.type,
          categoryStream: newReg.category,
          boardOrAffiliation: newReg.boardOrAffiliation,
          locationSector: newReg.location,
          annualFees: `INR ${newReg.feePerAnnum.toLocaleString('en-IN')}`,
          establishedYear: String(newReg.establishedYear),
          contactPerson: newReg.contactName,
          contactEmail: newReg.contactEmail,
          contactPhone: newReg.contactPhone,
          facilities: newReg.facilities.join(', ') || 'None Listed',
          description: newReg.description
        }
      ).catch(() => console.error('School registration email notifications failed.'));

      res.status(201).json({ success: true });
    } catch {
      console.error('MongoDB school registration submission failed.');
      res.status(500).json({ error: 'Unable to submit the school registration.' });
    }
  });

  // API Route: Contact Us Form submissions
  app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields (name, email, phone, message) are required.' });
    }

    const newContact = {
      id: `cnt-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone,
      subject: subject || 'General Counseling',
      message,
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('contact_requests').insertOne(newContact);

      // Trigger user confirmation and admin notification emails asynchronously
      sendFormNotifications(
        newContact.email,
        newContact.name,
        'Central Contact Consultation Inquiry',
        {
          contactName: newContact.name,
          email: newContact.email,
          phone: newContact.phone,
          subjectMatter: newContact.subject,
          detailedMessage: newContact.message
        }
      ).catch(() => console.error('Contact email notifications failed.'));

      res.status(201).json({ success: true });
    } catch {
      console.error('MongoDB contact request submission failed.');
      res.status(500).json({ error: 'Unable to submit the contact request.' });
    }
  });

  // API Route: Careers applications
  app.post('/api/careers', async (req, res) => {
    const { name, email, phone, position, pitch } = req.body;

    if (!name || !email || !phone || !pitch) {
      return res.status(400).json({ error: 'All fields (name, email, phone, pitch) are required.' });
    }

    const newCareerApp = {
      id: `car-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone,
      position: position || 'counselor',
      pitch,
      createdAt: new Date().toISOString()
    };

    try {
      const db = await getMongoDb();
      await db.collection('career_applications').insertOne(newCareerApp);

      // Trigger user confirmation and admin notification emails asynchronously
      sendFormNotifications(
        newCareerApp.email,
        newCareerApp.name,
        'Career Job Application',
        {
          candidateName: newCareerApp.name,
          email: newCareerApp.email,
          phone: newCareerApp.phone,
          targetedPosition: newCareerApp.position,
          briefPitchOrResumeLink: newCareerApp.pitch
        }
      ).catch(() => console.error('Career email notifications failed.'));

      res.status(201).json({ success: true });
    } catch {
      console.error('MongoDB career application submission failed.');
      res.status(500).json({ error: 'Unable to submit the career application.' });
    }
  });

  // ==========================================
  // AUTHENTICATION & PROFILE MANAGEMENT ENDPOINTS
  // ==========================================

  const requireUserSession = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = readUserSessionCookie(req.headers.cookie);
    if (!token) {
      return res.status(401).json({ error: 'A valid user session is required.' });
    }

    try {
      const db = await getPersistentMongoDb();
      const session = await db.collection('user_sessions').findOne({
        tokenHash: hashSessionToken(token),
        expiresAt: { $gt: new Date() },
      });
      if (!session || typeof session.email !== 'string') {
        clearUserSessionCookie(res);
        return res.status(401).json({ error: 'User session is invalid or expired.' });
      }

      res.locals.authenticatedUserEmail = session.email;
      next();
    } catch {
      res.status(503).json({ error: 'User account storage is temporarily unavailable.' });
    }
  };

  const requireTrustedUserOrigin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!isAllowedFrontendOrigin(req.get('origin'))) {
      return res.status(403).json({ error: 'Request origin is not allowed.' });
    }
    next();
  };

  const toUserProfile = (user: any) => ({
    email: user.email,
    name: user.name,
    phone: user.phone,
    courseInterested: user.courseInterested,
    twelfthSubject: user.twelfthSubject,
    fatherName: user.fatherName || '',
    fatherEmail: user.fatherEmail || '',
    motherName: user.motherName || '',
    motherEmail: user.motherEmail || '',
    childName: user.childName || '',
    childMotherTongue: user.childMotherTongue || '',
    address: user.address || '',
    pincode: user.pincode || '',
    shortlistedIds: Array.isArray(user.shortlistedIds) ? user.shortlistedIds : [],
    cartIds: Array.isArray(user.cartIds) ? user.cartIds : [],
    createdAt: user.createdAt,
  });

  // 1. Send OTP via SMTP
  app.post('/api/auth/send-otp', requireTrustedUserOrigin, async (req, res) => {
    const { email } = req.body;
    if (typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const emailTrimmed = email.trim().toLowerCase();
    const otp = randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes expiration

    try {
      const db = await getPersistentMongoDb();
      await db.collection('otps').updateOne(
        { email: emailTrimmed },
        { $set: { email: emailTrimmed, otp, expiresAt } },
        { upsert: true }
      );
      const mailResult = await sendVerificationEmail(emailTrimmed, otp);
      if (!mailResult.success) {
        await db.collection('otps').deleteOne({ email: emailTrimmed });
        return res.status(502).json({ error: 'Unable to send the verification email.' });
      }
      res.json({
        success: true,
        message: 'OTP verification code sent.'
      });
    } catch {
      console.error('MongoDB OTP storage failed.');
      res.status(503).json({ error: 'Account storage is temporarily unavailable.' });
    }
  });

  // 2. Verify OTP & Register/Login User
  app.post('/api/auth/verify-otp', requireTrustedUserOrigin, async (req, res) => {
    const { email, otp, name, phone, courseInterested, twelfthSubject, address } = req.body;
    if (![email, otp, name, phone, courseInterested, twelfthSubject, address].every(
      (value) => typeof value === 'string' && value.trim()
    )) {
      return res.status(400).json({ error: 'All form fields and the OTP code are required.' });
    }

    const emailTrimmed = email.trim().toLowerCase();
    const otpStr = otp.trim();
    const profileDetails = {
      name: name.trim(),
      phone: phone.trim(),
      courseInterested: courseInterested.trim(),
      twelfthSubject: twelfthSubject.trim(),
      address: address.trim()
    };

    try {
      const db = await getPersistentMongoDb();
      const verified = await consumeIssuedOtp(db.collection('otps'), emailTrimmed, otpStr);
      if (!verified) {
        return res.status(400).json({ error: 'Invalid or expired OTP code.' });
      }

      const now = new Date().toISOString();
      await db.collection('users').updateOne(
        { email: emailTrimmed },
        {
          $set: profileDetails,
          $setOnInsert: {
            email: emailTrimmed,
            fatherName: '',
            fatherEmail: '',
            motherName: '',
            motherEmail: '',
            childName: '',
            childMotherTongue: '',
            pincode: '',
            shortlistedIds: [],
            cartIds: [],
            createdAt: now,
          },
        },
        { upsert: true },
      );
      const user = await db.collection('users').findOne({ email: emailTrimmed });
      if (!user) {
        return res.status(503).json({ error: 'Unable to load the user profile.' });
      }

      const sessionToken = randomBytes(32).toString('hex');
      await db.collection('user_sessions').insertOne({
        tokenHash: hashSessionToken(sessionToken),
        email: emailTrimmed,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + USER_SESSION_TTL_MS),
      });
      setUserSessionCookie(res, sessionToken);
      res.json({ success: true, user: toUserProfile(user) });
    } catch {
      console.error('MongoDB OTP verification failed.');
      res.status(503).json({ error: 'Unable to verify the code or save the user profile.' });
    }
  });

  app.get('/api/auth/session', requireUserSession, async (_req, res) => {
    try {
      const db = await getPersistentMongoDb();
      const user = await db.collection('users').findOne({ email: res.locals.authenticatedUserEmail });
      if (!user) return res.status(404).json({ error: 'User profile not found.' });
      res.json({ user: toUserProfile(user) });
    } catch {
      res.status(503).json({ error: 'Unable to load the user profile.' });
    }
  });

  app.post('/api/auth/logout', requireTrustedUserOrigin, requireUserSession, async (req, res) => {
    try {
      const token = readUserSessionCookie(req.headers.cookie);
      if (token) {
        const db = await getPersistentMongoDb();
        await db.collection('user_sessions').deleteOne({ tokenHash: hashSessionToken(token) });
      }
      clearUserSessionCookie(res);
      res.json({ success: true });
    } catch {
      res.status(503).json({ error: 'Unable to end the user session.' });
    }
  });

  app.use('/api/users', requireTrustedUserOrigin, requireUserSession);

  app.get('/api/users/profile/:email', async (req, res) => {
    const email = String(res.locals.authenticatedUserEmail);
    if (req.params.email.trim().toLowerCase() !== email) {
      return res.status(403).json({ error: 'You are not authorized to access this profile.' });
    }
    try {
      const db = await getPersistentMongoDb();
      const user = await db.collection('users').findOne({ email });
      if (!user) return res.status(404).json({ error: 'User profile not found.' });
      res.json({ user: toUserProfile(user) });
    } catch {
      res.status(503).json({ error: 'Unable to load the user profile.' });
    }
  });

  app.put('/api/users/profile/:email', async (req, res) => {
    const email = String(res.locals.authenticatedUserEmail);
    if (req.params.email.trim().toLowerCase() !== email) {
      return res.status(403).json({ error: 'You are not authorized to update this profile.' });
    }

    const editableFields = [
      'name', 'phone', 'courseInterested', 'twelfthSubject', 'fatherName',
      'fatherEmail', 'motherName', 'motherEmail', 'childName',
      'childMotherTongue', 'address', 'pincode',
    ];
    const updates: Record<string, string> = {};
    for (const field of editableFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        const value = req.body[field];
        if (typeof value !== 'string' || value.length > 500) {
          return res.status(400).json({ error: 'Invalid profile data.' });
        }
        updates[field] = value.trim();
      }
    }
    if (!Object.keys(updates).length) {
      return res.status(400).json({ error: 'No editable profile fields were provided.' });
    }

    try {
      const db = await getPersistentMongoDb();
      await db.collection('users').updateOne({ email }, { $set: updates });
      const user = await db.collection('users').findOne({ email });
      if (!user) return res.status(404).json({ error: 'User profile not found.' });
      res.json({ success: true, user: toUserProfile(user) });
    } catch {
      res.status(503).json({ error: 'Unable to save the user profile.' });
    }
  });

  app.delete('/api/users/profile/:email', async (req, res) => {
    const email = String(res.locals.authenticatedUserEmail);
    if (req.params.email.trim().toLowerCase() !== email) {
      return res.status(403).json({ error: 'You are not authorized to delete this profile.' });
    }
    try {
      const db = await getPersistentMongoDb();
      await db.collection('users').deleteOne({ email });
      await db.collection('user_sessions').deleteMany({ email });
      await db.collection('counseling_requests').deleteMany({ email });
      await db.collection('callback_requests').deleteMany({ email });
      clearUserSessionCookie(res);
      res.json({ success: true });
    } catch {
      res.status(503).json({ error: 'Unable to delete the user profile.' });
    }
  });

  app.post('/api/users/sync-history', async (req, res) => {
    const { shortlistedIds, cartIds } = req.body;
    const isValidIds = (ids: unknown) =>
      Array.isArray(ids)
      && ids.length <= 200
      && ids.every(id => typeof id === 'string' && id.length > 0 && id.length <= 128);
    if (!isValidIds(shortlistedIds) || !isValidIds(cartIds)) {
      return res.status(400).json({ error: 'Invalid saved-college data.' });
    }
    try {
      const db = await getPersistentMongoDb();
      await db.collection('users').updateOne(
        { email: res.locals.authenticatedUserEmail },
        { $set: { shortlistedIds: [...new Set(shortlistedIds)], cartIds: [...new Set(cartIds)] } },
      );
      res.json({ success: true });
    } catch {
      res.status(503).json({ error: 'Unable to save admission history.' });
    }
  });

  app.get('/api/users/history/:email', async (req, res) => {
    const email = String(res.locals.authenticatedUserEmail);
    if (req.params.email.trim().toLowerCase() !== email) {
      return res.status(403).json({ error: 'You are not authorized to access this history.' });
    }
    try {
      const db = await getPersistentMongoDb();
      const [counseling, callbacks] = await Promise.all([
        db.collection('counseling_requests').find({ email }).sort({ createdAt: -1 }).toArray(),
        db.collection('callback_requests').find({ email }).sort({ createdAt: -1 }).toArray(),
      ]);
      res.json({
        counseling: counseling.map((request: CounselingRequest) => ({
          id: request.id,
          studentClassOrDegree: request.studentClassOrDegree,
          preferredSlot: request.preferredSlot,
          date: request.date,
          query: request.query,
          status: request.status,
          createdAt: request.createdAt,
        })),
        callbacks: callbacks.map((request: CallbackRequest) => ({
          id: request.id,
          instituteId: request.instituteId,
          phone: request.phone,
          createdAt: request.createdAt,
        })),
      });
    } catch {
      res.status(503).json({ error: 'Unable to load account history.' });
    }
  });

  // ==========================================
  // COLLEGE PARTNER PORTAL ENDPOINTS
  // ==========================================

  // 1. College Partner Register
  app.post('/api/college-partner/register', async (req, res) => {
    const {
      name,
      category,
      boardOrAffiliation,
      affiliationType,
      affiliationPrivateName,
      approvals,
      courses,
      location,
      feePerAnnum,
      establishedYear,
      brochureUrl,
      brochureFileName,
      achievements,
      highestPackage,
      lowestPackage,
      visionMission,
      contactName,
      contactEmail,
      contactPhone,
      description,
      facilities,
      website,
      instagram,
      campusPhoto,
      address
    } = req.body;

    if (!name || !contactEmail || !contactPhone) {
      return res.status(400).json({ error: 'College Name, Contact Email, and Contact Phone are required.' });
    }

    const emailTrimmed = contactEmail.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      // Check if already registered
      const existing = await db.collection('college_registrations').findOne({ contactEmail: emailTrimmed });
      if (existing) {
        return res.status(400).json({ error: 'A college is already registered with this official email.' });
      }

      // Compute affiliation display string
      const computedAffiliation = affiliationType === 'Private' 
        ? (affiliationPrivateName ? `Private (${affiliationPrivateName})` : 'Private')
        : (affiliationType || boardOrAffiliation || 'DAVV');

      const id = `cp-${Date.now()}`;
      const newPartner = {
        id,
        name,
        category: category || 'Engineering',
        boardOrAffiliation: computedAffiliation,
        affiliationType: affiliationType || 'DAVV',
        affiliationPrivateName: affiliationPrivateName || '',
        approvals: Array.isArray(approvals) ? approvals : [],
        courses: Array.isArray(courses) ? courses : [],
        location: location ? String(location).trim() : 'Indore',
        feePerAnnum: Number(feePerAnnum) || 0,
        establishedYear: Number(establishedYear) || new Date().getFullYear(),
        brochureUrl: brochureUrl || '',
        brochureFileName: brochureFileName || '',
        achievements: achievements || '',
        highestPackage: highestPackage || '',
        lowestPackage: lowestPackage || '',
        visionMission: visionMission || description || '',
        contactName: contactName || name,
        contactEmail: emailTrimmed,
        contactPhone,
        description: visionMission || description || '',
        facilities: Array.isArray(facilities) ? facilities : [],
        website: website || '',
        instagram: instagram || '',
        campusPhoto: campusPhoto || '',
        address: address || location || '',
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await db.collection('college_registrations').insertOne(newPartner);
      res.status(201).json({ success: true });
    } catch (err: any) {
      console.error('College partner registration failed.');
      res.status(500).json({ error: 'Unable to submit the college registration.' });
    }
  });

  // Partner account access remains disabled until server-verified ownership is implemented.
  app.post('/api/college-partner/login', async (req, res) => {
    return res.status(503).json({ error: 'Partner account access is temporarily unavailable.' });
  });

  app.use('/api/college-partner', (_req, res) =>
    res.status(401).json({ error: 'Authenticated partner access is unavailable.' }),
  );

  // 3. College Partner Request Update Info (Sent to Admin for approval before publishing)
  app.put('/api/college-partner/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };
    const updateNotes = updateData.updateNotes || 'Profile details updated from College Partner Dashboard.';

    delete updateData._id;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.status; // Prevent colleges from auto-approving themselves
    delete updateData.updateNotes;
    delete updateData.pendingUpdate;

    try {
      const db = await getMongoDb();
      const existingCollege = await db.collection('college_registrations').findOne({ id });
      if (!existingCollege) {
        return res.status(404).json({ error: 'College not found.' });
      }

      if (existingCollege.status !== 'approved') {
        return res.status(400).json({ 
          error: 'Your college registration is currently pending admin approval. You will be able to update and submit details once your college has been approved and published by the administrator.' 
        });
      }

      const requestId = `cur-${Date.now()}`;
      const requestedChanges: any = {
        name: updateData.name ?? existingCollege.name,
        category: updateData.category ?? existingCollege.category,
        boardOrAffiliation: updateData.boardOrAffiliation ?? existingCollege.boardOrAffiliation,
        affiliationType: updateData.affiliationType ?? existingCollege.affiliationType,
        affiliationPrivateName: updateData.affiliationPrivateName ?? existingCollege.affiliationPrivateName,
        approvals: updateData.approvals ?? existingCollege.approvals,
        courses: updateData.courses ?? existingCollege.courses,
        location: updateData.location ?? existingCollege.location,
        feePerAnnum: updateData.feePerAnnum !== undefined ? Number(updateData.feePerAnnum) : existingCollege.feePerAnnum,
        establishedYear: updateData.establishedYear !== undefined ? Number(updateData.establishedYear) : existingCollege.establishedYear,
        brochureUrl: updateData.brochureUrl ?? existingCollege.brochureUrl,
        brochureFileName: updateData.brochureFileName ?? existingCollege.brochureFileName,
        achievements: updateData.achievements ?? existingCollege.achievements,
        highestPackage: updateData.highestPackage ?? existingCollege.highestPackage,
        lowestPackage: updateData.lowestPackage ?? existingCollege.lowestPackage,
        visionMission: updateData.visionMission ?? existingCollege.visionMission,
        description: updateData.visionMission ?? updateData.description ?? existingCollege.description,
        facilities: Array.isArray(updateData.facilities) ? updateData.facilities : existingCollege.facilities,
        website: updateData.website ?? existingCollege.website,
        instagram: updateData.instagram ?? existingCollege.instagram,
        campusPhoto: updateData.campusPhoto ?? existingCollege.campusPhoto,
        address: updateData.address ?? existingCollege.address,
        contactName: updateData.contactName ?? existingCollege.contactName,
        contactPhone: updateData.contactPhone ?? existingCollege.contactPhone
      };

      const currentData: any = {
        name: existingCollege.name,
        category: existingCollege.category,
        boardOrAffiliation: existingCollege.boardOrAffiliation,
        affiliationType: existingCollege.affiliationType,
        affiliationPrivateName: existingCollege.affiliationPrivateName,
        approvals: existingCollege.approvals,
        courses: existingCollege.courses,
        location: existingCollege.location,
        feePerAnnum: existingCollege.feePerAnnum,
        establishedYear: existingCollege.establishedYear,
        brochureUrl: existingCollege.brochureUrl,
        brochureFileName: existingCollege.brochureFileName,
        achievements: existingCollege.achievements,
        highestPackage: existingCollege.highestPackage,
        lowestPackage: existingCollege.lowestPackage,
        visionMission: existingCollege.visionMission,
        description: existingCollege.description,
        facilities: existingCollege.facilities,
        website: existingCollege.website,
        instagram: existingCollege.instagram,
        campusPhoto: existingCollege.campusPhoto,
        address: existingCollege.address,
        contactName: existingCollege.contactName,
        contactPhone: existingCollege.contactPhone
      };

      const updateRequest: CollegeUpdateRequest = {
        id: requestId,
        collegeId: id,
        collegeName: requestedChanges.name || existingCollege.name,
        contactName: existingCollege.contactName,
        contactEmail: existingCollege.contactEmail,
        contactPhone: requestedChanges.contactPhone || existingCollege.contactPhone,
        updateNotes,
        currentData,
        requestedChanges,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Store in update requests collection for Admin review
      await db.collection('college_update_requests').insertOne(updateRequest);

      // Attach pendingUpdate to the college document so the college representative sees it in their dashboard
      await db.collection('college_registrations').updateOne(
        { id },
        { $set: { pendingUpdate: updateRequest, updatedAt: new Date().toISOString() } }
      );

      const refreshed = await db.collection('college_registrations').findOne({ id });

      res.json({ 
        success: true, 
        message: 'Your college update request has been successfully submitted to the Admin! Once the admin reviews and approves your request, your changes will be published live.',
        college: refreshed,
        updateRequest 
      });
    } catch (err: any) {
      console.error("College Partner update error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // Direct College Update Request (From College detail page or non-logged-in college admin)
  app.post('/api/college-partner/request-update', async (req, res) => {
    const { collegeId, collegeName, contactName, contactEmail, contactPhone, updateNotes, requestedChanges } = req.body;
    if (!collegeId || !contactEmail || !requestedChanges) {
      return res.status(400).json({ error: 'College ID, Contact Email, and proposed changes are required.' });
    }

    try {
      const db = await getMongoDb();
      let currentData: any = {};
      const existingInDb = await db.collection('college_registrations').findOne({ id: collegeId });
      if (existingInDb) {
        currentData = { ...existingInDb };
      } else {
        const foundInStatic = INDORE_INSTITUTES.find(i => i.id === collegeId);
        if (foundInStatic) {
          currentData = { ...foundInStatic };
        }
      }

      const requestId = `cur-${Date.now()}`;
      const updateRequest: CollegeUpdateRequest = {
        id: requestId,
        collegeId,
        collegeName: collegeName || currentData.name || 'Indore College',
        contactName: contactName || currentData.contactName || 'College Representative',
        contactEmail: contactEmail.trim().toLowerCase(),
        contactPhone: contactPhone || currentData.contactPhone || '',
        updateNotes: updateNotes || 'Direct college update request submitted to admin.',
        currentData: {
          name: currentData.name,
          category: currentData.category,
          boardOrAffiliation: currentData.boardOrAffiliation,
          location: currentData.location,
          feePerAnnum: currentData.feePerAnnum,
          establishedYear: currentData.establishedYear,
          description: currentData.description,
          facilities: currentData.facilities,
          website: currentData.website,
          address: currentData.address,
          contactPhone: currentData.contactPhone
        },
        requestedChanges,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await db.collection('college_update_requests').insertOne(updateRequest);

      if (existingInDb) {
        await db.collection('college_registrations').updateOne(
          { id: collegeId },
          { $set: { pendingUpdate: updateRequest, updatedAt: new Date().toISOString() } }
        );
      }

      res.status(201).json({
        success: true,
        message: 'Your college update request has been successfully submitted to the Admin for approval! Once approved, your updated info will be published live.',
        requestId,
        updateRequest
      });
    } catch (err: any) {
      console.error("Direct college update request error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // Get Update Requests for a College
  app.get('/api/college-partner/my-update-requests/:collegeId', async (req, res) => {
    const { collegeId } = req.params;
    try {
      const db = await getMongoDb();
      const list = await db.collection('college_update_requests').find({ collegeId }).sort({ createdAt: -1 }).toArray();
      res.json(list);
    } catch (err: any) {
      console.error("Fetch college update requests error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 4. College Partner Delete Info
  app.delete('/api/college-partner/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const db = await getMongoDb();
      await db.collection('college_registrations').deleteOne({ id });
      await db.collection('college_update_requests').deleteMany({ collegeId: id });
      res.json({ success: true, message: 'Your college registration has been deleted.' });
    } catch (err: any) {
      console.error("College Partner delete error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // 5. Get My College Partner Registration Info
  app.get('/api/college-partner/my-registration/:email', async (req, res) => {
    const { email } = req.params;
    const emailTrimmed = email.trim().toLowerCase();

    try {
      const db = await getMongoDb();
      const college = await db.collection('college_registrations').findOne({ contactEmail: emailTrimmed });
      if (!college) {
        return res.status(404).json({ error: 'No college registration found for this email.' });
      }
      res.json(college);
    } catch (err: any) {
      console.error("Get my registration error:", err);
      res.status(500).json({ error: err.message || "Database connection error" });
    }
  });

  // ==========================================
  // ADMIN PANEL ENDPOINTS
  // ==========================================

  // 1. Admin Login
  app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const emailTrimmed = email.trim().toLowerCase();
    const envAdminEmail = (process.env.ADMIN_EMAIL || 'admin@indorecolleges.org').trim().toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD;
    const passwordFingerprint = getAdminPasswordFingerprint(envAdminPassword);

    if (!passwordFingerprint) {
      return res.status(503).json({ error: 'Admin authentication is not configured.' });
    }

    if (emailTrimmed === envAdminEmail && password === envAdminPassword) {
      const token = randomBytes(32).toString('hex');
      adminSessionTokens.issue(token, Date.now() + ADMIN_SESSION_TTL_MS, passwordFingerprint);
      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: 'Invalid admin credentials.' });
    }
  });

  app.get('/api/admin/session', (req, res) => {
    if (!isAdminSession(req.headers.authorization)) {
      return res.status(401).json({ error: 'Admin session is invalid or expired.' });
    }
    res.json({ success: true });
  });

  app.post('/api/admin/logout', (req, res) => {
    const token = req.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!token || !isAdminSession(req.headers.authorization)) {
      return res.status(401).json({ error: 'Admin session is invalid or expired.' });
    }
    adminSessionTokens.revoke(token);
    res.json({ success: true });
  });

  app.use('/api/admin', (req, res, next) => {
    if (!isAdminSession(req.headers.authorization)) {
      return res.status(401).json({ error: 'A valid admin session is required.' });
    }
    next();
  });

  // 2. Admin Get All College Partner Registrations
  app.get('/api/admin/all-registrations', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('college_registrations').find().sort({ createdAt: -1 }).toArray();
      res.json(stripCredentials(list));
    } catch (err: any) {
      console.error('Admin fetch registrations failed.');
      res.status(500).json({ error: 'Unable to load college registrations.' });
    }
  });

  app.delete('/api/admin/registrations/:id', async (req, res) => {
    try {
      const db = await getMongoDb();
      const result = await db.collection('college_registrations').deleteOne({ id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'College registration not found.' });
      }
      res.json({ success: true });
    } catch (err: any) {
      console.error('Admin delete registration failed.');
      res.status(500).json({ error: 'Unable to delete the college registration.' });
    }
  });

  // 3. Admin Update Partner Status (Approve / Reject)
  app.put('/api/admin/registration-status/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected' or 'pending'

    if (status !== 'approved' && status !== 'rejected' && status !== 'pending') {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    try {
      const db = await getMongoDb();
      await db.collection('college_registrations').updateOne(
        { id },
        { $set: { status } }
      );
      
      const college = await db.collection('college_registrations').findOne({ id });
      if (college && status === 'approved') {
        // Send email notification upon acceptance!
        sendCollegeAcceptanceEmail(college.contactEmail, college.name).catch(e => {
          console.error("Failed to send acceptance email:", e);
        });
      }

      res.json({ success: true, college: stripCredentials(college) });
    } catch (err: any) {
      console.error('Admin update registration status failed.');
      res.status(500).json({ error: 'Unable to update the college registration.' });
    }
  });

  // Admin Get All College Update Requests
  app.get('/api/admin/update-requests', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('college_update_requests').find().sort({ createdAt: -1 }).toArray();
      res.json(stripCredentials(list));
    } catch (err: any) {
      console.error('Admin fetch update requests failed.');
      res.status(500).json({ error: 'Unable to load college update requests.' });
    }
  });

  // Admin Approve or Reject College Update Request (Publishes changes upon approval)
  app.put('/api/admin/update-requests/:requestId', async (req, res) => {
    const { requestId } = req.params;
    const { action, adminRemarks } = req.body; // 'approve' | 'reject'

    if (action !== 'approve' && action !== 'reject') {
      return res.status(400).json({ error: 'Action must be "approve" or "reject".' });
    }

    try {
      const db = await getMongoDb();
      const requestDoc = await db.collection('college_update_requests').findOne({ id: requestId });
      if (!requestDoc) {
        return res.status(404).json({ error: 'Update request not found.' });
      }

      if (action === 'approve') {
        const changes = requestDoc.requestedChanges || {};
        const targetId = requestDoc.collegeId;

        // Check if existing registration exists
        const existingCollege = await db.collection('college_registrations').findOne({ id: targetId });

        const updatedFields: any = {
          ...changes,
          status: 'approved', // Live & published!
          pendingUpdate: null,
          lastApprovedAt: new Date().toISOString()
        };

        if (existingCollege) {
          await db.collection('college_registrations').updateOne(
            { id: targetId },
            { $set: updatedFields }
          );
        } else {
          // If it was an existing institute from static list, create a partner record with approved status to publish overrides
          const staticInst = INDORE_INSTITUTES.find(i => i.id === targetId);
          const newDoc = {
            id: targetId,
            name: changes.name || staticInst?.name || requestDoc.collegeName,
            category: changes.category || staticInst?.category || 'Engineering',
            boardOrAffiliation: changes.boardOrAffiliation || staticInst?.boardOrAffiliation || 'UGC',
            location: changes.location || staticInst?.location || 'Vijay Nagar',
            feePerAnnum: changes.feePerAnnum !== undefined ? Number(changes.feePerAnnum) : (staticInst?.feePerAnnum || 0),
            establishedYear: changes.establishedYear !== undefined ? Number(changes.establishedYear) : (staticInst?.establishedYear || 2000),
            contactName: requestDoc.contactName,
            contactEmail: requestDoc.contactEmail,
            contactPhone: changes.contactPhone || requestDoc.contactPhone,
            description: changes.description || staticInst?.description || '',
            facilities: changes.facilities || staticInst?.facilities || [],
            website: changes.website || staticInst?.website || '',
            address: changes.address || staticInst?.address || '',
            status: 'approved',
            pendingUpdate: null,
            createdAt: new Date().toISOString(),
            lastApprovedAt: new Date().toISOString()
          };
          await db.collection('college_registrations').insertOne(newDoc);
        }

        // Update the request doc
        await db.collection('college_update_requests').updateOne(
          { id: requestId },
          { 
            $set: { 
              status: 'approved', 
              adminRemarks: adminRemarks || 'Approved and published live by Administrator', 
              reviewedAt: new Date().toISOString() 
            } 
          }
        );

        // Send approval email notification
        const changedKeys = Object.keys(changes);
        sendCollegeUpdateApprovedEmail(requestDoc.contactEmail, requestDoc.collegeName, changedKeys).catch(e => {
          console.error("Failed to send update approval email:", e);
        });

        res.json({ 
          success: true, 
          message: `College "${requestDoc.collegeName}" updates approved and published to live directory!`,
          requestId,
          status: 'approved'
        });
      } else {
        // Rejection branch
        await db.collection('college_update_requests').updateOne(
          { id: requestId },
          { 
            $set: { 
              status: 'rejected', 
              adminRemarks: adminRemarks || 'Request rejected by Administrator', 
              reviewedAt: new Date().toISOString() 
            } 
          }
        );

        // Clear pendingUpdate from college document
        await db.collection('college_registrations').updateOne(
          { id: requestDoc.collegeId },
          { $set: { pendingUpdate: null } }
        );

        res.json({
          success: true,
          message: `Update request for "${requestDoc.collegeName}" has been rejected.`,
          requestId,
          status: 'rejected'
        });
      }
    } catch (err: any) {
      console.error('Admin update request action failed.');
      res.status(500).json({ error: 'Unable to process the college update request.' });
    }
  });

  // 4. Admin Get All Counselling Leads
  app.get('/api/admin/counseling-leads', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('counseling_requests').find().sort({ createdAt: -1 }).toArray();
      res.json(stripCredentials(list));
    } catch (err: any) {
      console.error('Admin fetch counseling requests failed.');
      res.status(500).json({ error: 'Unable to load counseling requests.' });
    }
  });

  app.delete('/api/admin/counseling-leads/:id', async (req, res) => {
    try {
      const db = await getMongoDb();
      const result = await db.collection('counseling_requests').deleteOne({ id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Counselling lead not found.' });
      }
      res.json({ success: true });
    } catch (err: any) {
      console.error('Admin delete counseling request failed.');
      res.status(500).json({ error: 'Unable to delete the counseling request.' });
    }
  });

  // 5. Admin Get All Callback Leads
  app.get('/api/admin/callback-leads', async (req, res) => {
    try {
      const db = await getMongoDb();
      const list = await db.collection('callback_requests').find().sort({ createdAt: -1 }).toArray();
      res.json(stripCredentials(list));
    } catch (err: any) {
      console.error('Admin fetch callback requests failed.');
      res.status(500).json({ error: 'Unable to load callback requests.' });
    }
  });

  app.delete('/api/admin/callback-leads/:id', async (req, res) => {
    try {
      const db = await getMongoDb();
      const result = await db.collection('callback_requests').deleteOne({ id: req.params.id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Callback lead not found.' });
      }
      res.json({ success: true });
    } catch (err: any) {
      console.error('Admin delete callback request failed.');
      res.status(500).json({ error: 'Unable to delete the callback request.' });
    }
  });

  // 6. Admin Get All User Profiles
  app.get('/api/admin/user-profiles', async (req, res) => {
    try {
      const db = await getPersistentMongoDb();
      const list = await db.collection('users').find().sort({ createdAt: -1 }).toArray();
      res.json(list.map(user => stripCredentials({
        email: user.email,
        name: user.name,
        phone: user.phone,
        courseInterested: user.courseInterested,
        twelfthSubject: user.twelfthSubject,
        address: user.address,
        pincode: user.pincode,
        fatherName: user.fatherName,
        fatherEmail: user.fatherEmail,
        motherName: user.motherName,
        motherEmail: user.motherEmail,
        childName: user.childName,
        childMotherTongue: user.childMotherTongue,
        shortlistedIds: user.shortlistedIds,
        cartIds: user.cartIds,
        createdAt: user.createdAt,
      })));
    } catch (err: any) {
      console.error('Admin fetch user profiles failed.');
      res.status(503).json({ error: 'Unable to load user profiles from persistent storage.' });
    }
  });

  app.delete('/api/admin/user-profiles/:email', async (req, res) => {
    try {
      const email = req.params.email.trim().toLowerCase();
      const db = await getPersistentMongoDb();
      const result = await db.collection('users').deleteOne({ email });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'User profile not found.' });
      }
      await db.collection('counseling_requests').deleteMany({ email });
      await db.collection('callback_requests').deleteMany({ email });
      await db.collection('user_sessions').deleteMany({ email });
      res.json({ success: true });
    } catch (err: any) {
      console.error('Admin delete user profile failed.');
      res.status(500).json({ error: 'Unable to delete the user profile.' });
    }
  });

  // API Route: AI Counselor Chatbot ORB
  app.post('/api/orb-chat', async (req, res) => {
    const { messages } = req.body; // Array of ChatMessage
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required.' });
    }

    const latestUserMessage = messages[messages.length - 1].text;

    // Build static educational context for Indore to guide Gemini
    const context = `
You are "ORB", the official EduPath Academic Counselor and Advisor for Indore. Your primary duty is helping parents, students, and educators search, analyze, and select the finest schools and colleges *strictly located within Indore, Madhya Pradesh*.

Indore Educational Directory Context:
${JSON.stringify(INDORE_INSTITUTES, null, 2)}

Instructions:
1. Always maintain a warm, highly encouraging, empathetic, and professional counselor tone.
2. Provide precise, actionable advice on the institutions listed above based on user interests (e.g. fees, boarding vs day, engineering vs medical vs management).
3. Ground your counseling STRICTLY to schools/colleges in Indore. If the user asks about other cities, politely explain: "As the official EduPath Counselor, my expertise is focused exclusively on help and admissions for schools and colleges located inside Indore. I will gladly guide you to the excellent options we have right here in Indore!"
4. Talk about actual locations like Bypass Road, Vijay Nagar, Simrol, Manik Bagh, or Sanwer Road when making suggestions.
5. If parents ask about scheduling, kindly prompt them to use the "Schedule Counselling" sidebar or form available on our homepage to talk to a human expert.
`;

    // Simulate response if Gemini is not configured, to keep app fully robust and delightful
    if (!ai) {
      let mockReply = '';
      const queryLower = latestUserMessage.toLowerCase();
      if (queryLower.includes('daly') || queryLower.includes('boarding')) {
        mockReply = `**The Daly College** is an outstanding CBSE boarding school located in the Residency Area of Indore. It was established in 1870 and offers excellent equestrian, swimming, and academic facilities. The approximate fee is ₹4,50,000 per annum. Would you like me to guide you on scheduling a counselling meeting for Daly College?`;
      } else if (queryLower.includes('iit') || queryLower.includes('engineering') || queryLower.includes('sgsits')) {
        mockReply = `Indore is home to world-class engineering institutions! For premier national-level education, we have **IIT Indore** in Simrol. If you are looking for state-level options, **SGSITS** in Vallabh Nagar is highly coveted. Private options like **Acropolis Institute** on Bypass Road are also excellent. What specific branch of engineering are you interested in?`;
      } else if (queryLower.includes('school') || queryLower.includes('shishukunj') || queryLower.includes('emerald')) {
        mockReply = `Indore has premium schools. For co-ed day schooling, **The Shishukunj International School** in Jhalaria and **Choithram School** in Manik Bagh are stellar options. For boarding, **The Emerald Heights International School** and **Daly College** are globally ranked. Let me know your preference regarding Day School or Boarding!`;
      } else if (queryLower.includes('college') || queryLower.includes('mba') || queryLower.includes('iim')) {
        mockReply = `For management, **IIM Indore** in Rau is a triple-accredited masterpiece offering the Integrated Program in Management (IPM). For versatile courses, **DAVV (Devi Ahilya Vishwavidyalaya)** at Takshashila Campus is a superb state university. Let me know what specific degree you are seeking!`;
      } else {
        mockReply = `Hello! I am **ORB**, your EduPath counseling assistant for Indore. I am here to help you navigate schools like *Daly College*, *Shishukunj*, and *Emerald Heights*, or elite colleges like *IIT Indore*, *IIM Indore*, and *SGSITS*. What level of study (schooling or college) are you planning for?`;
      }

      // Small network delay simulation
      await new Promise(resolve => setTimeout(resolve, 600));
      return res.json({ text: mockReply });
    }

    try {
      // Map chat history to Gemini SDK format
      const contents = messages.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          systemInstruction: context,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "I apologize, but I could not formulate a response. Please try again." });
    } catch (err: any) {
      console.error("Gemini API Error in Server: ", err);
      res.status(500).json({ error: "Gemini server error: " + err.message });
    }
  });

  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found.' });
  });

  // Vite development vs production asset delivery
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const notFoundPath = path.join(distPath, '404.html');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
    }
    app.use((_req, res) => {
      if (fs.existsSync(notFoundPath)) {
        return res.status(404).sendFile(notFoundPath);
      }
      return res.status(404).type('text/plain').send('Not Found');
    });
  }

  app.use((err: unknown, _req, res, next) => {
    if (typeof err === 'object' && err !== null && 'type' in err) {
      if (err.type === 'entity.too.large') {
        return res.status(413).json({
          error: 'Request body is too large. Upload files no larger than 4 MB each or provide links instead.'
        });
      }

      if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Request body contains invalid JSON.' });
      }
    }

    next(err);
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduPath server is listening on port ${PORT}`);
  });
}

startServer();
