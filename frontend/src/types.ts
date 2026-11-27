
export interface Institute {
  id: string;
  name: string;
  type: 'school' | 'college';
  category: string; // "Boarding" | "Day School" | "Engineering" | "Management" | "Medical" | "Arts & Science"
  boardOrAffiliation: string; // "CBSE" | "ICSE" | "CIE" | "State Board" | "UGC" | "AICTE" | "Autonomous"
  location: string; // e.g. "Residency Area", "Simrol", "Bypass Road", "Vijay Nagar", "Rau", "Sanwer Road", "Manik Bagh"
  feePerAnnum: number; // in INR
  rating: number;
  googleRating?: number;
  indoreRating?: number;
  ratingSource?: string;
  ratingReviewCount?: number;
  totalReviews: number;
  image: string;
  videoUrl?: string;
  backgroundVideoUrl?: string;
  expertReviewVideoUrl?: string;
  description: string;
  facilities: string[];
  establishedYear: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  address?: string;
  nearestAirport?: string;
  approval?: string;
  affiliations?: string[];
  regulatoryApprovals?: string[];
  accreditations?: string[];
  selectionCriteria?: string;
  updates?: string[];
  brochureUrl?: string;
  brochureFileName?: string;
  highestPackage?: string;
  lowestPackage?: string;
  visionMission?: string;
  achievements?: string;
  campusPhoto?: string;
  facilityImages?: Record<string, string>;
  instagram?: string;
  approvals?: string[];
  affiliationType?: string;
  affiliationPrivateName?: string;
  isPartnerRegistered?: boolean;
  status?: string;
  isDirectoryVerified?: boolean;
  courses?: string[];
  coursesList?: {
    name: string;
    duration?: string;
    fees?: string;
    academicYear?: string;
    programmeLevel?: 'UG' | 'PG';
    sourceUrl?: string;
    sourceStatus?: 'verified' | 'pending-direct-source';
    feeHistory?: {
      fee: string;
      description: string;
      academicYear: string;
      sourceUrl?: string;
      sourceStatus?: 'verified' | 'pending-direct-source';
    }[];
    specializations?: string[];
  }[];
  placements?: {
    highest: string;
    average?: string;
    lowest?: string;
    recruiters: string[];
    metrics?: PlacementMetric[];
  };
  facultyList?: {
    name: string;
    qualification: string;
    role?: string;
  }[];
  scholarships?: {
    name: string;
    criteria?: string;
    benefits?: string;
  }[];
  cutoffs?: {
    course: string;
    rank: string;
  }[];
}

export interface PlacementMetric {
  type: 'highest' | 'median' | 'average';
  value: string;
  academicYear?: string;
  academicYearStatus?: 'pending-verification';
  programme?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  sourceStatus?: 'verified' | 'pending-direct-source';
}

export interface SearchFilters {
  searchQuery: string;
  type: 'all' | 'school' | 'college';
  category: string; // "All" or specific category
  boardOrAffiliation: string; // "All" or specific board
  location: string; // "All" or specific location
  maxFee: number;
}

export interface CounselingRequest {
  id: string;
  parentName: string;
  studentName?: string;
  studentClassOrDegree: string; // e.g. "Class 9", "B.Tech", "MBA"
  phone: string;
  email?: string;
  preferredSlot: string; // "Morning (9 AM - 12 PM)" | "Afternoon (12 PM - 4 PM)" | "Evening (4 PM - 7 PM)"
  date: string;
  query?: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export interface CallbackRequest {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  instituteId?: string; // Optional reference to a specific school/college
  email?: string; // Optional reference to verified user email
  createdAt: string;
}

export interface Review {
  id: string;
  instituteId: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SchoolRegistrationRequest {
  id: string;
  name: string;
  targetColleges?: string[];
  course?: string;
  branch?: string;
  budget?: string;
  type: 'school' | 'college';
  category: string;
  boardOrAffiliation: string;
  location: string;
  feePerAnnum: number;
  establishedYear: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  facilities: string[];
  createdAt: string;
  status: 'pending' | 'approved';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'orb';
  text: string;
  createdAt: string;
}

export interface UserProfile {
  email: string;
  name: string;
  phone?: string;
  courseInterested?: string;
  twelfthSubject?: string;
  fatherName?: string;
  fatherEmail?: string;
  motherName?: string;
  motherEmail?: string;
  childName?: string;
  childMotherTongue?: string;
  address?: string;
  pincode?: string;
  shortlistedIds?: string[];
  cartIds?: string[];
  createdAt: string;
}

export interface CollegeUpdateRequest {
  id: string;
  collegeId: string;
  collegeName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  updateNotes?: string;
  currentData: {
    name?: string;
    category?: string;
    boardOrAffiliation?: string;
    location?: string;
    feePerAnnum?: number;
    establishedYear?: number;
    description?: string;
    facilities?: string[];
    website?: string;
    address?: string;
    contactPhone?: string;
  };
  requestedChanges: {
    name?: string;
    category?: string;
    boardOrAffiliation?: string;
    location?: string;
    feePerAnnum?: number;
    establishedYear?: number;
    description?: string;
    facilities?: string[];
    website?: string;
    address?: string;
    contactPhone?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  adminRemarks?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface PartnerCollege {
  id: string;
  name: string;
  category: string;
  boardOrAffiliation: string;
  affiliationType?: string;
  affiliationPrivateName?: string;
  location: string;
  feePerAnnum: number;
  establishedYear: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
  facilities: string[];
  website?: string;
  instagram?: string;
  address?: string;
  courses?: string[];
  approvals?: string[];
  brochureUrl?: string;
  brochureFileName?: string;
  achievements?: string;
  highestPackage?: string;
  lowestPackage?: string;
  visionMission?: string;
  campusPhoto?: string;
  videoUrl?: string;
  backgroundVideoUrl?: string;
  expertReviewVideoUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  pendingUpdate?: CollegeUpdateRequest | null;
  createdAt: string;
  updatedAt?: string;
  lastApprovedAt?: string;
}
