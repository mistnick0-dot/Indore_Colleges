import assert from 'node:assert/strict';
import {test} from 'node:test';
import {INDORE_INSTITUTES} from '../frontend/src/data/indoreData.ts';
import {preserveRepositoryInstituteImages} from '../frontend/src/utils/instituteImages.ts';

test('repository image mappings override stale API image paths for college profiles', () => {
  const ids = [
    'skitm-indore',
    'ips-engineering',
    'lncts-indore',
    'piemr-indore',
    'symbiosis-university',
  ];
  const apiInstitutes = ids.map(id => {
    const repositoryInstitute = INDORE_INSTITUTES.find(institute => institute.id === id);
    assert.ok(repositoryInstitute, `Missing repository institute ${id}`);
    return {
      ...repositoryInstitute,
      image: `/legacy/${id}.jpg`,
      campusPhoto: `/legacy/${id}-campus.jpg`,
      facilityImages: {'Library': `/legacy/${id}-library.jpg`},
      rating: 4.7,
    };
  });

  const mergedInstitutes = preserveRepositoryInstituteImages(apiInstitutes);

  for (const [index, id] of ids.entries()) {
    const repositoryInstitute = INDORE_INSTITUTES.find(institute => institute.id === id);
    const mergedInstitute = mergedInstitutes[index];
    assert.equal(mergedInstitute.image, repositoryInstitute.image);
    assert.equal(mergedInstitute.campusPhoto, repositoryInstitute.campusPhoto);
    assert.deepEqual(mergedInstitute.facilityImages, repositoryInstitute.facilityImages);
    assert.equal(mergedInstitute.rating, 4.7);
  }
});

test('API image data for institutes without repository records stays unchanged', () => {
  const partnerInstitute = {
    ...INDORE_INSTITUTES[0],
    id: 'api-only-partner',
    image: '/partner-campus.jpg',
  };

  assert.equal(preserveRepositoryInstituteImages([partnerInstitute])[0], partnerInstitute);
});
