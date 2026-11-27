import { Institute } from '../types';

export const INDORE_INSTITUTES: Institute[] = [
  {
    id: 'malwa-group-of-institutes',
    name: 'Malwa Group of Institutes',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Limbodi',
    feePerAnnum: 75000,
    rating: 3.8,
    googleRating: 3.8,
    indoreRating: 3.9,
    totalReviews: 24,
    image: '/malwa_institute_campus.jpg',
    videoUrl: '/malwa-institute-campus.mp4',
    backgroundVideoUrl: '/malwa-institute-campus.mp4',
    description: 'Malwa Institute of Science and Technology (MIST Indore) is a premier engineering and business administration institute offering Undergraduate, Postgraduate, and Diploma courses in various specializations. Possessing world-class in-house facilities like massive auditoriums, an amphitheater, and its own fleet of free buses, the college grooms students to match modern corporate cultures.',
    facilities: ['Library', 'Laboratory', 'Cafeteria', 'Sports Arena', 'Auditorium', 'Advanced Computer Labs', 'Modern Classrooms'],
    facilityImages: {
      'Library': '/college-images/MGI/mgi-library.webp',
      'Laboratory': '/college-images/MGI/mgi-laboratories.webp',
      'Cafeteria': '/college-images/MGI/mgi-Cafeteria.webp',
      'Sports Arena': '/college-images/MGI/mgi-Sports-Arena.webp',
      'Auditorium': '/college-images/MGI/mgi-Auditorium.webp',
      'Advanced Computer Labs': '/college-images/MGI/mgi-Computer Labs.webp',
      'Modern Classrooms': '/college-images/MGI/mgi-Modern Classrooms.webp'
    },
    establishedYear: 2007,
    coordinates: { lat: 22.668, lng: 75.889 },
    address: 'P.O. Palia, Hatod Road, Limbodagari, Behind Aurobindo Hospital, Limboda, Indore - 453111, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (8 km)',
    approval: 'AICTE Approved, Affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)',
    selectionCriteria: 'Entrance-based and merit-based admission across engineering, management, pharmacy, and undergraduate programs as per AICTE, RGPV, DAVV, and state counseling norms.',
    updates: [
      'Malwa Group of Institutes (MIST, MISM & MIPS) offers UG, PG, Diploma, and Pharmacy programs alongside integrated vocational/skill courses.',
      'Featured campus placement highlights on mgiindore.com include offers up to 15.2 LPA–15.5 LPA across recruiters such as Ellucian US, Thoughtworks, and Jaro Education.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹3 Lakh Total Fees',
        specializations: [
          'Computer Science & Engineering',
          'Information Technology',
          'Electronics & Communication Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'AIML'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['Computer Science & Engineering', 'Thermal Engineering', 'Structural Engineering']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹90,000 Total Fees',
        specializations: [
          'Marketing',
          'Human Resource',
          'Finance',
          'Production & Operation',
          'Information System',
          'Business Analyst'
        ]
      },
      {
        name: 'Diploma / Polytechnic',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Computer Science & Engineering', 'Civil Engineering', 'Mechanical Engineering']
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Plain', 'FT', 'HM']
      },
      {
        name: 'B.Com.',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Plain', 'Tax', 'CA', 'FT']
      },
      {
        name: 'B.Sc.',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Plain', 'Bio-Tech', 'IT', 'EC']
      },
      {
        name: 'Bachelor of Journalism and Mass Communication [BJMC]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'B. Pharmacy',
        duration: '4 Years',
        fees: 'Varies'
      },
      {
        name: 'D. Pharmacy',
        duration: '2 Years',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 15.50 LPA',
      average: 'INR 7.75 LPA',
      lowest: 'INR 3.60 LPA',
      recruiters: [
        'Ellucian US',
        'Thoughtworks',
        'Jaro Education',
        'Wipro',
        'Collabera',
        'Impetus',
        'NIIT',
        'Calsoft',
        'Genpact',
        'Capgemini',
        'Zycus',
        'WorthWhiz Financials',
        'Boston Scientific'
      ]
    }
  },
  {
    id: 'iit-indore',
    name: 'Indian Institute of Technology (IIT) Indore',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'UGC',
    location: 'Simrol',
    feePerAnnum: 246200,
    rating: 4.2,
    totalReviews: 186,
    image: '/college-images/IIT-INDORE/IIT-INDORE.png',
    campusPhoto: '/college-images/IIT-INDORE/IIT-INDORE.png',
    videoUrl: '',
    backgroundVideoUrl: '',
    description: 'Indian Institute of Technology Indore (IIT Indore), established in 2009, is an autonomous public university of National Importance located on a 501.42-acre state-of-the-art campus in Simrol. Highly ranked nationally and globally, the institute is prominent for elite research, strong multi-disciplinary engineering, design, and science programs, single-occupancy hostels, and leading technology transfer facilities.',
    facilities: [
      'Advanced Research Labs',
      'Supercomputer Facility',
      'Single Occupancy Hostels',
      'Sports Complex',
      '24/7 Library',
      'Start-up Incubator',
      'Central Workshop',
      'Health Centre'
    ],
    facilityImages: {
      'Advanced Research Labs': '/college-images/IIT-INDORE/IIT-INDORE Research Labs.webp',
      'Supercomputer Facility': '/college-images/IIT-INDORE/IIT-INDORE Supercomputer Facility.webp',
      'Single Occupancy Hostels': '/college-images/IIT-INDORE/IIT-INDORE Single Occupancy Hostels.webp',
      'Sports Complex': "/college-images/IIT-INDORE/IIT-INDORE 'Sports Complex.webp",
      '24/7 Library': '/college-images/IIT-INDORE/IIT-INDORE Library.webp',
      'Start-up Incubator': '/college-images/IIT-INDORE/IIT-INDORE Start-up Incubator.webp',
      'Central Workshop': '/college-images/IIT-INDORE/IIT-INDORE Central Workshop.webp',
      'Health Centre': '/college-images/IIT-INDORE/IIT-INDORE Health Centre.webp'
    },
    establishedYear: 2009,
    coordinates: { lat: 22.5204, lng: 75.9207 },
    address: 'Khandwa Road, Simrol, Indore - 453552, Madhya Pradesh, India',
    approval: 'Autonomous Public University of National Importance recognized by Ministry of Education (MoE), Govt. of India',
    selectionCriteria: 'Entrance-based. B.Tech and BS via JEE Advanced and JoSAA counseling. B.Des via UCEED. M.Tech via GATE and COAP counseling. M.Sc via IIT JAM and JOAPS counseling.',
    updates: [
      'JEE Advanced 2026 Cutoff Ranks published: B.Tech CSE closed at 1639 in Round 1 and 1676 in Final Round 5 for General (OPEN).',
      'Ranked 12th in Engineering and 27th Overall in NIRF India Rankings 2025.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹2,46,200 (1st Year Academic & Hostel Fees, excl. dining)',
        specializations: [
          'Computer Science and Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Metallurgical Engineering and Materials Science',
          'Chemical Engineering',
          'Mathematics and Computing',
          'Engineering Physics',
          'Space Science and Engineering',
          'Biomedical Engineering and Data Science',
          'Environmental Economics and Sustainable Engineering'
        ]
      },
      {
        name: 'Bachelor of Design [B.Des]',
        duration: '4 Years',
        fees: '₹2,46,200 (1st Year Academic & Hostel Fees, excl. dining)',
        specializations: [
          'Urban System Innovation',
          'Educational Technologies',
          'Healthcare Systems',
          'Sustainable Energy Systems'
        ]
      },
      {
        name: 'Bachelor of Science [BS]',
        duration: '4 Years',
        fees: 'Varies',
        specializations: ['Applied and Industrial Chemistry']
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹1,14,600 (1st Year Fees)',
        specializations: [
          'Communication and Signal Processing',
          'VLSI Design and Nanoelectronics',
          'Metallurgical Engineering',
          'Electric Vehicle Technology',
          'Space Engineering',
          'Geotechnical Engineering',
          'Transportation Systems Engineering',
          'Chemical Processes Design & Intelligence'
        ]
      },
      {
        name: 'Master of Science [M.Sc]',
        duration: '2 Years',
        fees: '₹74,000 (1st Year Fees)',
        specializations: ['Chemistry', 'Physics', 'Mathematics', 'Biotechnology', 'Astronomy']
      },
      {
        name: 'MS (Research)',
        duration: '2 Years',
        fees: 'Varies',
        specializations: [
          'Computer Science and Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Humanities and Social Sciences',
          'Data Science and Management (MS-DSM)'
        ]
      },
      {
        name: 'Master of Arts [M.A.]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['English (Literature and Linguistics)']
      },
      {
        name: 'Doctor of Philosophy [Ph.D]',
        duration: '3 Years',
        fees: '₹1,63,400 (1st Year Fees)',
        specializations: [
          'Computer Science and Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Metallurgical Engineering and Materials Science',
          'Biosciences and Biomedical Engineering',
          'Chemical Engineering',
          'Chemistry',
          'Physics',
          'Psychology',
          'Sociology',
          'Astronomy, Astrophysics and Space Engineering'
        ]
      }
    ],
    placements: {
      highest: 'INR 1.37 Crore',
      average: 'INR 23.91 LPA',
      lowest: 'INR 10.00 LPA (MTech Median)',
      recruiters: [
        'Google',
        'Amazon',
        'Microsoft',
        'Deloitte',
        'Accenture',
        'Adobe',
        'Goldman Sachs',
        'Samsung',
        'Oracle',
        'Zomato',
        'Qualcomm'
      ]
    },
    scholarships: [
      {
        name: 'Central Sector Scholarship',
        criteria: 'SC/ST category 1st year B.Tech',
        benefits: 'Financial support for low income families (< 4.5 lakhs)'
      },
      {
        name: 'Merit Cum Means (MCM) Scholarship',
        criteria: 'Gen/OBC based on merit',
        benefits: 'Offered to 25% of students'
      },
      {
        name: 'Samsung Star Scholarship',
        criteria: 'From Jawahar Navodaya Vidyalaya',
        benefits: 'Sponsorship by Samsung India'
      }
    ]
  },
  {
    id: 'iim-indore',
    name: 'Indian Institute of Management (IIM) Indore',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Autonomous',
    location: 'Rau',
    feePerAnnum: 1200000,
    rating: 4.3,
    totalReviews: 82,
    image: '/college-images/IIM-INDORE/IIM-INDORE.webp',
    campusPhoto: '/college-images/IIM-INDORE/IIM-INDORE.webp',
    description: 'Indian Institute of Management Indore (IIM Indore), established in 1996, is a premier management institution of National Importance. Prominent for its five-year Integrated Programme in Management (IPM), Post Graduate Programme (PGP/MBA), PGP-HRM, and Executive programs, IIM Indore holds Triple Crown Accreditation (EQUIS, AACSB, AMBA) and delivers stellar leadership talent globally.',
    facilities: [
      'Hilltop Campus',
      'Auditorium-1 (300 capacity)',
      'Auditorium-2 (800 capacity)',
      'Sports Stadium & Complex',
      'Night Canteen (11 PM - 5 AM)',
      'Learning Centre Library',
      'High-speed LAN Hostels',
      'Swimming Pool',
      'Digital Finance Lab'
    ],
    facilityImages: {
      'Hilltop Campus': '/college-images/IIM-INDORE/IIM-INDORE Hilltop Campus.jpeg',
      'Auditorium-1 (300 capacity)': '/college-images/IIM-INDORE/IIM-INDORE Auditorium-1.webp',
      'Auditorium-2 (800 capacity)': '/college-images/IIM-INDORE/IIM-INDORE Auditorium-2.webp',
      'Sports Stadium & Complex': '/college-images/IIM-INDORE/IIM-INDORE Sports Stadium.jpg',
      'Night Canteen (11 PM - 5 AM)': '/college-images/IIM-INDORE/IIM-INDORE Night Canteen.webp',
      'Learning Centre Library': '/college-images/IIM-INDORE/IIM-INDORE Learning Centre Library.webp',
      'High-speed LAN Hostels': '/college-images/IIM-INDORE/IIM-INDORE High-speed LAN Hostels.webp',
      'Swimming Pool': '/college-images/IIM-INDORE/IIM-INDORE Swimming Pool.webp',
      'Digital Finance Lab': '/college-images/IIM-INDORE/IIM-INDORE Digital Finance Lab.webp'
    },
    establishedYear: 1996,
    coordinates: { lat: 22.6288, lng: 75.7836 },
    address: 'Prabandh Shikhar, Rau-Pithampur Road, Indore - 453556, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'Autonomous Institution of National Importance, EQUIS, AACSB & AMBA Accredited',
    selectionCriteria: 'Entrance-based. PGP & PGP-HRM (MBA) via CAT percentile followed by Written Ability Test (WAT) and Personal Interview (PI). IPM via IPMAT entrance exam. EPGP via GMAT/GRE/CAT and PI.',
    updates: [
      'Final Placements 2026 (Batch 2024–26) concluded with 240+ recruiters, highest domestic CTC of INR 82.54 LPA, average CTC of INR 27.27 LPA, and median CTC of INR 25.00 LPA.',
      'CAT sectional cutoff for shortlisting remains at 80 percentile across VARC, DILR, and QA, with a 90 overall percentile threshold.'
    ],
    coursesList: [
      {
        name: 'Post Graduate Programme in Management [PGP/MBA]',
        duration: '2 Years',
        fees: '₹12.00 Lakhs (1st Year Course Fee; ₹24.12 Lakhs Total Course Fee)',
        specializations: ['General Management']
      },
      {
        name: 'Post Graduate Programme in Human Resource Management [PGP-HRM]',
        duration: '2 Years',
        fees: '₹12.00 Lakhs (1st Year Course Fee)',
        specializations: ['Human Resource Management']
      },
      {
        name: 'Five Year Integrated Programme in Management [IPM]',
        duration: '5 Years',
        fees: '₹6.00 Lakhs/Yr (Years 1–3) + PGP Fees (Years 4–5)'
      },
      {
        name: 'Executive Post Graduate Programme in Management [EPGP]',
        duration: '1 Year',
        fees: '₹26.77 Lakhs (Total Fees)'
      },
      {
        name: 'Post Graduate Programme in Management for Working Executives [PGPMX]',
        duration: '2 Years',
        fees: 'Varies'
      },
      {
        name: 'Doctoral Programme in Management [DPM]',
        duration: '3-4 Years',
        fees: '₹75,000 (1st Year Fees)',
        specializations: [
          'Communication',
          'Economics',
          'Finance & Accounting',
          'Humanities and Social Sciences',
          'Information Systems',
          'Marketing Management',
          'Operations Management and Quantitative Techniques',
          'Organizational Behaviour and Human Resource Management',
          'Strategic Management'
        ]
      },
      {
        name: 'Executive Doctoral Programme in Management [EDPM / EDPMG]',
        duration: '3-4 Years',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 82.54 LPA',
      average: 'INR 27.27 LPA',
      lowest: 'INR 25.00 LPA (Median Package)',
      recruiters: [
        'Everest Group',
        'EY',
        'GEP Worldwide',
        'Graviton Consulting',
        'Indus Insights',
        'Infosys Consulting',
        'Kearney',
        'KPMG',
        'PwC India',
        'Goldman Sachs',
        'Morgan Stanley',
        'McKinsey',
        'Bain & Company',
        'Aditya Birla',
        'Adobe',
        'Barclays',
        'Capgemini',
        'FedEx',
        'Flipkart'
      ]
    },
    scholarships: [
      {
        name: 'Need Based Financial Assistance (NBFA) Scheme',
        criteria: 'Family income less than INR 12 Lakh per annum',
        benefits: 'Sponsorship of interest on student education loans'
      },
      {
        name: 'Government of India Post Matric Scholarship',
        criteria: 'Reserved category SC/ST/OBC criteria compliance',
        benefits: 'Full/Partial Tuition fee waivers'
      }
    ]
  },
  {
    id: 'sgsits',
    name: 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'RGPV',
    location: 'Vallabh Nagar',
    feePerAnnum: 95000,
    rating: 4.8,
    googleRating: 4.4,
    indoreRating: 4.8,
    ratingSource: 'IndoreColleges',
    totalReviews: 0,
    image: '/college-images/SGSITS/sgsits.webp',
    videoUrl: '/SGSITS.mp4',
    backgroundVideoUrl: '/SGSITS.mp4',
    description: 'Shri Govindram Seksaria Institute of Technology and Science (SGSITS Indore), established in 1952, is a premier government-aided autonomous technical institute. Affiliated with RGPV (and DAVV for management/applied sciences) and approved by the UGC, AICTE, and PCI with NAAC accreditation, it is ranked among the finest engineering colleges in Central India, acclaimed for high merit-based intake and strong core/software job placements.',
    facilities: [
      'Central Library',
      'Computer Center',
      'Gymnasium',
      'Hostels (Separate Boys & Girls)',
      'Dispensary',
      'CIDI Centre',
      'Central Workshop',
      'Lush Green Grounds',
      'High-speed Wi-Fi'
    ],
    facilityImages: {
      'Central Library': '/college-images/SGSITS/SGSITS-library.jpg',
      'Computer Center': '/college-images/SGSITS/SGSITS-Computer.png',
      'Gymnasium': '/college-images/SGSITS/SGSITS-Gymnasium.jpg',
      'Hostels (Separate Boys & Girls)': '/college-images/SGSITS/SGSITS-Hostels.webp',
      'Dispensary': '/college-images/SGSITS/SGSITS-Dispensary.webp',
      'CIDI Centre': '/college-images/SGSITS/SGSITS-Central Workshop.webp',
      'Central Workshop': '/college-images/SGSITS/SGSITS-Central Workshop.webp',
      'Lush Green Grounds': '/college-images/SGSITS/SGSITS-Green Grounds.avif',
      'High-speed Wi-Fi': '/college-images/SGSITS/SGSITS-Computer.png'
    },
    establishedYear: 1952,
    coordinates: { lat: 22.7248, lng: 75.871 },
    address: '23 Sir M. Visvesvaraya Marg, Park Road, Vallabh Nagar, Indore - 452003, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 7 km)',
    approval: 'Government-Aided Autonomous Institute',
    affiliations: ['RGPV', 'DAVV'],
    regulatoryApprovals: ['AICTE', 'UGC', 'PCI'],
    accreditations: ['NAAC Grade A'],
    selectionCriteria: 'Entrance-based. B.Tech/B.E. admissions via JEE Main score and MP DTE Counseling. M.Tech via GATE score. MCA via NIMCET / MP DTE, MBA via CMAT / MAT / CAT & MP DTE, and B.Pharm via Class 12 merit / M.Pharm via GPAT.',
    updates: [
      'MP DTE 2026 General Home State last-round closing rank for B.Tech CSE stood at 48631 (All India: 53013), IT at 62270, and AI & Robotics at 63308.',
      'Undergraduate offerings now include B.Tech in AI & Robotics, B.Tech Civil Engineering (Hindi), and Bachelor of Design (B.Des).'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹1.0 Lakh - ₹1.81 Lakh (1st Year Fees)',
        feeHistory: [
          {
            fee: '₹1,80,100',
            description: 'B.Tech first-year fee',
            academicYear: '2025–26',
            sourceUrl: 'https://www.sgsits.ac.in/admission/prospectus',
            sourceStatus: 'pending-direct-source'
          }
        ],
        specializations: [
          'Computer Science and Engineering',
          'Information Technology',
          'Artificial Intelligence & Robotics',
          'Electronics & Telecommunication',
          'Electronics & Instrumentation',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Civil Engineering (Hindi)',
          'Biomedical Engineering',
          'Industrial & Production Engineering'
        ]
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharm]',
        duration: '4 Years',
        fees: 'Varies'
      },
      {
        name: 'Bachelor of Design [B.Des]',
        duration: '4 Years',
        fees: 'Varies',
        academicYear: '2026–27',
        programmeLevel: 'UG',
        sourceUrl: 'https://www.sgsits.ac.in/admission/ug'
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹30,000 - ₹88,550 (Annual Fees)',
        specializations: [
          'Quantum Computing',
          'Power Electronics',
          'Power System and Control',
          'Information Technology',
          'Transportation Engineering',
          'Water Resource & Environmental Engineering',
          'Computer Engineering',
          'Micro-Electronics & VLSI Design',
          'Electronics & Communications',
          'Biomedical Signal Processing and Instrumentation',
          'CAD/CAM/CAE',
          'Mechanical Engineering Design',
          'Thermal Engineering',
          'Structural Engineering',
          'Environmental Engineering',
          'Industrial Engineering and Management',
          'Manufacturing Engineering'
        ]
      },
      {
        name: 'Master of Pharmacy [M.Pharm]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['Industrial Pharmacy', 'Pharmaceutical Chemistry']
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: 'Varies'
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹50,000 - ₹1.23 Lakhs (Annual Fees)',
        specializations: ['General Management', 'Hospital Administration']
      },
      {
        name: 'Master of Science [M.Sc]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: [
          'Applied Physics',
          'Applied Chemistry',
          'Applied Mathematics & Computational Science'
        ]
      }
    ],
    placements: {
      highest: '₹44.5 LPA',
      recruiters: [
        'Amazon',
        'Google',
        'Adobe',
        'Samsung',
        'Deloitte',
        'Goldman Sachs',
        'Microsoft',
        'Groww',
        'Infosys',
        'TCS',
        'Wipro',
        'Accenture',
        'Cognizant'
      ],
      metrics: [
        {
          type: 'highest',
          value: '₹44.5 LPA',
          academicYearStatus: 'pending-verification',
          sourceLabel: 'SGSITS prospectus (2024 edition)',
          sourceUrl: 'https://www.sgsits.ac.in/admission/prospectus',
          sourceStatus: 'pending-direct-source'
        },
        {
          type: 'median',
          value: '₹6.5 LPA',
          academicYear: '2024–25',
          programme: 'Engineering UG (B.Tech)',
          sourceLabel: 'NIRF Engineering 2026',
          sourceUrl: 'https://www.nirfindia.org/'
        },
        {
          type: 'median',
          value: '₹7 LPA',
          academicYear: '2023–24',
          programme: 'UG',
          sourceLabel: 'NIRF Overall 2025',
          sourceUrl: 'https://www.nirfindia.org/Rankings/2025/OverallRanking.html'
        },
        {
          type: 'median',
          value: '₹4.25 LPA',
          academicYear: '2024–25',
          programme: 'Engineering PG (M.Tech)',
          sourceLabel: 'NIRF Engineering 2026',
          sourceUrl: 'https://www.nirfindia.org/'
        },
        {
          type: 'median',
          value: '₹2.94 LPA',
          academicYear: '2024–25',
          programme: 'MBA',
          sourceLabel: 'NIRF Management 2026',
          sourceUrl: 'https://www.nirfindia.org/'
        }
      ]
    },
    scholarships: [
      {
        name: 'State Post Matric Scholarship'
      },
      {
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)'
      }
    ]
  },
  {
    id: 'davv',
    name: 'Devi Ahilya Vishwavidyalaya (DAVV)',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'UGC',
    location: 'Takshashila Campus',
    feePerAnnum: 45000,
    rating: 3.7,
    totalReviews: 2214,
    image: '/college-images/DAVV/DAVV.avif',
    campusPhoto: '/college-images/DAVV/DAVV.avif',
    description: 'Devi Ahilya Vishwavidyalaya (DAVV), established in 1964, is a premier state public university accredited with NAAC Grade A+ grade. Spanning across a lush campus network (including Takshashila Campus, Khandwa Road, and Nalanda Campus, RNT Marg), it offers multi-disciplinary academic centers (including IET, IMS, IIPS, and School of Economics). The university oversees affiliated colleges across the Indore division and delivers undergraduate, postgraduate, and research programs.',
    facilities: [
      'Takshashila Campus Wi-Fi',
      'Central Library & e-Gyan Portal',
      'High-Tech Workspaces & Labs',
      'Boys & Girls Hostels',
      'University Playgrounds',
      'Hygienic Canteens & Cafeterias',
      'Spacious Auditoriums',
      'Health Centre',
    ],
    facilityImages: {
      'Takshashila Campus Wi-Fi': '/college-images/DAVV/DAVV-Takshashila Campus Wi-Fi.webp',
      'Central Library & e-Gyan Portal': '/college-images/DAVV/DAVV-Central Library.webp',
      'High-Tech Workspaces & Labs': '/college-images/DAVV/DAVV-High-Tech Workspaces & Labs.avif',
      'Boys & Girls Hostels': '/college-images/DAVV/DAVV-Boys & Girls Hostels.jpeg',
      'University Playgrounds': '/college-images/DAVV/DAVV-University Playgrounds.webp',
      'Hygienic Canteens & Cafeterias': "/college-images/DAVV/DAVV-Canteens & Cafeterias'.webp",
      'Spacious Auditoriums': '/college-images/DAVV/DAVV-Auditoriums.jpg',
      'Health Centre': '/college-images/DAVV/DAVV-Health Centre.webp'
    },
    establishedYear: 1964,
    coordinates: { lat: 22.7121, lng: 75.8722 },
    address: 'Nalanda Campus, R. N. T. Marg, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 6 km)',
    approval: 'UGC Recognized State Public University, Approved by AICTE, NCTE, BCI & PCI, NAAC A+ Grade',
    selectionCriteria: 'Entrance-based. CUET-UG score for undergraduate B.A., B.Sc., B.Com., BBA, BCA, B.Pharma. CUET-PG score or DAVV-CET for professional MBA, MCA, LL.M, B.Ed. programs. JEE Main / MP DTE for B.Tech.',
    updates: [
      'Ranked in the 151–200 band in the Overall category in NIRF Rankings 2025.',
      'UG and PG admissions across DAVV teaching departments follow CUET-UG / CUET-PG / DAVV-CET and MP state counseling schedules.'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹34,392 - ₹1.05 Lakhs (1st Year Fees)',
        specializations: [
          'Hospital Administration',
          'Advertising Management & Public Relations',
          'Business Analytics',
          'Business Economics',
          'Computer Management',
          'Disaster Management',
          'e-Commerce'
        ]
      },
      {
        name: 'Bachelor of Technology [B.Tech] + Master of Technology [M.Tech]',
        duration: '5 Years',
        fees: '₹64,500 - ₹86,500 (1st Year Fees)',
        specializations: ['Artificial Intelligence', 'Data Science', 'Information Technology']
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharma]',
        duration: '4 Years',
        fees: '₹89,500 (1st Year Fees)'
      },
      {
        name: 'BALLB {Hons.}',
        duration: '5 Years',
        fees: '₹40,250 (1st Year Fees)'
      },
      {
        name: 'Bachelor of Education [B.Ed]',
        duration: '2 Years',
        fees: '₹44,711 (1st Year Fees)'
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹86,500 (1st Year Fees)'
      }
    ],
    placements: {
      highest: 'INR 12.00 LPA',
      average: 'INR 5.60 LPA (Median Package)',
      lowest: 'INR 4.00 LPA',
      recruiters: [
        'TCS',
        'Wipro',
        'Deloitte',
        'Infosys',
        'Amazon',
        'Flipkart',
        'Vistara',
        'Shakti Pumps',
        'Balaji Wafers',
        'HMD Wires'
      ]
    },
    scholarships: [
      {
        name: 'Post-Matric Scholarship Scheme',
        criteria: 'SC/ST/OBC students',
        benefits: 'Full/partial scholarship and concession'
      },
      {
        name: 'Single Girl Child Fellowship for Research',
        criteria: 'PhD candidates',
        benefits: 'Monthly stipends and research grants'
      }
    ]
  },
  {
    id: 'acropolis',
    name: 'Acropolis Institute of Technology and Research',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 76000,
    rating: 4.1,
    googleRating: 4.1,
    indoreRating: 4.3,
    totalReviews: 314,
    image: '/college-images/AITR/AITR.webp',
    campusPhoto: '/college-images/AITR/AITR.webp',
    facilityImages: {
      'Smart Classrooms with Audio-Visual Aids': '/college-images/AITR/AITR-Smart Classrooms.webp',
      'Centrally A/C Auditorium (250 capacity)': '/college-images/AITR/AITR-Auditorium.webp',
      'Group Discussion & Seminar Halls': '/college-images/AITR/AITR-Seminar Halls.webp',
      'Centrally Stocked Library (55,000+ books)': '/college-images/AITR/AITR-Library.webp',
      'Sports Fields (Basketball, Badminton, Cricket)': '/college-images/AITR/AITR-Sports Fields.webp',
      'Hygienic Canteens': '/college-images/AITR/AITR-Canteens.webp',
      'Fleet of over 70 Bus Services': "/college-images/AITR/AITR-Bus Services'.webp"
    },
    videoUrl: '/AITR.mp4',
    backgroundVideoUrl: '/AITR.mp4',
    description: 'Acropolis Institute of Technology and Research (AITR), established in 2005, is a prominent private engineering college in Indore. Affiliated with RGPV and approved by the AICTE with NBA accreditation for CSE, ME, and ECE departments, AITR delivers top-tier technical education. Known for its strong Career Development Cell (CDC), structured training modules, and campus placement programs, it prepares graduates for IT and core engineering roles.',
    facilities: [
      'Smart Classrooms with Audio-Visual Aids',
      'Centrally A/C Auditorium (250 capacity)',
      'Group Discussion & Seminar Halls',
      'Centrally Stocked Library (55,000+ books)',
      'EDUSAT-ISRO Lab for Online Lectures',
      'Sports Fields (Basketball, Badminton, Cricket)',
      'Hygienic Canteens',
      'Fleet of over 70 Bus Services'
    ],
    establishedYear: 2005,
    coordinates: { lat: 22.7915, lng: 75.908 },
    address: 'Acropolis Institute Bypass Road, Manglia Square, Manglia, Indore - 453771, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 15 km)',
    approval: 'AICTE Approved, Affiliated to RGPV, NBA Accredited (for CSE, ME, ECE)',
    selectionCriteria: 'Entrance-based. B.E./B.Tech admissions via JEE Main score and MP DTE Counseling. MBA admissions via CMAT / MP DTE counseling. M.Tech via GATE / DTE counseling.',
    updates: [
      '2026 published total tuition estimates list B.Tech at ~₹3.04 Lakhs (~₹76,000/year), MBA at ~₹1.59 Lakhs total, and MCA at ~₹1.18 Lakhs total.',
      'MP DTE counseling and institute admission windows cover B.Tech, M.Tech, MBA, MCA, Integrated MCA, and Polytechnic programs.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹3.04 Lakhs Total Tuition (2026 estimate)',
        specializations: [
          'Computer Science and Engineering',
          'Information Technology',
          'Artificial Intelligence and Machine Learning',
          'Data Science',
          'Cyber Security',
          'Computer Science and Information Technology',
          'Internet of Things',
          'VLSI Design',
          'Advance Communication Technologies',
          'Computer Engineering (Regional Language)',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electronics & Communication Engineering'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹1.53 Lakhs Total Tuition (2026 estimate)',
        specializations: ['Computer Science and Engineering', 'VLSI Design', 'Thermal Engineering']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹1.59 Lakhs Total Tuition (2026 estimate)',
        specializations: ['Marketing', 'Finance', 'Human Resource Management', 'Business Analytics']
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹1.18 Lakhs Total Tuition (2026 estimate)'
      },
      {
        name: 'BCA + MCA Integrated',
        duration: '5 Years',
        fees: '₹3.65 Lakhs Total Tuition (2026 estimate)'
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹76,500 Total Tuition (2026 estimate)',
        specializations: ['Civil Engineering', 'Mechanical Engineering']
      }
    ],
    placements: {
      highest: 'INR 12.00 LPA',
      average: 'INR 4.50 LPA',
      recruiters: [
        'TCS',
        'Capgemini',
        'Cognizant',
        'Wipro',
        'Persistent Systems',
        'Impetus',
        'Accolite',
        'ADP',
        'Amazon',
        'Bajaj RX'
      ]
    },
    scholarships: [
      {
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        criteria: 'MP Domicile, 12th board high merit & qualifying JEE rank',
        benefits: 'Full tuition fee reimbursement support'
      },
      {
        name: 'Post Matric Scholarship',
        criteria: 'SC/ST/OBC category low-income students',
        benefits: 'Maintenance allowance and tuition fee exemptions'
      },
      {
        name: 'Dr. R.M. Sojatia Merit Scholarship',
        criteria: 'AITR semester-wise academic toppers',
        benefits: 'Cash rewards and semester fee reductions'
      },
      {
        name: 'Mr. Pradeep Sojatia Merit-cum-Means Scholarship',
        criteria: 'High merit and economically weaker section (EWS)',
        benefits: 'Financial aid towards tuition fees'
      }
    ]
  },
  {
    id: 'symbiosis-university',
    name: 'Symbiosis University of Applied Sciences (SUAS)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 275000,
    rating: 4.0,
    totalReviews: 40,
    image: '/college-images/SUAS/SUAS-Symbiosis University of Applied Sciences (SUAS).png',
    campusPhoto: '/college-images/SUAS/SUAS-Symbiosis University of Applied Sciences (SUAS).png',
    description: 'Symbiosis University of Applied Sciences (SUAS) Indore, established in 2016, is a self-financed private university specializing in skill development. Offering robust hands-on vocational models, modern laboratory layouts, and exceptional industry collaborations (including German universities), it focuses on producing industry-ready professionals in high employment tech and business sectors.',
    facilities: [
      'German Skill Labs',
      'Mock Retail Stores',
      'Tech Garages',
      'Computer Labs (Fully Wi-Fi)',
      'Hostel Blocks (Boys & Girls)',
      'Rich Library (20,410+ books)',
      'Swimming Pool',
      'Badminton Courts',
      'Table Tennis Room',
      'Basketball Court',
      'Cricket Grounds'
    ],
    facilityImages: {
      'German Skill Labs': '/college-images/SUAS/SUAS-Computer Labs.png',
      'Mock Retail Stores': '/college-images/SUAS/SUAS-Mock Retail Stores.jpg',
      'Tech Garages': '/college-images/SUAS/SUAS-Tech Garages.png',
      'Computer Labs (Fully Wi-Fi)': '/college-images/SUAS/SUAS-Computer Labs.png',
      'Hostel Blocks (Boys & Girls)': '/college-images/SUAS/SUAS-Hostel Blocks.jpg',
      'Rich Library (20,410+ books)': '/college-images/SUAS/SUAS-Rich Library.jpg',
      'Badminton Courts': '/college-images/SUAS/SUAS-Badminton Courts.jpg',
      'Table Tennis Room': '/college-images/SUAS/SUAS-Table Tennis Room.jpg'
    },
    establishedYear: 2016,
    coordinates: { lat: 22.768, lng: 75.811 },
    address: 'Bada Bangadda, Super Corridor, New Airport, Indore - 453112, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 2 km)',
    approval: 'Approved by UGC and All India Council for Technical Education (AICTE)',
    selectionCriteria: 'Skill-CAT / Entrance test (National/State/SUAS) / Personal Interview depending on selected courses.',
    updates: [
      'MBA admissions accept SNAP, CAT, MAT, CMAT, XAT, and MAH-CET scores along with selection rounds.',
      'Annual fees for Indian students range from ₹2.75–2.90 Lakhs for B.Tech, ₹2.60–2.75 Lakhs for BBA, ₹2.00 Lakhs for B.Sc Data Science, and ₹6.55 Lakhs for MBA.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹2.75 Lakhs - ₹2.90 Lakhs (Per Year)',
        specializations: [
          'Computer Science & Information Technology',
          'Artificial Intelligence and Machine Learning',
          'Artificial Intelligence & Data Science',
          'Cyber Security',
          'Automation and Robotics'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹2.60 Lakhs - ₹2.75 Lakhs (Per Year)',
        specializations: [
          'Retail & E-Commerce Management',
          'Banking Financial Services and Insurance (BFSI)',
          'Digital Media & Marketing',
          'Logistics and Supply Chain Management'
        ]
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3 Years',
        fees: '₹2.00 Lakhs (Per Year)',
        specializations: ['Data Science']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹6.55 Lakhs (Per Year)',
        specializations: [
          'Banking Financial Services and Insurance (BFSI)',
          'Logistics and Supply Chain Management',
          'Digital Marketing',
          'Retail Management'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹1.00 Lakh (Per Year)',
        specializations: ['Computer Science & Engineering', 'Information Technology']
      },
      {
        name: 'Diploma Programs',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Manufacturing']
      },
      {
        name: 'Doctor of Philosophy [Ph.D]',
        duration: '3 Years',
        fees: '₹1.20 Lakhs (Per Year)',
        specializations: ['Computer Science & IT', 'Data Science', 'Retail Management', 'BFSI']
      }
    ],
    placements: {
      highest: 'INR 20.00 LPA',
      average: 'INR 5.50 LPA (Estimated)',
      lowest: 'INR 3.50 LPA',
      recruiters: [
        'Royal Enfield',
        'Maruti Suzuki',
        'Hyundai',
        'Reliance',
        'Big Bazar',
        'TATA',
        'Mahindra',
        'Intellipaat',
        'ICICI Securities Ltd',
        'Wipro'
      ]
    },
    scholarships: [
      {
        name: 'B.Tech Mechanical & Mechatronics Merit Scholarship',
        criteria: '10+2 score of 60% and above (strictly based on merit)',
        benefits: '20% to 50% waiver on first-year academic fees'
      }
    ]
  },
  {
    id: 'svvv-indore',
    name: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Sanwer Road',
    feePerAnnum: 115000,
    rating: 3.6,
    totalReviews: 270,
    image: '/college-images/SVVV/SVVV.webp',
    campusPhoto: '/college-images/SVVV/SVVV.webp',
    description: 'Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV) Indore, established in 2015, is a self-financed private university in Indore, Madhya Pradesh, established under the Madhya Pradesh Niji Vishwavidyalaya Adhiniyam. Approved by UGC, AICTE, PCI, and COA, SVVV operates across constituent institutes including Shri Vaishnav Institute of Technology and Science (SVITS), School of Management, Institute of Science, Institute of Commerce, Institute of Architecture, Institute of Paramedical Sciences, and Shri Vaishnav Institute of Law.',
    facilities: [
      'Advanced Engineering Laboratories',
      'Smart Classrooms',
      'Canteen / Cafeteria',
      'Auditorium & Seminar Halls',
      'Sports Complex & Grounds',
    ],
    facilityImages: {
      'Advanced Engineering Laboratories': '/college-images/SVVV/SVVV- Engineering Laboratories.jpeg',
      'Smart Classrooms': '/college-images/SVVV/SVVV-Smart Classrooms.jpeg',
      'Canteen / Cafeteria': '/college-images/SVVV/SVVV-Cafeteria.jpeg',
      'Auditorium & Seminar Halls': '/college-images/SVVV/SVVV-Auditorium.jpeg',
      'Sports Complex & Grounds': '/college-images/SVVV/SVVV-Sports Complex & Grounds.jpg'
    },
    establishedYear: 2015,
    coordinates: { lat: 22.784, lng: 75.848 },
    address: 'Indore–Ujjain Road, Indore - 453111, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 20 km)',
    approval: 'UGC Recognized Private University (MP Niji Vishwavidyalaya Adhiniyam), AICTE, PCI & COA Approved',
    selectionCriteria: 'Entrance-based and merit-based. B.Tech via JEE Main or SVET (Shri Vaishnav Entrance Test). MBA via CAT/MAT/XAT/CMAT/ATMA/SVET. M.Tech via GATE or SVET.',
    updates: [
      '2026 published total fee ranges list B.Tech at ₹4.28–7.28 Lakhs, B.Arch at ₹4.33 Lakhs, B.Pharm at ₹4.28 Lakhs, MBA at ₹2.58–3.48 Lakhs, and Ph.D at ₹2.48 Lakhs.',
      'Admissions across constituent institutes (SVITS, Management, Commerce, Science, Architecture, Law, Paramedical, and Doctoral studies) follow SVET / national entrance / merit criteria.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹4.28 Lakhs - ₹7.28 Lakhs (Total Fees)',
        specializations: [
          'Computer Science Engineering',
          'Computer Science and Business Systems (TCS)',
          'CSE - Data Science (IBM)',
          'CSE - Artificial Intelligence (IBM)',
          'CSE - AI & Machine Learning (Microsoft)',
          'CSE - Cyber Security / IoT / Quantum Computing / Generative AI',
          'Information Technology',
          'Electronics & Communication Engineering',
          'Electrical & Electronics Engineering',
          'Robotics and Automation',
          'Mechatronics',
          'Mechanical Engineering',
          'Automobile Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Integrated B.Tech + MBA / B.Tech + M.Tech',
        duration: '5 Years',
        fees: 'Varies',
        specializations: ['Computer Science Engineering', 'Electronics & Communication Engineering']
      },
      {
        name: 'Bachelor of Architecture [B.Arch]',
        duration: '5 Years',
        fees: '₹4.33 Lakhs (Total Fees)'
      },
      {
        name: 'Bachelor of Design [B.Des]',
        duration: '4 Years',
        fees: '₹2.18 Lakhs - ₹3.08 Lakhs (Total Fees)',
        specializations: ['Graphics and Animation', 'Interior Design', 'Product Design']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹2.58 Lakhs - ₹3.48 Lakhs (Total Fees)',
        specializations: [
          'Marketing',
          'Finance',
          'Human Resource Management',
          'Business Analytics (IBM)',
          'Strategy & Consulting (Grant Thornton)',
          'Healthcare and Hospital Management',
          'Fintech',
          'Agribusiness',
          'International Business',
          'Media Management',
          'Family Business & Entrepreneurship',
          'Tourism Management',
          'Engineering Management'
        ]
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹1.88 Lakhs - ₹2.03 Lakhs (Total Fees)',
        specializations: [
          'Plain',
          'Artificial Intelligence & Machine Learning (IBM)',
          'Big Data Analytics (IBM)'
        ]
      },
      {
        name: 'Bachelor of Commerce [B.Com] / B.Com (Hons.)',
        duration: '3-4 Years',
        fees: 'Varies',
        specializations: [
          'Plain',
          'Banking and Finance',
          'Business Administration',
          'Computer Applications',
          'Entrepreneurship',
          'Tax Procedure',
          'Corporate Secretarial Practices'
        ]
      },
      {
        name: 'Bachelor of Science [B.Sc] / B.Sc (Hons.)',
        duration: '3-4 Years',
        fees: '₹1.13 Lakhs - ₹1.88 Lakhs (Total Fees)',
        specializations: [
          'Physics',
          'Chemistry',
          'Mathematics',
          'Computer Science',
          'Electronics',
          'Biotechnology',
          'Forensic Sciences'
        ]
      },
      {
        name: 'Bachelor of Arts [B.A. Hons.]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: [
          'Psychology',
          'Economics',
          'English Literature',
          'Sociology',
          'Political Science',
          'Public Administration',
          'Anthropology',
          'History'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹1.58 Lakhs (Total Fees)',
        specializations: [
          'Computer Science Engineering',
          'Data Science',
          'Artificial Intelligence',
          'Big Data Analytics',
          'VLSI Design',
          'Embedded System',
          'Power Electronics',
          'Robotics and Automation',
          'Structural Engineering',
          'Transportation Engineering'
        ]
      },
      {
        name: 'Master of Science [M.Sc]',
        duration: '2 Years',
        fees: '₹98,000 - ₹1.68 Lakhs (Total Fees)'
      },
      {
        name: 'Ph.D',
        duration: '3 Years',
        fees: '₹2.48 Lakhs (Total Fees)',
        specializations: [
          'Management',
          'Computer Science & Engineering',
          'Computer Applications',
          'Electronics Engineering',
          'Science',
          'Social Science',
          'Agriculture'
        ]
      }
    ],
    placements: {
      highest: 'INR 47.00 LPA',
      average: 'INR 5.56 LPA',
      lowest: 'INR 5.85 LPA (Median Package)',
      recruiters: [
        'IMPETUS',
        'IBM',
        'Infosys',
        'Piramal',
        'HDFC Bank',
        'VLCC',
        'Wipro',
        'TCS',
        'Vardhman',
        'Voltas',
        'HSBC'
      ]
    },
    scholarships: [
      {
        name: 'Girl Students Scholarship',
        criteria: 'First year girl students',
        benefits: '50% of Tuition Fee or INR 50,000'
      },
      {
        name: 'Meritorious Students Scholarship',
        criteria: '95% and above in 10+2 / Graduation',
        benefits: '100% of Tuition Fee'
      },
      {
        name: 'Meritorious Students Scholarship (Slab B)',
        criteria: '85% to 95% in 10+2 / Graduation',
        benefits: '30% of Tuition Fee'
      },
      {
        name: 'Meritorious MBA Students Scholarship',
        criteria: 'CAT 75 percentile+ / MAT,XAT,ATMA,CMAT,JEE 90 percentile+',
        benefits: '50% of Tuition Fee or INR 50,000'
      }
    ]
  },
{
    id: 'sage-university',
    name: 'SAGE University',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 125000,
    rating: 3.9,
    totalReviews: 203,
    image: '/college-images/SAGE/SAGE.jpg',
    campusPhoto: '/college-images/SAGE/SAGE.jpg',
    description: 'SAGE University Indore, established in 2017 by The SAGE Group, is a private university accredited with an A+ grade by NAAC and approved by UGC, AICTE, BCI, and PCI. Operating on a green campus along the Indore–Rau Bypass Road at Kailod Kartal, it offers multidisciplinary programs across Engineering & Technology, Management, Commerce, Law, Pharmacy, Design, Agriculture, Sciences, and Humanities.',
    facilities: [
      'Apple Computer Lab',
      'Central Library (60,000+ books)',
      'Smart Classrooms',
      'Auditorium',
      'Prangan & Aangan Hostels (Boys & Girls)',
      'Swimming Pool',
      'Cricket & Football Grounds',
      'Gymnasium',
      'Modern Cafeteria',
      'On-campus Medical Center'
    ],
    facilityImages: {
      'Apple Computer Lab': '/college-images/SAGE/SAGE-Apple Computer Lab.webp',
      'Central Library (60,000+ books)': '/college-images/SAGE/SAGE-Central Library.webp',
      'Smart Classrooms': '/college-images/SAGE/SAGE-Smart Classrooms.webp',
      'Auditorium': '/college-images/SAGE/SAGE-Auditorium.jpg',
      'Prangan & Aangan Hostels (Boys & Girls)': '/college-images/SAGE/SAGE-Prangan & Aangan Hostels.webp',
      'Swimming Pool': '/college-images/SAGE/SAGE-Swimming Pool.webp',
      'Cricket & Football Grounds': '/college-images/SAGE/SAGE-Cricket & Football Grounds.jpg',
      'Gymnasium': '/college-images/SAGE/SAGE-Gymnasium.webp',
      'Modern Cafeteria': '/college-images/SAGE/SAGE-Cafeteria.webp',
      'On-campus Medical Center': '/college-images/SAGE/SAGE-Medical CenteR.webp'
    },
    establishedYear: 2017,
    coordinates: { lat: 22.775, lng: 75.922 },
    address: 'Kailod Kartal, Indore–Rau Bypass Road, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 22 km)',
    approval: 'UGC Recognized Private University, AICTE, BCI & PCI Approved, NAAC A+ Accredited',
    selectionCriteria: 'Entrance-based and merit-based. Admission via SAGE Entrance Exam (SEE), JEE Main / national exams (as applicable), or qualifying board/degree merit.',
    updates: [
      '2026 published total tuition fee ranges list B.Tech at ₹2.40–10.00 Lakhs, MBA at ₹1.60–6.00 Lakhs, B.Pharm at ₹3.30–4.80 Lakhs, and BA LLB / BBA LLB (Hons.) at ₹3.75 Lakhs.',
      'Merit and SEE-based scholarship slabs offer tuition waivers up to 100% (95%+), 50% (90–95%), 25% (80–90%), 15% (70–80%), and 10% (60–70%), plus a 10% first-year Early Bird scheme.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹2.40 Lakhs - ₹10.00 Lakhs (Total Tuition)',
        specializations: [
          'Computer Science & Engineering',
          'Artificial Intelligence & Machine Learning',
          'Data Science',
          'Cyber Security',
          'Computer Science & Information Technology',
          'CSE with VLSI',
          'Robotics and Automation',
          'Civil Engineering',
          'Mechanical Engineering',
          'Electronics & Communication Engineering'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹1.60 Lakhs - ₹6.00 Lakhs (Total Tuition)',
        specializations: [
          'Marketing Management',
          'Finance Management',
          'Human Resource Management',
          'Business Analytics',
          'Banking and Financial Services',
          'Artificial Intelligence in Management',
          'Hospital Administration',
          'Agri Business Management',
          'Logistics and Supply Chain Management',
          'Retail Management',
          'Production & Operations',
          'Information Technology',
          'Event Management'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3-4 Years',
        fees: 'Varies',
        specializations: [
          'Business Analytics',
          'Banking and Financial Services',
          'Aviation',
          'Hospital Administration',
          'Logistics and Supply Chain Management',
          'Digital Media Management',
          'E-Commerce',
          'Marketing',
          'Finance',
          'Human Resource Management',
          'Event Management'
        ]
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['Artificial Intelligence & Machine Learning']
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: [
          'Computer Science & Engineering',
          'Artificial Intelligence',
          'Data Science',
          'Cyber Security',
          'Digital Communication Engineering',
          'Structural Engineering',
          'Automobile Engineering'
        ]
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharm]',
        duration: '4 Years',
        fees: '₹3.30 Lakhs - ₹4.80 Lakhs (Total Tuition)'
      },
      {
        name: 'Bachelor of Laws [L.L.B.] {Hons.}',
        duration: '3-5 Years',
        fees: '₹3.75 Lakhs (BA LLB / BBA LLB Hons. Total Tuition)',
        specializations: ['BA LLB (Hons.)', 'BBA LLB (Hons.)', 'LL.B. (Hons.)']
      },
      {
        name: 'Bachelor of Science [B.Sc] (Hons.)',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Forensic Science']
      }
    ],
    placements: {
      highest: 'INR 1.50 Crore',
      average: 'INR 4.53 LPA (PG Median)',
      lowest: 'INR 2.85 LPA (UG Median)',
      recruiters: [
        'Salesforce',
        'TCS',
        'Infosys',
        'Wipro',
        'Cognizant',
        'Juspay',
        'ZS Associates',
        'Capgemini',
        'IBM'
      ]
    },
    scholarships: [
      {
        name: 'SAGE Merit & SEE Scholarship Slab A',
        criteria: '95% and above in qualifying exam or SEE',
        benefits: '100% Tuition Fee Waiver'
      },
      {
        name: 'SAGE Merit & SEE Scholarship Slab B',
        criteria: '90% - 95% in qualifying exam',
        benefits: '50% Tuition Fee Waiver'
      },
      {
        name: 'SAGE Merit & SEE Scholarship Slab C',
        criteria: '80% - 90% in qualifying exam',
        benefits: '25% Tuition Fee Waiver'
      },
      {
        name: 'SAGE Merit & SEE Scholarship Slab D / E',
        criteria: '70% - 80% (15%) or 60% - 70% (10%) in qualifying exam',
        benefits: '10% to 15% Tuition Fee Waiver'
      },
      {
        name: 'Early Bird Scheme',
        criteria: 'First Year UG/PG/Diploma early application',
        benefits: '10% Tuition Fee Waiver (First Year)'
      }
    ]
  },
  {
    id: 'nmims-indore',
    name: 'SVKM\'s NMIMS Indore Campus',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 950000,
    rating: 4.5,
    totalReviews: 114,
    image: "/college-images/SVKM's NMIMS/SVKM's NMIMS.webp",
    campusPhoto: "/college-images/SVKM's NMIMS/SVKM's NMIMS.webp",
    description: 'SVKM\'s NMIMS Indore (Deemed to be University), established in 2017, is a multidisciplinary campus approved by AICTE and recognized by UGC with NAAC accreditation. Located off the Super Corridor at Bada Bangarda, the campus operates schools across Management (SBM), Technology Management & Engineering (STME), Commerce (SOC), Law (SOL), and Pharmacy & Technology Management (SPTM).',
    facilities: [
      'Bloomberg Terminals',
      'Smart Boardrooms',
      'Central Library (e-journals and print books)',
      'A/C Classrooms & Hostels',
      'Sports Courts (Cricket, Basketball, Badminton)',
      'Central Air-conditioned Auditorium',
      'Research & Innovation Labs',
      'Canteen / Cafeteria',
      'Round-the-clock Security'
    ],
    facilityImages: {
      'Bloomberg Terminals': "/college-images/SVKM's NMIMS/SVKM's NMIMS Bloomberg Terminals.jpg",
      'Smart Boardrooms': "/college-images/SVKM's NMIMS/SVKM's NMIMS Smart Boardrooms.jpg",
      'Central Library (e-journals and print books)': "/college-images/SVKM's NMIMS/SVKM's NMIMS Central Library.webp",
      'A/C Classrooms & Hostels': "/college-images/SVKM's NMIMS/SVKM's NMIMS Classrooms & Hostels.webp",
      'Sports Courts (Cricket, Basketball, Badminton)': "/college-images/SVKM's NMIMS/SVKM's NMIMS Sports Courts.webp",
      'Central Air-conditioned Auditorium': "/college-images/SVKM's NMIMS/SVKM's NMIMSCentral Air-conditioned Auditorium.jpg",
      'Research & Innovation Labs': "/college-images/SVKM's NMIMS/SVKM's NMIMS-Research & Innovation Labs'.jpeg",
      'Canteen / Cafeteria': "/college-images/SVKM's NMIMS/SVKM's NMIMS Canteen Cafeteria.jpg",
      'Round-the-clock Security': "/college-images/SVKM's NMIMS/SVKM's NMIMS Round-the-clock Security.webp"
    },
    establishedYear: 2017,
    coordinates: { lat: 22.771, lng: 75.815 },
    address: 'Off Super Corridor, Bada Bangarda, Tehsil: Hatod, Indore - 453112, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 5 km)',
    approval: 'UGC Recognized Deemed-to-be-University, AICTE, BCI & PCI Approved',
    selectionCriteria: 'Entrance-based. MBA via NMAT by GMAC + Competency Assessment + Personal Interview. B.Tech / B.Pharm via NMIMS-CET. BBA / B.Com via NPAT. BA LLB / BBA LLB (Hons.) via NMIMS LAT or CLAT.',
    updates: [
      'Published annual/first-year fee benchmarks list MBA at ₹9.50–10.00 Lakhs/year, B.Tech at ₹2.25 Lakhs/year, BBA at ₹2.75 Lakhs/year, B.Com at ₹1.50 Lakhs/year, B.Pharm at ₹1.77 Lakhs/year, and BA LLB / BBA LLB at ₹2.00 Lakhs/year.',
      'NMAT 2026 testing window is active for the upcoming MBA intake cycle, alongside admissions across STME, SPTM, Commerce, and Law.'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹9.50 Lakhs - ₹10.00 Lakhs (Annual Fees)',
        specializations: [
          'Finance',
          'Marketing',
          'Human Resource Management',
          'Strategy',
          'Analytics',
          'Business Intelligence',
          'Operations'
        ]
      },
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹2.25 Lakhs (Annual Fees)',
        specializations: ['Computer Engineering', 'Artificial Intelligence & Data Science']
      },
      {
        name: 'MBA Tech (B.Tech + MBA Integrated)',
        duration: '5 Years',
        fees: '₹2.85 Lakhs - ₹3.00 Lakhs (Annual Fees)',
        specializations: ['Computer Engineering']
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3-4 Years',
        fees: '₹2.75 Lakhs (Annual Fees)'
      },
      {
        name: 'Bachelor of Commerce [B.Com] / B.Com (Hons.)',
        duration: '3-4 Years',
        fees: '₹1.50 Lakhs (Annual Fees)'
      },
      {
        name: 'B.A., LL.B. (Hons.) / B.B.A., LL.B. (Hons.)',
        duration: '5 Years',
        fees: '₹2.00 Lakhs (Annual Fees)'
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharm]',
        duration: '4 Years',
        fees: '₹1.77 Lakhs (Annual Fees)'
      },
      {
        name: 'MBA Pharma Tech (B.Pharm + MBA Integrated)',
        duration: '5 Years',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 10.00 LPA',
      average: 'INR 7.95 LPA',
      lowest: 'INR 5.40 LPA (B.Tech Highest)',
      recruiters: [
        'KPMG',
        'Grant Thornton',
        'Uber',
        'PwC',
        'Swiggy',
        'Marico',
        'EY',
        'Reliance',
        'ICICI Securities',
        'TCS',
        'Consultadd',
        'VI',
        'Zebronics',
        'Mahindra'
      ]
    },
    scholarships: [
      {
        name: 'Chancellor\'s Scholarships for MBA',
        criteria: 'Based on merit in entrance exam + PI',
        benefits: 'INR 2,00,000 disbursement adjusted in second year fees'
      },
      {
        name: 'Academic Excellence Scholarship',
        criteria: 'Top 10% students with highest CGPA in batch',
        benefits: 'Tuition Fee concessions and cash awards'
      }
    ]
  },
  {
    id: 'apj-kalam-univ',
    name: 'Dr. A.P.J. Abdul Kalam University',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'Private University',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 25000,
    rating: 3.6,
    totalReviews: 39,
    image: '/college-images/AKU/AKU.webp',
    campusPhoto: '/college-images/AKU/AKU.webp',
    description: 'Dr. A.P.J. Abdul Kalam University (AKU) Indore is a private university located along the Indore–Dewas Bypass Road (Village Arandia, Indore). It offers undergraduate, postgraduate, diploma, and doctoral programs across Engineering, Pharmacy, Management, Computer Applications, Commerce, Science, Arts, Education, Library Science, Design, and Law.',
    facilities: [
      'Smart Classrooms',
      'Advanced Laboratories',
      'Digital Library',
      'Lecture Halls',
      'Auditorium & Seminar Halls',
      'Research & Innovation Labs',
      'Central Cafeteria',
    ],
    facilityImages: {
      'Smart Classrooms': '/college-images/AKU/AKU-Smart Classrooms.webp',
      'Advanced Laboratories': '/college-images/AKU/AKU-Advanced Laboratorie.webp',
      'Digital Library': '/college-images/AKU/AKU-Digital Library.webp',
      'Lecture Halls': '/college-images/AKU/AKU-Lecture Halls.webp',
      'Auditorium & Seminar Halls': '/college-images/AKU/AKU-Auditorium & Seminar Halls.webp',
      'Research & Innovation Labs': '/college-images/AKU/AKU-Research & Innovation Labs.webp',
      'Central Cafeteria': '/college-images/AKU/AKU-Central Cafeteria.webp'
    },
    establishedYear: 2011,
    coordinates: { lat: 22.782, lng: 75.918 },
    address: 'Indore–Dewas Bypass Road, Village Arandia, Indore, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 25 km)',
    approval: 'Private University (UGC Recognized; AICTE / PCI / NCTE / BCI program approvals as applicable)',
    selectionCriteria: 'Entrance-based and merit-based admission as per university norms and applicable regulatory eligibility for each program.',
    updates: [
      'Published annual tuition fee details on aku.ac.in list B.E. at ₹25,000/year, M.Tech at ₹30,000/year (Structural: ₹50,000/year), B.Pharm & D.Pharm at ₹60,000/year, M.Pharm at ₹70,000/year, MBA at ₹25,000/year, and MCA at ₹20,000/year.',
      'Optional university charges published for 2026–27 include bus fee (₹20,000/year), boys hostel excluding meals (₹30,000), and enrollment fee (₹500).'
    ],
    coursesList: [
      {
        name: 'Bachelor of Engineering [BE]',
        duration: '4 Years',
        fees: '₹25,000 (Annual Tuition)',
        specializations: [
          'Computer Science and Engineering',
          'Information Technology',
          'Electronics & Communication Engineering',
          'Electrical & Electronics Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹25,000 (Annual Tuition)',
        specializations: [
          'Civil Engineering',
          'Mechanical Engineering',
          'Electrical Engineering',
          'Computer Science & Engineering',
          'Electronics & Telecommunication'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹30,000 - ₹50,000 (Annual Tuition)',
        specializations: [
          'Computer Science & Engineering',
          'Cyber Security',
          'Digital Communication',
          'Power System',
          'Thermal Engineering',
          'Structural Engineering',
          'Computer Technology & Applications'
        ]
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharm]',
        duration: '4 Years',
        fees: '₹60,000 (Annual Tuition)'
      },
      {
        name: 'Diploma in Pharmacy [D.Pharm]',
        duration: '2 Years',
        fees: '₹60,000 (Annual Tuition)'
      },
      {
        name: 'Master of Pharmacy [M.Pharm]',
        duration: '2 Years',
        fees: '₹70,000 (Annual Tuition)'
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹25,000 (Annual Tuition)',
        specializations: ['General', 'Hospital Administration']
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹20,000 (Annual Tuition)'
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3-4 Years',
        fees: '₹15,000 (Annual Tuition)'
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3-4 Years',
        fees: '₹15,000 (Annual Tuition)'
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3-4 Years',
        fees: '₹15,000 - ₹45,000 (Annual Tuition)',
        specializations: ['Physics', 'Chemistry', 'Biochemistry', 'Agriculture']
      },
      {
        name: 'Bachelor of Education [B.Ed]',
        duration: '2 Years',
        fees: '₹60,000 (Annual Tuition)'
      },
      {
        name: 'Bachelor of Laws [L.L.B.] / B.A. LL.B.',
        duration: '3-5 Years',
        fees: '₹20,000 - ₹45,000 (Annual Tuition)'
      },
      {
        name: 'Master of Laws [LL.M.]',
        duration: '2 Years',
        fees: 'Varies'
      },
      {
        name: 'Ph.D',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Management Studies']
      }
    ],
    placements: {
      highest: 'INR 10.89 LPA',
      average: 'INR 5.00 LPA (Estimated)',
      lowest: 'INR 1.89 LPA',
      recruiters: [
        'Tata Technologies',
        'Tech Mahindra',
        'WNS',
        'OCS',
        'Vodafone',
        'Concentrics',
        'L&T',
        'REYNA',
        'TCS',
        'Infosys',
        'Wipro',
        'Cognizant',
        'HCL',
        'Amazon'
      ]
    },
    scholarships: [
      {
        name: 'Government Post-Matric Scholarship',
        criteria: 'Reserved category SC/ST/OBC and low-income students',
        benefits: 'Tuition and maintenance fee exemptions as per state norms'
      }
    ]
  },
  {
    id: 'oriental-university',
    name: 'Oriental University',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Sanwer Road',
    feePerAnnum: 100000,
    rating: 3.8,
    totalReviews: 101,
    image: '/college-images/Oriental University/Oriental University.webp',
    campusPhoto: '/college-images/Oriental University/Oriental University.webp',
    description: 'Oriental University Indore, established in 2011 under Section 2(f) of the UGC Act, is a private university located along the Sanwer Road opposite Reoti Range (Gate No. 1, Jakhya). It offers undergraduate, postgraduate, diploma, and doctoral programs across engineering, pharmacy, management, computer applications, sciences, arts, education, and law.',
    facilities: [
      'Fully Residential Campus (77 Acres)',
      'Central Library (42,000+ books)',
      'Hostels (Separate Boys & Girls)',
      'Attached Washroom Hostels with Wi-Fi',
      'Spacious Laboratories & Equipment',
      'Sports Complex & Gymnasium',
      'Auditorium & Seminar Halls',
      'Hygienic Cafeteria',
    ],
    facilityImages: {
      'Fully Residential Campus (77 Acres)': '/college-images/Oriental University/Fully Residential Campus.webp',
      'Central Library (42,000+ books)': '/college-images/Oriental University/Central Library.webp',
      'Hostels (Separate Boys & Girls)': '/college-images/Oriental University/Hostels.webp',
      'Attached Washroom Hostels with Wi-Fi': '/college-images/Oriental University/Attached Washroom Hostels with Wi-Fi.webp',
      'Spacious Laboratories & Equipment': '/college-images/Oriental University/Spacious Laboratories & Equipment.webp',
      'Sports Complex & Gymnasium': '/college-images/Oriental University/Sports Complex & Gymnasium.webp',
      'Auditorium & Seminar Halls': '/college-images/Oriental University/Auditorium & Seminar Halls.webp',
      'Hygienic Cafeteria': '/college-images/Oriental University/Hygienic Cafeteria.webp'
    },
    establishedYear: 2011,
    coordinates: { lat: 22.795, lng: 75.842 },
    address: 'Opp. Reoti Range, Gate No. 1, Jakhya, Sanwer Road, Indore, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'UGC Recognized Private University (Section 2(f)); AICTE / PCI / BCI / NCTE program approvals as applicable',
    selectionCriteria: 'Entrance-based and merit-based admission via national/state tests (JEE Main, CAT, MAT, XAT, CMAT, CLAT, GPAT, as applicable) or qualifying exam merit.',
    updates: [
      'Admissions 2026–27 are open across UG, PG, diploma, and doctoral programs (admission helpline: 0731-3565036 / 93436-96063 to 67).',
      'Published 2026–27 tuition benchmarks list B.Tech at ₹1.20–4.00 Lakhs total tuition (₹1,00,000/year for B.Tech CSE), MBA at ₹90,000–1.80 Lakhs total tuition, and B.Pharm at ₹2.30–3.60 Lakhs total tuition.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹1.20 Lakhs - ₹4.00 Lakhs (Total Tuition)',
        specializations: [
          'Computer Science and Engineering',
          'Artificial Intelligence & Machine Learning',
          'Data Science',
          'Cyber Security',
          'Gaming & Animation (Gaming Technology)',
          'Robotics and Automation',
          'Mechatronics',
          'Electric Vehicle Technology',
          'Construction Technology & Smart Cities',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electronics & Communication Engineering',
          'Electrical & Electronics Engineering'
        ]
      },
      {
        name: 'Diploma in Engineering',
        duration: '3 Years',
        fees: 'Varies',
        specializations: [
          'Computer Science and Engineering',
          'Artificial Intelligence & ML',
          'Gaming & Animation',
          'Civil Engineering',
          'Mechanical Engineering',
          'Electrical and Electronics Engineering',
          'Electronics and Communication Engineering'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹1.00 Lakh - ₹1.80 Lakhs (Total Tuition)',
        specializations: [
          'Artificial Intelligence & ML',
          'Cyber Security',
          'Computer Networks',
          'Digital Communication',
          'VLSI Design and Technology',
          'Electric Vehicle (EV)',
          'Power Systems',
          'Power Electronics',
          'CAD-CAM',
          'Machine Design',
          'Thermal Engineering',
          'Construction Technology and Management',
          'Structural Engineering'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹1.35 Lakhs - ₹2.10 Lakhs (Total Tuition)',
        specializations: [
          'Core',
          'Business Intelligence and Analytics (BIA)',
          'BFSI',
          'Digital Marketing',
          'International Business'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹90,000 - ₹1.80 Lakhs (Total Tuition)',
        specializations: [
          'Finance',
          'Human Resources',
          'Information Technology',
          'Marketing',
          'Data Analytics and Data Visualization',
          'International Business'
        ]
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹1.50 Lakhs (Total Tuition)',
        specializations: [
          'Plain',
          'Artificial Intelligence and Data Analysis',
          'Data Science and Data Visualization',
          'Full Stack Development'
        ]
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹1.23 Lakhs (Total Fees)',
        specializations: [
          'Plain',
          'Artificial Intelligence & Machine Learning',
          'Full Stack Development'
        ]
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharm]',
        duration: '4 Years',
        fees: '₹2.30 Lakhs - ₹3.60 Lakhs (Total Tuition)'
      },
      {
        name: 'Master of Pharmacy [M.Pharm]',
        duration: '2 Years',
        fees: '₹1.83 Lakhs (Total Fees)'
      },
      {
        name: 'Bachelor of Science [B.Sc] / B.Sc (Hons.)',
        duration: '3-4 Years',
        fees: '₹82,500 - ₹2.80 Lakhs (Total Tuition)',
        specializations: [
          'Agriculture',
          'Biotechnology',
          'Computer Science',
          'Forensic Science',
          'Microbiology',
          'Multimedia Animation and Design',
          'Nutrition & Dietetics',
          'Medical Lab Technology (MLT)',
          'Optometry',
          'Radiology Technology (RLT)',
          'Cardio-Vascular Technology',
          'Operation Theatre & Anesthesia Technology'
        ]
      },
      {
        name: 'Master of Science [M.Sc]',
        duration: '2 Years',
        fees: '₹70,000 - ₹1.53 Lakhs (Total Tuition)',
        specializations: [
          'Biotechnology',
          'Chemistry',
          'Mathematics',
          'Physics',
          'Forensic Science (Criminology)',
          'Microbiology',
          'Agronomy',
          'Horticulture Science'
        ]
      },
      {
        name: 'B.A. LL.B. (Hons.) / LL.B. (Hons.)',
        duration: '3-5 Years',
        fees: '₹1.50 Lakhs - ₹3.50 Lakhs (Total Tuition)',
        specializations: ['Business Law', 'Constitutional Law', 'Crime & Criminology']
      },
      {
        name: 'Bachelor of Education [B.Ed]',
        duration: '2 Years',
        fees: '₹1.40 Lakhs (Total Tuition)'
      },
      {
        name: 'Bachelor of Arts [BA]',
        duration: '3 Years',
        fees: '₹62,500 - ₹68,500 (Total Fees)',
        specializations: ['Economics', 'History', 'Political Science', 'Psychology', 'Sociology', 'Yoga']
      },
      {
        name: 'Ph.D',
        duration: '3 Years',
        fees: '₹3.03 Lakhs (Total Fees)',
        specializations: ['Library & Information Science', 'Management', 'Engineering', 'Sciences']
      }
    ],
    placements: {
      highest: 'INR 72.00 LPA',
      average: 'INR 5.30 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: [
        'Accenture',
        'Axis Bank',
        'Infosys',
        'HCL Technologies',
        'Wipro',
        'TATA',
        'Force Motors',
        'HDFC Bank',
        'Mankind',
        'Persistent Ltd',
        'Syntel',
        'TCS',
        'Tech Mahindra',
        'L&T Finance',
        'Lupin'
      ]
    },
    scholarships: [
      {
        name: 'OU-ASPIRE Merit & Early Bird Scholarship',
        criteria: 'Qualifying score and early registration slabs',
        benefits: 'Tuition fee rebate slabs as per university schedule'
      },
      {
        name: 'Government & Special Rebate Schemes',
        criteria: 'SC/ST/OBC post-matric, minority, girl child, EWS, PWD, or defence wards',
        benefits: 'Government scholarship and applicable university fee concessions'
      }
    ]
  },
  {
    id: 'medi-caps-university',
    name: 'Medi-Caps University',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Rau',
    feePerAnnum: 234250,
    rating: 4.4,
    totalReviews: 484,
    image: '/college-images/Medi-Caps University/MEDI-CAPS.webp',
    description: 'Medi-Caps University, established in 2000, is a highly popular state-of-the-art private university. Consistently ranked 1st in Madhya Pradesh for placements by the Times Engineering Survey, it features excellent infrastructure, a 94% placement rate, a robust career cell, and extensive sports facilities on a sprawling campus near Rau.',
    facilities: ['High Speed Computer Labs', 'State of art Workshops', 'Basketball Stadium', 'Modern Gym', 'Central Library (e-Resources)', 'Separate Girls/Boys Hostels', 'Hygienic Canteens', 'Research Centers'],
    facilityImages: {
      'High Speed Computer Labs': '/college-images/Medi-Caps University/medicaps Computer-Lab.jpg',
      'State of art Workshops': '/college-images/Medi-Caps University/MEDI-CAPS-State of art Workshops.webp',
      'Basketball Stadium': '/college-images/Medi-Caps University/MEDI-CAPS-Basketball Stadium.webp',
      'Modern Gym': '/college-images/Medi-Caps University/MEDI-CAPS-Modern Gym.webp',
      'Central Library (e-Resources)': '/college-images/Medi-Caps University/MEDI-CAPS-Central Library.webp',
      'Separate Girls/Boys Hostels': '/college-images/Medi-Caps University/MEDI-CAPS-Separate Hostels.webp',
      'Hygienic Canteens': '/college-images/Medi-Caps University/MEDI-CAPS-Canteens.webp',
      'Research Centers': '/college-images/Medi-Caps University/MEDI-CAPS-Research Centers.webp'
    },
    establishedYear: 2000,
    coordinates: { lat: 22.621, lng: 75.803 },
    address: 'A.B. Road, Pigdamber, Rau, Indore - 453331, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 18 km)',
    approval: 'Private University (UGC Recognized; AICTE / PCI / regulatory program approvals as applicable)',
    selectionCriteria: 'Entrance-based and merit-based admission via MU-SAT / MLAT or national/state entrance tests (as applicable) and qualifying exam eligibility.',
    updates: [
      'Official contact channels on medicaps.ac.in list admission@medicaps.ac.in, info@medicaps.ac.in, 0731-3111500 / 0731-3111501, and admission line +91 7969024444.',
      '2026 published fee schedules list B.Tech CSE at ~₹9.37 Lakhs total (₹2,34,250/year), MBA at ₹3.97–6.67 Lakhs total for core/specialized tracks, B.Pharm at ₹7.37 Lakhs total, and BCA at ₹3.17 Lakhs total.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹5.77 Lakhs - ₹12.77 Lakhs (Total Fees)',
        specializations: [
          'Computer Science and Engineering',
          'CSE - Artificial Intelligence',
          'CSE - Artificial Intelligence and Machine Learning',
          'CSE - Artificial Intelligence & Analytics',
          'CSE - Data Science',
          'CSE - Cyber Security',
          'CSE - Internet of Things',
          'CSE - Networks',
          'Computer Science and Business Systems (CSBS)',
          'Information Technology',
          'Robotics and Automation',
          'Automobile Engineering (Electric Vehicle)',
          'Electronics & Communication Engineering',
          'ECE - VLSI & Packaging',
          'ECE - Semiconductor Design',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹1.77 Lakhs (Total Fees)',
        specializations: [
          'Computer Science and Engineering',
          'Information Technology',
          'Electronics and Communication',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Nanotechnology'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹3.97 Lakhs - ₹6.67 Lakhs (Total Fees)',
        specializations: [
          'Finance',
          'Marketing',
          'Human Resources',
          'Business Analytics',
          'Foreign Trade'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹4.22 Lakhs - ₹7.67 Lakhs (Total Fees)',
        specializations: ['General', 'Business Analytics']
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹3.17 Lakhs - ₹6.10 Lakhs (Total Fees)',
        specializations: ['General', 'Artificial Intelligence', 'Cyber Security']
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹2.77 Lakhs (Total Fees)',
        specializations: ['General', 'Artificial Intelligence', 'Data Science']
      },
      {
        name: 'Bachelor of Commerce [B.Com] (Hons.)',
        duration: '3-4 Years',
        fees: '₹2.72 Lakhs (Total Fees)',
        specializations: ['Plain', 'Global Finance with ACCA', 'Chartered Financial Analyst']
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharm]',
        duration: '4 Years',
        fees: '₹7.37 Lakhs (Total Fees)'
      },
      {
        name: 'Master of Pharmacy [M.Pharm]',
        duration: '2 Years',
        fees: '₹2.97 Lakhs (Total Fees)'
      },
      {
        name: 'Bachelor of Science [B.Sc] / B.Sc (Hons.)',
        duration: '3-4 Years',
        fees: '₹2.42 Lakhs - ₹7.37 Lakhs (Total Fees)',
        specializations: [
          'Agriculture',
          'Biotechnology',
          'Computer Science',
          'Forensic Science',
          'Medical Laboratory Technology (MLT)',
          'Anaesthesia & Operation Theatre Technology',
          'Cardiovascular Technology',
          'Respiratory Technology'
        ]
      },
      {
        name: 'B.A. LL.B. (Hons.) / B.B.A. LL.B. (Hons.) / LL.B. (Hons.)',
        duration: '3-5 Years',
        fees: '₹4.67 Lakhs (LL.B. Hons. Total Fees)'
      },
      {
        name: 'Ph.D',
        duration: '3 Years',
        fees: '₹3.17 Lakhs (Total Fees)',
        specializations: [
          'Engineering',
          'Computer Applications',
          'Commerce',
          'Management',
          'Sciences'
        ]
      }
    ],
    placements: {
      highest: 'INR 48.00 LPA',
      average: 'INR 6.50 LPA',
      lowest: 'INR 3.80 LPA',
      recruiters: [
        'Amazon',
        'TCS',
        'Infosys',
        'Cognizant',
        'Wipro',
        'Capgemini',
        'Force Motors',
        'ICICI Bank',
        'Reliance',
        'Apollo'
      ]
    },
    scholarships: [
      {
        name: 'Board Toppers & District Toppers Scholarship',
        criteria: 'Top 5 State Board (stream-wise) or Top 5 MP Board District Topper',
        benefits: 'Tuition Fee Waiver (plus free accommodation subject to availability for State Board toppers)'
      },
      {
        name: 'Meritorious & MU-SAT/MLAT Scholarship',
        criteria: '95%+ in Board or top MU-SAT/MLAT merit/rank slabs',
        benefits: 'Up to 50% Tuition Fee / rank-based tuition waiver slabs'
      },
      {
        name: 'Alumni & Financially Under-privileged Scholarship',
        criteria: 'MU Alumni/dependents (8+ CGPA/80%+) or BPL/income ≤ ₹2 Lakh (80%+)',
        benefits: '25% Tuition Fee waiver (1st year / merit continuation criteria)'
      }
    ]
  },
  {
    id: 'prestige-university',
    name: 'Prestige University',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 550000,
    rating: 4.4,
    totalReviews: 38,
    image: '/college-images/Prestige University/Prestige University.webp',
    campusPhoto: '/college-images/Prestige University/Prestige University.webp',
    description: 'Prestige University Indore is a private university located along the Ujjain–Indore Road at Ringnodiya (Survey No. 203, Indore). It offers undergraduate, integrated master\'s, postgraduate, and executive programs across management, computing, quantitative economics, data science, and engineering.',
    facilities: [
      'Incubation Centers',
      'A/C Lecture Theatres',
      'Executive Dining Lounge',
      'Creative Design Studios',
      'Bloomberg Labs',
      'Hi-tech Computer Hubs',
      'Sports Grounds'
    ],
    facilityImages: {
      'Incubation Centers': '/college-images/Prestige University/Incubation Centers.jpg',
      'A/C Lecture Theatres': '/college-images/Prestige University/AC Lecture Theatres.webp',
      'Executive Dining Lounge': '/college-images/Prestige University/Executive Dining Lounge.webp',
      'Creative Design Studios': "/college-images/Prestige University/'Creative Design Studios.webp",
      'Bloomberg Labs': '/college-images/Prestige University/Bloomberg Labs.webp',
      'Hi-tech Computer Hubs': '/college-images/Prestige University/Hi-tech Computer Hubs.webp',
      'Sports Grounds': '/college-images/Prestige University/SPORTS.webp'
    },
    establishedYear: 2022,
    coordinates: { lat: 22.776, lng: 75.819 },
    address: 'Survey No. 203, Ringnodiya, Ujjain–Indore Road, Indore - 453551, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 14 km)',
    approval: 'UGC Recognized Private University, AIU Member',
    selectionCriteria: 'Entrance-based and merit-based admission via national/state tests (CAT, XAT, MAT, CMAT, ATMA, CUET, as applicable) or qualifying exam eligibility and interaction rounds.',
    updates: [
      'Official contact channels on prestigeuniversity.edu.in list admissions@prestigeuniversity.edu.in, +91 7869526994, 9849975781, and administration lines +91 731-3129103 to 110.',
      'Published 2026 fee schedules list MBA at ₹5,50,000/year (₹11.00 Lakhs total tuition), Executive MBA at ₹3,40,000/year (₹6.80 Lakhs total tuition; ₹4.99 Lakhs listed for 2-year Executive track), and 5-year integrated programs at ₹4,30,000/year (₹21.50 Lakhs total tuition).'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹5,50,000/year (₹11.00 Lakhs Total Tuition)',
        specializations: [
          'Business Analytics',
          'E-Commerce',
          'Food & Agri-Business',
          'Financial Technology',
          'International Business',
          'Finance',
          'Marketing',
          'Operations Management',
          'Entrepreneurship',
          'Human Resource Management'
        ]
      },
      {
        name: 'Executive Master\'s Program [XMP - Weekend MBA]',
        duration: '2 Years',
        fees: '₹4.99 Lakhs - ₹6.80 Lakhs (Total Tuition)',
        specializations: ['Strategic Leadership', 'BFSI', 'Analytics', 'Manufacturing']
      },
      {
        name: '5-Year Integrated Master\'s Program [IMP - Management]',
        duration: '5 Years',
        fees: '₹4,30,000/year (₹21.50 Lakhs Total Tuition)',
        specializations: ['BBA + MBA', 'BBA + M.Sc (Data Science)']
      },
      {
        name: '5-Year Integrated Master\'s Program [IMP - Computing]',
        duration: '5 Years',
        fees: '₹4,30,000/year (₹21.50 Lakhs Total Tuition)',
        specializations: [
          'BCA + M.Sc (Data Science)',
          'BCA + MBA',
          'B.Sc (Mathematics & Computing) + M.Sc (Data Science)',
          'B.Sc (Math & Computing) + MBA',
          'B.Tech (Computer Science) + M.Sc (Data Science)',
          'B.Tech (Computer Science) + MBA'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA] (Hons.)',
        duration: '3-4 Years',
        fees: '₹21.50 Lakhs - ₹22.50 Lakhs (Total Tuition)'
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Economics', 'Mathematics & Computing']
      },
      {
        name: 'B.Tech (Computer Science Engineering)',
        duration: '4 Years',
        fees: 'Varies',
        specializations: ['Artificial Intelligence & Machine Learning', 'Data Science']
      }
    ],
    placements: {
      highest: 'INR 18.00 LPA',
      average: 'INR 6.00 LPA - 8.50 LPA',
      lowest: 'INR 3.00 LPA - 4.50 LPA',
      recruiters: [
        'Deloitte',
        'PwC',
        'KPMG',
        'EY',
        'ICICI Bank',
        'HDFC Bank',
        'Amul',
        'ITC Ltd',
        'Federal Bank'
      ]
    },
    scholarships: [
      {
        name: 'Merit & Entrance-Based Scholarships',
        criteria: 'Qualifying national/state entrance test or academic merit slabs',
        benefits: 'Tuition fee concession slabs as per university policy'
      },
      {
        name: 'Sports and Cultural Excellence Scholarship',
        criteria: 'State/National level achievement certificates',
        benefits: 'Tuition fee rebate as per university policy'
      }
    ]
  },
  {
    id: 'renaissance-college',
    name: 'Renaissance College of Commerce & Management',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'UGC',
    location: 'Vijay Nagar',
    feePerAnnum: 75000,
    rating: 4.0,
    googleRating: 4.0,
    indoreRating: 4.5,
    totalReviews: 615,
    image: '/college-images/RCCM/RCCM.jpg',
    campusPhoto: '/college-images/RCCM/RCCM.jpg',
    description: 'Renaissance College of Commerce & Management (RCCM Indore), established in 2006, is a private higher education institution located at 45, Anurag Nagar (Behind Press Complex), Indore. It offers undergraduate programs across commerce, business administration, mass communication, computer applications, and sciences.',
    facilities: [
      'Radio Booths',
      'Corporate Placement Cell',
      'Modern Auditoriums',
      'Exhibition Corridors',
      'Rich Library',
      'Visual Media Labs',
      'Sports Fields'
    ],
    facilityImages: {
      'Radio Booths': '/college-images/RCCM/Radio Booths.jpg',
      'Corporate Placement Cell': '/college-images/RCCM/Corporate Placement Cell.webp',
      'Modern Auditoriums': '/college-images/RCCM/Auditoriums.webp',
      'Exhibition Corridors': '/college-images/RCCM/Exhibition Corridors.jpeg',
      'Rich Library': "/college-images/RCCM/Rich Library'.webp",
      'Visual Media Labs': '/college-images/RCCM/Visual Media Labs.webp',
      'Sports Fields': '/college-images/RCCM/Sports Fields.webp'
    },
    establishedYear: 2006,
    coordinates: { lat: 22.755, lng: 75.891 },
    address: '45, Anurag Nagar, Behind Press Complex, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 8 km)',
    approval: 'UGC Recognized (Section 2(f) & 12(B)); affiliated with DAVV as per institutional listings',
    selectionCriteria: 'Merit-based and screening admission as per applicable university/college guidelines.',
    updates: [
      'Official contact channels on rccmindore.com list info@rccmindore.edu.in, 0731-4262100 / 0731-4262101, and +91 8818802236 / +91 8818802286 at 45, Anurag Nagar, Behind Press Complex, Indore - 452001.',
      'Undergraduate offerings include B.Com., B.B.A., B.A. / B.A. (Honours) in Mass Communication, B.C.A., and B.Sc.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Commerce [B.Com] / B.Com (Hons.)',
        duration: '3-4 Years',
        fees: '₹75,000 (1st Year Fees)',
        specializations: [
          'Plain',
          'Honours',
          'Computer Application',
          'Taxation',
          'Management',
          'Foreign Trade',
          'B.Com + Business Analytics Certification'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA] / BBA (Hons.)',
        duration: '3 Years',
        fees: '₹85,000 (1st Year Fees)',
        specializations: [
          'General',
          'Finance',
          'Marketing',
          'Human Resource Management',
          'Foreign Trade'
        ]
      },
      {
        name: 'Bachelor of Arts [BA] / BA (Hons.)',
        duration: '3-4 Years',
        fees: '₹50,000 (1st Year Fees)',
        specializations: [
          'Mass Communication',
          'Journalism & Mass Communication',
          'Psychology',
          'Economics'
        ]
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3 Years',
        fees: '₹55,000 (1st Year Fees)',
        specializations: ['Computer Science', 'Biotechnology']
      }
    ],
    placements: {
      highest: 'INR 10.50 LPA',
      average: 'INR 4.20 LPA',
      lowest: 'INR 2.80 LPA',
      recruiters: [
        'HDFC Bank',
        'ICICI Bank',
        'TCS',
        'Teleperformance',
        'Wipro',
        'IndiGo',
        'Genpact',
        'Aditya Birla Group',
        'Byju\'s'
      ]
    },
    scholarships: [
      {
        name: 'Renaissance Merit Scholarship',
        criteria: '90% and above in 10+2 board exam',
        benefits: '20% reduction in first year fee'
      },
      {
        name: 'Sportsperson Rebate',
        criteria: 'State or National representation certificates',
        benefits: 'Partial fee waiving schemes'
      }
    ]
  },
  {
    id: 'pimr',
    name: 'Prestige Institute of Management & Research (PIMR)',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Autonomous',
    location: 'Scheme 54',
    feePerAnnum: 150000,
    rating: 4.0,
    googleRating: 4.0,
    indoreRating: 4.6,
    totalReviews: 531,
    image: '/college-images/PIMR/PIMR.jpg',
    campusPhoto: '/college-images/PIMR/PIMR.jpg',
    description: 'Prestige Institute of Management & Research (PIMR) Indore (Deemed to be University), established in 1994, operates across its Post Graduate Campus at Scheme No. 54 and its Under Graduate Campus & Department of Law at Scheme No. 74C, Vijay Nagar, Indore. It offers postgraduate, undergraduate, and law programs across management, commerce, computer applications, media/mass communication, and legal studies.',
    facilities: [
      'Dedicated Placement Cell',
      'Advanced Computer Center',
      'Digital Libraries',
      'Mock Parliament Room',
      'Moot Court Hall',
      'Seminar Halls',
      'Canteen',
      'Indoor/Outdoor Sports Facilities'
    ],
    facilityImages: {
      'Dedicated Placement Cell': '/college-images/PIMR/PIMR Dedicated Placement Cell.webp',
      'Advanced Computer Center': '/college-images/PIMR/PIMR Advanced Computer Center.webp',
      'Digital Libraries': '/college-images/PIMR/Digital Libraries.webp',
      'Mock Parliament Room': '/college-images/PIMR/Mock Parliament Room.webp',
      'Moot Court Hall': '/college-images/PIMR/Moot Court Hall.webp',
      'Seminar Halls': '/college-images/PIMR/Seminar Halls.webp',
      'Canteen': '/college-images/PIMR/Canteen.webp',
      'Indoor/Outdoor Sports Facilities': '/college-images/PIMR/Outdoor Sports Facilities.webp'
    },
    establishedYear: 1994,
    coordinates: { lat: 22.7538, lng: 75.886 },
    address: '2, Education & Health Sector, Scheme No. 54, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'UGC Recognized Deemed-to-be-University, AICTE & BCI Approved Programs, NAAC Grade A++ Accredited',
    selectionCriteria: 'Entrance-based and merit-based admission as per program norms (national/state management/law tests or qualifying exam merit and selection rounds).',
    updates: [
      'Official contact channels on pimrindore.ac.in list PG Campus (Scheme No. 54: 0731-4012222 / 0731-4012201 / 7869999297, admission_pg@pimrindore.ac.in) and UG Campus & Department of Law (Scheme No. 74C, Vijay Nagar: 7869913304 / 7869915072, admission_ug@pimrindore.ac.in, admission_law@pimrindore.ac.in).',
      'Published fee figures vary by program, campus, and fee-regulatory schedule; confirm current session fee breakups directly with the respective admissions office.'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹1,50,000 (1st Year Fees; varies by track)',
        specializations: [
          'Full-Time (Core / Dual Specialization)',
          'Marketing Management',
          'Financial Administration',
          'International Business',
          'Personnel Administration (HR)',
          'Advertising & Public Relations',
          'Business Analytics'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA] / BBA (Hons.)',
        duration: '3-4 Years',
        fees: '₹1,18,000 (1st Year Fees; varies by track)',
        specializations: ['General Management', 'Foreign Trade', 'Hotel Management']
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'Bachelor of Commerce [B.Com] (Hons.)',
        duration: '3-4 Years',
        fees: '₹85,000 (1st Year Fees; varies by track)'
      },
      {
        name: 'Bachelor of Arts in Journalism and Mass Communication [BAJMC]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'Master of Mass Communication [MMC]',
        duration: '2 Years',
        fees: 'Varies'
      },
      {
        name: 'B.A. LL.B. (Hons.) / B.B.A. LL.B. (Hons.) / B.Com. LL.B. (Hons.)',
        duration: '5 Years',
        fees: '₹1,10,000 (1st Year Fees; varies by track)'
      },
      {
        name: 'Bachelor of Laws [LL.B. (Hons.)]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'Master of Laws [LL.M.]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['Business Law', 'Criminal Law']
      }
    ],
    placements: {
      highest: 'INR 14.00 LPA',
      average: 'INR 5.80 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: [
        'Deloitte',
        'ICICI Bank',
        'HDFC Bank',
        'Aditya Birla Group',
        'TCS',
        'Nestle',
        'Asian Paints',
        'Federal Bank',
        'Colgate Palmolive'
      ]
    },
    scholarships: [
      {
        name: 'Prestige Foundation Scholarship',
        criteria: 'Class 12th board merit of 85%+',
        benefits: 'INR 25,000 Tuition Fee waiver'
      },
      {
        name: 'Government Post Matric Scholarship',
        criteria: 'SC/ST/OBC category low-income students',
        benefits: 'Full/Partial Tuition Fee waiving'
      }
    ]
  },
  {
    id: 'nmims-stme',
    name: 'SVKM\'s NMIMS School of Tech & Management',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 225000,
    rating: 4.4,
    totalReviews: 53,
    image: "/college-images/SVKM's NMIMS/SVKM's NMIMS.webp",
    campusPhoto: "/college-images/SVKM's NMIMS/SVKM's NMIMS.webp",
    description: 'The School of Technology Management & Engineering (STME) at SVKM\'s NMIMS Indore (Deemed to be University) is located off the Super Corridor at Bada Bangarda, Indore. It offers B.Tech in Computer Engineering and Artificial Intelligence & Data Science as well as the 5-year MBA Tech program in Computer Engineering.',
    facilities: [
      'Advanced Robotics Lab',
      'Server and Tech Control Center',
      'Fully Air-conditioned Study Halls',
      'Bloomberg Terminal Lab',
      'Hostels',
      'Sports Fields',
      'Canteen'
    ],
    facilityImages: {
      'Advanced Robotics Lab': "/college-images/SVKM's NMIMS/SVKM's NMIMS-Research & Innovation Labs'.jpeg",
      'Server and Tech Control Center': "/college-images/SVKM's NMIMS/SVKM's NMIMS Smart Boardrooms.jpg",
      'Fully Air-conditioned Study Halls': "/college-images/SVKM's NMIMS/SVKM's NMIMS Classrooms & Hostels.webp",
      'Bloomberg Terminal Lab': "/college-images/SVKM's NMIMS/SVKM's NMIMS Bloomberg Terminals.jpg",
      'Hostels': "/college-images/SVKM's NMIMS/SVKM's NMIMS Classrooms & Hostels.webp",
      'Sports Fields': "/college-images/SVKM's NMIMS/SVKM's NMIMS Sports Courts.webp",
      'Canteen': "/college-images/SVKM's NMIMS/SVKM's NMIMS Canteen Cafeteria.jpg"
    },
    establishedYear: 2017,
    coordinates: { lat: 22.7712, lng: 75.8152 },
    address: 'Off Super Corridor, Bada Bangarda, Tehsil: Hatod, Indore - 453112, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 5 km)',
    approval: 'UGC Recognized Deemed-to-be-University, AICTE Approved & NAAC Accredited',
    selectionCriteria: 'Entrance-based and merit-based admission via NMIMS-CET (or applicable non-NMIMS-CET / lateral entry routes as announced on the portal).',
    updates: [
      'Official contact channels on indore.nmims.edu list admission.indore@nmims.edu, +91 0731-2581500/05, and +91-9303191421.',
      'Published annual fee benchmarks list B.Tech at ₹2,25,000/year and MBA Tech at ₹2,85,000–3,00,000/year.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹2,25,000 (Annual Fees)',
        specializations: ['Computer Engineering', 'Artificial Intelligence & Data Science']
      },
      {
        name: 'MBA Tech (B.Tech + MBA Integrated)',
        duration: '5 Years',
        fees: '₹2,85,000 - ₹3,00,000 (Annual Fees)',
        specializations: ['Computer Engineering']
      }
    ],
    placements: {
      highest: 'INR 12.00 LPA (MBA Tech) / INR 7.00 LPA (B.Tech)',
      average: 'INR 9.50 LPA (MBA Tech) / INR 4.80 LPA (B.Tech)',
      lowest: 'INR 4.50 LPA',
      recruiters: [
        'KPMG',
        'EY',
        'PwC',
        'Grant Thornton',
        'TCS',
        'Capgemini',
        'Amdocs',
        'Infosys',
        'Cognizant'
      ]
    },
    scholarships: [
      {
        name: 'NMIMS Merit & Academic Scholarships',
        criteria: 'Entrance/academic merit and university scholarship guidelines',
        benefits: 'Tuition fee concessions as per university policy'
      }
    ]
  },
  {
    id: 'bm-college',
    name: 'BM College of Technology',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Khandwa Road',
    feePerAnnum: 45600,
    rating: 3.7,
    totalReviews: 28,
    image: '/college-images/BMCT/BMCT.webp',
    campusPhoto: '/college-images/BMCT/BMCT.webp',
    description: 'BM College of Technology (BMCT Indore), established in 2007 under the BM Group of Institutions, is located at Gram Gokanya near Chokhi Dhani on Khandwa Road, Indore (with a city office at Orbit Mall on A.B. Road). It offers undergraduate, postgraduate, and diploma programs in engineering and management.',
    facilities: [
      'CNC Machine Lab',
      'Canteen',
      'Hostel Accommodations',
      'Bus Fleet',
      'Central Workshop',
      'Library',
      'Sports Grounds'
    ],
    facilityImages: {
      'CNC Machine Lab': '/college-images/BMCT/CNC Machine Lab.webp',
      'Canteen': '/college-images/BMCT/Canteen.webp',
      'Hostel Accommodations': '/college-images/BMCT/Hostel Accommodations.webp',
      'Bus Fleet': '/college-images/BMCT/Bus Fleet.webp',
      'Central Workshop': '/college-images/BMCT/Central Workshop.webp',
      'Library': '/college-images/BMCT/Library.webp',
      'Sports Grounds': '/college-images/BMCT/Sports Grounds.webp'
    },
    establishedYear: 2007,
    coordinates: { lat: 22.6345, lng: 75.8795 },
    address: 'Gram Gokanya, Near Chokhi Dhani, Khandwa Road, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'AICTE Approved; affiliated with RGPV (engineering/diploma) as listed in institutional records',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MPPET / CMAT / GATE or qualifying exam merit and MP counseling norms.',
    updates: [
      'Official contact channels on bmcollege.ac.in list info@bmcollege.ac.in, 0731-2572131, +91-9926055906, and City Office at Orbit Mall No. 401–402, 4th Floor, A.B. Road, Indore.',
      'Published fee figures vary by program and source (such as ~₹45,600/year or ~₹91,200 total tuition for B.Tech tracks, ~₹49,500–55,000 for MBA, and ~₹38,250–76,500 for Diploma); confirm current session fees with the admissions office.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹45,600 (Annual Fee; varies by track)',
        specializations: [
          'Computer Science and Engineering',
          'Artificial Intelligence & Data Science',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electronics & Communication Engineering',
          'Electrical & Electronics Engineering'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹62,000 (Listed Tuition; varies)',
        specializations: [
          'Computer Science and Engineering',
          'Thermal Engineering',
          'Structural Engineering'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹49,500 - ₹55,000 (Listed Fees; varies)',
        specializations: ['Marketing', 'Finance', 'Human Resources']
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹38,250 (Listed Tuition; varies)',
        specializations: [
          'Mechanical Engineering',
          'Civil Engineering',
          'Computer Science and Engineering',
          'Electrical Engineering'
        ]
      }
    ],
    placements: {
      highest: 'INR 6.00 LPA',
      average: 'INR 3.20 LPA',
      lowest: 'INR 2.40 LPA',
      recruiters: [
        'TCS',
        'Infosys',
        'Capgemini',
        'Force Motors',
        'Teleperformance',
        'Pratibha Syntex',
        'Tata International'
      ]
    },
    scholarships: [
      {
        name: 'EWS Scheme Scholarship',
        criteria: 'Family income eligibility as per state norms',
        benefits: 'State-sponsored tuition rebate'
      },
      {
        name: 'Meritorious Scholarship',
        criteria: 'Qualifying academic merit criteria',
        benefits: 'Tuition fee waiver as per institutional policy'
      }
    ]
  },
  {
    id: 'chameli-devi',
    name: 'Chameli Devi Group of Institutions',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Khandwa Road',
    feePerAnnum: 78000,
    rating: 3.9,
    googleRating: 3.9,
    indoreRating: 4,
    totalReviews: 84,
    image: '/college-images/CDGI/CDGI.webp',
    campusPhoto: '/college-images/CDGI/CDGI.webp',
    description: 'Chameli Devi Group of Institutions (CDGI Indore), established in 2006 along Khandwa Road (Village Umrikheda, Indore), is a private higher education group accredited with NAAC A+ Grade (CGPA 3.39). It operates across engineering, pharmacy, management, computer applications, commerce, and law institutes with affiliations and approvals as applicable.',
    facilities: [
      'A/C Auditoriums',
      'Modern Science & Tech Labs',
      'Canteen Hub',
      'Cricket Ground (State level)',
      'High Speed Wi-Fi Campus',
      'Central Library',
      'Fleet of Buses',
      'Boys & Girls Hostels'
    ],
    facilityImages: {
      'A/C Auditoriums': '/college-images/CDGI/CDGI-Auditoriums.jpeg',
      'Modern Science & Tech Labs': '/college-images/CDGI/CDGI- Science & Tech Labs.avif',
      'Canteen Hub': '/college-images/CDGI/CDGI-Canteen Hub.avif',
      'Cricket Ground (State level)': '/college-images/CDGI/CDGI-Cricket Ground.avif',
      'High Speed Wi-Fi Campus': '/college-images/CDGI/CDGI-Speed Wi-Fi Campus.avif',
      'Central Library': '/college-images/CDGI/CDGI-Central Library.avif',
      'Fleet of Buses': '/college-images/CDGI/CDGI-Fleet of Buses.avif',
      'Boys & Girls Hostels': '/college-images/CDGI/CDGI-Boys & Girls Hostels.avif'
    },
    establishedYear: 2006,
    coordinates: { lat: 22.634, lng: 75.878 },
    address: 'Village Umrikheda, Khandwa Road, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 14 km)',
    approval: 'NAAC A+ Accredited (CGPA 3.39); AICTE, PCI & BCI program approvals as applicable',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MPPET / CMAT / GPAT or qualifying exam eligibility and counseling norms.',
    updates: [
      'Official contact channels on cdgi.edu.in list info@cdgi.edu.in, admission@cdgi.edu.in, +91 731 4243600, and +91 9981651000 / 9981621000.',
      'CDGI holds NAAC A+ accreditation (CGPA 3.39) and offers UG, PG, and diploma programs across engineering, pharmacy, management, commerce, computer applications, and law.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹78,000 (1st Year Fees; varies by branch)',
        specializations: [
          'Computer Science and Engineering',
          'Information Technology',
          'Artificial Intelligence & Data Science',
          'Computer Science and Information Technology',
          'Electronics & Communication Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['Computer Science and Engineering']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹72,000 (1st Year Fees; varies)',
        specializations: ['Full Time (FT)', 'Marketing Management (MM)', 'Financial Administration (FA)']
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: 'Varies'
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹48,000 (1st Year Fees; varies)',
        specializations: ['Plain', 'Foreign Trade']
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'B.Com.',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Plain', 'Computer Applications', 'Taxation']
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharm]',
        duration: '4 Years',
        fees: '₹82,000 (1st Year Fees; varies)'
      },
      {
        name: 'Diploma in Pharmacy [D.Pharm]',
        duration: '2 Years',
        fees: 'Varies'
      },
      {
        name: 'Master of Pharmacy [M.Pharm]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['Industrial Pharmacy', 'Pharmacology', 'Pharmaceutics']
      },
      {
        name: 'LL.B. (Hons.) / B.A. LL.B. (Hons.) / B.B.A. LL.B. (Hons.)',
        duration: '3-5 Years',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 12.50 LPA',
      average: 'INR 4.50 LPA',
      lowest: 'INR 3.20 LPA',
      recruiters: [
        'TCS',
        'Infosys',
        'Cognizant',
        'Capgemini',
        'Wipro',
        'Xoriant',
        'Daffodil Software',
        'Amdocs',
        'Jaro Education'
      ]
    },
    scholarships: [
      {
        name: 'Maa Chameli Devi Girls\' Student Scholarship',
        criteria: 'Girl students as per institutional scholarship rules',
        benefits: 'Tuition fee concession as per institutional policy'
      },
      {
        name: 'Merit, EWS & Sports Scholarships',
        criteria: 'Qualifying merit, EWS, sibling, or state/national sports criteria',
        benefits: 'Tuition fee concession / support as per institutional policy'
      }
    ]
  },
  {
    id: 'iist-indore',
    name: 'Indore Institute of Science & Technology',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Rau',
    feePerAnnum: 62000,
    rating: 4.4,
    googleRating: 4.4,
    indoreRating: 4.5,
    totalReviews: 968,
    image: '/college-images/IIST/IIST.avif',
    description: 'Indore Institute of Science & Technology (IIST Indore), established in 2003 along Rau–Pithampur Road opposite IIM Indore, is a private engineering and technical institute affiliated with RGPV and approved by AICTE with NAAC accreditation. It offers undergraduate and postgraduate programs across engineering and technology.',
    facilities: [
      'Advanced Computing Labs',
      'Hostel Block (Separate Boys & Girls)',
      'Digital Libraries',
      'Gymnasium',
      'Specialized Innovation Labs',
      'Sports Fields (Football, Cricket)',
      'Hygienic Canteens'
    ],
    facilityImages: {
      'Advanced Computing Labs': '/college-images/IIST/IIST Computing Labs.jpg',
      'Hostel Block (Separate Boys & Girls)': '/college-images/IIST/IIST Hostel Block.jpg',
      'Digital Libraries': '/college-images/IIST/IIST Digital Libraries.jpeg',
      'Gymnasium': '/college-images/IIST/IIST Sports Fields.jpeg',
      'Specialized Innovation Labs': '/college-images/IIST/IIST Innovation Labs.jpeg',
      'Sports Fields (Football, Cricket)': '/college-images/IIST/IIST Sports Fields.jpeg',
      'Hygienic Canteens': '/college-images/IIST/IIST Canteens.jpeg'
    },
    establishedYear: 2003,
    coordinates: { lat: 22.618, lng: 75.795 },
    address: 'Opposite IIM Indore, Rau-Pithampur Road, Rau, Indore - 453331, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'AICTE Approved, Affiliated to RGPV, NAAC Accredited',
    selectionCriteria: 'Entrance-based admission via JEE Main / MP DTE counseling (or GATE for M.E./M.Tech) and qualifying exam eligibility.',
    updates: [
      'Published fee benchmarks list B.Tech at ~₹62,000/year (₹2.48 Lakhs total for 4 years under MP Fee Regulatory Committee general rate; ₹1.42 Lakhs total tuition listed in select sources) and M.E./M.Tech at ₹62,000–1.24 Lakhs.',
      'Placement reports list top packages up to INR 12.50–18.00 LPA and average packages around INR 4.29–5.10 LPA with recruiters including TCS, Infosys, Cognizant, Wipro, Capgemini, Accenture, and Deloitte.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹62,000 (Annual Benchmark; ₹1.42L–2.48L total)',
        specializations: [
          'Computer Science and Engineering',
          'Information Technology',
          'Artificial Intelligence & Machine Learning',
          'Computer Science and Engineering - Data Science',
          'Robotics & Artificial Intelligence',
          'Electronics and Computer Science',
          'Electronics and Communication Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Civil Engineering with Computer Application'
        ]
      },
      {
        name: 'Master of Engineering / Master of Technology [M.E. / M.Tech]',
        duration: '2 Years',
        fees: '₹62,000 - ₹1,24,000 (Listed Fees; varies)',
        specializations: [
          'Computer Science and Engineering',
          'Artificial Intelligence and Machine Learning',
          'Data Science'
        ]
      }
    ],
    placements: {
      highest: 'INR 18.00 LPA',
      average: 'INR 4.29 LPA - 5.10 LPA',
      lowest: 'INR 3.20 LPA - 3.50 LPA',
      recruiters: [
        'TCS',
        'Infosys',
        'Cognizant',
        'Wipro',
        'Capgemini',
        'Accenture',
        'Deloitte',
        'Amdocs',
        'Persistent Ltd',
        'Juspay',
        'Syntel',
        'Daffodil'
      ]
    },
    scholarships: [
      {
        name: 'IIST Academic Excellence Scholarship',
        criteria: 'Above 85% in 10+2 PCM score',
        benefits: 'INR 15,000 Tuition Fee waiver annually'
      },
      {
        name: 'Government Domicile Support Schemes',
        criteria: 'SC/ST/OBC criteria compliance',
        benefits: 'Full tuition support waivers'
      }
    ]
  },
  {
    id: 'iet-davv',
    name: 'Institute of Engineering and Technology, DAVV',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'UGC',
    location: 'Takshashila Campus',
    feePerAnnum: 90500,
    rating: 4.3,
    googleRating: 4.3,
    indoreRating: 4.7,
    totalReviews: 377,
    image: '/college-images/IET-DAVV/IET-DAVV.webp',
    videoUrl: '/IET%20DAVV.mp4',
    backgroundVideoUrl: '/IET%20DAVV.mp4',
    description: 'The Institute of Engineering and Technology (IET DAVV), established in 1996 on the Takshashila Campus along Khandwa Road, is the engineering teaching institute of Devi Ahilya Vishwavidyalaya (DAVV), Indore. It offers undergraduate, postgraduate, and doctoral programs across engineering, technology, applied mathematics, management, and design.',
    facilities: [
      'IET Central Library',
      'High-speed Computer Labs',
      'Sports Ground',
      'Boys & Girls Hostels',
      'Auditorium',
      'Physics & Chemistry Labs',
      'Canteen',
      'Wi-Fi Access Points'
    ],
    facilityImages: {
      'IET Central Library': '/college-images/IET-DAVV/IET-DAVV-LIB.webp',
      'High-speed Computer Labs': '/college-images/IET-DAVV/IET-DAVV-Computer Labs.webp',
      'Sports Ground': '/college-images/IET-DAVV/IET-DAVV-Sports Ground.webp',
      'Boys & Girls Hostels': '/college-images/IET-DAVV/IET-DAVV-Boys & Girls Hostels.webp',
      'Auditorium': '/college-images/IET-DAVV/IET-DAVV-Auditorium.webp',
      'Physics & Chemistry Labs': '/college-images/IET-DAVV/IET-DAVV-Physics & Chemistry Labs.webp',
      'Canteen': '/college-images/IET-DAVV/IET-DAVV-Canteen.webp',
      'Wi-Fi Access Points': '/college-images/IET-DAVV/IET-DAVV-Computer Labs.webp'
    },
    establishedYear: 1996,
    coordinates: { lat: 22.7125, lng: 75.873 },
    address: 'Khandwa Road, Takshashila Campus, Indore - 452017, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'UGC Recognized University Teaching Institute (DAVV), AICTE Approved Programs',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MP DTE counseling (B.Tech), GATE (M.Tech), CAT/CMAT/MAT & selection rounds (MBA Tech Mgmt), or DAVV admission schedules.',
    updates: [
      'Official contact channels on ietdavv.edu.in list 0731-2361116 / 2361117 at Khandwa Road, Indore - 452017, with Dr. Pratosh Bansal as Director and Dr. Paresh Atri as Administrative Officer.',
      '2026–27 B.Tech schedule lists ₹47,750 (odd semester) and ₹42,750 (even semester) — ₹90,500/year (~₹3.62 Lakhs over 4 years, plus separate exam/caution/hostel charges as applicable); 2026–27 placement reports note early offers up to INR 34 LPA alongside ~INR 7.51–7.72 LPA average CTC.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹90,500 (Annual Fee; ₹3.62L 4-yr base, excl. exam/caution/hostel)',
        specializations: [
          'Computer Science & Engineering',
          'Information Technology',
          'Computer Science & Business Systems',
          'Electronics & Telecommunication Engineering',
          'Electronics & Instrumentation Engineering',
          'Electrical & Electronics Engineering',
          'Mechanical Engineering',
          'Industrial & Production Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'B.Tech (Part-Time / PTDC)',
        duration: '4 Years',
        fees: 'Varies',
        specializations: ['Mechanical Engineering']
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹79,000 - ₹1,27,000 (Listed Range; varies)',
        specializations: [
          'Computer Engineering (Software Engineering)',
          'Information Technology (Information Security)',
          'Electronics (Digital Communication)',
          'Electronics (IoT and Automation)',
          'Electronics & Instrumentation (Digital Instrumentation)',
          'Microelectronics & VLSI Design',
          'Mechanical Engineering (Design and Thermal)',
          'Industrial Engineering & Management'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹1,90,000 (Listed Total; varies)',
        specializations: ['Technology Management']
      },
      {
        name: 'Master of Science [M.Sc]',
        duration: '2 Years',
        fees: '₹46,422 (Listed Total; varies)',
        specializations: ['Applied Mathematics (Computing & Informatics)']
      },
      {
        name: 'Bachelor of Design [B.Des]',
        duration: '4 Years',
        fees: '₹1,30,500/year (Listed Benchmark; varies)',
        specializations: ['Product Design']
      }
    ],
    placements: {
      highest: 'INR 34.00 LPA (2026–27 early drive) / INR 62.00 LPA (2025)',
      average: 'INR 7.51 LPA - 7.72 LPA',
      lowest: 'INR 4.50 LPA',
      recruiters: [
        'Amazon',
        'Google',
        'Deloitte',
        'Cognizant',
        'Infosys',
        'TCS',
        'Wipro',
        'Barclays',
        'Groww',
        'Nvidia',
        'Accenture',
        'Zscaler'
      ]
    },
    scholarships: [
      {
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        criteria: 'MP State meritorious criteria compliance',
        benefits: 'Complete tuition fee funding support'
      },
      {
        name: 'Post Matric Scholarship',
        criteria: 'SC/ST/OBC category low-income students',
        benefits: 'State-sponsored academic rebates'
      }
    ]
  },
  {
    id: 'ips-engineering',
    name: 'IPS Academy Institute of Engineering & Science',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Rajendra Nagar',
    feePerAnnum: 125000,
    rating: 4,
    googleRating: 4,
    indoreRating: 4.3,
    totalReviews: 1100,
    image: '/college-images/IPS Academy/IPS-ACADEMY.webp',
    campusPhoto: '/college-images/IPS Academy/IPS-ACADEMY.webp',
    videoUrl: '/IPS .mp4',
    description: 'IPS Academy Institute of Engineering & Science (IES IPS Academy), established in 1994 on the IPS Academy campus at Knowledge Village, Rajendra Nagar, Indore, is an engineering institute approved by AICTE with NBA and NAAC accreditation. It offers undergraduate and postgraduate engineering programs, including Computer Science, IT, AI & ML, Data Science, IoT, Fire Technology & Safety Engineering, and core branches.',
    facilities: [
      'Fire Drills Ground',
      'Advanced Physics & Chemistry Labs',
      'Incubator Cell',
      'Swimming Pool (Olympic size)',
      'Central Library (1 Lakh+ books)',
      'Hostel Accommodations',
      'Auditorium',
      'Cricket Stadium'
    ],
    facilityImages: {
      'Fire Drills Ground': '/college-images/IPS Academy/IPS-Fire Drills Ground.jpg',
      'Advanced Physics & Chemistry Labs': '/college-images/IPS Academy/IPS-Advanced Physics & Chemistry Labs.webp',
      'Incubator Cell': '/college-images/IPS Academy/IPS-Incubator Cell.jpg',
      'Swimming Pool (Olympic size)': "/college-images/IPS Academy/IPS-'Swimming Pool.webp",
      'Central Library (1 Lakh+ books)': '/college-images/IPS Academy/IPS-Central Library.webp',
      'Auditorium': '/college-images/IPS Academy/IPS-Auditorium.webp',
      'Cricket Stadium': '/college-images/IPS Academy/IPS-Cricket Stadium.webp'
    },
    establishedYear: 1994,
    coordinates: { lat: 22.674, lng: 75.828 },
    address: 'Knowledge Village, Rajendra Nagar, A.B. Road, Indore - 452012, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved, NBA & NAAC Accredited; affiliated with RGPV as listed in institutional records',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MP DTE counseling (B.Tech), GATE / DTE (M.Tech), or applicable working-professional / qualifying eligibility norms.',
    updates: [
      'Official contact channels on ies.ipsacademy.org list admission.ies@ipsacademy.org, principal.ies@ipsacademy.org, +91-731-4014601 / 4014600, and IPS Academy central inquiry lines.',
      'Published 2026 fee listings indicate ~₹1,25,000/year for B.Tech tracks and ~₹85,000/year for M.E./M.Tech tracks; confirm exact branch-wise current fees with the admissions office.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹1,25,000 (1st Year Fees; varies by track)',
        specializations: [
          'Computer Science Engineering',
          'Computer Science and Information Technology',
          'Computer Science & Engineering (AI & ML)',
          'Computer Science and Engineering (Data Science)',
          'Computer Science and Engineering (IoT)',
          'Computer Science and Engineering (IoT & Cyber Sec. Incl. Block Chain)',
          'Computer Science and Engineering (Regional Language)',
          'Fire Technology & Safety Engineering',
          'Electronics and Communication Engineering',
          'Electrical and Electronics Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Chemical Engineering',
          'Working Professional - Civil / Mechanical / Electrical & Electronics Engineering'
        ]
      },
      {
        name: 'Master of Technology / Master of Engineering [M.E. / M.Tech]',
        duration: '2 Years',
        fees: '₹85,000 (1st Year Fees; varies by track)',
        specializations: [
          'Computer Science & Engineering',
          'Civil Engineering',
          'Fire Technology & Safety Engineering',
          'Industrial Safety Engineering',
          'Structural Engineering',
          'Electronics & Telecommunication Engineering',
          'Electrical Engineering',
          'Chemical Engineering',
          'Robotics',
          'Working Professional - Industrial Safety / Structural Engineering'
        ]
      }
    ],
    placements: {
      highest: 'INR 18.00 LPA',
      average: 'INR 5.20 LPA',
      lowest: 'INR 3.60 LPA',
      recruiters: [
        'IOCL',
        'ONGC',
        'Reliance Industries',
        'L&T',
        'TCS',
        'Infosys',
        'Cognizant',
        'Capgemini',
        'Wipro',
        'Eicher Motors'
      ]
    },
    scholarships: [
      {
        name: 'IPS Academy Merit Scholarship',
        criteria: 'Class 12th PCM academic merit criteria',
        benefits: 'Tuition fee waiver as per institutional policy'
      },
      {
        name: 'State Post Matric Scholarship Schemes',
        criteria: 'Reserved categories compliance',
        benefits: 'Full/Partial tuition fee waivers as per state norms'
      }
    ]
  },
  {
    id: 'lncts-indore',
    name: 'Lakshmi Narain College of Tech & Science',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Sanwer Road',
    feePerAnnum: 70000,
    rating: 3.9,
    totalReviews: 43,
    image: '/college-images/LNCTS/LNCTS.jpeg',
    campusPhoto: '/college-images/LNCTS/LNCTS.jpeg',
    description: 'Lakshmi Narain College of Technology & Science (LNCT / LNCTS Indore), established in 2004 along Sanwer Road at Bhawrasala (Reoti Range), is part of the LNCT Group in Indore. It offers undergraduate, postgraduate, and diploma programs across engineering, technology, and management.',
    facilities: [
      'Advanced Computer Labs',
      'Electrical & Electronics Workshops',
      'Central Library',
      'Spacious Classrooms',
      'Bus Fleet Services',
      'Sports Complex',
      'Canteen'
    ],
    facilityImages: {
      'Advanced Computer Labs': '/college-images/LNCTS/LNCTS Computer Labs.webp',
      'Electrical & Electronics Workshops': "/college-images/LNCTS/LNCTS-Electrical & Electronics Workshops'.webp",
      'Central Library': '/college-images/LNCTS/LNCTS-Central Library.webp',
      'Spacious Classrooms': "/college-images/LNCTS/LNTCS'Spacious Classrooms.webp",
      'Bus Fleet Services': '/college-images/LNCTS/LNCTS-Bus Fleet Services.webp',
      'Sports Complex': '/college-images/LNCTS/LNCTS-Sports Complex.webp',
      'Canteen': '/college-images/LNCTS/LNCTS-Canteen.webp'
    },
    establishedYear: 2004,
    coordinates: { lat: 22.784, lng: 75.929 },
    address: 'Bhawrasala, Reoti Range, Sanwer Road, Indore, Madhya Pradesh - 453555, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 15 km)',
    approval: 'AICTE Approved; affiliated with RGPV Bhopal and DAVV Indore as listed on institutional portals',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MP DTE counseling (B.Tech), GATE / MP DTE (M.Tech), CAT/MAT/CMAT/MP MET (MBA), or qualifying eligibility norms.',
    updates: [
      'Official contact channels on lnctindore.edu.in list admissions@lnctindore.com, info@lnctindore.com, +91 9752410850, and +91 9752410847 at Bhawrasala, Reoti Range, Sanwer Road, Indore - 453555.',
      'Published 2025–26 placement summaries list highest offers up to INR 32 LPA and average packages around INR 8.5 LPA across 350+ recruiters.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹70,000 (Approx. Annual Fee; subject to AFRC)',
        specializations: [
          'Computer Science & Engineering',
          'Information Technology',
          'Artificial Intelligence & Machine Learning',
          'Data Science',
          'Electronics & Communication Engineering',
          'Mechanical Engineering',
          'Electrical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹70,000 (Approx. Annual Fee; subject to AFRC)',
        specializations: ['Computer Science & Engineering', 'Data Science', 'Power System']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹70,000 (Approx. Annual Fee; subject to AFRC)',
        specializations: ['Marketing', 'Finance', 'HR', 'Operations', 'IT']
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹48,000 (Approx. Annual Fee; subject to AFRC)',
        specializations: ['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering']
      }
    ],
    placements: {
      highest: 'INR 32.00 LPA',
      average: 'INR 8.50 LPA',
      lowest: 'INR 5.00 LPA',
      recruiters: [
        'TCS',
        'Infosys',
        'Cognizant',
        'Capgemini',
        'Wipro',
        'Persistent Systems',
        'HCL Technologies',
        'Zensar'
      ]
    },
    scholarships: [
      {
        name: 'MP State & Central Scholarships',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Tuition fee support / reimbursement as per government and institutional rules'
      }
    ]
  },
  {
    id: 'lnct-bhopal-indore',
    name: 'LNCT (Bhopal) Indore Campus',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 80000,
    rating: 3.9,
    totalReviews: 38,
    image: '/college-images/LNCT(Bhopal) Indore Campus/LNCT (Bhopal).webp',
    campusPhoto: '/college-images/LNCT(Bhopal) Indore Campus/LNCT (Bhopal).webp',
    description: 'LNCT (Bhopal) Indore Campus is part of the LNCT Group in Indore. Contact the campus directly for current program offerings, affiliations, fee schedules, and admission details.',
    facilities: [
      'High-speed Programming Labs',
      'Mechanical & Electrical Labs',
      'Central Library (35,000+ books)',
      'Hostels (Boys & Girls)',
      'Seminar & Auditorium Halls',
      'Canteen',
      'Bus Transport Network'
    ],
    facilityImages: {
      'High-speed Programming Labs': '/college-images/LNCT(Bhopal) Indore Campus/High-speed Programming Labs.webp',
      'Mechanical & Electrical Labs': '/college-images/LNCT(Bhopal) Indore Campus/Mechanical & Electrical Labs.jpg',
      'Central Library (35,000+ books)': '/college-images/LNCT(Bhopal) Indore Campus/Central Library.webp',
      'Hostels (Boys & Girls)': '/college-images/LNCT(Bhopal) Indore Campus/Hostels.webp',
      'Seminar & Auditorium Halls': '/college-images/LNCT(Bhopal) Indore Campus/Seminar & Auditorium Halls.webp',
      'Canteen': '/college-images/LNCT(Bhopal) Indore Campus/Canteen.webp',
      'Bus Transport Network': '/college-images/LNCT(Bhopal) Indore Campus/Bus Transport Network.webp'
    },
    establishedYear: 2004,
    coordinates: { lat: 22.783, lng: 75.928 },
    address: 'Indore, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport',
    approval: 'AICTE Approved; confirm campus-specific affiliation and program details with the institute',
    selectionCriteria: 'Entrance-based and merit-based admission as per applicable counseling and institutional guidelines.',
    updates: [
      'LNCT Group contact directory lists 7440777666 and indorelnct@lnct.ac.in for LNCT (Bhopal) Indore Campus; confirm campus-specific course offerings and current fees directly with the institute.',
      'Published fee figures vary by program and source (such as ~₹80,000/year for B.Tech and ~₹68,000/year for MBA in prior listings); verify current session fees before applying.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹80,000 (1st Year Fees; confirm current campus fee)',
        specializations: [
          'Computer Science & Engineering',
          'AI & Machine Learning',
          'Data Science',
          'Electronics & Communication',
          'Electrical Engineering',
          'Mechanical Engineering'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: 'Contact institute for current fees',
        specializations: ['Computer Science & Engineering', 'Data Science', 'Power System']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹68,000 (1st Year Fees; confirm current campus fee)',
        specializations: [
          'Finance',
          'Marketing',
          'Human Resources',
          'Operations',
          'Business Analytics',
          'Entrepreneurship'
        ]
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: 'Contact institute for current fees',
        specializations: ['Mechanical Engineering', 'Electrical Engineering']
      }
    ],
    placements: {
      highest: 'INR 11.20 LPA',
      average: 'INR 4.05 LPA',
      lowest: 'INR 3.00 LPA',
      recruiters: [
        'TCS',
        'Cognizant',
        'Wipro',
        'Infosys',
        'Capgemini',
        'Amdocs',
        'L&T Infotech',
        'Syntel'
      ]
    },
    scholarships: [
      {
        name: 'Merit & Government Scholarship Schemes',
        criteria: 'Qualifying merit or state/central eligibility norms',
        benefits: 'Fee waiver or reimbursement as per institutional and government policy'
      }
    ]
  },
  {
    id: 'patel-college',
    name: 'Patel College of Science and Technology',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Ralamandal',
    feePerAnnum: 68000,
    rating: 4,
    googleRating: 4,
    indoreRating: 4,
    totalReviews: 503,
    image: '/patel-college.jpg',
    description: 'Patel College of Science and Technology (PCST Indore), established in 2005 under the Patel Group of Institutions, is located in the Ralamandal / Bypass Road area of Indore. It offers undergraduate, postgraduate, and diploma programs across engineering, management, and computer applications.',
    facilities: [
      'Physics & Chemistry Laboratories',
      'Seminar Hall',
      'Canteen',
      'Hostel Accommodations',
      'Computer Hub',
      'Sports Fields',
      'Bus Services'
    ],
    establishedYear: 2005,
    coordinates: { lat: 22.659, lng: 75.903 },
    address: 'Ralamandal, Bypass Road, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 18 km)',
    approval: 'AICTE Approved; affiliated with RGPV as listed in institutional records',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MP DTE counseling or qualifying exam eligibility norms.',
    updates: [
      'Official contact channels on patelcollege.com list admissionindore@patelcollege.com, Mr. Deepak Bhonde (8518888441), and Indore campus lines.',
      'Published fee figures vary by program and source (such as ~₹68,000/year or ~₹1.08–2.16 Lakhs total tuition for B.Tech tracks, ~₹62,000–1.20 Lakhs for M.Tech, ~₹45,600–91,200 for MBA, ~₹40,000 for MCA, and ~₹28,000–90,000 for Diploma); confirm current session fees with the admissions office.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹68,000 (1st Year Fees; varies by track)',
        specializations: [
          'Computer Science Engineering',
          'Computer Science Engineering (Artificial Intelligence & Machine Learning)',
          'Computer Science Engineering (Internet of Things and Cyber Security)',
          'Electronics and Communication Engineering',
          'Fire Technology and Safety Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹62,000 - ₹1,20,000 (Listed Range; varies)',
        specializations: [
          'Computer Science Engineering',
          'Information Technology',
          'Industrial Safety Engineering',
          'Software Systems',
          'Structural Engineering',
          'Thermal Engineering',
          'Transportation Engineering',
          'VLSI (Very Large-Scale Integration)'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹45,600 - ₹91,200 (Listed Range; varies)',
        specializations: [
          'Business Analytics',
          'Financial Management',
          'Human Resources Management',
          'Information Technology',
          'Marketing Management',
          'Production and Operation Management'
        ]
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹40,000 (Listed Tuition; varies)'
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹28,000 - ₹90,000 (Listed Range; varies)',
        specializations: [
          'Computer Science Engineering',
          'Civil Engineering',
          'Mechanical Engineering',
          'Electrical Engineering',
          'Chemical Engineering',
          'Mining and Mine Surveying Engineering'
        ]
      }
    ],
    placements: {
      highest: 'INR 7.50 LPA',
      average: 'INR 3.25 LPA',
      lowest: 'INR 2.40 LPA',
      recruiters: [
        'TCS',
        'Infosys',
        'Wipro',
        'Cognizant',
        'Collabera',
        'Teleperformance',
        'Force Motors',
        'Pratibha Syntex'
      ]
    },
    scholarships: [
      {
        name: 'Merit & National Talent Hunt Scholarship',
        criteria: 'Qualifying JEE / board merit or PGOI talent test norms',
        benefits: 'Tuition fee concession slabs as per institutional policy'
      },
      {
        name: 'State Post Matric Scholarship',
        criteria: 'Reserved categories compliance',
        benefits: 'State tuition fee support waivers as per state norms'
      }
    ]
  },
  {
    id: 'piemr-indore',
    name: 'Prestige Institute of Engineering Management and Research (PIEMR)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Vijay Nagar',
    feePerAnnum: 116000,
    rating: 4,
    googleRating: 4,
    indoreRating: 4.2,
    totalReviews: 812,
    image: '/college-images/PIMER/PIMER.webp',
    campusPhoto: '/college-images/PIMER/PIMER.webp',
    videoUrl: '/PIEMR.mp4',
    description: 'Prestige Institute of Engineering Management and Research (PIEMR), established in 2008 under the Prestige Education Society, is located at Prestige Vihar, Scheme No. 74C, Vijay Nagar, Indore. It offers undergraduate and postgraduate programs across engineering, technology, and design.',
    facilities: [
      'Automated Labs',
      'Placement Interview Cabin',
      'Hi-tech Library',
      'Robotics Wing',
      'Smart Classrooms',
      'Auditorium',
      'Canteen',
      'Indoor/Outdoor Sports Area'
    ],
    facilityImages: {
      'Automated Labs': '/college-images/PIMER/PIMER-Automated Labs.webp',
      'Placement Interview Cabin': '/college-images/PIMER/PIMER-Placement Interview Cabin.webp',
      'Hi-tech Library': '/college-images/PIMER/PIMER-Hi-tech Library.webp',
      'Robotics Wing': '/college-images/PIMER/PIMER-Robotics Wing.webp',
      'Smart Classrooms': '/college-images/PIMER/PIMER-Smart Classrooms.jpeg',
      'Auditorium': '/college-images/PIMER/PIMER-Auditorium.jpeg',
      'Indoor/Outdoor Sports Area': '/college-images/PIMER/PIMER-Indoor Outdoor Sports Area.jpeg'
    },
    establishedYear: 2008,
    coordinates: { lat: 22.7542, lng: 75.8858 },
    address: 'Prestige Vihar, Scheme No. 74C, Sector-D, Vijay Nagar, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved, NBA Accredited programs; affiliated with RGPV as listed in institutional records',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MP DTE counseling (B.Tech), GATE / DTE (M.Tech), or applicable design/qualifying exam norms.',
    updates: [
      'Official contact channels on piemr.edu.in list admission@piemr.edu.in, info@piemr.edu.in, director@piemr.edu.in, 0731-4013333 / 0731-4013329, and 78699 99299 / 78699 99297 at Prestige Vihar, Scheme No. 74C, Vijay Nagar, Indore - 452010.',
      'Published fee schedules on piemr.edu.in list B.Tech annual fees around ₹1,07,500–₹1,16,000/year (with ₹68,600–₹77,900 also shown in fee tables), M.Tech at ₹60,000–₹71,000/year, and B.Design at ₹1,98,000/year; confirm exact current branch fees with admissions.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹1,07,500 - ₹1,16,000/year (Listed Schedule; varies by branch)',
        specializations: [
          'Computer Science & Engineering',
          'AI & Data Science Engineering',
          'CSE (IoT - Cyber Security including Blockchain Technology)',
          'Automation & Robotics',
          'Electronics & Communication Engineering',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Civil Engineering with Computer Application'
        ]
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: '₹60,000 - ₹71,000/year (Listed Schedule; varies)',
        specializations: ['Computer Science & Engineering', 'CAD/CAM']
      },
      {
        name: 'Bachelor of Design [B.Des]',
        duration: '4 Years',
        fees: '₹1,98,000/year (Listed Schedule; varies)',
        specializations: ['UI & UX', 'AI & Design', 'Product Design']
      }
    ],
    placements: {
      highest: 'INR 14.50 LPA - 20.00 LPA',
      average: 'INR 5.00 LPA - 5.40 LPA',
      lowest: 'INR 3.60 LPA',
      recruiters: [
        'Deloitte',
        'TCS',
        'Infosys',
        'Cognizant',
        'Capgemini',
        'Wipro',
        'Persistent Systems',
        'Impetus',
        'Force Motors',
        'Amazon',
        'Adobe'
      ]
    },
    scholarships: [
      {
        name: 'Chhavi Jain Scholarship & Merit Concessions',
        criteria: 'Family income / merit eligibility as per Prestige Education Society & state norms',
        benefits: 'Tuition fee concession / support as per institutional and government policy'
      },
      {
        name: 'State & Central Government Scholarships',
        criteria: 'Post Matric / MMVY / qualifying category norms',
        benefits: 'Tuition fee support / reimbursement as per government schemes'
      }
    ]
  },
  {
    id: 'vaishnav-polytechnic',
    name: 'Shri Vaishnav Polytechnic College',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'State Board',
    location: 'MOG Lines',
    feePerAnnum: 19000,
    rating: 4.1,
    totalReviews: 76,
    image: '/vaishnav-polytechnic.jpg',
    description: 'Shri Vaishnav Polytechnic College (SVPC Indore), established in 1962 on a 17-acre campus at M.O.G. Lines, Indore, is a government-aided technical polytechnic managed by Shri Vaishnav Sahayak Kapda Market Technical Education (SVSKMTE) Society. Approved by AICTE and affiliated with RGPV Bhopal and DTE Madhya Pradesh, it offers full-time, part-time (PTDC), and lateral-entry engineering diploma programs.',
    facilities: [
      'Workshop Tool Rooms',
      'Machinery Labs',
      'Seminar Hall',
      'Rich Library (Technical)',
      'Sports Fields',
      'Canteen',
      'Hostel Accommodations'
    ],
    establishedYear: 1962,
    coordinates: { lat: 22.7067, lng: 75.8396 },
    address: 'M.O.G. Lines, Indore - 452002, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 6 km)',
    approval: 'Government-Aided Institution, Approved by AICTE, Affiliated to RGPV Bhopal & Directorate of Technical Education (DTE), Madhya Pradesh',
    selectionCriteria: 'Entrance-based and merit-based admission via MP PPT / Class 10th qualifying merit and MP DTE centralized online counseling (or ITI/10+2 lateral entry norms).',
    updates: [
      'Official contact channels on svpindore.org list prinsvpoly.ind@mp.gov.in, svpindore@rediffmail.com, and 0731-4988185 at M.O.G. Lines, Indore - 452002.',
      'Published 2026 fee listings indicate ~₹57,000 total 3-year fees (~₹19,000/year) for full-time 3-year Diploma tracks and ~₹38,000 total for 2-year lateral-entry tracks (with ~₹27,512–₹28,562/year also reported in student fee breakdowns).'
    ],
    coursesList: [
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹19,000/year (₹57,000 3-Yr Listed Total; varies)',
        specializations: [
          'Computer Science & Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electrical Engineering',
          'Electronics Engineering',
          'Opto Electronics',
          'Automobile Engineering',
          'Production Engineering',
          'Textile Technology',
          'Ophthalmic Technology'
        ]
      },
      {
        name: 'Part Time Diploma (PTDC)',
        duration: '4 Years',
        fees: 'Varies',
        specializations: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering']
      }
    ],
    placements: {
      highest: 'INR 5.50 LPA',
      average: 'INR 2.80 LPA',
      lowest: 'INR 1.80 LPA',
      recruiters: [
        'L&T',
        'Force Motors',
        'Tata Motors',
        'John Deere',
        'BHEL',
        'Pratibha Syntex',
        'Mahindra',
        'Reliance Energy',
        'Oppo',
        'Ericsson'
      ]
    },
    scholarships: [
      {
        name: 'AICTE Pragati Scholarship for Girls',
        criteria: 'Girl child admitted to 1st year diploma, family income < 8L',
        benefits: 'INR 50,000 per annum scholarship'
      },
      {
        name: 'State Welfare Scholarship',
        criteria: 'SC/ST/OBC category low-income students',
        benefits: 'Complete state tuition waiving'
      }
    ]
  },
  {
    id: 'ips-ibmr',
    name: 'IPS Academy Institute of Business Management',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Autonomous',
    location: 'Rajendra Nagar',
    feePerAnnum: 138000,
    rating: 4.2,
    totalReviews: 124,
    image: '/ips-ibmr.jpg',
    description: 'IPS Academy Institute of Business Management & Research (IBMR), established in 1994 at IPS Academy Knowledge Village on A.B. Road, Rajendra Nagar, Indore, is a UGC autonomous business school affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and accredited with NAAC A++ Grade. It offers MBA, BBA, B.A. (Economics), and Ph.D. programs.',
    facilities: [
      'Group Discussion Rooms',
      'Corporate cells',
      'Swimming Pool (Olympic size)',
      'Bloomberg Terminal Lab',
      'A/C Lecture Halls',
      'Central Library',
      'Indoor/Outdoor Sports Arenas'
    ],
    establishedYear: 1994,
    coordinates: { lat: 22.6738, lng: 75.8282 },
    address: 'IPS Academy Knowledge Village, Rajendra Nagar, A.B. Road, Indore - 452012, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'UGC Autonomous Institute, AICTE Approved, Affiliated to DAVV, NAAC Grade A++ Accredited',
    selectionCriteria: 'Entrance-based and merit-based admission via CMAT / MP DTE centralized counseling (or College Level Counselling on graduation marks for MBA), and 10+2 merit for UG programs.',
    updates: [
      'Official contact channels on ibmr.ipsacademy.org list office.ibmr@ipsacademy.org, director.ibmr@ipsacademy.org, 0731-4014784 / 0731-4014776, and admission helplines 9111009161 / 9926676161 at IPS Academy Knowledge Village, Rajendra Nagar, A.B. Road, Indore - 452012.',
      '2026–27 AFRC regulated fee for MBA (Core) is ₹69,000/semester (₹1,38,000/year; ₹2,76,000 total for 4 semesters), while BBA and B.A. (Economics) total 3-year fees are listed around ₹2.73 Lakhs (~₹91,000/year).'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹1,38,000/year (₹2,76,000 Total Regulated Fee; ₹69,000/sem)',
        specializations: [
          'Core (Dual Specialization: Marketing, Finance, HRM, Productions/Operations, Systems/IT, Data Analytics)',
          'Marketing Management',
          'Financial Administration',
          'International Business'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹91,000/year (₹2,73,000 Listed 3-Yr Total; varies)',
        specializations: ['Plain', 'Foreign Trade']
      },
      {
        name: 'Bachelor of Arts [B.A.]',
        duration: '3 Years',
        fees: '₹91,000/year (₹2,73,000 Listed 3-Yr Total; varies)',
        specializations: ['Economics']
      },
      {
        name: 'Doctor of Philosophy [Ph.D]',
        duration: '3 Years',
        fees: '₹60,650 (Listed Total; varies)',
        specializations: ['Management', 'Economics']
      }
    ],
    placements: {
      highest: 'INR 14.00 LPA',
      average: 'INR 5.50 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: [
        'ICICI Bank',
        'HDFC Bank',
        'Deloitte',
        'Amul',
        'Aditya Birla Group',
        'TCS',
        'Nestle',
        'Asian Paints',
        'Federal Bank'
      ]
    },
    scholarships: [
      {
        name: 'IPS Academy Merit & Institutional Support',
        criteria: 'Qualifying academic merit or trust guidelines',
        benefits: 'Tuition fee waiver / concession as per institutional policy'
      },
      {
        name: 'Government Domicile Schemes',
        criteria: 'SC/ST/OBC / MMVY category eligibility compliance',
        benefits: 'State-sponsored academic fee reimbursement'
      }
    ]
  },
  {
    id: 'ims-davv',
    name: 'Institute of Management Studies, DAVV',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'UGC',
    location: 'Takshashila Campus',
    feePerAnnum: 81004,
    rating: 4.3,
    googleRating: 4.3,
    indoreRating: 4.8,
    totalReviews: 319,
    image: '/ims-davv.jpg',
    description: 'The Institute of Management Studies (IMS DAVV), established in 1969 on the Takshashila Campus along Khandwa Road, Indore, is a university teaching department of Devi Ahilya Vishwavidyalaya (DAVV). It offers 2-year full-time MBA programs, 5-year integrated MBA (BBA+MBA) programs, Executive MBA, and Doctoral (Ph.D.) studies in management.',
    facilities: [
      'IMS Hall',
      'Computer Hub',
      'Placement Auditorium',
      'Takshashila Campus Wi-Fi',
      'Central Library & e-Resources',
      'Hostels (Boys & Girls)',
      'Sports Playgrounds',
      'Medical Center'
    ],
    establishedYear: 1969,
    coordinates: { lat: 22.7129, lng: 75.8729 },
    address: 'Khandwa Road, Takshashila Campus, Indore - 452017, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'UGC Recognized University Teaching Department (DAVV), AICTE Approved Programs, NAAC A+ Accredited University',
    selectionCriteria: 'Entrance-based admission via CUET-PG (for 2-year MBA) and CUET-UG (for 5-year Integrated MBA) followed by DAVV centralized counseling/selection norms.',
    updates: [
      'Official contact channels on dauniv.ac.in/ims and ims.dauniv.ac.in list 0731-2439300, directorimsdavv@gmail.com, and Dr. Deepak Shrivastava as Professor & Director (ds.ims@dauniv.ac.in, +91 9425480905).',
      '2026–27 DAVV CUET-PG brochure lists 2-year MBA programme fee around ₹81,004/year (₹1,62,008 total across 2 years, plus semester service/alumni/caution/hostel charges where applicable); placement summaries report average packages around INR 5.10–6.50 LPA and highest offers up to INR 10.00–18.50 LPA.'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹81,004/year (₹1,62,008 2-Yr Brochure Fee; varies)',
        specializations: [
          'Full Time',
          'Financial Administration',
          'Marketing Management',
          'Human Resource',
          'E-Commerce',
          'Hospital Administration',
          'Disaster Management',
          'Public Health'
        ]
      },
      {
        name: 'MBA (Executive)',
        duration: '2 Years',
        fees: 'Varies'
      },
      {
        name: 'Integrated MBA',
        duration: '5 Years',
        fees: '₹85,000 (1st Year Benchmark; varies)',
        specializations: ['E-Commerce', 'Hospital Administration']
      },
      {
        name: 'Doctor of Philosophy [Ph.D]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Management']
      }
    ],
    placements: {
      highest: 'INR 18.50 LPA',
      average: 'INR 5.10 LPA - 6.50 LPA',
      lowest: 'INR 2.40 LPA - 4.00 LPA',
      recruiters: [
        'Deloitte',
        'ICICI Bank',
        'HDFC Bank',
        'Infosys',
        'TCS',
        'Wipro',
        'Aditya Birla Group',
        'Amul',
        'Nestle',
        'Federal Bank',
        'Asian Paints',
        'Bajaj FinServ',
        'Tech Mahindra'
      ]
    },
    scholarships: [
      {
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        criteria: 'MP State meritorious criteria compliance',
        benefits: 'Full tuition fee reimbursement'
      },
      {
        name: 'Post Matric Scholarship Scheme',
        criteria: 'Reserved categories SC/ST/OBC compliance',
        benefits: 'State-funded academic waivers'
      }
    ]
  },
  {
    id: 'svim-indore',
    name: 'Shri Vaishnav Institute of Management (SVIM)',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Autonomous',
    location: 'Gumasta Nagar',
    feePerAnnum: 60000,
    rating: 4,
    totalReviews: 142,
    image: '/bg2.jpeg',
    description: 'Shri Vaishnav Institute of Management & Science (SVIMS / SVIM Indore), established in 1987 on a 7-acre campus at Scheme No. 71, Gumasta Nagar, Indore, is a UGC autonomous institute accredited with NAAC Grade A and approved by AICTE. Affiliated with DAVV Indore and RGPV Bhopal (for MCA), it offers MBA, MCA, BBA, BCA, B.Sc., M.Sc. (Computer Science), and Doctoral (Ph.D.) programs in management.',
    facilities: [
      'Wi-Fi Campus',
      'Central Library',
      'Computer Labs',
      'Science & Biotech Labs',
      'Boys & Girls Hostels',
      'Sports Playground',
      'Auditorium',
      'Cafeteria'
    ],
    establishedYear: 1987,
    coordinates: { lat: 22.7035, lng: 75.834 },
    address: 'Scheme No. 71, Gumasta Nagar, Indore - 452009, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 7 km)',
    approval: 'UGC Autonomous Institute, AICTE Approved, NAAC Grade A Accredited, Affiliated to DAVV Indore & RGPV Bhopal',
    selectionCriteria: 'Entrance-based and merit-based admission via CMAT / MP DTE centralized counseling (for MBA & MCA) and MP Higher Education / qualifying 10+2 merit (for BBA, BCA & B.Sc.).',
    updates: [
      'Official contact channels on svimi.org list svimi@svimi.org, admission@svimi.org, director@svimi.org, toll-free 18002332601, phone +91-731-2780011 / 2789925, and admission inquiry numbers 9329912587 (UG), 9329912582 (MBA), and 9329912586 (MCA).',
      'Mandatory disclosure & 2026 fee schedules list annual tuition around ₹60,000–₹86,000/year for MBA (Dual Specialization: ₹86,000/yr; Financial Admin: ₹72,500–₹81,000/yr; Marketing Mgmt: ₹60,000/yr), ₹55,000–₹55,500/year for MCA, ₹60,000–₹75,000/year for BBA, and ₹40,000–₹40,500/year for BCA, B.Sc., and M.Sc. (CS).'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹60,000 - ₹86,000/year (₹1.20L–1.72L Total; varies by track)',
        specializations: [
          'Dual Specialization',
          'Financial Administration',
          'Marketing Management',
          'Advertising & Public Relations',
          'Production & Operations Management'
        ]
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹55,000 - ₹55,500/year (₹1.10L–1.11L Total)'
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹60,000 - ₹75,000/year (varies by track)',
        specializations: ['Plain', 'Foreign Trade', 'Hospital Administration']
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹40,000 - ₹40,500/year'
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3 Years',
        fees: '₹40,000 - ₹40,500/year',
        specializations: ['Computer Science', 'Biotechnology', 'Bioinformatics', 'Microbiology']
      },
      {
        name: 'Master of Science [M.Sc]',
        duration: '2 Years',
        fees: '₹40,000 - ₹40,500/year',
        specializations: ['Computer Science']
      },
      {
        name: 'Doctor of Philosophy [Ph.D]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Management']
      }
    ],
    placements: {
      highest: 'INR 13.96 LPA',
      average: 'INR 4.00 LPA - 6.00 LPA',
      lowest: 'INR 2.00 LPA',
      recruiters: [
        'HDFC Bank',
        'ICICI Bank',
        'Axis Bank',
        'Kotak Mahindra Bank',
        'TCS',
        'Wipro',
        'Amazon',
        'Deloitte',
        'Capgemini',
        'Piramal Capital'
      ]
    },
    scholarships: [
      {
        name: 'MP State Post-Matric & Merit Scholarships',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Tuition fee reimbursement / maintenance allowance as per government norms'
      },
      {
        name: 'PG Indira Gandhi & Central Sector Scholarships',
        criteria: 'Single girl child (PG) or 80%+ board merit criteria',
        benefits: 'Central scholarship support as per UGC / MoE guidelines'
      }
    ]
  },
  {
    id: 'gsimr',
    name: 'Govindram Seksaria Institute of Management and Research (GSIMR)',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'AICTE',
    location: 'Vijay Nagar',
    feePerAnnum: 73500,
    rating: 4,
    totalReviews: 45,
    image: '/bg2.jpeg',
    description: 'Govindram Seksaria Institute of Management and Research (GSIMR Indore), established in 1997 by the Shri Govindram Seksaria Technological Society, is located on MR-10, Scheme No. 54, Vijay Nagar (near Marriott Hotel), Indore. Approved by AICTE and affiliated with Devi Ahilya Vishwavidyalaya (DAVV), it offers a 2-year full-time dual-specialization MBA program.',
    facilities: [
      'Wi-Fi Campus',
      'Central Library',
      'Computer Labs',
      'Auditorium',
      'Cafeteria',
      'Sports Facilities'
    ],
    establishedYear: 1997,
    coordinates: { lat: 22.753, lng: 75.887 },
    address: 'MR-10, Scheme No. 54, Vijay Nagar, Near Marriott Hotel, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved, Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'Entrance-based and merit-based admission via CMAT / MP DTE centralized counseling (or qualifying bachelor\'s degree with minimum 50% marks as per state norms).',
    updates: [
      'Official contact channels on gsimr.co.in list web.gsimr@gmail.com, +91-9644843709, +91-9893389909, and +91-9630041579 / 8602148118 at MR-10, Scheme No. 54, Vijay Nagar, Indore - 452010.',
      'Published MBA fee schedule on gsimr.co.in lists ₹36,750 per semester (₹73,500/year; ₹1,47,000 total tuition across 4 semesters, plus ₹1,000 registration, ₹1,500 refundable caution money, and ₹1,000/sem placement fee in 3rd & 4th semesters).'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA] Core (Full Time - Dual Specialization)',
        duration: '2 Years',
        fees: '₹73,500/year (₹36,750/semester; ₹1,47,000 Total Tuition)',
        specializations: [
          'Financial Management',
          'Marketing Management',
          'Human Resource Management',
          'Information Technology',
          'Production and Operations Management',
          'Business Analytics'
        ]
      }
    ],
    placements: {
      highest: 'INR 12.00 LPA - 15.00 LPA',
      average: 'INR 4.00 LPA - 8.00 LPA',
      lowest: 'INR 3.00 LPA',
      recruiters: [
        'ICICI Bank',
        'HDFC Bank',
        'Axis Bank',
        'Infosys',
        'Impetus',
        'Hindustan Unilever Limited',
        'Cipla',
        'Bridgestone',
        'Eicher',
        'CapitalVia',
        'The Times of India',
        'Marriott Indore'
      ]
    },
    scholarships: [
      {
        name: 'MP State Post-Matric & Merit Scholarships',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Tuition fee reimbursement as per government norms'
      }
    ]
  },
  {
    id: 'iips-davv',
    name: 'International Institute of Professional Studies (IIPS - DAVV)',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'Devi Ahilya Vishwavidyalaya (DAVV)',
    location: 'Takshashila Campus',
    feePerAnnum: 68200,
    rating: 4.3,
    totalReviews: 148,
    image: '/davv.jpg',
    description: 'The International Institute of Professional Studies (IIPS), established in 1992 on the Takshashila Campus along Khandwa Road, Indore, is a premier university teaching department of Devi Ahilya Vishwavidyalaya (DAVV). It offers 5-year integrated programs (MBA Management Science, MCA, M.Tech CS/IT), B.Com. (Hons.), 2-year MBA programs, and Doctoral (Ph.D.) programs.',
    facilities: [
      'Takshashila Campus Wi-Fi',
      'Departmental Library (25,000+ books & e-journals)',
      'Computer & IT Laboratories',
      'Auditorium & Seminar Halls',
      'Hostels (Boys & Girls)',
      'Sports Complex',
      'Cafeteria'
    ],
    establishedYear: 1992,
    coordinates: { lat: 22.7129, lng: 75.8729 },
    address: 'Takshashila Campus, Khandwa Road, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'UGC Recognized University Teaching Department (DAVV), AICTE Approved Programs, NAAC A+ Accredited University',
    selectionCriteria: 'Entrance-based admission via CUET-UG (for Integrated MBA, Integrated MCA, Integrated M.Tech, and B.Com. Hons.) and CUET-PG (for 2-year MBA programs) followed by DAVV centralized counseling.',
    updates: [
      'Official contact channels on dauniv.ac.in/iips and iips.edu.in list director@iips.edu.in, 0731-2527532, Dr. Yamini Karmarkar as Director (yamini.karmarkar@iips.edu.in, +91 9826022674), and Mr. Y. S. Bawal as Administrative Officer (+91-9285000362).',
      'Published DAVV CUET brochures list programme tuition fees around ₹68,200/year (₹1,36,400 total for 2-year MBA tracks), ₹44,550/semester (₹89,100/year) for 5-year Integrated MCA / Integrated M.Tech / Integrated MBA, and ₹28,050/semester (₹56,100/year) for B.Com. (Hons.), plus semester service/exam/caution/alumni charges.'
    ],
    coursesList: [
      {
        name: 'Integrated MBA (Management Science)',
        duration: '5 Years',
        fees: '₹89,100/year (₹44,550/semester; varies)'
      },
      {
        name: 'Integrated MCA',
        duration: '5 Years',
        fees: '₹89,100/year (₹44,550/semester; varies)'
      },
      {
        name: 'Integrated M.Tech',
        duration: '5 Years',
        fees: '₹89,100/year (₹44,550/semester; varies)',
        specializations: ['Computer Science (CS)', 'Information Technology (IT)']
      },
      {
        name: 'Bachelor of Commerce [B.Com. / B.Com. (Hons.)]',
        duration: '3-4 Years',
        fees: '₹56,100/year (₹28,050/semester; varies)'
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹68,200/year (₹1,36,400 2-Yr Brochure Fee; varies)',
        specializations: [
          'Management Science (MS)',
          'Advertising & Public Relations (APR)',
          'Tourism (T)',
          'Entrepreneurship'
        ]
      },
      {
        name: 'Doctor of Philosophy [Ph.D]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Management', 'Computer Science']
      }
    ],
    placements: {
      highest: 'INR 20.25 LPA - 21.35 LPA (MBA) / INR 72.00 LPA (Tech)',
      average: 'INR 6.92 LPA - 7.52 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: [
        'Deloitte',
        'Accenture',
        'TCS',
        'Infosys',
        'Wipro',
        'Axis Bank',
        'ICICI Bank',
        'HDFC Bank',
        'Cognizant',
        'Capgemini'
      ]
    },
    scholarships: [
      {
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        criteria: 'MP State meritorious criteria compliance',
        benefits: 'Full tuition fee reimbursement'
      },
      {
        name: 'Post Matric Scholarship Scheme',
        criteria: 'Reserved categories SC/ST/OBC compliance',
        benefits: 'State-funded academic waivers'
      }
    ]
  },
{
    id: 'jaipuria-indore',
    name: 'Jaipuria Institute of Management',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'AICTE',
    location: 'Dakachya',
    feePerAnnum: 680000,
    rating: 4.5,
    googleRating: 4.5,
    indoreRating: 4.7,
    totalReviews: 415,
    image: '/jaipuria-indore.jpg',
    description: 'Jaipuria Institute of Management Indore, established in 2010 along the Indore–Dewas Highway at Dakachya (near Shipra Naka), is a standalone AICTE-approved, AIU-recognized (MBA-equivalent) and NBA-accredited business school offering a 2-year full-time PGDM program and a doctoral-level Fellow Programme in Management (FPM).',
    facilities: [
      'A/C Boardrooms',
      'Central Wi-Fi Hub',
      'Tennis Court',
      'Hitech Study Pods',
      'Bloomberg Lab',
      'Central Library (e-journals)',
      'Modern Gymnasium',
      'A/C Hostels (Boys & Girls)',
      'Amphitheatre'
    ],
    establishedYear: 2010,
    coordinates: { lat: 22.812, lng: 75.945 },
    address: 'Indore-Dewas Highway, Near Shipra Naka, Dakachya, Indore - 453771, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 28 km)',
    approval: 'AICTE Approved, Recognized by AIU (Association of Indian Universities — MBA Equivalent), NBA Accredited',
    selectionCriteria: 'Entrance-based admission via CAT / XAT / CMAT / MAT / GMAT score followed by Case Analysis / Group Discussion and Personal Interview.',
    updates: [
      'Official contact channels on jaipuria.ac.in/indore list indore@jaipuria.ac.in, 0731-3069300 / 3069309, and admission lines +91 97525 93334 / 93335 / 93337 at Dakachya, Indore-Dewas Highway, Near Shipra Naka, Indore - 453771.',
      'Published PGDM fee schedule on jaipuria.ac.in/indore/fees lists Year 1 at ₹6,80,000 and Year 2 at ₹6,70,000 (₹13,50,000 total programme fee payable in 6 installments, plus ₹15,000 refundable security deposit and ₹1,15,000/year optional AC double hostel); 2026 placements reported 97% placement rate with highest CTC of INR 24.11 LPA (INR 36.64 LPA international in 2025) and top-50% average of INR 11.08 LPA.'
    ],
    coursesList: [
      {
        name: 'Post Graduate Diploma in Management [PGDM] (AIU Recognised Equivalent to MBA)',
        duration: '2 Years',
        fees: '₹6,80,000 (Year 1; ₹13,50,000 Total 2-Yr Fee)',
        specializations: [
          'Finance',
          'Marketing',
          'Human Resource Management',
          'Business Analytics',
          'Operations Management',
          'Information Technology'
        ]
      },
      {
        name: 'Fellow Programme in Management [FPM - Doctoral Level]',
        duration: '4 Years',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 24.11 LPA (2026) / INR 36.64 LPA (2025 Int\'l)',
      average: 'INR 9.50 LPA - 11.08 LPA (Top 50%)',
      lowest: 'INR 5.50 LPA',
      recruiters: [
        'Deloitte',
        'PwC',
        'KPMG',
        'EY',
        'Amazon',
        'ICICI Bank',
        'Federal Bank',
        'Colgate Palmolive',
        'Asian Paints',
        'Dabur',
        'HDFC Bank',
        'BNY Mellon',
        'Genpact',
        'Oxane Partners'
      ]
    },
    scholarships: [
      {
        name: 'Jaipuria Merit-Based Entrance Scholarship (2026–28)',
        criteria: '90%+ (up to ₹5,00,000), 80%+ (₹2,50,000), 70%+ / 60%+ (₹1,50,000) in CAT / XAT / CMAT / MAT',
        benefits: 'Tuition fee scholarships from ₹1,50,000 up to ₹5,00,000'
      },
      {
        name: 'Sibling Scholarship Support',
        criteria: 'Sibling of current student or Jaipuria alumni',
        benefits: '₹1,00,000 tuition fee concession'
      }
    ]
  },
  {
    id: 'nmims-law',
    name: 'SVKM\'s NMIMS School of Law',
    type: 'college',
    category: 'Law',
    boardOrAffiliation: 'Private University',
    location: 'Super Corridor',
    feePerAnnum: 200000,
    rating: 4.8,
    totalReviews: 39,
    image: "/college-images/SVKM's NMIMS/SVKM's NMIMS.webp",
    campusPhoto: "/college-images/SVKM's NMIMS/SVKM's NMIMS.webp",
    description: 'SVKM\'s NMIMS School of Law (SOL), Indore is a constituent school of SVKM\'s NMIMS (Deemed to be University) located off the Super Corridor at Bada Bangarda, Indore. Approved by the Bar Council of India (BCI), it offers 5-year integrated B.A., LL.B. (Hons.) and B.B.A., LL.B. (Hons.) programs.',
    facilities: [
      'Pristine Moot-Court Room',
      'Law Library (e-journals)',
      'Legal Aid Clinics',
      'A/C Lecture Theatres',
      'Hostels',
      'High-speed Wi-Fi',
      'Sports Complex',
      'Canteen'
    ],
    facilityImages: {
      'Pristine Moot-Court Room': "/college-images/SVKM's NMIMS/SVKM's NMIMS Smart Boardrooms.jpg",
      'Law Library (e-journals)': "/college-images/SVKM's NMIMS/SVKM's NMIMS Central Library.webp",
      'Legal Aid Clinics': "/college-images/SVKM's NMIMS/SVKM's NMIMS-Research & Innovation Labs'.jpeg",
      'A/C Lecture Theatres': "/college-images/SVKM's NMIMS/SVKM's NMIMSCentral Air-conditioned Auditorium.jpg",
      'Hostels': "/college-images/SVKM's NMIMS/SVKM's NMIMS Classrooms & Hostels.webp",
      'High-speed Wi-Fi': "/college-images/SVKM's NMIMS/SVKM's NMIMS Round-the-clock Security.webp",
      'Sports Complex': "/college-images/SVKM's NMIMS/SVKM's NMIMS Sports Courts.webp",
      'Canteen': "/college-images/SVKM's NMIMS/SVKM's NMIMS Canteen Cafeteria.jpg"
    },
    establishedYear: 2017,
    coordinates: { lat: 22.7714, lng: 75.8154 },
    address: 'Off Super Corridor, Bada Bangarda, Tehsil: Hatod, Indore - 453112, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 5 km)',
    approval: 'Approved by Bar Council of India (BCI), constituent of SVKM\'s NMIMS (Deemed-to-be-University)',
    selectionCriteria: 'Entrance-based admission via CLAT / NLAT (as applicable per NMIMS admission cycle) and qualifying 10+2 eligibility norms.',
    updates: [
      'Official contact channels on indore.nmims.edu list admission.indore@nmims.edu, +91 0731-2581500/05, and +91-9303191421 at Off Super Corridor, Bada Bangarda, Tehsil: Hatod, Indore - 453112.',
      'Published fee benchmarks for NMIMS Indore Law programs list around ₹2,00,000/year (~₹10.00 Lakhs total for 5 years, excluding hostel/transport/caution charges); placement summaries report SOL packages around INR 5.86–7.20 LPA with recruiters including Khaitan & Co., Trilegal, EXL Service, Tech Mahindra, Piramal, and Tata.'
    ],
    coursesList: [
      {
        name: 'B.A., LL.B. (Hons.)',
        duration: '5 Years',
        fees: '₹2,00,000/year (₹10.00 Lakhs Listed 5-Yr Benchmark; varies)',
        specializations: [
          'Business Law Honours',
          'Intellectual Property Law Honours',
          'Crime & Criminology Honours',
          'Constitutional Law Honours'
        ]
      },
      {
        name: 'B.B.A., LL.B. (Hons.)',
        duration: '5 Years',
        fees: '₹2,00,000/year (₹10.00 Lakhs Listed 5-Yr Benchmark; varies)',
        specializations: [
          'Business Law Honours',
          'Intellectual Property Law Honours',
          'Crime & Criminology Honours',
          'Constitutional Law Honours'
        ]
      }
    ],
    placements: {
      highest: 'INR 7.20 LPA - 15.00 LPA',
      average: 'INR 5.86 LPA - 6.27 LPA',
      lowest: 'INR 4.50 LPA',
      recruiters: [
        'Khaitan & Co.',
        'Trilegal',
        'EXL Service',
        'Tech Mahindra',
        'Piramal',
        'Panasonic India',
        'Tata',
        'SAS',
        'S&P Global',
        'K & S Partners',
        'Lenskart'
      ]
    },
    scholarships: [
      {
        name: 'NMIMS Merit & Academic Scholarships',
        criteria: 'Entrance/academic merit and university scholarship guidelines',
        benefits: 'Tuition fee concessions as per university policy'
      }
    ]
  },
  {
    id: 'index-medical',
    name: 'Index Medical College Hospital & Research Institute',
    type: 'college',
    category: 'Medical',
    boardOrAffiliation: 'UGC',
    location: 'Bypass Road (Manglia)',
    feePerAnnum: 1350000,
    rating: 4.4,
    totalReviews: 92,
    image: '/index-medical.jpg',
    description: 'Index Medical College Hospital & Research Centre (Index MCHRC Indore), established in 2007 under the Mayank Welfare Society at Index City, Near Khudel, Nemawar Road (NH-59A), Indore, is a private medical college and teaching hospital affiliated with Malwanchal University and recognized by NMC. It offers MBBS, MD, MS, and Super Specialty (DM/M.Ch.) programs.',
    facilities: [
      'Super Specialty Hospital (1,000+ beds)',
      'Clinical Classrooms',
      'Doctor Hostels',
      'Medical Library',
      'Modern Pathology Labs',
      'ICUs & Operation Theatres',
      'Sports Fields',
      'Canteen'
    ],
    establishedYear: 2007,
    coordinates: { lat: 22.768, lng: 75.939 },
    address: 'Index City, Near Khudel, Nemawar Road, NH-59A, Indore - 452016, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 22 km)',
    approval: 'Recognized by National Medical Commission (NMC), Affiliated to Malwanchal University',
    selectionCriteria: 'Entrance-based admission via NEET-UG (for MBBS) and NEET-PG (for MD/MS) followed by applicable counseling and regulatory eligibility norms.',
    updates: [
      'Official contact channels on indexmedicalcollege.in list medical@indexgroup.co.in, deanmed@indexgroup.co.in, 0731-4013600 / 4013604, and admission contacts Dr. Pawan Bhambani (+91 97525-38454) and Bharat Bharti (+91 98932-77382) at Index City, Near Khudel, Nemawar Road, NH-59A, Indore - 452016.',
      'Published fee benchmarks vary by programme, clinical vs. non-clinical branch, and counseling year; confirm exact current session tuition, hostel, and caution fees directly with admissions.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Medicine, Bachelor of Surgery [MBBS]',
        duration: '5.5 Years',
        fees: '₹13,50,000 (1st Year Benchmark; varies by session/quota)',
        specializations: [
          'General Medicine',
          'Surgery',
          'Obstetrics & Gynaecology',
          'Paediatrics',
          'Orthopaedics',
          'Pathology',
          'Microbiology',
          'Pharmacology',
          'Community Medicine'
        ]
      },
      {
        name: 'Doctor of Medicine [MD]',
        duration: '3 Years',
        fees: '₹8,00,000 - ₹15,17,000/year (Listed Range; varies by branch)',
        specializations: [
          'General Medicine',
          'Paediatrics',
          'Dermatology',
          'Radio-Diagnosis',
          'Anaesthesiology',
          'Psychiatry',
          'TB & Respiratory Medicine',
          'Emergency Medicine',
          'Pathology',
          'Microbiology',
          'Pharmacology',
          'Biochemistry',
          'Physiology',
          'Anatomy',
          'Community Medicine'
        ]
      },
      {
        name: 'Master of Surgery [MS]',
        duration: '3 Years',
        fees: '₹15,17,000/year (Listed Benchmark; varies by branch)',
        specializations: [
          'General Surgery',
          'Orthopaedics',
          'Obstetrics & Gynaecology',
          'Ophthalmology',
          'ENT (Otorhinolaryngology)'
        ]
      },
      {
        name: 'Super Specialty [DM / M.Ch.]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: [
          'DM Cardiology',
          'DM Nephrology',
          'DM Endocrinology',
          'M.Ch. Urology',
          'M.Ch. Paediatric Surgery'
        ]
      }
    ],
    placements: {
      highest: 'INR 24.00 LPA',
      average: 'INR 9.50 LPA',
      lowest: 'INR 6.00 LPA',
      recruiters: [
        'Fortis Healthcare',
        'Apollo Hospitals',
        'Index Medical Hospital',
        'Medanta',
        'Max Healthcare',
        'Choithram Hospital'
      ]
    },
    scholarships: [
      {
        name: 'State Medhavi Vidyarthi Scheme',
        criteria: 'Low income and high NEET ranking (MP State domicile)',
        benefits: 'State-sponsored partial/full tuition fee rebates'
      },
      {
        name: 'Post Matric Scholarship',
        criteria: 'Reserved categories SC/ST/OBC compliance',
        benefits: 'Tuition Fee concessions'
      }
    ]
  },
  {
    id: 'mgm-medical',
    name: 'Mahatma Gandhi Memorial (MGM) Medical College',
    type: 'college',
    category: 'Medical',
    boardOrAffiliation: 'UGC',
    location: 'Residency Area',
    feePerAnnum: 104000,
    rating: 4.8,
    totalReviews: 114,
    image: '/mgm-medical.jpg',
    description: 'Mahatma Gandhi Memorial Medical College (MGMMC Indore), established in 1948 on A.B. Road in Indore, is a premier government medical college in Madhya Pradesh affiliated with MPMSU Jabalpur and recognized by NMC. Associated with Maharaja Yeshwantrao Hospital (MYH), it offers MBBS (250 seats), MD, MS, and Super Specialty (DM/M.Ch.) programs.',
    facilities: [
      'MY Hospital Block',
      'Surgical Amphitheatres',
      'Digital Research desks',
      'Hostels (Boys & Girls)',
      'e-Library',
      'Advanced Trauma Centers',
      'Auditorium',
      'Sports Grounds'
    ],
    establishedYear: 1948,
    coordinates: { lat: 22.709, lng: 75.882 },
    address: 'A.B. Road, Near MY Hospital, Residency Area, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 9 km)',
    approval: 'Recognized by National Medical Commission (NMC), Affiliated to MPMSU (Madhya Pradesh Medical Science University), Jabalpur',
    selectionCriteria: 'Entrance-based admission via NEET-UG followed by MCC (All India Quota 15%) & MP DME (State Quota 85%) counseling, and NEET-PG for MD/MS.',
    updates: [
      'Official contact channels on mgmmcindore.in list dean.ind@mp.gov.in, 0731-2527383 / 2527679, and anti-ragging helpline 18001805522.',
      'MBBS annual tuition is ₹1,00,000/year (+ ₹4,000/year student union fund = ₹1,04,000 annual recurring fee, plus one-time refundable deposits at admission and separate hostel charges); 2026 Round 2 closing ranks reported ~5,316 (AIQ Open) and ~12,006 (MP State UR).'
    ],
    coursesList: [
      {
        name: 'Bachelor of Medicine, Bachelor of Surgery [MBBS]',
        duration: '5.5 Years',
        fees: '₹1,00,000/year Tuition (+ ₹4,000/yr Union Fund; refundable deposits extra)'
      },
      {
        name: 'Doctor of Medicine [MD]',
        duration: '3 Years',
        fees: '₹1,04,000/year (Listed PG Fee Benchmark; varies)',
        specializations: [
          'General Medicine',
          'Paediatrics',
          'Radio-Diagnosis',
          'Dermatology (DVL)',
          'Anaesthesiology',
          'Psychiatry',
          'Respiratory Medicine',
          'Emergency Medicine',
          'Pathology',
          'Microbiology',
          'Pharmacology',
          'Biochemistry',
          'Anatomy',
          'Forensic Medicine',
          'Community Medicine',
          'Transfusion Medicine'
        ]
      },
      {
        name: 'Master of Surgery [MS]',
        duration: '3 Years',
        fees: '₹1,04,000/year (Listed PG Fee Benchmark; varies)',
        specializations: [
          'General Surgery',
          'Orthopaedics',
          'Obstetrics & Gynaecology',
          'Ophthalmology',
          'ENT (Otorhinolaryngology)'
        ]
      },
      {
        name: 'Super Specialty [DM / M.Ch.]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: [
          'DM Cardiology',
          'DM Neurology',
          'DM Neonatology',
          'DM Clinical Pharmacology',
          'M.Ch. Neurosurgery',
          'M.Ch. Paediatric Surgery'
        ]
      }
    ],
    placements: {
      highest: 'INR 25.00 LPA - 35.00 LPA',
      average: 'INR 10.84 LPA - 14.20 LPA',
      lowest: 'INR 9.00 LPA',
      recruiters: [
        'All India Institute of Medical Sciences (AIIMS)',
        'Medanta',
        'Apollo Hospitals',
        'Max Healthcare',
        'Fortis',
        'State Government Medical Services'
      ]
    },
    scholarships: [
      {
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        criteria: 'MP Domicile, 12th board merit, NEET state merit',
        benefits: 'Full tuition fee sponsorship by MP government'
      },
      {
        name: 'Post-Matric Scholarship',
        criteria: 'Reserved categories low-income limits',
        benefits: 'Complete state-funded academic rebates'
      }
    ]
  },
  {
    id: 'shubhdeep-ayurved',
    name: 'Shubhdeep Ayurved Medical College & Hospital',
    type: 'college',
    category: 'Medical',
    boardOrAffiliation: 'UGC',
    location: 'Khandwa Road',
    feePerAnnum: 247200,
    rating: 4.3,
    totalReviews: 31,
    image: '/shubhdeep-ayurved.jpg',
    description: 'Shubhdeep Ayurved Medical College & Hospital (SAMCH Indore), established around 2000 on Khandwa Road at Village Datoda (near Chokhi Dhani, Tehsil Mhow, Indore), is a private Ayurvedic medical college and hospital approved by NCISM and affiliated with MPMSU Jabalpur. It offers undergraduate BAMS and postgraduate M.D. (Ayurveda) programs across five clinical and foundational specialties.',
    facilities: [
      'Ayurvedic OPD Clinic',
      'Herbal Gardens (200+ species)',
      'Panchkarma Rooms',
      'Hostels',
      'Central Library (Ayurvedic classics)',
      'Yoga Hall',
      'Canteen',
      'Bus Transport Network'
    ],
    establishedYear: 2000,
    coordinates: { lat: 22.6345, lng: 75.8795 },
    address: 'Village Datoda, Near Chokhi Dhani, Khandwa Road, Tehsil Mhow, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'Approved by NCISM (National Commission for Indian System of Medicine), Ministry of AYUSH; Affiliated to MPMSU Jabalpur',
    selectionCriteria: 'Entrance-based admission via NEET-UG (for BAMS) and AIAPGET / applicable PG entrance norms followed by MP AYUSH centralized counseling.',
    updates: [
      'Official contact channels on shubhdeep.com list info@shubhdeep.com, samch.indore@yahoo.com, mobile 9893703838, and City Office at 303, Starlit Tower, Y.N. Road, Indore - 452003.',
      'Published fee schedules on shubhdeep.com list BAMS tuition at ₹2,47,200/year (+ ₹15,000/year bus fee and ₹5,000 one-time caution money) and M.D. (Ayurveda) across 5 subjects (25 seats) at ₹2,06,000/year (+ ₹12,000/year bus fee and ₹5,000 one-time caution money); confirm current session counseling fees directly with the college.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Ayurvedic Medicine and Surgery [BAMS]',
        duration: '5.5 Years',
        fees: '₹2,47,200/year Tuition (+ ₹15,000/yr Bus; ₹5,000 Caution)'
      },
      {
        name: 'Doctor of Medicine [M.D. (Ayurveda)]',
        duration: '3 Years',
        fees: '₹2,06,000/year Tuition (+ ₹12,000/yr Bus; ₹5,000 Caution)',
        specializations: [
          'Kayachikitsa',
          'Panchakarma',
          'Rasashastra & Bhaishajya Kalpana',
          'Rognidan & Vikriti Vigyan',
          'Samhita Siddhant'
        ]
      }
    ],
    placements: {
      highest: 'INR 10.00 LPA',
      average: 'INR 3.50 LPA - 4.50 LPA',
      lowest: 'INR 3.00 LPA',
      recruiters: [
        'Patanjali Ayurved',
        'Dabur India',
        'Himalaya Wellness',
        'Baidyanath',
        'Charak Pharma',
        'Shubhdeep Ayurvedic Hospital',
        'AyurVAID Hospitals'
      ]
    },
    scholarships: [
      {
        name: 'AYUSH National Scholarship Scheme',
        criteria: 'High merit in AYUSH entrance / qualifying norms',
        benefits: 'Scholarship support as per scheme rules'
      },
      {
        name: 'State Post Matric Scholarship',
        criteria: 'SC/ST/OBC category low-income students',
        benefits: 'State-sponsored academic waivers'
      }
    ]
  },
  {
    id: 'saims',
    name: 'Sri Aurobindo Institute of Medical Sciences (SAIMS)',
    type: 'college',
    category: 'Medical',
    boardOrAffiliation: 'UGC',
    location: 'Sanwer Road',
    feePerAnnum: 1250000,
    rating: 4.5,
    totalReviews: 89,
    image: '/saims.jpg',
    description: 'Sri Aurobindo Institute of Medical Sciences (SAIMS Indore / Sri Aurobindo Medical College & Postgraduate Institute), established in 2003 along the Indore–Ujjain State Highway (Bhawrasla / Near MR-10 Crossing, Sanwer Road), is a private medical college and teaching hospital recognized by NMC and affiliated with Sri Aurobindo University (SAU). It offers MBBS, BDS, MD, MS, and Super Specialty (DM/M.Ch.) programs.',
    facilities: [
      'Super-Specialty Hospital (1200+ beds)',
      'Advanced Skill Labs',
      'Digital Library & e-Resources',
      'Gymnasium',
      'Sports Complex',
      'Separate Hostels',
      'Trauma Center',
      'Swimming Pool'
    ],
    establishedYear: 2003,
    coordinates: { lat: 22.797, lng: 75.845 },
    address: 'Indore–Ujjain State Highway, Bhawrasla / Near MR-10 Crossing, Sanwer Road, Indore - 453555, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'Recognized by National Medical Commission (NMC), Affiliated with Sri Aurobindo University (SAU)',
    selectionCriteria: 'Entrance-based admission via NEET-UG (for MBBS/BDS), NEET-PG (for MD/MS), and NEET-SS (for DM/M.Ch.) followed by applicable counseling.',
    updates: [
      'Official contact channels on saimsonline.com and sriaurobindouniversity.edu.in list help@saimsonline.com, admission@sriaurobindouniversity.edu.in, 0731-4231000 / 4231100 / 4788900, and helpline +91 9993 102 102.',
      'Published fee benchmarks vary by quota, specialization, and counseling year; confirm current session tuition, hostel, and caution fees directly with the admissions cell.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Medicine, Bachelor of Surgery [MBBS]',
        duration: '5.5 Years',
        fees: '₹12,50,000 (1st Year Benchmark; varies by quota/year)'
      },
      {
        name: 'Bachelor of Dental Surgery [BDS]',
        duration: '5 Years',
        fees: '₹2,50,000 (1st Year Benchmark; varies by quota/year)'
      },
      {
        name: 'Doctor of Medicine [MD]',
        duration: '3 Years',
        fees: '₹14,00,000 (1st Year Benchmark; varies by branch)',
        specializations: [
          'General Medicine',
          'Pediatrics',
          'Radio-Diagnosis',
          'Radiation Oncology (Radio Therapy)',
          'Dermatology',
          'Anesthesiology',
          'Emergency Medicine',
          'Psychiatry',
          'Respiratory Medicine',
          'Palliative Medicine',
          'Pathology',
          'Microbiology',
          'Pharmacology',
          'Biochemistry',
          'Physiology',
          'Forensic Sciences',
          'Community Medicine'
        ]
      },
      {
        name: 'Master of Surgery [MS]',
        duration: '3 Years',
        fees: '₹14,00,000 (1st Year Benchmark; varies by branch)',
        specializations: [
          'General Surgery',
          'Orthopedics',
          'Obstetrics & Gynecology',
          'Ophthalmology',
          'ENT',
          'Anatomy'
        ]
      },
      {
        name: 'Super Specialty [DM / M.Ch.]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: [
          'DM Gastroenterology',
          'DM Cardiology',
          'DM Neurology',
          'DM Nephrology',
          'DM Medical Oncology',
          'M.Ch. Neurosurgery',
          'M.Ch. Surgical Oncology',
          'M.Ch. Urology',
          'M.Ch. Paediatric Surgery'
        ]
      }
    ],
    placements: {
      highest: 'INR 28.00 LPA',
      average: 'INR 11.20 LPA',
      lowest: 'INR 6.50 LPA',
      recruiters: [
        'Medanta Hospital',
        'Apollo Hospitals',
        'SAIMS Super Specialty Hospital',
        'Fortis Healthcare',
        'Choithram',
        'Apex Hospitals'
      ]
    },
    scholarships: [
      {
        name: 'SVKM Trust Medhavi Merit Slab',
        criteria: 'Exceptional board percentiles and high NEET rank',
        benefits: 'Up to 25% tuition fee waiver'
      },
      {
        name: 'Post-Matric State Support Schemes',
        criteria: 'SC/ST/OBC category low-income domicile',
        benefits: 'Partial/Full tuition fee state reimbursements'
      }
    ]
  },
  {
    id: 'cindrebay-design',
    name: 'Cindrebay School of Design',
    type: 'college',
    category: 'Design',
    boardOrAffiliation: 'Affiliated / Certified',
    location: 'Vijay Nagar',
    feePerAnnum: 130000,
    rating: 4.7,
    totalReviews: 34,
    image: '/cindrebay-design.jpg',
    description: 'Cindrebay School of Design (Indore Centre), operating in Indore since 2006 (part of the Cindrebay network founded in 2006) at Scheme No. 74C, Vijay Nagar along A.B. Road, is a private design training and portfolio-support center offering interior design, fashion design, space management, and studio skill programs.',
    facilities: [
      'Studio Mockups',
      'Fabrics Lab',
      'Visual Screen Rooms',
      'CAD & 3D Printing Labs',
      'Exhibition Hall',
      'Creative Library',
      'A/C Classrooms'
    ],
    establishedYear: 2006,
    coordinates: { lat: 22.754, lng: 75.893 },
    address: '201, 2nd Floor, 340-F, AD, A.B. Road, Scheme No. 74C, Vijay Nagar, Indore, Madhya Pradesh - 452010, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 11 km)',
    approval: 'Private Design Training & Student-Support Centre (confirm university-linked registration & degree/diploma terms prior to enrollment)',
    selectionCriteria: 'Application, portfolio/aptitude review, and personal interaction as applicable per program.',
    updates: [
      'Official contact channels on cindrebay.com/indore list indore@cindrebay.com, +91 896 241 2826, +91 781 882 0820, and +91 989 577 6441 (Mon–Sat, 9 AM to 6 PM) at 201, 2nd Floor, 340-F, AD, A.B. Road, Scheme No. 74C, Vijay Nagar, Indore - 452010.',
      'Published Indore portal guidance notes that Cindrebay Indore operates as a private design training and student-support centre; confirm current session fee schedules, university-linked registration details, and placement assistance terms directly with the centre.'
    ],
    coursesList: [
      {
        name: 'Interior Design Degree Programme Support',
        duration: '3 Years',
        fees: '₹1,30,000 (1st Year Benchmark; confirm current centre fee)'
      },
      {
        name: 'Fashion Design Degree Programme Support',
        duration: '3 Years',
        fees: '₹1,30,000 (1st Year Benchmark; confirm current centre fee)'
      },
      {
        name: 'Diploma / PG Diploma in Interior Design & Space Management',
        duration: '1 Year',
        fees: '₹85,000 (1st Year Benchmark; confirm current centre fee)'
      },
      {
        name: 'Fashion Design & Boutique Management Skill Training',
        duration: '1 Year',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 8.50 LPA',
      average: 'INR 4.20 LPA',
      lowest: 'INR 2.80 LPA',
      recruiters: [
        'Livspace',
        'Design Cafe',
        'Asian Paints',
        'FabIndia',
        'Aranyam Architects',
        'Studio 99',
        'Sabyasachi Associates'
      ]
    },
    scholarships: [
      {
        name: 'Cindrebay Merit & Portfolio Scholarship',
        criteria: 'Qualifying academic / portfolio / studio test & interview norms',
        benefits: 'Fee waiver / concession as per applicable scholarship criteria'
      },
      {
        name: 'Early Registration & Special Support',
        criteria: 'Timely application or eligible category criteria',
        benefits: 'Fee concession as per centre / scheme guidelines'
      }
    ]
  },
  {
    id: 'madrid-software',
    name: 'Madrid Software Training',
    type: 'college',
    category: 'Software Training',
    boardOrAffiliation: 'Affiliated / Certified',
    location: 'Vijay Nagar',
    feePerAnnum: 95000,
    rating: 4.6,
    totalReviews: 81,
    image: '/madrid-software.jpg',
    description: 'Madrid Software Training is an IT and analytics training institute (primarily based in Saket, New Delhi, with online training; no verified physical campus in Indore could be confirmed in official public sources). Confirm physical campus presence, local Indore contact channels, current course fees, and placement terms directly before listing or enrolling.',
    facilities: [
      'Online & Classroom Training (Delhi HQ)',
      'Project-Based Labs',
      'Resume & Interview Support'
    ],
    establishedYear: 2011,
    coordinates: { lat: 22.7548, lng: 75.895 },
    address: 'Indore physical campus unconfirmed (Saket, New Delhi HQ listed in public directories)',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'Private IT Training Institute (verify local Indore registration & course accreditation directly)',
    selectionCriteria: 'Application and counseling/assessment as applicable per training batch.',
    updates: [
      'No verified physical campus or Indore address/phone at Plot No. 12, Vijay Nagar, Near C21 Mall, AB Road, Indore could be confirmed in current public search results; Madrid Software Training is listed in Saket, New Delhi with online/classroom training modes.',
      'Confirm whether an active Indore branch exists, along with current batch fees and placement support terms, before publishing on indorecolleges.in.'
    ],
    coursesList: [
      {
        name: 'Full-stack Software Engineering [MERN Stack]',
        duration: '1 Year',
        fees: '₹95,000 (1st Year Benchmark; confirm current fees)'
      },
      {
        name: 'Data Science & Machine Learning (with Generative AI)',
        duration: '6 Months',
        fees: '₹65,000 (1st Year Benchmark; confirm current fees)'
      },
      {
        name: 'Data Analytics & Business Analytics (Power BI / SQL)',
        duration: '6 Months',
        fees: 'Varies'
      },
      {
        name: 'Artificial Intelligence & Agentic AI Program',
        duration: '6 Months',
        fees: 'Varies'
      },
      {
        name: 'AWS Cloud Architecture & DevOps Certification',
        duration: '3 Months',
        fees: '₹35,000 (1st Year Benchmark; confirm current fees)'
      },
      {
        name: 'UI/UX & Graphic Design Course',
        duration: '4 Months',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 15.00 LPA',
      average: 'INR 5.20 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: [
        'TCS',
        'Cognizant',
        'Capgemini',
        'Wipro',
        'Xoriant',
        'Persistent',
        'Systango',
        'Impetus Technologies'
      ]
    },
    scholarships: [
      {
        name: 'Tech Excellence Merit Scholarship',
        criteria: 'Aptitude score > 90% in admission entrance test',
        benefits: 'INR 12,000 Tuition Fee waiver'
      },
      {
        name: 'Early Registration Incentive',
        criteria: 'First 20 applicants per tech batch',
        benefits: 'INR 5,000 fee waiver'
      }
    ]
  },
  {
    id: 'govt-music-college',
    name: 'Government Music College Indore',
    type: 'college',
    category: 'Music',
    boardOrAffiliation: 'State Board',
    location: 'Subhash Marg',
    feePerAnnum: 12000,
    rating: 4.5,
    totalReviews: 44,
    image: '/govt-music-college.jpg',
    description: 'Government Music College Indore (also listed as Lata Mangeshkar Govt. Music College; AISHE C-29489), located on Netaji Subhash Marg (Chimanbagh / opposite Board Office) in Indore, is a state government music and performing arts college affiliated with Raja Mansingh Tomar Music and Arts University, Gwalior. It offers undergraduate, postgraduate, and diploma programs in classical vocal, instrumental music, and classical dance.',
    facilities: [
      'Riyaz Rooms & Auditoriums',
      'Classical Instruments Vault',
      'Performance Stage',
      'Acoustics Classrooms',
      'Music Library',
      'Canteen'
    ],
    establishedYear: 1935,
    coordinates: { lat: 22.7176, lng: 75.8668 },
    address: 'Netaji Subhash Marg, Opposite Board Office, Chimanbagh, Indore, Madhya Pradesh - 452007, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 8 km)',
    approval: 'MP Government / Culture Department Institution, Affiliated with Raja Mansingh Tomar Music and Arts University, Gwalior (AISHE C-29489)',
    selectionCriteria: 'Audition / aptitude assessment and university/state admission guidelines as applicable per course.',
    updates: [
      'AISHE & directory records (AISHE C-29489; also referenced as Lata Mangeshkar Govt. Music College) place the campus on Netaji Subhash Marg (opposite Board Office, Chimanbagh, Indore - 452007) with phone 0731-2534064 / 9425318548 and email principalmusicindore@gmail.com.',
      'Published fee figures vary by course, university rules, and session; confirm exact current session tuition, audition dates, and diploma/degree fee schedules directly with the college.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Music / Performing Arts [B.Mus. / B.P.A.]',
        duration: '3 Years',
        fees: '₹12,000 (1st Year Benchmark; confirm current fees)',
        specializations: ['Vocal', 'Sitar', 'Tabla', 'Violin', 'Harmonium', 'Kathak Dance']
      },
      {
        name: 'Master of Music / Performing Arts [M.Mus. / M.P.A.]',
        duration: '2 Years',
        fees: '₹15,000 (1st Year Benchmark; confirm current fees)',
        specializations: ['Vocal', 'Sitar', 'Tabla', 'Violin', 'Kathak Dance']
      },
      {
        name: 'Diploma in Classical Music & Dance',
        duration: '2 Years',
        fees: '₹8,000 (1st Year Benchmark; confirm current fees)',
        specializations: ['Kathak', 'Vocal', 'Instrumental']
      }
    ],
    placements: {
      highest: 'INR 6.00 LPA',
      average: 'INR 2.40 LPA',
      lowest: 'INR 1.50 LPA',
      recruiters: [
        'All India Radio',
        'Doordarshan',
        'State Cultural Centers',
        'Schools & Music Academies',
        'Indore Cultural & Stage Ensembles'
      ]
    },
    scholarships: [
      {
        name: 'State Cultural Merit Scholarship',
        criteria: 'Meritorious classical performance / qualifying norms',
        benefits: 'Fee waiver / financial support as per state scheme rules'
      },
      {
        name: 'Post Matric Welfare Scholarship',
        criteria: 'SC/ST/OBC category low-income students',
        benefits: 'Government-sponsored academic waivers'
      }
    ]
  },
  {
    id: 'mit-indore',
    name: 'Malwa Institute of Technology (MIT)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Nipania',
    feePerAnnum: 72000,
    rating: 3.9,
    totalReviews: 125,
    image: '/mit-indore.jpg',
    description: 'Malwa Institute of Technology (MIT Indore), established in 2004 at Gram Nipaniya along the Indore–Dewas Bypass Road, is a private engineering and management institute approved by AICTE and affiliated with RGPV Bhopal and DAVV Indore. It offers 4-year B.Tech programs across CSE, IT, AI/ML, EC, EX, ME, Automobile, and Civil Engineering alongside postgraduate MBA and M.Tech options.',
    facilities: [
      'AI/ML, Robotics & IoT Labs',
      'Central Library',
      'Computer Labs',
      'Sports Facility',
      'Cafeteria',
      'Wi-Fi Campus'
    ],
    establishedYear: 2004,
    coordinates: { lat: 22.755, lng: 75.895 },
    address: 'Indore-Dewas Bypass Road, Gram Nipaniya, Indore - 452016, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE Approved; Affiliated to RGPV Bhopal and DAVV Indore',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MP DTE counseling (B.Tech), GATE / MPPET (M.Tech), or CAT / CMAT / counseling norms (MBA).',
    updates: [
      'Official contact channels on mitindore.co.in list Indore-Dewas Bypass Road, Gram Nipaniya, Indore - 452016 with phones 0731-2810001-8, +91 95227 22722, and +91 81090 10965; admissions are open for Batch 2026–27.',
      'Confirm current session fee schedules directly with the MIT Indore admissions office as published branch-wise fee tables vary across portals.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹72,000 (1st Year Benchmark; confirm current fees)',
        specializations: [
          'Computer Science and Engineering',
          'Information Technology',
          'Artificial Intelligence/Machine Learning',
          'Electronics and Communication',
          'Electrical and Electronics',
          'Mechanical Engineering',
          'Automobile Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹60,000 (1st Year Benchmark; confirm current fees)',
        specializations: ['Marketing', 'Finance', 'Human Resources']
      },
      {
        name: 'Master of Technology [M.Tech]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['Computer Science & Engineering', 'Mechanical / Thermal', 'Civil / Structural']
      }
    ],
    placements: {
      highest: 'INR 12.00 LPA',
      average: 'INR 4.20 LPA',
      lowest: 'INR 3.20 LPA',
      recruiters: [
        'TCS',
        'Wipro',
        'Infosys',
        'Cognizant',
        'Capgemini',
        'IBM',
        'Accenture',
        'Syntel'
      ]
    },
    scholarships: [
      {
        name: 'Merit & State Scholarship Schemes',
        criteria: 'Qualifying academic merit or MP state / central scheme eligibility',
        benefits: 'Fee waiver / scholarship support as per applicable scheme'
      }
    ]
  },
  {
    id: 'softvision-college',
    name: 'Softvision College (SV)',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'DAVV',
    location: 'World Cup Square',
    feePerAnnum: 65000,
    rating: 4.6,
    googleRating: 4.6,
    indoreRating: 4.8,
    totalReviews: 1200,
    image: '/softvision-college.jpg',
    description: 'Softvision College Indore, managed by the Softvision Educational Society along Ring Road near World Cup Square / Pipliyahana in Indore, is a private higher education college affiliated with Devi Ahilya Vishwavidyalaya (DAVV). It offers undergraduate and postgraduate programs across commerce, management, computer applications, sciences/biosciences, arts, and PGDCA.',
    facilities: [
      'Biotechnology & Science Labs',
      'Computer Labs',
      'Library',
      'Auditorium & Seminar Hall',
      'Cafeteria',
      'Bus Transport Network',
      'Sports Facilities'
    ],
    establishedYear: 2001,
    coordinates: { lat: 22.7196, lng: 75.892 },
    address: 'Near Essentia Luxury Hotel, Ring Road, World Cup Square, Pipliyahana, Indore, Madhya Pradesh - 452001, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'UGC Recognized, Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'Merit-based and qualifying exam eligibility admission as per DAVV university and college admission norms.',
    updates: [
      'Official contact channels on softvision.co.in/contact list info@softvision.co.in, general enquiries +91 9009571860, Management/Commerce/Arts (+91 9109175107 / 9109175108), Computer Science (+91 9109175109), and Biosciences (+91 9109175110) at Ring Road, World Cup Square, Pipliyahana, Indore - 452001.',
      'Published fee benchmarks vary across portals and academic sessions; confirm exact current session tuition, transport, and scholarship terms directly with the admissions office.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹65,000 (1st Year Benchmark; confirm current fees)',
        specializations: ['Marketing', 'Finance', 'Human Resource Management']
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Computer Applications', 'Software & Web Development']
      },
      {
        name: 'Bachelor of Commerce [B.Com]',
        duration: '3 Years',
        fees: 'Varies',
        specializations: ['Plain', 'Computer Applications', 'Taxation', 'Foreign Trade']
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3 Years',
        fees: '₹55,000 (1st Year Benchmark; confirm current fees)',
        specializations: [
          'Biotechnology',
          'Computer Science',
          'Life Sciences',
          'Microbiology',
          'Bioinformatics',
          'Pharmaceutical Chemistry',
          'Chemistry'
        ]
      },
      {
        name: 'Bachelor of Arts [BA]',
        duration: '3 Years',
        fees: '₹45,000 (1st Year Benchmark; confirm current fees)',
        specializations: ['Psychology', 'Economics', 'Political Science', 'Sociology']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['Marketing', 'Finance', 'Human Resource Management', 'Information Technology']
      },
      {
        name: 'Master of Science [M.Sc] / Master of Commerce [M.Com] / PGDCA',
        duration: '1-2 Years',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 8.50 LPA',
      average: 'INR 3.00 LPA - 5.00 LPA',
      lowest: 'INR 2.50 LPA',
      recruiters: [
        'Amazon',
        'Bridgestone',
        'Capgemini',
        'Cipla',
        'Wipro',
        'TCS',
        'Infosys',
        'Deloitte',
        'HDFC Bank',
        'ICICI Bank'
      ]
    },
    scholarships: [
      {
        name: 'SV Academic Merit Scholarship',
        criteria: 'Qualifying academic merit slabs as per college rules',
        benefits: 'Fee waiver / scholarship support as per institutional policy'
      }
    ]
  },
  {
    id: 'alexia-college',
    name: 'Alexia College Of Professional Studies',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'DAVV',
    location: 'A.B. Road',
    feePerAnnum: 38000,
    rating: 4.5,
    googleRating: 4.5,
    indoreRating: 4.6,
    totalReviews: 402,
    image: '/alexia-college.jpg',
    description: 'Alexia College of Professional Studies, located at Prabhat Kiran Parisar, 25, Press Complex, A.B. Road, Indore, is a private college affiliated with Devi Ahilya Vishwavidyalaya (DAVV). It offers undergraduate, postgraduate, and diploma programs across commerce, business administration, computer applications, and social work.',
    facilities: [
      'Spacious Classrooms',
      'Reading Library',
      'Computer Center',
      'Seminar Hall',
      'Wi-Fi Campus',
      'Cafeteria'
    ],
    establishedYear: 1999,
    coordinates: { lat: 22.721, lng: 75.875 },
    address: 'Prabhat Kiran Parisar, 25, Press Complex, A.B. Road, Indore - 452001, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 14 km)',
    approval: 'UGC Recognized, Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'Merit-based and qualifying exam eligibility admission as per DAVV university and college admission norms.',
    updates: [
      'Official contact details on alexiacollege.com list Prabhat Kiran Parisar, 25, Press Complex, A.B. Road, Indore, phone 0731-4047400, mobile 88890 35888, and email alexiacollege@yahoo.com.',
      'Published total fee benchmarks vary by course and portal (such as ~₹75,000–1,05,000 total for 3-year B.Com, ~₹1,05,000 total for 3-year BBA, ~₹60,000 total for 2-year MSW, and ~₹56,000 total for 1-year PGDCA); confirm exact current session fees directly with the college.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹1,05,000 Total Benchmark (₹48,000 1st Yr Listing; varies)',
        specializations: [
          'General',
          'Finance',
          'Marketing & Sales',
          'Human Resource',
          'Banking & Insurance',
          'Entrepreneurship Development'
        ]
      },
      {
        name: 'Bachelor of Commerce [B.Com]',
        duration: '3 Years',
        fees: '₹75,000 - ₹1,05,000 Total Benchmark (₹38,000 1st Yr Listing; varies)',
        specializations: [
          'General',
          'Tax Procedure & Practice (TP)',
          'Computer Application (CA)',
          'Foreign Trade Management (FT)'
        ]
      },
      {
        name: 'Master of Social Work [MSW]',
        duration: '2 Years',
        fees: '₹60,000 Total Benchmark (varies)',
        specializations: [
          'Human Resources Management',
          'Hospital Administration',
          'Family & Child Welfare',
          'Rural & Urban Community Development',
          'Medical & Psychiatric Social Work'
        ]
      },
      {
        name: 'Post Graduate Diploma in Computer Application [PGDCA]',
        duration: '1 Year',
        fees: '₹56,000 Total Benchmark (varies)'
      }
    ],
    placements: {
      highest: 'INR 6.00 LPA',
      average: 'INR 3.20 LPA',
      lowest: 'INR 2.20 LPA',
      recruiters: ['Teleperformance', 'TCS', 'ICICI Bank', 'Concentrix', 'Paytm']
    },
    scholarships: [
      {
        name: 'Merit & Government Scholarship Schemes',
        criteria: 'Qualifying academic merit or state/central scheme norms',
        benefits: 'Fee waiver / scholarship support as per applicable scheme'
      }
    ]
  },
  {
    id: 'gacc-indore',
    name: 'Shri Atal Bihari Vajpayee Government Arts and Commerce College (GACC)',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'Government',
    location: 'Bhawarkua',
    feePerAnnum: 15000,
    rating: 4.1,
    googleRating: 4.1,
    indoreRating: 4.7,
    totalReviews: 1400,
    image: '/gacc-indore.jpg',
    description: 'Shri Atal Bihari Vajpayee Government Arts and Commerce College (SABV GACC Indore), located on A.B. Road near Bhawarkua Square in Indore, is a government college affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and approved by UGC. It offers undergraduate, postgraduate, and diploma programs across arts, commerce, management, social work, journalism, and computer applications.',
    facilities: [
      'Central Library',
      'Sports Grounds',
      'NSS & NCC Wings',
      'Seminar & Lecture Halls',
      'Computer Lab',
      'Canteen'
    ],
    establishedYear: 1960,
    coordinates: { lat: 22.6934, lng: 75.8652 },
    address: 'A.B. Road, Near Bhawarkua Square, Indore, Madhya Pradesh - 452017, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'Government College, UGC Recognized (Section 2(f) & 12(B)), Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'MP Higher Education online centralized e-Pravesh merit/counseling (or applicable CMAT/MP-MAT/entrance norms for MBA) as per DAVV and MP government guidelines.',
    updates: [
      'Official contact details on sabvgacc.in/contact.aspx list A.B. Road, Near Bhawarkua Square, Indore - 452017, phone 0731-2460579, and email principalgaccindore@rediffmail.com.',
      'Government-regulated UG/PG/diploma fee structures under MP Higher Education / DAVV vary by course and self-finance vs. regular quota (such as ~₹7,066–₹15,066 total for BA/B.Com tracks, ~₹47,066 total for BBA, and ~₹83,142 total for 2-year MBA); confirm exact current session fees via e-Pravesh / college office.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Arts [BA]',
        duration: '3-4 Years',
        fees: '₹7,066 - ₹15,066 Total Benchmark (₹12,000 1st Yr Listing; varies)',
        specializations: [
          'Economics',
          'Political Science',
          'Sociology',
          'History',
          'Geography',
          'English Literature',
          'Hindi Literature',
          'Psychology',
          'Philosophy',
          'Sanskrit',
          'Marathi',
          'Computer Applications'
        ]
      },
      {
        name: 'Bachelor of Commerce [B.Com]',
        duration: '3-4 Years',
        fees: '₹7,066 - ₹15,066 Total Benchmark (₹14,000 1st Yr Listing; varies)',
        specializations: [
          'General',
          'Tax Procedure & Practice',
          'Computer Applications',
          'Foreign Trade',
          'Marketing & Advertising',
          'Office Management'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3-4 Years',
        fees: '₹47,066 Total Benchmark (₹18,000 1st Yr Listing; varies)'
      },
      {
        name: 'Bachelor of Social Work [BSW]',
        duration: '3-4 Years',
        fees: '₹39,066 Total Benchmark (varies)'
      },
      {
        name: 'Bachelor of Journalism [BJ]',
        duration: '1-3 Years',
        fees: '₹34,572 Total Benchmark (varies)'
      },
      {
        name: 'Master of Arts [MA]',
        duration: '2 Years',
        fees: '₹3,142 - ₹19,142 Total Benchmark (₹10,000 1st Yr Listing; varies)'
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹83,142 Total Benchmark (varies)'
      }
    ],
    placements: {
      highest: 'INR 6.50 LPA',
      average: 'INR 3.20 LPA',
      lowest: 'INR 2.00 LPA',
      recruiters: [
        'State Government Bodies',
        'Banking Services',
        'TCS',
        'Wipro BPO',
        'Concentrix',
        'Insurance Sector'
      ]
    },
    scholarships: [
      {
        name: 'MP Post-Matric State Scholarship',
        criteria: 'Eligible domicile & reserved category students via MP Scholarship Portal',
        benefits: 'Full/partial tuition fee reimbursement as per scheme rules'
      },
      {
        name: 'Gaon Ki Beti Scheme',
        criteria: 'Meritorious rural female students',
        benefits: 'Financial aid per academic year'
      }
    ]
  },
  {
    id: 'radiant-institute',
    name: 'Radiant Institute of Management & Science',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'DAVV',
    location: 'Nipania',
    feePerAnnum: 55000,
    rating: 3.8,
    googleRating: 3.8,
    indoreRating: 4.1,
    totalReviews: 512,
    image: '/radiant-institute.jpg',
    description: 'Radiant Institute of Management and Science (RIMS Indore), established in 2009 and affiliated with Devi Ahilya Vishwavidyalaya (DAVV), offers undergraduate and postgraduate courses across management, commerce, computer applications, arts, and social work. Note that third-party directories list both a Bypass Road / Nipania (near Phoenix Citadel Mall) location and an earlier Sector-A, Bakhtawar Ram Nagar address; confirm exact current campus location and admissions directly with the institute.',
    facilities: [
      'Smart Classrooms',
      'Air-conditioned Auditorium',
      'Digital Library',
      'Computer Center',
      'Sports Arena',
      'Cafeteria'
    ],
    establishedYear: 2009,
    coordinates: { lat: 22.755, lng: 75.895 },
    address: 'Near Phoenix Citadel Mall, Indore–Dewas Bypass Road, Nipania, Indore - 452016, Madhya Pradesh, India (earlier listed at Sector-A, Bakhtawar Ram Nagar)',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'Affiliated to Devi Ahilya Vishwavidyalaya (DAVV); confirm current regulatory approvals directly with the institute',
    selectionCriteria: 'Merit-based and entrance/screening admission as applicable per course and DAVV / state guidelines.',
    updates: [
      'Directory listings for RIMS Indore (website radiantindore.com; email info@radiantindore.com; phones 9755534000 / 9111531234) show Nipania (Indore–Dewas Bypass Road, near Phoenix Citadel Mall) as well as earlier Sector-A, Bakhtawar Ram Nagar records; verify current campus address and session fees directly with the institute.',
      'Published fee figures vary widely by programme, track, and source (such as ~₹39,000–₹5,37,000 across UG/PG/MBA/BBA/B.Com/BCA/MSW/BA listings); confirm exact current session tuition and additional charges before applying.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹60,000 (1st Year Benchmark; varies by track)',
        specializations: ['General / Regular', 'BBA ILP']
      },
      {
        name: 'Bachelor of Commerce [B.Com]',
        duration: '3 Years',
        fees: '₹45,000 (1st Year Benchmark; varies by track)',
        specializations: [
          'General',
          'Advertising, Sales Promotion and Sales Management',
          'Foreign Plus'
        ]
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: 'Varies'
      },
      {
        name: 'Bachelor of Arts [BA]',
        duration: '3 Years',
        fees: '₹40,000 (1st Year Benchmark; varies)',
        specializations: ['Arts & Humanities']
      },
      {
        name: 'Master of Commerce [M.Com]',
        duration: '2 Years',
        fees: 'Varies'
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: ['MBA Duke']
      },
      {
        name: 'Master of Social Work [MSW]',
        duration: '2 Years',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 7.20 LPA - 9.00 LPA (Portal Listings)',
      average: 'INR 3.50 LPA',
      lowest: 'INR 2.40 LPA',
      recruiters: [
        'Teleperformance',
        'HDFC Bank',
        'Flipkart',
        'Genpact',
        'Axis Bank',
        'TCS',
        'Wipro',
        'Deloitte',
        'ICICI Bank'
      ]
    },
    scholarships: [
      {
        name: 'Radiant Talent Scholarship',
        criteria: 'Qualifying academic merit criteria as per institute policy',
        benefits: 'Fee concession as per institutional policy'
      }
    ]
  },
  {
    id: 'pioneer-institute',
    name: 'Pioneer Institute of Professional Studies',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'DAVV',
    location: 'Bombay Hospital Road',
    feePerAnnum: 62000,
    rating: 4.4,
    googleRating: 4.4,
    indoreRating: 4.4,
    totalReviews: 370,
    image: '/pioneer-institute.jpg',
    description: 'Pioneer Institute of Professional Studies (PIPS Indore), established in 1996 at Sector-R, Mahalaxmi Nagar near Bombay Hospital on the Ring Road / A.B. Road corridor in Indore, is a private institute affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and approved by AICTE for applicable programs. It offers undergraduate, postgraduate, diploma, and doctoral programs across management, commerce, computer applications, sciences, and agribusiness.',
    facilities: [
      'High-Tech Computer Labs',
      'Central Management Library',
      'Air-Conditioned Seminar Halls',
      'Auditorium',
      'Wi-Fi Campus',
      'Sports Ground',
      'Placement Cell'
    ],
    establishedYear: 1996,
    coordinates: { lat: 22.758, lng: 75.895 },
    address: 'Sector-R, Near Bombay Hospital, Ring Road, Mahalaxmi Nagar, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 14 km)',
    approval: 'AICTE Approved (for applicable programs), Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'Merit-based and entrance-based admission (such as CMAT / CAT / XAT / MAT / DTE counseling for MBA/PGDM and qualifying 10+2 merit for UG programs).',
    updates: [
      'Official contact channels on pioneerinstitute.net list pioneer@pioneerinstitute.net, phones 0731-2570645 / 0731-2550866, and campus address at Sector-R, Near Bombay Hospital, Ring Road, Mahalaxmi Nagar, Indore - 452010.',
      'Published fee benchmarks vary by course, duration, and source (such as ~₹1.12–2.54 Lakhs total for MBA/PGDM tracks, ~₹1.32–1.34 Lakhs total for BBA, ~₹1.14–1.16 Lakhs total for BCA, and ~₹49,500–72,000 total for B.Com); confirm exact current session tuition and additional charges directly with the institute.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹1,14,000 - ₹1,16,000 Total Benchmark (₹55,000 1st Yr Listing; varies)',
        specializations: ['Cloud Computing', 'Web Technologies', 'Software Development']
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹1,32,000 - ₹1,34,000 Total Benchmark (₹62,000 1st Yr Listing; varies)'
      },
      {
        name: 'Bachelor of Commerce [B.Com]',
        duration: '3 Years',
        fees: '₹49,500 - ₹72,000 Total Benchmark (varies)',
        specializations: ['General', 'Computer Applications', 'Tax Procedure & Practice']
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3 Years',
        fees: '₹90,000 Total Benchmark (varies)',
        specializations: ['Computer Science']
      },
      {
        name: 'Master of Business Administration [MBA] / PGDM',
        duration: '2 Years',
        fees: '₹1,12,000 - ₹2,54,000 Total Benchmark (₹78,000 1st Yr Listing; varies)',
        specializations: [
          'Marketing',
          'Finance',
          'Human Resource',
          'Systems Management',
          'Production Management'
        ]
      },
      {
        name: 'Diploma / PG Diploma (Agribusiness / Computer Applications)',
        duration: '1-2 Years',
        fees: '₹12,000 - ₹66,460 Total Benchmark (varies)'
      },
      {
        name: 'Doctor of Philosophy [Ph.D]',
        duration: '3 Years',
        fees: '₹13,600 Total Benchmark (varies)',
        specializations: ['Management Studies']
      }
    ],
    placements: {
      highest: 'INR 10.50 LPA',
      average: 'INR 2.50 LPA - 4.20 LPA (Portal Listings)',
      lowest: 'INR 2.30 LPA - 2.80 LPA',
      recruiters: [
        'TCS',
        'Wipro',
        'Infosys',
        'ICICI Bank',
        'IBM',
        'Accenture',
        'HCL Technologies',
        'Axis Bank',
        'Jaro Education',
        'Lupin'
      ]
    },
    scholarships: [
      {
        name: 'Pioneer Merit & Government Scholarship Schemes',
        criteria: 'Qualifying academic merit or MP state / central scheme eligibility',
        benefits: 'Fee waiver / scholarship support as per applicable scheme'
      }
    ]
  },
  {
    id: 'christian-eminent',
    name: 'Christian Eminent College',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'DAVV',
    location: 'HIG Main Rd',
    feePerAnnum: 45000,
    rating: 4.3,
    googleRating: 4.3,
    indoreRating: 4.2,
    totalReviews: 379,
    image: '/christian-eminent.jpg',
    description: 'Christian Eminent College (also listed as Christian Eminent Academy of Management, Professional Education & Research), established in 1996 at F-7, Ravi Shankar Shukla Nagar, HIG Main Road, Indore, is a private college affiliated with Devi Ahilya Vishwavidyalaya (DAVV). It offers undergraduate, postgraduate, and diploma programs across management, commerce, computer applications, sciences, and vocational/law-related courses.',
    facilities: [
      'Computer Labs',
      'Science & Biotech Labs',
      'Central Library',
      'Seminar & Lecture Halls',
      'Wi-Fi Campus',
      'Canteen',
      'Sports & Activity Areas'
    ],
    establishedYear: 1996,
    coordinates: { lat: 22.735, lng: 75.882 },
    address: 'F-7, Ravi Shankar Shukla Nagar, HIG Main Road, Indore - 452011, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'Affiliated to Devi Ahilya Vishwavidyalaya (DAVV); confirm current regulatory approvals & autonomy status directly with the college',
    selectionCriteria: 'Merit-based and applicable entrance/counseling admission as per DAVV university and college admission guidelines.',
    updates: [
      'Official contact details on christianeminent.com/public-information list F-7, Ravi Shankar Shukla Nagar, HIG Main Road, Indore - 452011, phone +91-9826974678, and email director@christianeminent.com.',
      'Published fee figures vary widely across portals and courses (such as ~₹25,000/year to ₹81,500/year or ~₹55,500–₹2,42,000 total depending on program/duration); confirm exact current session tuition and additional charges directly with the college.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹45,000 (1st Year Benchmark; varies by source/session)'
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹42,000 (1st Year Benchmark; varies by source/session)',
        specializations: [
          'Software Development',
          'Web Technologies',
          'Cloud Computing',
          'Database Management',
          'Programming'
        ]
      },
      {
        name: 'Bachelor of Commerce [B.Com] / B.Com (Hons.)',
        duration: '3 Years',
        fees: '₹55,500 - ₹1,52,000 Total Benchmark (varies)',
        specializations: ['Accounting', 'Taxation', 'Business Law', 'Economics', 'Finance', 'Auditing']
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3 Years',
        fees: '₹38,000 (1st Year Benchmark; varies)',
        specializations: [
          'Computer Science',
          'Biotechnology',
          'Biochemistry',
          'Bioinformatics',
          'Microbiology',
          'Electronics'
        ]
      },
      {
        name: 'Master of Science [M.Sc] / Master of Commerce [M.Com]',
        duration: '2 Years',
        fees: 'Varies',
        specializations: [
          'Biotechnology',
          'Chemistry',
          'Computer Science',
          'Mathematics',
          'Pharmaceutical'
        ]
      },
      {
        name: 'Post Graduate Diploma in Computer Applications [PGDCA]',
        duration: '1 Year',
        fees: 'Varies'
      }
    ],
    placements: {
      highest: 'INR 7.50 LPA',
      average: 'INR 3.50 LPA',
      lowest: 'INR 2.40 LPA',
      recruiters: [
        'Teleperformance',
        'TCS',
        'Wipro',
        'Tech Mahindra',
        'HDFC Bank',
        'Infosys',
        'Paytm'
      ]
    },
    scholarships: [
      {
        name: 'Merit & Government Scholarship Schemes',
        criteria: 'Qualifying academic merit or MP state / central scheme eligibility',
        benefits: 'Fee waiver / scholarship support as per applicable scheme'
      }
    ]
  },
  {
    id: 'holkar-science',
    name: 'Government Holkar Science College',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'Government',
    location: 'Bhawarkua',
    feePerAnnum: 18000,
    rating: 4.2,
    googleRating: 4.2,
    indoreRating: 4.9,
    totalReviews: 2200,
    image: '/holkar-science.jpg',
    description: 'Government Model Autonomous Holkar Science College (HSC Indore), established in 1891 on A.B. Road near Bhawarkua Square in Indore, is a government autonomous science college affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and accredited by NAAC. It offers undergraduate, postgraduate, and diploma/research programs across pure and applied sciences, computer applications, and data/analytical disciplines.',
    facilities: [
      'State-of-the-Art BCA Computing Labs',
      'Central Heritage Library',
      'Research Innovation Hub',
      'Astronomical Observatory',
      'NCC & NSS Wings',
      'Large Sports Grounds',
      'Canteen'
    ],
    establishedYear: 1891,
    coordinates: { lat: 22.6945, lng: 75.864 },
    address: 'A.B. Road, Near Bhawarkua Square, Indore, Madhya Pradesh - 452001, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 9 km)',
    approval: 'Government Autonomous College, NAAC Accredited, Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'Centralized MP Higher Education online e-Pravesh merit/counseling based on qualifying exam percentage and applicable university/government norms.',
    updates: [
      'Official contact channels on collegeholkar.org list A.B. Road, Near Bhawarkua Square, Indore - 452001, phone 0731-2464074, and email principalhsc@rediffmail.com.',
      'Government-regulated UG/PG/PGDCA fees under MP Higher Education / DAVV vary by course and quota (such as ~₹14,000–₹18,000/year benchmarks for B.Sc. and BCA, and ~₹16,000/year for M.Sc.); confirm exact current session fees via e-Pravesh or the college office.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3-4 Years',
        fees: '₹18,000 (1st Year Benchmark; confirm current fees)'
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3-4 Years',
        fees: '₹14,000 (1st Year Benchmark; confirm current fees)',
        specializations: [
          'Biochemistry',
          'Bioinformatics',
          'Biotechnology',
          'Botany',
          'Chemistry',
          'Computer Science',
          'Cyber Security',
          'Economics',
          'Electronics',
          'Forensic Science',
          'Geography',
          'Geology',
          'Horticulture',
          'Industrial Fish and Fisheries',
          'Mathematics',
          'Microbiology',
          'Pharmaceutical Chemistry',
          'Physics',
          'Seed Technology',
          'Statistics',
          'Zoology'
        ]
      },
      {
        name: 'Master of Science [M.Sc]',
        duration: '2 Years',
        fees: '₹16,000 (1st Year Benchmark; confirm current fees)',
        specializations: [
          'Biochemistry',
          'Biotechnology',
          'Botany',
          'Chemistry',
          'Computer Science',
          'Fisheries',
          'Forensic Science',
          'Geography',
          'Geology',
          'Mathematics',
          'Microbiology',
          'Pharmaceutical Chemistry',
          'Physics',
          'Seed Technology',
          'Statistics',
          'Zoology'
        ]
      },
      {
        name: 'Post Graduate Diploma',
        duration: '1 Year',
        fees: 'Varies',
        specializations: [
          'Post-Graduation Diploma in Computer Application (PGDCA)',
          'PG Diploma in Yoga'
        ]
      }
    ],
    placements: {
      highest: 'INR 12.00 LPA',
      average: 'INR 4.50 LPA',
      lowest: 'INR 3.00 LPA',
      recruiters: [
        'TCS Digital',
        'Infosys',
        'Wipro',
        'Cognizant',
        'L&T Infotech',
        'State Government Bodies'
      ]
    },
    scholarships: [
      {
        name: 'MP State Post-Matric Scholarship',
        criteria: 'Eligible domicile & reserved category students via MP Scholarship Portal',
        benefits: 'Full/partial tuition fee reimbursement as per scheme rules'
      },
      {
        name: 'Medhavi Chhatra Yojana',
        criteria: 'Eligible board merit criteria as per MP government scheme rules',
        benefits: 'Government scholarship support as per scheme rules'
      }
    ]
  },
  {
    id: 'gujarati-professional',
    name: 'Shri RGP Gujarati Professional Institute',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'DAVV',
    location: 'Bombay Hospital Road',
    feePerAnnum: 48000,
    rating: 3.9,
    googleRating: 3.9,
    indoreRating: 4.1,
    totalReviews: 244,
    image: '/gujarati-professional.jpg',
    description: 'Shri R.G.P. Gujarati Professional Institute (SRGPGPI Indore), established in 2001 under Shri Gujarati Samaj in Scheme No. 54 near Bombay Hospital along A.B. Road in Indore, is approved by AICTE and affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and RGPV Bhopal (for applicable programs). It offers undergraduate and postgraduate programs across computer applications, management, and commerce.',
    facilities: [
      'Advanced Computing Labs',
      'Central Management Library',
      'Air-Conditioned Seminar Hall',
      'Auditorium',
      'Spacious Classrooms',
      'Cafeteria',
      'Indoor Games'
    ],
    establishedYear: 2001,
    coordinates: { lat: 22.759, lng: 75.894 },
    address: 'Scheme No. 54, Near Bombay Hospital, A.B. Road, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 14 km)',
    approval: 'AICTE Approved; Affiliated to Devi Ahilya Vishwavidyalaya (DAVV) and RGPV Bhopal (as applicable)',
    selectionCriteria: 'Merit-based and entrance/counseling admission (such as CMAT / MP DTE counseling for MBA and qualifying exam merit for UG/PG programs) as per university and state norms.',
    updates: [
      'Official contact details on srgpgpi.in/contact-us list Scheme No. 54, Near Bombay Hospital, A.B. Road, Indore - 452010, phone 0731-2556030, mobile 9630451460, and email srgpgpi@gmail.com; admissions are open for the 2026–27 session.',
      'Published fee figures vary across portals and courses (such as ~₹55,000/year or ~₹70,000 total for MBA tracks, ~₹1.07 Lakhs total for MCA, ~₹1.17 Lakhs total or ₹48,000/year for BBA, ~₹84,420 total or ₹42,000/year for BCA, and ~₹45,000 total for B.Com.); confirm exact current session fees directly with the institute.'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹55,000 (1st Year Benchmark; ₹70,000 Total Portal Listing; varies)',
        specializations: ['Marketing', 'Finance', 'Human Resources']
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹1,07,000 Total Portal Benchmark (varies)'
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹48,000 (1st Year Benchmark; ₹1.17 Lakhs Total Portal Listing; varies)'
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹42,000 (1st Year Benchmark; ₹84,420 Total Portal Listing; varies)'
      },
      {
        name: 'Bachelor of Commerce [B.Com]',
        duration: '3 Years',
        fees: '₹45,000 Total Portal Benchmark (varies)',
        specializations: ['Plain', 'Computer Application']
      }
    ],
    placements: {
      highest: 'INR 6.80 LPA',
      average: 'INR 3.20 LPA',
      lowest: 'INR 2.20 LPA',
      recruiters: ['ICICI Bank', 'Teleperformance', 'TCS', 'Axis Bank', 'Justdial']
    },
    scholarships: [
      {
        name: 'Gujarati Samaj Merit Scholarship',
        criteria: 'Qualifying academic merit or trust scholarship guidelines',
        benefits: 'Fee waiver / concession as per applicable trust & government policy'
      }
    ]
  },
  {
    id: 'iil-indore',
    name: 'Indore Institute of Law (IIL)',
    type: 'college',
    category: 'Law',
    boardOrAffiliation: 'Autonomous',
    location: 'Rau',
    feePerAnnum: 210000,
    rating: 4.5,
    googleRating: 4.5,
    indoreRating: 4.9,
    totalReviews: 1250,
    image: '/iil-indore.jpg',
    description: 'Indore Institute of Law (IIL Indore), established in 2003 at Gendalal Bam Parisar opposite IIM Indore on Rau–Pithampur Road, is a private law college approved by the Bar Council of India (BCI) and affiliated with Devi Ahilya Vishwavidyalaya (DAVV). It offers 5-year integrated B.A. LL.B. (Hons.) and B.B.A. LL.B. (Hons.) programs (including Global & Transnational Studies), 3-year LL.B. (Hons.), and postgraduate LL.M. programs.',
    facilities: [
      'Grand Moot Court Hall',
      'Mock Parliament',
      'Air-Conditioned Law Library',
      'Manupatra & Legal Databases',
      'Auditorium',
      'Hostel (Boys & Girls)',
      'Sports Complex'
    ],
    establishedYear: 2003,
    coordinates: { lat: 22.645, lng: 75.825 },
    address: 'Gendalal Bam Parisar, Opp. IIM Indore, Rau–Pithampur Road, Indore, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'Bar Council of India (BCI) Approved, Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'Entrance-based and merit-based admission via IILET (Indore Institute of Law Entrance Test) / CLAT / LSAT / qualifying exam norms and personal interaction as applicable.',
    updates: [
      'Official contact details on indoreinstituteoflaw.org/contact.php list Gendalal Bam Parisar, Opp. IIM, Rau Pithampur Road, Indore (City Office: Orbit Mall, 425–426, A.B. Road, Indore - 452010), phone +91 9977019777 (and +91 9425318618 / 9977032777), and email indoreinstituteoflaw@gmail.com.',
      'Published fee structure on indoreinstituteoflaw.org/fee-structure.php lists annual tuition of ₹2,10,000 for 5-year B.A. LL.B. (Hons.) / B.B.A. LL.B. (Hons.) (₹10,50,000 total tuition; ₹3,60,000/year tuition for Global & Transnational Studies track), ₹48,000/year tuition for 3-year LL.B., and ₹57,000/year tuition for LL.M. (excluding one-time registration, application, exam, uniform, and optional bus/hostel fees).'
    ],
    coursesList: [
      {
        name: 'BA LLB (Hons)',
        duration: '5 Years',
        fees: '₹2,10,000/year Tuition (₹10,50,000 Total Tuition; excl. reg/exam/uniform)'
      },
      {
        name: 'BBA LLB (Hons)',
        duration: '5 Years',
        fees: '₹2,10,000/year Tuition (₹3,60,000/yr Global Track; excl. reg/exam/uniform)',
        specializations: ['General', 'Global & Transnational Studies']
      },
      {
        name: 'Bachelor of Laws [LL.B. (Hons.)]',
        duration: '3 Years',
        fees: '₹48,000/year Tuition (₹1,44,000 Total Tuition; excl. reg/exam/uniform)'
      },
      {
        name: 'Master of Laws [LL.M.]',
        duration: '2 Years',
        fees: '₹57,000/year Tuition (₹1,14,000 Total Tuition; excl. reg/exam/uniform)'
      }
    ],
    placements: {
      highest: 'INR 12.00 LPA - 14.00 LPA',
      average: 'INR 4.00 LPA - 5.80 LPA',
      lowest: 'INR 3.50 LPA',
      recruiters: [
        'Khaitan & Co',
        'Shardul Amarchand Mangaldas',
        'Luthra & Luthra',
        'HDFC Legal',
        'TATA Sons Legal',
        'Supreme Court Advocate Chambers'
      ]
    },
    scholarships: [
      {
        name: 'IIL Merit & Entrance Scholarship',
        criteria: 'Qualifying academic merit or entrance/scholarship guidelines',
        benefits: 'Tuition fee waiver / concession as per institute policy'
      }
    ]
  },
  {
    id: 'rishiraj-institute',
    name: 'Rishi Raj Institute of Technology',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Sanwer Road',
    feePerAnnum: 58000,
    rating: 2.9,
    totalReviews: 9,
    image: '/rishiraj-institute.jpg',
    description: 'Rishi Raj Institute of Technology (RIT Indore), established in 2002 along Sanwer Road (Bhavrasla / behind SAIMS Hospital area) in Indore, is a private technical institute offering undergraduate and postgraduate programs in engineering and management. Confirm current active status, affiliations (RGPV / DAVV), and session admission details directly with the institute.',
    facilities: [
      'Engineering Laboratories',
      'Central Library',
      'Playground',
      'Seminar & Lecture Halls',
      'Computer Labs'
    ],
    establishedYear: 2002,
    coordinates: { lat: 22.79, lng: 75.84 },
    address: 'Bhavrasla, Behind SAIMS Hospital, Sanwer Road, Indore - 453331, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 14 km)',
    approval: 'AICTE Approved (historical/directory listing); B.E./B.Tech associated with RGPV and MBA with DAVV — confirm current status directly',
    selectionCriteria: 'Entrance-based and merit-based admission (such as JEE Main / MP DTE counseling for B.E./B.Tech and CMAT / CAT / counseling norms for MBA) as per applicable guidelines.',
    updates: [
      'Directory records for Rishi Raj Institute of Technology list Bhavrasla, Behind SAIMS Hospital, Sanwer Road, Indore - 453331, phones 0731-4254100 / 4254101, and email director@ritindore.org; no standalone active official college domain was confirmed in current search results.',
      'Published fee benchmarks across portals list total tuition around ₹1.74–2.32 Lakhs for 4-year B.E./B.Tech tracks (~₹58,000/year benchmark on a ₹2.32L/4-yr basis), ₹1.20 Lakhs total for 2-year M.E./M.Tech, and ₹75,000 total for 2-year MBA; verify current session availability and fees directly before applying.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Engineering / Technology [B.E. / B.Tech]',
        duration: '4 Years',
        fees: '₹1.74 Lakhs - ₹2.32 Lakhs Total Tuition Benchmark (confirm current fees)',
        specializations: [
          'Computer Science and Engineering',
          'Electronics and Communication Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Engineering / Technology [M.E. / M.Tech]',
        duration: '2 Years',
        fees: '₹1.20 Lakhs Total Tuition Benchmark (confirm current fees)',
        specializations: [
          'Computer Science and Engineering',
          'Electronics and Communication Engineering',
          'Thermal Engineering'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹75,000 Total Tuition Benchmark (confirm current fees)'
      }
    ],
    placements: {
      highest: 'INR 3.00 LPA - 4.50 LPA (Portal Listings)',
      average: 'INR 2.00 LPA - 3.00 LPA',
      lowest: 'INR 1.80 LPA',
      recruiters: ['Local & Regional Employers', 'IT & Service Firms']
    },
    scholarships: [
      {
        name: 'State & Central Scholarship Schemes',
        criteria: 'Qualifying academic merit or MP state / central scheme eligibility',
        benefits: 'Fee waiver / scholarship support as per applicable scheme'
      }
    ]
  },
  {
    id: 'gsb-indore',
    name: 'Graduate School of Business College',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'DAVV',
    location: 'Nipania',
    feePerAnnum: 135500,
    rating: 4.2,
    totalReviews: 15,
    image: '/gsb-indore.jpg',
    description: 'Graduate School of Business (GSB College Indore), located along the Nipania Bypass (before Omaxe-1 Township, next to Sheraton Hotel, opposite Gurudwara) in Indore, is a private college affiliated with Devi Ahilya Vishwavidyalaya (DAVV). It offers undergraduate and postgraduate programs across management, commerce, computer applications, arts, fashion design, and law.',
    facilities: [
      'Computer Labs',
      'Seminar & Lecture Halls',
      'Library',
      'Bus Transport Network',
      'Cafeteria'
    ],
    establishedYear: 2010,
    coordinates: { lat: 22.755, lng: 75.895 },
    address: 'Nipania Bypass, Before Omaxe-1 Township, Next to Sheraton Hotel, Opposite Gurudwara, Indore, Madhya Pradesh - 452001, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'Affiliated to Devi Ahilya Vishwavidyalaya (DAVV); confirm course-specific regulatory approvals directly with the college',
    selectionCriteria: 'Merit-based and entrance/selection admission (such as qualifying exam merit for UG programs and CAT / MAT / CMAT / qualifying selection norms for MBA) as per DAVV and college guidelines.',
    updates: [
      'Official contact details on gsbl.in/contact list Nipania Bypass, Before Omaxe-1 Township, Next to Sheraton Hotel, Opposite Gurudwara, Indore - 452001, general enquiry +91 8120000470, department lines (+91 9109150511 / 7400552204 / 6232007726 / 9109185566), and email gsb.academia@gmail.com; admissions are open for 2026–27.',
      'Published fee benchmarks vary across portals and courses (such as ~₹95,500 total for 2-year MBA, ~₹4.07–4.82 Lakhs total for 3-year BBA tracks, ~₹2.24 Lakhs total for 3-year BCA, ~₹2.39–3.14 Lakhs total for B.Com tracks, and ~₹1.10–6.23 Lakhs total across law tracks); confirm exact current session tuition and additional charges directly with the college.'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹95,500 Total Benchmark (confirm current fees)',
        specializations: ['Dual Specialization']
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹1,35,500 - ₹1,60,500/year Benchmark (₹4.07L–4.82L Total; varies)',
        specializations: ['General', 'Foreign Trade', 'Advance']
      },
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹74,500/year Benchmark (₹2,23,500 Total; varies)'
      },
      {
        name: 'Bachelor of Commerce [B.Com]',
        duration: '3 Years',
        fees: '₹79,599 - ₹1,04,500/year Benchmark (₹2.39L–3.14L Total; varies)',
        specializations: ['Plain', 'Honours', 'Advance']
      },
      {
        name: 'Bachelor of Arts [BA]',
        duration: '3 Years',
        fees: '₹54,500 - ₹74,500/year Benchmark (varies)',
        specializations: ['Economics', 'Psychology', 'Sociology', 'Political Science']
      },
      {
        name: 'BA LLB (Hons) / BBA LLB / LLB',
        duration: '3-5 Years',
        fees: '₹1,10,000 - ₹6,22,500 Total Benchmark (varies by track)'
      },
      {
        name: 'Fashion Design Programmes',
        duration: 'Confirm with college',
        fees: 'Contact college for current fees'
      }
    ],
    placements: {
      highest: 'INR 15.00 LPA - 16.00 LPA (Portal Listings)',
      average: 'INR 5.38 LPA - 6.50 LPA',
      lowest: 'INR 4.00 LPA',
      recruiters: [
        'Bajaj Finserv',
        'Teleperformance',
        'ICICI Bank',
        'HDFC Life',
        'ICICI Prudential',
        'Intellipaat',
        'JASH Engineering',
        'Vestian'
      ]
    },
    scholarships: [
      {
        name: 'Merit & Institutional Scholarship Schemes',
        criteria: 'Qualifying academic merit or institutional policy criteria',
        benefits: 'Fee concession / support as per applicable policy'
      }
    ]
  },
  {
    id: 'skitm-indore',
    name: 'Shivajirao Kadam Institute of Technology & Management',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'Autonomous',
    location: 'Ralamandal',
    feePerAnnum: 60000,
    rating: 3.6,
    googleRating: 3.6,
    totalReviews: 111,
    image: '/college-images/SKITM/SKITM.jpeg',
    campusPhoto: '/college-images/SKITM/SKITM.jpeg',
    description: 'Shivajirao Kadam Institute of Technology & Management (SKITM Indore), established in 2009 near Ralamandal Sanctuary at Tillore Khurd along the Indore Bypass Road, is a private autonomous technical and professional institution offering undergraduate, postgraduate, and integrated programs across engineering, management, commerce, pharmacy, and law.',
    facilities: [
      'Auditorium',
      'Computer Labs',
      'Engineering Labs',
      'Boys & Girls Hostels with Mess',
      'Sports Facilities',
      'Career Development Cell'
    ],
    facilityImages: {
      'Auditorium': '/college-images/SKITM/SKITM-Auditorium.webp',
      'Computer Labs': "/college-images/SKITM/SKITM-Computer Labs'.webp",
      'Boys & Girls Hostels with Mess': '/college-images/SKITM/SKITM-HOSTALS.webp',
      'Sports Facilities': '/college-images/SKITM/SKITM-Sports Facilities.webp',
      'Career Development Cell': '/college-images/SKITM/SKITM-Career Development Cell.webp'
    },
    establishedYear: 2009,
    coordinates: { lat: 22.659, lng: 75.903 },
    address: 'Near Ralamandal Sanctuary, Tillore Khurd, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'UGC Autonomous & NAAC Accredited (as listed on skitm.in); AICTE / RGPV / DAVV / regulatory approvals as applicable by program',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MP DTE counseling or Class 12 merit (B.Tech), and national/state entrance tests or qualifying exam merit/counseling as applicable for MBA, BBA, B.Pharm, and Law.',
    updates: [
      'Official contact channels on skitm.in list Near Ralamandal Sanctuary, Tillore Khurd, Indore - 452020, phones +91 9770907100 / +91 9770907103 / 0731-2995584-86, and email info@skitm.in; admissions are open for the 2026–27 session.',
      'Published fee benchmarks vary across portals and courses (such as ~₹1.80–3.20 Lakhs total for 4-year B.Tech, ~₹1.20 Lakhs total for 2-year MBA, ~₹1.90 Lakhs total for 3-year BBA, ~₹3.60 Lakhs total for 4-year B.Pharm, and ~₹1.20–3.25 Lakhs total across law programs); confirm exact current session tuition and additional charges directly with the institute.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech]',
        duration: '4 Years',
        fees: '₹1.80 Lakhs - ₹3.20 Lakhs Total Benchmark (confirm current fees)',
        specializations: [
          'Computer Science & Engineering',
          'Artificial Intelligence & Machine Learning',
          'CSE - AIML (Microsoft)',
          'Computer Science and Information Technology (CSIT)',
          'Data Science',
          'Information Technology (IT)',
          'Electronics & Communication Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹1,20,000 Total Benchmark (confirm current fees)'
      },
      {
        name: 'Integrated MBA [IMBA]',
        duration: '5 Years',
        fees: '₹3,50,000 Total Benchmark (confirm current fees)'
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹1,90,000 Total Benchmark (confirm current fees)'
      },
      {
        name: 'Bachelor of Commerce [B.Com] (Hons.)',
        duration: '3 Years',
        fees: '₹1,50,000 Total Benchmark (confirm current fees)'
      },
      {
        name: 'Bachelor of Pharmacy [B.Pharm] / Diploma in Pharmacy [D.Pharm]',
        duration: '2-4 Years',
        fees: '₹3,60,000 Total Benchmark (B.Pharm; varies)'
      },
      {
        name: 'BA LLB (Hons.) / BBA LLB (Hons.) / LL.B.',
        duration: '3-5 Years',
        fees: '₹1,20,000 - ₹3,25,000 Total Benchmark (varies by program)'
      }
    ],
    placements: {
      highest: 'INR 12.00 LPA',
      average: 'INR 5.00 LPA',
      lowest: 'INR 3.00 LPA',
      recruiters: ['LearnFLU Edutech', 'Patch Line Technologies', 'PCS Pvt Ltd', 'Advikait']
    },
    scholarships: [
      {
        name: 'SKITM Merit, Sports & Category Scholarships',
        criteria: 'Qualifying JEE / board merit, sports achievement, EWS, single-parent, girl student, sibling, or defence criteria',
        benefits: 'Fee waiver / concession as per institute scholarship policy'
      }
    ]
  },
  {
    id: 'astral-institute',
    name: 'Astral Institute of Technology and Research',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Bypass Road',
    feePerAnnum: 45600,
    rating: 3.3,
    totalReviews: 11,
    image: '/astral-institute.jpg',
    description: 'Astral Institute of Technology and Research (AITR Indore), established in 2006 under Vijayvargiya Public Educational Society along Kailod Kartal Bypass Road in Indore, is a private technical and management institute approved by AICTE and DTE and affiliated with RGPV Bhopal. It offers undergraduate, postgraduate, and diploma programs across engineering, management, and computer applications.',
    facilities: [
      'Computer Labs',
      'Engineering Laboratories',
      'Central Library',
      'Seminar & Lecture Halls',
      'Wi-Fi Campus',
      'Sports Facilities',
      'Cafeteria & Hostels'
    ],
    establishedYear: 2006,
    coordinates: { lat: 22.75, lng: 75.89 },
    address: 'Kailod Kartal Bypass Road, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 20 km)',
    approval: 'AICTE & DTE Approved; Affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MPPET / MP DTE counseling (B.E./B.Tech), GATE (M.E./M.Tech), CAT / CMAT / ATMA / MP counseling norms (MBA), or qualifying exam eligibility.',
    updates: [
      'Official contact channels on astral.ac.in/contact list Kailod Kartal Bypass Road, Indore - 452020, phone +91-9229-20-5555, office lines 0731-6450155 / 6457555, and email info@astral.ac.in.',
      'Published fee benchmarks vary across portals and courses (such as ~₹91,200–₹1,82,000 total for 4-year B.E./B.Tech, ~₹40,100–₹1,60,000 total for 2-year MBA/PGDM, ~₹62,000–₹1,24,000 total for 2-year M.E./M.Tech, ~₹91,200 total for MCA, and ~₹36,000–₹72,000 total for Diploma); confirm exact current session tuition and additional charges directly with the institute.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Engineering / Technology [B.E. / B.Tech]',
        duration: '4 Years',
        fees: '₹91,200 - ₹1,82,000 Total Benchmark (confirm current fees)',
        specializations: [
          'Computer Science and Engineering',
          'Information Technology',
          'Electronics & Communication Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Technology / Master of Engineering [M.E. / M.Tech]',
        duration: '2 Years',
        fees: '₹62,000 - ₹1,24,000 Total Benchmark (confirm current fees)',
        specializations: ['Computer Science and Engineering']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹40,100 - ₹1,60,000 Total Benchmark (varies by specialization)',
        specializations: [
          'Marketing Management',
          'Finance',
          'Financial Administration',
          'Human Resource Management',
          'Operations Management',
          'Systems Management',
          'General'
        ]
      },
      {
        name: 'Master of Computer Applications [MCA]',
        duration: '2 Years',
        fees: '₹91,200 Total Benchmark (confirm current fees)'
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹36,000 - ₹72,000 Total Benchmark (confirm current fees)',
        specializations: ['Civil Engineering', 'Mechanical Engineering']
      }
    ],
    placements: {
      highest: 'INR 4.50 LPA - 6.00 LPA (Portal Listings)',
      average: 'INR 2.50 LPA - 3.50 LPA',
      lowest: 'INR 1.80 LPA',
      recruiters: ['TCS', 'Infosys', 'Wipro', 'Regional & Startup Employers']
    },
    scholarships: [
      {
        name: 'MP State & Central Scholarship Schemes',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Tuition fee support / reimbursement as per government and institutional policy'
      }
    ]
  },
  {
    id: 'swami-vivekanand-college-engineering',
    name: 'Swami Vivekanand College of Engineering',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Khandwa Road',
    feePerAnnum: 57000,
    rating: 3.5,
    totalReviews: 44,
    image: '/swami-vivekanand-college-engineering.jpg',
    description: 'Swami Vivekanand College of Engineering (SVCE Indore), established in 2004 at Vivekanand Knowledge City along Khandwa Road (near Toll Naka) in Indore, is part of the Swami Vivekanand Group of Institutions (SVGI). Approved by AICTE and affiliated with RGPV Bhopal (and DAVV for applicable programs), it offers undergraduate, postgraduate, and diploma programs across engineering and management.',
    facilities: [
      'Computer Labs',
      'Engineering Laboratories',
      'Central Library',
      'Seminar & Lecture Halls',
      'Auditorium',
      'Wi-Fi Campus',
      'Bus Transport Network',
      'Medical Facilities'
    ],
    establishedYear: 2004,
    coordinates: { lat: 22.6345, lng: 75.8795 },
    address: 'Vivekanand Knowledge City, Khandwa Road, Near Toll Naka, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'AICTE Approved; Affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal (and DAVV where applicable)',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / MP DTE counseling (B.Tech/B.E.), GATE (M.E./M.Tech), CMAT / counseling norms (MBA), or qualifying exam eligibility.',
    updates: [
      'Official contact channels on svce.vivekanandgroup.com and vivekanandgroup.com list Vivekanand Knowledge City, Khandwa Road, Near Toll Naka, Indore - 452020, phone 07324-405000 (and 7879830112 / 7771011933 / +91 90909 90909), and email info@svceindore.ac.in; admissions are open for AY 2026–27.',
      'Published fee benchmarks vary across portals and courses (such as ~₹2.28 Lakhs total for 4-year B.E./B.Tech, ~₹1.38 Lakhs total for 2-year MBA, ~₹1.24 Lakhs total for 2-year M.E./M.Tech, and ~₹72,000 total for 3-year Diploma/Polytechnic); confirm exact current session tuition and additional charges directly with the institute.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Technology [B.Tech / B.E.]',
        duration: '4 Years',
        fees: '₹2,28,000 Total Benchmark (confirm current fees)',
        specializations: [
          'Computer Science & Engineering',
          'Information Technology',
          'Artificial Intelligence & Machine Learning',
          'Artificial Intelligence & Data Science',
          'Electronics & Communication Engineering',
          'Electrical & Electronics Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'Master of Engineering / Technology [M.E. / M.Tech]',
        duration: '2 Years',
        fees: '₹1,24,000 Total Benchmark (confirm current fees)',
        specializations: ['Computer Science & Engineering', 'Power System']
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹1,38,000 Total Benchmark (confirm current fees)',
        specializations: [
          'Finance',
          'Human Resource',
          'Information Systems',
          'Marketing',
          'Production Management'
        ]
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹72,000 Total Benchmark (confirm current fees)',
        specializations: ['Mechanical Engineering', 'Civil Engineering']
      }
    ],
    placements: {
      highest: 'INR 6.00 LPA - 8.00 LPA (Portal Listings)',
      average: 'INR 3.00 LPA - 4.00 LPA',
      lowest: 'INR 2.00 LPA',
      recruiters: ['Tech Mahindra', 'ICICI Bank', 'HCL Technologies', 'Mphasis', 'Birlasoft']
    },
    scholarships: [
      {
        name: 'MP State & Central Scholarship Schemes',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Tuition fee support / reimbursement as per government and institutional policy'
      }
    ]
  },
  {
    id: 'indore-management-institute',
    name: 'Indore Management Institute and Research Centre',
    type: 'college',
    category: 'Management',
    boardOrAffiliation: 'DAVV',
    location: 'Khandwa Road',
    feePerAnnum: 80000,
    rating: 3.9,
    totalReviews: 4,
    image: '/indore-management-institute.jpg',
    description: 'Indore Management Institute and Research Centre (IMI Indore), established in 2008 along Khandwa Road (Datoda, opposite Chokhi Dhani) in Indore, is a private management, commerce, law, and pharmacy institute affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and approved by AICTE / UGC for applicable programs.',
    facilities: [
      'Library',
      'Computer Lab',
      'Seminar & Lecture Halls',
      'Wi-Fi Campus',
      'Girls Hostel & Mess',
      'Sports & Activity Areas'
    ],
    establishedYear: 2008,
    coordinates: { lat: 22.6345, lng: 75.8795 },
    address: 'Khandwa Road (Datoda), Opp. Chokhi Dhani, Indore - 452020, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'AICTE & UGC Approved (as applicable by program); Affiliated to Devi Ahilya Vishwavidyalaya (DAVV)',
    selectionCriteria: 'Entrance-based and merit-based admission via CAT / CMAT / CET / counseling or qualifying exam eligibility norms as applicable per program.',
    updates: [
      'Directory and portal listings for IMI Indore list Khandwa Road (Datoda), Opp. Chokhi Dhani, Indore - 452020, phone 9717265930 (and 0731-3005323), email info@imi.ac.in, and website imi.ac.in.',
      'Published fee figures vary widely across portals and courses (such as ~₹39,000–₹1,60,000 for MBA tracks, ~₹1,45,000–₹2,54,000 for PGDM, ~₹35,000–₹90,000 for BBA, ~₹30,000–₹48,000 for B.Com, and ~₹36,000–₹1,00,000 for law programs); confirm exact current session fees and approvals directly with the institute.'
    ],
    coursesList: [
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: '₹39,000 - ₹1,60,000 Benchmark (confirm current fees)',
        specializations: [
          'Dual (Marketing, Finance, HR, IT & Operations)',
          'Financial Administration',
          'Marketing Management',
          'Banking'
        ]
      },
      {
        name: 'Post Graduate Diploma in Management [PGDM]',
        duration: '2 Years',
        fees: '₹1,45,000 - ₹2,54,000 Benchmark (confirm current fees)',
        specializations: [
          'Dual Specialization',
          'Banking and Financial Services',
          'Business Analytics and IT'
        ]
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹35,000 - ₹90,000 Benchmark (confirm current fees)',
        specializations: ['Marketing', 'Finance', 'Human Resource']
      },
      {
        name: 'Bachelor of Commerce [B.Com]',
        duration: '3 Years',
        fees: '₹30,000 - ₹48,000 Benchmark (confirm current fees)',
        specializations: ['Commerce', 'Computer Application']
      },
      {
        name: 'BA LLB (Hons.) / LL.B.',
        duration: '3-5 Years',
        fees: '₹36,000 - ₹1,00,000 Benchmark (confirm current fees)'
      }
    ],
    placements: {
      highest: 'INR 6.60 LPA - 8.00 LPA (Portal Listings)',
      average: 'INR 2.50 LPA - 4.00 LPA',
      lowest: 'INR 2.00 LPA',
      recruiters: [
        'ICICI Bank',
        'ICICI Prudential Life Insurance',
        'Paytm',
        'IDFC Bank',
        'Justdial',
        'HDFC Bank',
        'Jaro Education',
        'Impetus'
      ]
    },
    scholarships: [
      {
        name: 'Government & Tuition Fee Waiver (TFW) Schemes',
        criteria: 'Qualifying government, TFW, or academic merit criteria',
        benefits: 'Fee concession / waiver as per applicable scheme'
      }
    ]
  },
  {
    id: 'vindhya-institute-indore',
    name: 'Vindhya Institute of Technology & Science',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Khandwa Road',
    feePerAnnum: 24000,
    rating: 3.4,
    totalReviews: 25,
    image: '/vindhya-institute-indore.jpg',
    description: 'Vindhya Institute of Technology & Science (VITS Indore), located at Gram Umrikheda along Khandwa Road in Indore, is an engineering and management institute listed as AICTE-approved and affiliated with Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV / RGTU), Bhopal. It offers undergraduate, postgraduate, and diploma programs across engineering and management.',
    facilities: [
      'Engineering Laboratories',
      'Computer Labs',
      'Central Library',
      'Seminar & Lecture Halls',
      'Wi-Fi Campus',
      'Sports Facilities',
      'Cafeteria'
    ],
    establishedYear: 2002,
    coordinates: { lat: 22.6345, lng: 75.8795 },
    address: 'Gram Umrikheda, Khandwa Road, Indore, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 16 km)',
    approval: 'AICTE Approved (as listed in directory records); Affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV / RGTU), Bhopal',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / GATE / MP counseling norms or qualifying exam eligibility as applicable per program.',
    updates: [
      'Directory records for Vindhya Institute of Technology & Science (VITS Indore) list Gram Umrikheda, Khandwa Road, Indore, phone 0731-3046079, and email contact@vindhyaindore.ac.in; no standalone active official college domain was confirmed in current search results.',
      'Published fee figures vary across portals and courses (such as ~₹96,000–₹1,92,000 total for 4-year B.E./B.Tech, ~₹62,000–₹1,20,000 total for 2-year M.E./M.Tech, ~₹39,000–₹74,000 total for 2-year MBA, and ~₹36,000–₹72,000 total for 3-year Diploma); confirm exact current session availability, approvals, and fees directly with the institute.'
    ],
    coursesList: [
      {
        name: 'B.E. / B.Tech',
        duration: '4 Years',
        fees: '₹96,000 - ₹1,92,000 Total Benchmark (confirm current fees)',
        specializations: [
          'Computer Science & Engineering',
          'Electronics & Communication Engineering',
          'Electrical & Electronics Engineering',
          'Mechanical Engineering',
          'Civil Engineering'
        ]
      },
      {
        name: 'M.E. / M.Tech',
        duration: '2 Years',
        fees: '₹62,000 - ₹1,20,000 Total Benchmark (confirm current fees)',
        specializations: [
          'Computer Science & Engineering',
          'Electronics and Communication Engineering',
          'Thermal Engineering',
          'Power Electronics',
          'Software System'
        ]
      },
      {
        name: 'Diploma in Engineering (Polytechnic)',
        duration: '3 Years',
        fees: '₹36,000 - ₹72,000 Total Benchmark (confirm current fees)',
        specializations: ['Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering']
      },
      {
        name: 'MBA / PGDM',
        duration: '2 Years',
        fees: '₹39,000 - ₹74,000 Total Benchmark (confirm current fees)'
      }
    ],
    placements: {
      highest: 'INR 4.50 LPA - 6.00 LPA (Portal Listings)',
      average: 'INR 2.50 LPA - 3.50 LPA',
      lowest: 'INR 1.80 LPA',
      recruiters: ['Syntel', 'Hexaware', 'Zensar', 'Aspire Systems', 'Phoenix Maritime Services']
    },
    scholarships: [
      {
        name: 'MP State & Central Scholarship Schemes',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Tuition fee support / reimbursement as per government and institutional policy'
      }
    ]
  },
  {
    id: 'kk-vigyan-college',
    name: 'K.K. Vigyan Avan Vyavasaik Adhyayan Mahavidyalaya',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'DAVV',
    location: 'Vijay Nagar',
    feePerAnnum: 20000,
    rating: 3.7,
    totalReviews: 3,
    image: '/kk-vigyan-college.jpg',
    description: 'K.K. Vigyan Avan Vyavasaik Adhyayan Mahavidyalaya (K.K. College Indore), located at Plot No. 37, Sector-E, Scheme No. 54, Vijay Nagar (opposite Marriott Hotel & Apollo Hospital) in Indore, is a private college affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and recognized by the Department of Higher Education, Madhya Pradesh. It offers undergraduate and postgraduate programs across commerce, business administration, computer applications, sciences, and management.',
    facilities: [
      'Computer Labs',
      'Science Laboratories',
      'Central Library',
      'Seminar & Lecture Halls',
      'Wi-Fi Campus',
      'Sports Facilities'
    ],
    establishedYear: 2008,
    coordinates: { lat: 22.753, lng: 75.887 },
    address: 'Plot No. 37, Sector-E, Scheme No. 54, Vijay Nagar, Opp. Marriott Hotel & Apollo Hospital, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'Affiliated to Devi Ahilya Vishwavidyalaya (DAVV), Indore; Recognized by Department of Higher Education, M.P. (confirm AICTE / regulatory approvals directly with the college)',
    selectionCriteria: 'Merit-based and applicable university/state counseling admission (such as qualifying 10+2 / graduation merit and DAVV / MP Higher Education norms).',
    updates: [
      'Official contact details on kkcolleges.in list Plot No. 37, Sector-E, Scheme No. 54, Vijay Nagar, Opp. Marriott Hotel & Apollo Hospital, Indore, phones 9770555599 / 9691111311 / 92019-79500 / 92019-79505, and email kkcollegeindore@gmail.com; admissions are open for Academic Session 2026–27.',
      'Published fee figures vary across portals and courses (such as ~₹55,000 total for 3-year BCA, ~₹37,000 total for 3-year B.Com / B.Com Hons., ~₹31,000–₹46,000 total for 3-year B.Sc., and ~₹29,000 total for 2-year M.Com.); confirm exact current session tuition and additional charges directly with the college.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Computer Applications [BCA]',
        duration: '3 Years',
        fees: '₹55,000 Total Benchmark (confirm current fees)'
      },
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: 'Contact college for current fees'
      },
      {
        name: 'Bachelor of Commerce [B.Com. / B.Com. Hons.]',
        duration: '3-4 Years',
        fees: '₹37,000 Total Benchmark (confirm current fees)',
        specializations: ['Plain', 'Honours', 'Computer Application', 'Taxation', 'Advertisement']
      },
      {
        name: 'Bachelor of Science [B.Sc.]',
        duration: '3 Years',
        fees: '₹31,000 - ₹46,000 Total Benchmark (confirm current fees)',
        specializations: ['Computer Science']
      },
      {
        name: 'Master of Commerce [M.Com.]',
        duration: '2 Years',
        fees: '₹29,000 Total Benchmark (confirm current fees)'
      },
      {
        name: 'Master of Business Administration [MBA]',
        duration: '2 Years',
        fees: 'Contact college for current fees'
      }
    ],
    placements: {
      highest: 'INR 4.50 LPA - 6.00 LPA (Portal Listings)',
      average: 'INR 2.50 LPA - 3.50 LPA',
      lowest: 'INR 1.80 LPA',
      recruiters: ['Local & Regional Employers', 'IT & Commerce Firms']
    },
    scholarships: [
      {
        name: 'MP State & Central Scholarship Schemes',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Fee waiver / scholarship support as per government and institutional policy'
      }
    ]
  },
  {
    id: 'jain-diwakar-college',
    name: 'Shri Jain Diwakar College',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'DAVV',
    location: 'New Palasia',
    feePerAnnum: 23000,
    rating: 4,
    totalReviews: 3,
    image: '/jain-diwakar-college.jpg',
    description: 'Shri Jain Diwakar College (SJDC / Shri Jain Diwakar Mahavidyalaya Indore), established in 2007, is a private college affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and NCTE-approved for teacher education programs. Directory listings place its campus/office at Scheme No. 55-C, Plot No. 665, New Palasia (near Janjeerwala Square / Laxmi Memorial Hospital) as well as Sahu Khedi Main Road in Indore; confirm exact active campus address and session details directly with the college.',
    facilities: [
      'Laboratories',
      'Language Laboratory',
      'E-Library',
      'Classrooms',
      'Placement Support'
    ],
    establishedYear: 2007,
    coordinates: { lat: 22.728, lng: 75.884 },
    address: 'Scheme No. 55-C, Plot No. 665, New Palasia, Near Janjeerwala Square, Indore - 452001, Madhya Pradesh, India (also listed at Sahu Khedi Main Road, Indore)',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 10 km)',
    approval: 'Affiliated to Devi Ahilya Vishwavidyalaya (DAVV); NCTE Approved (for teacher education programs) & NAAC Accredited (confirm current status directly)',
    selectionCriteria: 'Merit-based and applicable entrance/counseling admission (such as MP Pre-B.Ed / counseling norms for B.Ed and qualifying merit for UG/PG programs) as per DAVV and state guidelines.',
    updates: [
      'Directory records for Shri Jain Diwakar College list website sjdcollege.org, email sjdmindore@gmail.com, phones 0731-4291111 / 0731-4063832 / 9826044555, and address at Scheme No. 55-C, Plot No. 665, New Palasia, Indore - 452001 alongside Sahu Khedi Main Road listings; confirm current campus address and session availability directly with the college.',
      'Published fee figures vary across portals and courses (such as ~₹20,500–₹23,000/year for B.Sc. tracks, ~₹23,000/year or ~₹69,000 total for 3-year BBA, ~₹23,000/year or ~₹46,000 total for 2-year MBA, and ~₹40,000–₹80,000 for B.Ed); confirm exact current session tuition and additional charges directly with the college.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Science (B.Sc.)',
        duration: '3 Years',
        fees: '₹20,500/year Benchmark (confirm current fees)',
        specializations: [
          'Biotechnology',
          'Computer Science',
          'Horticulture',
          'Mathematics',
          'Microbiology',
          'Seed Technology'
        ]
      },
      {
        name: 'Master of Science (M.Sc.)',
        duration: '2 Years',
        fees: '₹46,000 Benchmark (Seed Technology; confirm current fees)',
        specializations: ['Computer Science', 'Mathematics', 'Seed Science & Technology']
      },
      {
        name: 'Bachelor of Commerce (B.Com.)',
        duration: '3 Years',
        fees: 'Confirm with college',
        specializations: ['Plain', 'Computer Application', 'Taxation']
      },
      {
        name: 'Master of Commerce (M.Com.)',
        duration: '2 Years',
        fees: 'Confirm with college'
      },
      {
        name: 'Bachelor of Arts (B.A.)',
        duration: '3 Years',
        fees: 'Confirm with college'
      },
      {
        name: 'Bachelor of Business Administration (BBA)',
        duration: '3 Years',
        fees: '₹23,000/year Benchmark (₹69,000 Total; confirm current fees)'
      },
      {
        name: 'Master of Business Administration (MBA) / PGDM',
        duration: '2 Years',
        fees: '₹23,000/year Benchmark (₹46,000 Total; confirm current fees)'
      },
      {
        name: 'BSW & MSW (Social Work)',
        duration: '2-3 Years',
        fees: 'Confirm with college'
      },
      {
        name: 'B.Ed',
        duration: '2 Years',
        fees: '₹40,000 - ₹80,000 Benchmark (confirm current fees)'
      },
      {
        name: 'PGDCA',
        duration: '1 Year',
        fees: 'Confirm with college'
      }
    ],
    placements: {
      highest: 'INR 5.00 LPA - 10.00 LPA (Portal Listings)',
      average: 'INR 2.50 LPA - 3.50 LPA',
      lowest: 'INR 1.80 LPA',
      recruiters: ['Local & Regional Employers', 'Commerce & Service Firms']
    },
    scholarships: [
      {
        name: 'MP State & Central Scholarship Schemes',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Fee waiver / scholarship support as per government and institutional policy'
      }
    ]
  },
  {
    id: 'sica-college-indore',
    name: 'SICA College',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'DAVV',
    location: 'Nipania',
    feePerAnnum: 45510,
    rating: 4,
    totalReviews: 12,
    image: '/sica-college-indore.jpg',
    description: 'SICA College Indore, established in July 2013 under the SICA Educational Trust along Nipania Main Road (near ISKCON Temple and ahead of Advanced Academy School), is a private coeducational college affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and approved by the Department of Higher Education, Madhya Pradesh. It offers undergraduate programs across commerce, management, computer applications, sciences, arts, and journalism & mass communication.',
    facilities: [
      'Computer Labs',
      'Science Laboratories',
      'Central Library',
      'Seminar & Lecture Halls',
      'Wi-Fi Campus',
      'Sports & Cultural Spaces'
    ],
    establishedYear: 2013,
    coordinates: { lat: 22.755, lng: 75.895 },
    address: 'Nipania Main Road, Near ISKCON Temple & Ahead of Advanced Academy School, Indore - 452010, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'Affiliated to Devi Ahilya Vishwavidyalaya (DAVV), Indore; Approved by Department of Higher Education, M.P.',
    selectionCriteria: 'Merit-based and applicable university/state counseling admission (such as qualifying 10+2 merit and DAVV / MP Higher Education norms).',
    updates: [
      'Official contact details on sicacollegeindore.com/contact-us list Nipania Main Road (Near ISKCON Temple and ahead of Advanced Academy School, Indore - 452010), phone 0731-2974255, mobiles 8871729595 / 9669808182, and email sicacollege@sicacollegeindore.com; admissions are open for Session 2026–27.',
      'Published course pages on sicacollegeindore.com list B.B.A. (Plain) fee at ₹45,510 (+ refundable caution money) and B.Com. (Plain) fee at ₹34,400 (+ refundable caution money); confirm exact current session fee breakups and additional charges directly with the college.'
    ],
    coursesList: [
      {
        name: 'Bachelor of Business Administration [BBA]',
        duration: '3 Years',
        fees: '₹45,510 Benchmark (+ Refundable Caution Money; confirm current fees)',
        specializations: ['Plain']
      },
      {
        name: 'Bachelor of Commerce [B.Com. / B.Com. Hons.]',
        duration: '3-4 Years',
        fees: '₹34,400 Benchmark (+ Refundable Caution Money; confirm current fees)',
        specializations: ['Plain', 'Honours', 'Computer Application', 'Taxation']
      },
      {
        name: 'Bachelor of Computer Application [BCA]',
        duration: '3 Years',
        fees: 'Contact college for current fees'
      },
      {
        name: 'Bachelor of Science [B.Sc]',
        duration: '3 Years',
        fees: 'Contact college for current fees'
      },
      {
        name: 'Bachelor of Arts [B.A. / B.A. Hons.]',
        duration: '3-4 Years',
        fees: 'Contact college for current fees',
        specializations: [
          'History, Political Science, English Literature',
          'History, Political Science, Computer Application',
          'Journalism & Mass Communication'
        ]
      }
    ],
    placements: {
      highest: 'INR 4.50 LPA - 6.00 LPA (Portal Listings)',
      average: 'INR 2.50 LPA - 3.50 LPA',
      lowest: 'INR 1.80 LPA',
      recruiters: ['Local & Regional Employers', 'Commerce & Service Firms']
    },
    scholarships: [
      {
        name: 'MP State & Central Scholarship Schemes',
        criteria: 'Eligible domicile, merit, or reserved category criteria',
        benefits: 'Fee waiver / scholarship support as per government and institutional policy'
      }
    ]
  },
  {
    id: 'sri-aurobindo-institute-of-technology',
    name: 'Sri Aurobindo Institute of Technology (SAIT)',
    type: 'college',
    category: 'Engineering',
    boardOrAffiliation: 'AICTE',
    location: 'Sanwer Road',
    feePerAnnum: 75000,
    rating: 3.9,
    totalReviews: 85,
    image: '/college-images/SAIT/SAIT.jpg',
    campusPhoto: '/college-images/SAIT/SAIT.jpg',
    description: 'Sri Aurobindo Institute of Technology (SAIT Indore), established in 2009 along the Indore–Ujjain Highway near MR-10 Crossing (SAIMS Campus, Bhawrasla / Sanwer Road) in Indore, is part of the Sri Aurobindo Group of Institutes. It offers undergraduate, postgraduate, and design/management programs across engineering, technology, design, and management.',
    facilities: [
      'Engineering & Computing Labs',
      'Central Library',
      'Seminar & Lecture Halls',
      'Sports Facilities',
      'Wi-Fi Campus',
      'Cafeteria & Bus Network'
    ],
    facilityImages: {
      'Engineering & Computing Labs': '/college-images/SAIT/SAIT-Engineering & Computing Labs.webp',
      'Central Library': '/college-images/SAIT/SAIT-Central Library.webp',
      'Seminar & Lecture Halls': '/college-images/SAIT/SAIT-Seminar & Lecture Halls.webp',
      'Sports Facilities': '/college-images/SAIT/SAIT-Sports Facilities.webp',
      'Wi-Fi Campus': '/college-images/SAIT/SAIT-Wi-Fi Campus.webp',
      'Cafeteria & Bus Network': '/college-images/SAIT/SAIT-Cafeteria & Bus Network.webp'
    },
    establishedYear: 2009,
    coordinates: { lat: 22.775, lng: 75.845 },
    address: 'SAIMS Campus, Indore–Ujjain Highway, Near MR-10 Crossing, Bhawrasla, Indore - 453555, Madhya Pradesh, India',
    nearestAirport: 'Devi Ahilya Bai Holkar Airport (approx 12 km)',
    approval: 'AICTE-aligned engineering curricula & group approvals; confirm program-specific affiliations (RGPV / university norms) directly with SAIT',
    selectionCriteria: 'Entrance-based and merit-based admission via JEE Main / GATE / MP counseling norms or qualifying exam eligibility as applicable per program.',
    updates: [
      'Official contact channels on aurogroup.ac/technology/contact.php list SAIMS Campus, Indore–Ujjain Highway, Near MR-10 Crossing, Indore, SAIT phone +91-96850 26688, group helpline +91-96850 26677, and email connect@aurogroup.ac (admissions@aurogroup.ac).',
      'Group portal aurogroup.ac lists 2025 placement highlights up to 12 LPA highest and 4.5 LPA average across 45+ recruiters, with admissions open for upcoming cycles; confirm exact current session fees and affiliations directly with SAIT.'
    ],
    coursesList: [
      { name: 'Bachelor of Technology (B.Tech) in Computer Science', duration: '4 years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Technology (B.Tech) in Computer Science (AI & Machine Learning)', duration: '4 years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Technology (B.Tech) in Electronics & Communication Engineering', duration: '4 years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Technology (B.Tech) in Civil Engineering', duration: '4 years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Technology (B.Tech) in Mechanical Engineering', duration: '4 years', fees: 'Contact institute for current fees' },
      { name: 'Master of Technology (M.Tech)', duration: '2 years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Design (B.Des)', duration: '4 years', fees: 'Contact institute for current fees' },
      { name: 'Master of Business Administration (MBA)', duration: '2 years', fees: 'Contact institute for current fees' },
      { name: 'Master of Business Administration in Hospital Administration (MBA-HA)', duration: '2 years', fees: 'Contact institute for current fees' }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'indore-institute-of-pharmacy',
    name: 'Indore Institute of Pharmacy (IIP)',
    type: 'college',
    category: 'Pharmacy',
    boardOrAffiliation: 'RGPV',
    location: 'Rau',
    address: 'IIST Campus, Opposite IIM, Rau-Pithampur Road, Rau, Indore - 453331, Madhya Pradesh',
    feePerAnnum: 70000,
    rating: 0,
    totalReviews: 0,
    image: '',
    description: 'Indore Institute of Pharmacy (IIP), established in 2004 on Rau-Pithampur Road opposite IIM Indore, is affiliated with RGPV Bhopal, approved by AICTE and PCI, and accredited with NAAC Grade A. It offers D.Pharm, B.Pharm, M.Pharm, and Pharm.D programs.',
    facilities: [
      'Advanced Laboratories',
      'Central Library & E-Library',
      'Computer Lab',
      'Hostels',
      'Transport',
      'Cafeteria & Sports',
      'Training & Placement Cell'
    ],
    establishedYear: 2004,
    coordinates: { lat: 22.618, lng: 75.795 },
    approval: 'AICTE & PCI Approved; Affiliated to RGPV, Bhopal; NAAC Grade A',
    selectionCriteria: 'Merit and MP DTE / state counseling norms as applicable',
    coursesList: [
      { name: 'Diploma in Pharmacy (D.Pharm)', duration: '2 Years', fees: 'Approx. ₹55,000/year' },
      { name: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', fees: 'Approx. ₹70,000 - ₹85,000/year' },
      {
        name: 'Master of Pharmacy (M.Pharm)',
        duration: '2 Years',
        fees: 'Contact institute for current fees',
        specializations: ['Pharmaceutics', 'Pharmaceutical Quality Assurance']
      },
      { name: 'Doctor of Pharmacy (Pharm.D)', duration: '6 Years', fees: 'Contact institute for current fees' }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'smriti-college-of-pharmacy',
    name: 'Smriti College of Pharmaceutical Education (SCPE)',
    type: 'college',
    category: 'Pharmacy',
    boardOrAffiliation: 'RGPV',
    approval: 'PCI & AICTE Approved; Affiliated to RGPV, Bhopal; NBA-accredited UG programs',
    location: 'Dewas Naka',
    address: '4/1, Pipliya Kumar, MR-11, Dewas Naka, Indore - 452010, Madhya Pradesh',
    feePerAnnum: 79000,
    rating: 4.6,
    googleRating: 4.6,
    totalReviews: 269,
    image: '',
    description: 'Smriti College of Pharmaceutical Education (SCPE), established in 1999 under B. R. Nahata Smriti Sansthan at MR-11, Dewas Naka, Indore, is affiliated with RGPV Bhopal and approved by PCI and AICTE, with NBA-accredited undergraduate pharmacy programs.',
    facilities: [
      'Sophisticated Laboratories',
      'Library',
      'Computer & IT Center',
      'Auditorium & Seminar Halls',
      'Training & Placement Cell',
      'Medical Facilities',
      'Sports & Recreation',
      'Cafeteria'
    ],
    establishedYear: 1999,
    coordinates: { lat: 22.7196, lng: 75.8577 },
    selectionCriteria: 'DTE Madhya Pradesh counseling and qualifying exam merit',
    coursesList: [
      { name: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', fees: 'Approx. ₹79,000 - ₹80,000/year (~₹3.16 Lakhs Total)' },
      {
        name: 'Master of Pharmacy (M.Pharm)',
        duration: '2 Years',
        fees: 'Approx. ₹71,500 - ₹75,000/year',
        specializations: ['Pharmaceutics', 'Pharmacognosy']
      }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'sri-aurobindo-institute-of-pharmacy',
    name: 'Sri Aurobindo Institute of Pharmacy (SAIP)',
    type: 'college',
    category: 'Pharmacy',
    boardOrAffiliation: 'RGPV',
    approval: 'AICTE & PCI Approved; Affiliated to RGPV, Bhopal; NAAC Accredited',
    location: 'Sanwer Road',
    address: 'SAIMS Campus, Indore-Ujjain Highway, Near MR-10 Crossing, Indore - 453111, Madhya Pradesh',
    feePerAnnum: 0,
    rating: 4.2,
    googleRating: 4.2,
    totalReviews: 285,
    image: '',
    description: 'Sri Aurobindo Institute of Pharmacy (SAIP), established in 2009 at the SAIMS Campus along Indore-Ujjain Highway near MR-10 Crossing, is affiliated with RGPV Bhopal, approved by AICTE and PCI, and accredited by NAAC.',
    facilities: [
      'Attached Super-Specialty Hospital',
      'Pharmaceutical Laboratories',
      'Library',
      'Innovation Centre for Drug Discovery',
      'Hostels',
      'Transport',
      'Cafeteria & Wi-Fi Campus',
      'Training & Placement Cell'
    ],
    establishedYear: 2009,
    coordinates: { lat: 22.775, lng: 75.845 },
    selectionCriteria: 'DTE Madhya Pradesh counseling / qualifying exam merit',
    coursesList: [
      { name: 'Diploma in Pharmacy (D.Pharm)', duration: '2 Years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', fees: 'Contact institute for current fees' },
      { name: 'Master of Pharmacy (M.Pharm)', duration: '2 Years', fees: 'Contact institute for current fees' },
      { name: 'Doctor of Pharmacy (Pharm.D)', duration: '6 Years', fees: 'Contact institute for current fees' }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'acropolis-institute-of-pharmacy',
    name: 'Acropolis Institute of Pharmaceutical Education and Research',
    type: 'college',
    category: 'Pharmacy',
    boardOrAffiliation: 'RGPV',
    approval: 'PCI & AICTE Approved; Affiliated to RGPV, Bhopal',
    location: 'Bypass Road',
    address: 'Acropolis Institute, Indore-Dewas Bypass Road, Manglia Square, Indore - 453771, Madhya Pradesh',
    feePerAnnum: 115000,
    rating: 4.5,
    googleRating: 4.5,
    totalReviews: 368,
    image: '',
    description: 'Acropolis Institute of Pharmaceutical Education and Research (AIPER), established in 2008 under the Acropolis Group on Indore-Dewas Bypass Road at Manglia Square, is affiliated with RGPV Bhopal and approved by PCI and AICTE.',
    facilities: [
      'Departmental Laboratories',
      'Central Library',
      'Smart Classrooms',
      'Computer Lab & Internet',
      'Industry-Institute Partnership Cell',
      'Hostels & Transport',
      'Sports & Gym'
    ],
    establishedYear: 2008,
    coordinates: { lat: 22.7915, lng: 75.908 },
    selectionCriteria: 'DTE / AFRC MP counseling norms and qualifying exam merit',
    coursesList: [
      { name: 'Diploma in Pharmacy (D.Pharm)', duration: '2 Years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', fees: 'Approx. ₹1.15 - ₹1.16 Lakhs/year' },
      {
        name: 'Master of Pharmacy (M.Pharm)',
        duration: '2 Years',
        fees: 'Contact institute for current fees',
        specializations: ['Pharmaceutics']
      }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'modern-institute-of-pharmaceutical-sciences',
    name: 'Modern Institute of Pharmaceutical Sciences (MIPS)',
    type: 'college',
    category: 'Pharmacy',
    boardOrAffiliation: 'RGPV',
    approval: 'PCI & AICTE Approved; Affiliated to RGPV, Bhopal',
    location: 'Sanwer Road',
    address: 'Modern Campus, Gram Alwasa, Behind BSF Rewati Ranges, Sanwer Road, Indore, Madhya Pradesh',
    feePerAnnum: 0,
    rating: 0,
    totalReviews: 0,
    image: '',
    description: 'Modern Institute of Pharmaceutical Sciences (MIPS), established in 2007 at Gram Alwasa on Sanwer Road, Indore, operates under the Modern Group of Institutions, affiliated with RGPV Bhopal and approved by PCI and AICTE.',
    facilities: [
      'Pharmaceutical Laboratories',
      'Central Library',
      'Pharma Incubation Center',
      'Auditorium & Seminar Halls',
      'Computer Labs',
      'Cafeteria',
      'Medical & Transport Facilities',
      'Training & Placement Cell'
    ],
    establishedYear: 2007,
    coordinates: { lat: 22.775, lng: 75.845 },
    selectionCriteria: 'DTE / AFRC Madhya Pradesh counseling and merit norms',
    coursesList: [
      { name: 'Diploma in Pharmacy (D.Pharm)', duration: '2 Years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', fees: 'Contact institute for current fees' },
      {
        name: 'Master of Pharmacy (M.Pharm)',
        duration: '2 Years',
        fees: 'Contact institute for current fees',
        specializations: ['Pharmaceutics', 'Quality Assurance']
      },
      {
        name: 'Master of Business Administration (MBA)',
        duration: '2 Years',
        fees: 'Contact institute for current fees',
        specializations: ['Pharmaceutical Management']
      }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'scmkvm-indore',
    name: 'Shri Cloth Market Kanya Vanijya Mahavidyalaya (SCMKVM)',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'DAVV',
    approval: 'UGC Recognized (2(f) & 12(B)), Affiliated to DAVV Indore, NAAC Grade A Accredited',
    location: 'Indore City',
    address: '70, Ganesh Ganj, Near Bada Ganpati Area, Indore - 452002, Madhya Pradesh',
    feePerAnnum: 0,
    rating: 0,
    totalReviews: 0,
    image: '',
    description: "Shri Cloth Market Kanya Vanijya Mahavidyalaya (SCMKVM), established in 1983 near Bada Ganpati in Indore, is a women's institution affiliated with Devi Ahilya Vishwavidyalaya (DAVV), recognized by UGC, and accredited with NAAC Grade A.",
    facilities: [
      'Classrooms & Academic Halls',
      'Computer & IT Laboratories',
      'Library',
      'Sports Infrastructure',
      'Cultural Event Spaces',
      'Career & Placement Support Cell'
    ],
    establishedYear: 1983,
    coordinates: { lat: 22.7196, lng: 75.8577 },
    selectionCriteria: 'Merit-based / Madhya Pradesh Higher Education counseling norms',
    coursesList: [
      { name: 'Master of Commerce (M.Com)', duration: '2 Years', fees: 'Around ₹60,000 (Reported Total Fees)' },
      { name: 'Bachelor of Commerce (B.Com)', duration: '3 Years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Arts (B.A.)', duration: '3 Years', fees: 'Contact institute for current fees' },
      { name: 'Master of Arts (M.A.)', duration: '2 Years', fees: 'Contact institute for current fees' },
      { name: 'PGDCA', duration: '1 Year', fees: 'Contact institute for current fees' }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'st-paul-institute-indore',
    name: 'St. Paul Institute of Professional Studies',
    type: 'college',
    category: 'Arts & Science',
    boardOrAffiliation: 'DAVV',
    approval: 'Autonomous, AICTE Approved, Affiliated to DAVV Indore, NAAC Grade A Accredited',
    location: 'Indore City',
    address: '7/1, Boundary Road, Lalaram Nagar, Indore - 452001, Madhya Pradesh',
    feePerAnnum: 41000,
    rating: 0,
    totalReviews: 0,
    image: '',
    description: 'St. Paul Institute of Professional Studies (SPIPS), established in 2010 at Lalaram Nagar, Indore, is an autonomous Christian minority institution affiliated with Devi Ahilya Vishwavidyalaya (DAVV) and accredited with NAAC Grade A.',
    facilities: [
      'Air-Conditioned Computer & Science Labs',
      'Library',
      'Auditorium & Seminar Halls',
      'Sports Playgrounds',
      'Wi-Fi Campus',
      'Cafeteria'
    ],
    establishedYear: 2010,
    coordinates: { lat: 22.7196, lng: 75.8577 },
    selectionCriteria: 'Merit-based / Madhya Pradesh Higher Education counseling norms',
    coursesList: [
      { name: 'Master of Commerce (M.Com)', duration: '2 Years', fees: 'Approx. ₹27,000 - ₹31,800/year' },
      {
        name: 'Bachelor of Commerce (B.Com)',
        duration: '3 Years',
        fees: 'Approx. ₹41,000 - ₹46,000/year',
        specializations: ['Plain', 'Hons.', 'Foreign Trade', 'Tax Procedures']
      },
      { name: 'Bachelor of Business Administration (BBA)', duration: '3 Years', fees: 'Approx. ₹53,000 - ₹55,000/year' },
      { name: 'Bachelor of Computer Applications (BCA)', duration: '3 Years', fees: 'Approx. ₹41,000 - ₹46,000/year' },
      {
        name: 'Bachelor of Science (B.Sc.)',
        duration: '3 Years',
        fees: 'Approx. ₹41,000 - ₹46,000/year',
        specializations: ['Computer Science', 'Biotechnology']
      },
      {
        name: 'Bachelor of Arts (B.A.)',
        duration: '3 Years',
        fees: 'Approx. ₹41,000 - ₹46,000/year',
        specializations: ['English', 'Economics', 'Psychology']
      },
      { name: 'PGDCA', duration: '1 Year', fees: 'Contact institute for current fees' }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'mrsc-indore',
    name: 'Maharaja Ranjit Singh College of Professional Sciences (MRSC Indore)',
    type: 'college',
    category: 'Computer Applications',
    boardOrAffiliation: 'DAVV & RGPV',
    approval: 'AICTE Approved, UGC 2(f) & 12(B), NAAC B++ Accredited, Affiliated to DAVV Indore & RGPV Bhopal',
    location: 'Khandwa Road',
    address: 'Hemkunt Campus, Khandwa Road (Near IET-DAVV), Indore - 452001, Madhya Pradesh',
    feePerAnnum: 45600,
    rating: 0,
    totalReviews: 0,
    image: '',
    description: 'Maharaja Ranjit Singh College of Professional Sciences (MRSC), established in 1994 on Khandwa Road near IET-DAVV, Indore, is accredited with NAAC Grade B++, approved by AICTE, recognized under UGC 2(f) & 12(B), and affiliated with DAVV Indore and RGPV Bhopal.',
    facilities: [
      'Library (30,000+ books)',
      'Computer Labs',
      'Science & Biotechnology Labs',
      'On-Campus Hostel',
      'Auditorium & Seminar Halls',
      'Sports & Recreation'
    ],
    establishedYear: 1994,
    coordinates: { lat: 22.681, lng: 75.879 },
    selectionCriteria: 'MP DTE counseling (MBA/MCA) and qualifying exam merit',
    coursesList: [
      { name: 'Master of Computer Applications (MCA)', duration: '2 Years', fees: 'Around ₹91,200 – ₹1,00,000 (Reported Fees)' },
      { name: 'Master of Business Administration (MBA)', duration: '2 Years', fees: 'Approx. ₹25,000 - ₹50,000/year' },
      { name: 'Bachelor of Computer Applications (BCA)', duration: '3 Years', fees: 'Approx. ₹25,000 - ₹40,000/year' },
      { name: 'Bachelor of Business Administration (BBA)', duration: '3 Years', fees: 'Approx. ₹25,000 - ₹40,000/year' },
      { name: 'Bachelor of Commerce (B.Com)', duration: '3 Years', fees: 'Approx. ₹6,000 - ₹25,000/year' },
      { name: 'Bachelor of Science (B.Sc.)', duration: '3 Years', fees: 'Approx. ₹6,000 - ₹25,000/year' },
      {
        name: 'Master of Science (M.Sc.)',
        duration: '2 Years',
        fees: 'Approx. ₹13,000 - ₹46,000/year',
        specializations: ['Biotechnology', 'Chemistry', 'Microbiology', 'Pharma Chemistry']
      },
      { name: 'Master of Commerce (M.Com)', duration: '2 Years', fees: 'Approx. ₹13,000 - ₹46,000/year' }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'indore-mahavidyalaya',
    name: 'Indore Mahavidyalaya',
    type: 'college',
    category: 'Computer Applications',
    boardOrAffiliation: 'RGPV & DAVV',
    approval: 'PCI Approved (Pharmacy), Affiliated to RGPV Bhopal & DAVV Indore',
    location: 'Indore',
    address: 'Jambudi Hapsi, Opposite Pitra Parvat, Near Indore Airport, Indore - 453112, Madhya Pradesh',
    feePerAnnum: 40000,
    rating: 0,
    totalReviews: 0,
    image: '',
    description: 'Indore Mahavidyalaya, established in 1996 at Jambudi Hapsi opposite Pitra Parvat near Indore Airport, offers undergraduate, postgraduate, and diploma programs across computer applications, management, commerce, pharmacy, and law.',
    facilities: [
      'Smart Classrooms',
      'Library',
      'Pharmaceutical Labs',
      'Computer & IT Labs',
      'Wi-Fi Campus',
      'Moot Court Hall',
      'Placement & Internship Cell',
      'Cafeteria & Transport'
    ],
    establishedYear: 1996,
    coordinates: { lat: 22.721, lng: 75.801 },
    selectionCriteria: 'MP Counselling and qualifying exam merit',
    coursesList: [
      { name: 'Master of Computer Applications (MCA)', duration: '2 Years', fees: 'Around ₹80,000 (Reported Fees)' },
      { name: 'Bachelor of Computer Applications (BCA)', duration: '3 Years', fees: 'Contact institute for current fees' },
      { name: 'Master of Business Administration (MBA)', duration: '2 Years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Business Administration (BBA)', duration: '3 Years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Commerce (B.Com)', duration: '3 Years', fees: 'Contact institute for current fees' },
      { name: 'Bachelor of Pharmacy (B.Pharm)', duration: '4 Years', fees: 'Approx. ₹60,000/year' },
      { name: 'Diploma in Pharmacy (D.Pharm)', duration: '2 Years', fees: 'Approx. ₹60,000/year' },
      { name: 'LL.B. (Hons.) / B.A. LL.B. (Hons.) / LL.M.', fees: 'Contact institute for current fees' }
    ],
    isDirectoryVerified: false
  },
  {
    id: 'arihant-college',
    name: 'Arihant College',
    type: 'college',
    category: 'Computer Applications',
    boardOrAffiliation: 'DAVV',
    approval: 'AICTE & NCTE Approved, Affiliated to DAVV Indore, NAAC Grade B Accredited',
    location: 'Khandwa Road',
    address: '453, Khandwa Road (Opposite Radha Swami Satsang), Indore, Madhya Pradesh',
    feePerAnnum: 35000,
    rating: 0,
    totalReviews: 0,
    image: '',
    description: 'Arihant College, established in 2006 on Khandwa Road, Indore, is affiliated with Devi Ahilya Vishwavidyalaya (DAVV), accredited with NAAC Grade B, and approved by AICTE and NCTE.',
    facilities: [
      'Computer Labs',
      'Library',
      'Sports & Indoor Games',
      'Incubation & Placement Cell',
      'Smart Classrooms & Seminar Halls'
    ],
    establishedYear: 2006,
    coordinates: { lat: 22.68, lng: 75.88 },
    selectionCriteria: 'Merit-based / MP Higher Education and DTE counseling norms',
    coursesList: [
      { name: 'Bachelor of Computer Applications (BCA)', duration: '3 Years', fees: 'Around ₹92,000 (Reported Total Fees)' },
      { name: 'Bachelor of Business Administration (BBA)', duration: '3 Years', fees: 'Approx. ₹35,000 - ₹70,000/year' },
      { name: 'Bachelor of Commerce (B.Com)', duration: '3 Years', fees: 'Approx. ₹35,000 - ₹70,000/year' },
      { name: 'Master of Business Administration (MBA)', duration: '2 Years', fees: 'Approx. ₹39,000 - ₹90,000 Total' },
      { name: 'Master of Commerce (M.Com)', duration: '2 Years', fees: 'Approx. ₹39,000 - ₹90,000 Total' },
      { name: 'Bachelor of Arts (B.A.)', duration: '3 Years', fees: 'Approx. ₹35,000 - ₹70,000/year' },
      { name: 'Bachelor of Education (B.Ed)', duration: '2 Years', fees: 'Approx. ₹64,000 Total' }
    ],
    isDirectoryVerified: false
  }
];

export const INDORE_LOCALITY_GROUPS = [
  {
    name: 'Sanwer / Ujjain Road',
    collegeIds: ['svvv-indore', 'lncts-indore', 'lnct-bhopal-indore', 'oriental-university', 'malwa-group-of-institutes', 'rishiraj-institute', 'saims', 'sri-aurobindo-institute-of-technology']
  },
  {
    name: 'Bypass Road',
    collegeIds: ['acropolis', 'mit-indore', 'apj-kalam-univ', 'gsb-indore', 'skitm-indore', 'sage-university', 'astral-institute', 'medi-caps-university']
  },
  {
    name: 'Khandwa Road',
    collegeIds: ['iet-davv', 'davv', 'chameli-devi', 'swami-vivekanand-college-engineering', 'indore-management-institute', 'ims-davv', 'vindhya-institute-indore']
  },
  {
    name: 'Indore City',
    collegeIds: ['piemr-indore', 'gujarati-professional', 'softvision-college', 'kk-vigyan-college', 'jain-diwakar-college', 'sica-college-indore']
  }
];

export const INDORE_LOCATIONS = [
  ...INDORE_LOCALITY_GROUPS.map(group => group.name),
  'Residency Area',
  'Jhalaria (Bypass)',
  'A.B. Road',
  'Manik Bagh',
  'LIG Colony',
  'Simrol',
  'Rau',
  'Vallabh Nagar',
  'Takshashila Campus',
  'Sanwer Road',
  'Bypass Road (Manglia)',
  'Vijay Nagar',
  'Palasia',
  'Khajrana',
  'Nipania',
  'Khandwa Road',
  'Rambagh',
  'Scheme 103',
  'Scheme 54',
  'Sudama Nagar',
  'Scheme 78',
  'Old Palasia',
  'Sukhliya',
  'Dwarkapuri',
  'Bicholi Mardana',
  'Gumasta Nagar',
  'Mahalaxmi Nagar',
  'Super Corridor',
  'Dhar Road',
  'Limbodi',
  'Garpiplaya',
  'Ralamandal',
  'Pigdamber',
  'Bhawarkua',
  'Dakachya',
  'Chhatripura',
  'Navlakha',
  'Raj Mohalla',
  'Saket',
  'Annapurna Road',
  'Rajendra Nagar',
  'MOG Lines',
  'World Cup Square',
  'Bakhtawar Ram Nagar',
  'Bombay Hospital Road',
  'HIG Main Rd'
];

export const CAMPUS_LOCATIONS = [
  'Ujjain Road',
  'Dewas Bypass',
  'Indore City',
  'Pitampur and Rau',
  'Other'
];

export const CATEGORIES = {
  school: [],
  college: [
    'B.Tech.',
    'M.Tech.',
    'MBA',
    'BBA',
    'BCA',
    'MCA',
    'BPHARMA',
    'DPHARMA',
    'B.Com.',
    'B.Sc.',
    'BBA LLB',
    'BA LLB',
    'BBA HM',
    'M.Sc.',
    'BJMC',
    'LAW',
    'BIO TECH',
    'MICRO BIOLOGY',
    'B.Ed',
    'D.Ed',
    'Design',
    'Other'
  ]
};

export const ADMISSION_COURSES = CATEGORIES.college;

export const BOARDS = {
  school: [],
  college: ['UGC', 'AICTE', 'Autonomous', 'Private University', 'State Board', 'Affiliated / Certified']
};