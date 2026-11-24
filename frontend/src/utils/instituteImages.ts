import { Institute } from '../types';
import { INDORE_INSTITUTES } from '../data/indoreData';

const repositoryInstitutesById = new Map<string, Institute>();
for (const institute of INDORE_INSTITUTES) {
  repositoryInstitutesById.set(institute.id, institute);
}

export function preserveRepositoryInstituteImages(institutes: Institute[]): Institute[] {
  return institutes.map(institute => {
    const repositoryInstitute = repositoryInstitutesById.get(institute.id);
    if (!repositoryInstitute) return institute;

    return {
      ...institute,
      image: repositoryInstitute.image,
      campusPhoto: repositoryInstitute.campusPhoto,
      facilityImages: repositoryInstitute.facilityImages,
    };
  });
}
