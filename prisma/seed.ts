import { PrismaClient, CollegeType, FeeCategory } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    slug: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    description:
      "IIT Bombay is a premier public technical university located in Powai, Mumbai. Known for excellence in engineering, research, and innovation with strong industry partnerships.",
    city: "Mumbai",
    state: "Maharashtra",
    type: CollegeType.GOVERNMENT,
    established: 1958,
    website: "https://www.iitb.ac.in",
    logoUrl: "https://ui-avatars.com/api/?name=IIT+Bombay&background=1e40af&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    avgRating: 4.8,
    reviewCount: 342,
    totalStudents: 12000,
    campusSize: "550 acres",
    accreditation: "NAAC A++",
  },
  {
    slug: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    description:
      "IIT Delhi is among India's top engineering institutes, offering cutting-edge programs in technology, sciences, and management in Hauz Khas, New Delhi.",
    city: "New Delhi",
    state: "Delhi",
    type: CollegeType.GOVERNMENT,
    established: 1961,
    website: "https://home.iitd.ac.in",
    logoUrl: "https://ui-avatars.com/api/?name=IIT+Delhi&background=1e3a8a&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    avgRating: 4.7,
    reviewCount: 298,
    totalStudents: 11000,
    campusSize: "320 acres",
    accreditation: "NAAC A++",
  },
  {
    slug: "bits-pilani",
    name: "Birla Institute of Technology and Science Pilani",
    shortName: "BITS Pilani",
    description:
      "BITS Pilani is a deemed university known for its flexible academic structure, strong alumni network, and excellent placement records across engineering disciplines.",
    city: "Pilani",
    state: "Rajasthan",
    type: CollegeType.DEEMED,
    established: 1964,
    website: "https://www.bits-pilani.ac.in",
    logoUrl: "https://ui-avatars.com/api/?name=BITS&background=7c3aed&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    avgRating: 4.6,
    reviewCount: 256,
    totalStudents: 15000,
    campusSize: "328 acres",
    accreditation: "NAAC A",
  },
  {
    slug: "vit-vellore",
    name: "Vellore Institute of Technology",
    shortName: "VIT Vellore",
    description:
      "VIT Vellore is a leading private deemed university offering diverse UG and PG programs with international collaborations and modern campus facilities.",
    city: "Vellore",
    state: "Tamil Nadu",
    type: CollegeType.PRIVATE,
    established: 1984,
    website: "https://vit.ac.in",
    logoUrl: "https://ui-avatars.com/api/?name=VIT&background=059669&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1498243691581-b9caebdf0a0a?w=800&q=80",
    avgRating: 4.3,
    reviewCount: 412,
    totalStudents: 35000,
    campusSize: "372 acres",
    accreditation: "NAAC A++",
  },
  {
    slug: "manipal-institute-of-technology",
    name: "Manipal Institute of Technology",
    shortName: "MIT Manipal",
    description:
      "MIT Manipal is part of Manipal Academy of Higher Education, offering quality engineering education with a vibrant campus life and global exposure.",
    city: "Manipal",
    state: "Karnataka",
    type: CollegeType.PRIVATE,
    established: 1957,
    website: "https://manipal.edu/mit.html",
    logoUrl: "https://ui-avatars.com/api/?name=MIT+Manipal&background=dc2626&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c87?w=800&q=80",
    avgRating: 4.2,
    reviewCount: 189,
    totalStudents: 28000,
    campusSize: "600 acres",
    accreditation: "NAAC A++",
  },
  {
    slug: "srm-institute",
    name: "SRM Institute of Science and Technology",
    shortName: "SRM IST",
    description:
      "SRM IST is a top private university near Chennai with strong industry ties, research centers, and a wide range of engineering and science programs.",
    city: "Chennai",
    state: "Tamil Nadu",
    type: CollegeType.PRIVATE,
    established: 1985,
    website: "https://www.srmist.edu.in",
    logoUrl: "https://ui-avatars.com/api/?name=SRM&background=b45309&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1564981797811-1047a55feeca?w=800&q=80",
    avgRating: 4.1,
    reviewCount: 267,
    totalStudents: 50000,
    campusSize: "250 acres",
    accreditation: "NAAC A++",
  },
  {
    slug: "nlsiu-bangalore",
    name: "National Law School of India University",
    shortName: "NLSIU",
    description:
      "NLSIU Bangalore is India's most prestigious law university, known for rigorous legal education and producing leaders in judiciary, academia, and corporate law.",
    city: "Bangalore",
    state: "Karnataka",
    type: CollegeType.GOVERNMENT,
    established: 1987,
    website: "https://www.nls.ac.in",
    logoUrl: "https://ui-avatars.com/api/?name=NLSIU&background=4338ca&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    avgRating: 4.9,
    reviewCount: 98,
    totalStudents: 800,
    campusSize: "23 acres",
    accreditation: "NAAC A++",
  },
  {
    slug: "iim-bangalore",
    name: "Indian Institute of Management Bangalore",
    shortName: "IIM Bangalore",
    description:
      "IIM Bangalore is a premier business school offering world-class MBA and executive programs with exceptional faculty and placement outcomes.",
    city: "Bangalore",
    state: "Karnataka",
    type: CollegeType.GOVERNMENT,
    established: 1973,
    website: "https://www.iimb.ac.in",
    logoUrl: "https://ui-avatars.com/api/?name=IIM+B&background=0f766e&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    avgRating: 4.8,
    reviewCount: 156,
    totalStudents: 1200,
    campusSize: "100 acres",
    accreditation: "NAAC A++",
  },
  {
    slug: "dtu-delhi",
    name: "Delhi Technological University",
    shortName: "DTU",
    description:
      "DTU (formerly Delhi College of Engineering) is a state university offering affordable quality engineering education in the heart of Delhi.",
    city: "New Delhi",
    state: "Delhi",
    type: CollegeType.GOVERNMENT,
    established: 1941,
    website: "https://dtu.ac.in",
    logoUrl: "https://ui-avatars.com/api/?name=DTU&background=0369a1&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    avgRating: 4.4,
    reviewCount: 223,
    totalStudents: 18000,
    campusSize: "164 acres",
    accreditation: "NAAC A",
  },
  {
    slug: "anna-university",
    name: "Anna University",
    shortName: "Anna University",
    description:
      "Anna University is a large public state university in Chennai, affiliating hundreds of engineering colleges across Tamil Nadu.",
    city: "Chennai",
    state: "Tamil Nadu",
    type: CollegeType.GOVERNMENT,
    established: 1978,
    website: "https://www.annauniv.edu",
    logoUrl: "https://ui-avatars.com/api/?name=Anna+Univ&background=be123c&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    avgRating: 4.0,
    reviewCount: 178,
    totalStudents: 40000,
    campusSize: "185 acres",
    accreditation: "NAAC A",
  },
  {
    slug: "symbiosis-pune",
    name: "Symbiosis International University",
    shortName: "SIU Pune",
    description:
      "Symbiosis is a multidisciplinary private deemed university in Pune known for management, law, media, and liberal arts programs.",
    city: "Pune",
    state: "Maharashtra",
    type: CollegeType.DEEMED,
    established: 2002,
    website: "https://www.siu.edu.in",
    logoUrl: "https://ui-avatars.com/api/?name=Symbiosis&background=9333ea&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1541872703-8c54d45b8e93?w=800&q=80",
    avgRating: 4.3,
    reviewCount: 201,
    totalStudents: 30000,
    campusSize: "350 acres",
    accreditation: "NAAC A++",
  },
  {
    slug: "jadavpur-university",
    name: "Jadavpur University",
    shortName: "JU",
    description:
      "Jadavpur University is a renowned public university in Kolkata with strong engineering and arts programs at highly competitive fees.",
    city: "Kolkata",
    state: "West Bengal",
    type: CollegeType.GOVERNMENT,
    established: 1955,
    website: "https://www.jaduniv.edu.in",
    logoUrl: "https://ui-avatars.com/api/?name=JU&background=166534&color=fff&size=128",
    coverImageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    avgRating: 4.5,
    reviewCount: 167,
    totalStudents: 12000,
    campusSize: "58 acres",
    accreditation: "NAAC A",
  },
];

function coursesFor(slug: string) {
  const base: Record<string, { name: string; degree: string; duration: string; feesPerYear: number; seats: number }[]> = {
    "iit-bombay": [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 250000, seats: 120 },
      { name: "Electrical Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 250000, seats: 100 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 250000, seats: 90 },
    ],
    "iim-bangalore": [
      { name: "Post Graduate Programme in Management", degree: "MBA", duration: "2 years", feesPerYear: 1250000, seats: 180 },
      { name: "Executive MBA", degree: "EMBA", duration: "1 year", feesPerYear: 1500000, seats: 60 },
    ],
    "nlsiu-bangalore": [
      { name: "BA LLB (Hons)", degree: "BA LLB", duration: "5 years", feesPerYear: 275000, seats: 120 },
    ],
  };
  return (
    base[slug] ?? [
      { name: "Computer Science & Engineering", degree: "B.Tech", duration: "4 years", feesPerYear: 350000, seats: 180 },
      { name: "Electronics & Communication", degree: "B.Tech", duration: "4 years", feesPerYear: 320000, seats: 160 },
      { name: "Information Technology", degree: "B.Tech", duration: "4 years", feesPerYear: 340000, seats: 120 },
    ]
  );
}

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.collegeFee.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  for (const college of colleges) {
    const created = await prisma.college.create({ data: college });

    await prisma.course.createMany({
      data: coursesFor(college.slug).map((c) => ({ ...c, collegeId: created.id })),
    });

    await prisma.collegeFee.createMany({
      data: [
        { collegeId: created.id, category: FeeCategory.TUITION, label: "Tuition Fee", amount: coursesFor(college.slug)[0].feesPerYear, period: "per year" },
        { collegeId: created.id, category: FeeCategory.HOSTEL, label: "Hostel Fee", amount: 65000, period: "per year" },
        { collegeId: created.id, category: FeeCategory.OTHER, label: "Miscellaneous", amount: 25000, period: "per year" },
      ],
    });

    await prisma.placement.createMany({
      data: [
        {
          collegeId: created.id,
          year: 2024,
          highestPackage: college.type === CollegeType.GOVERNMENT ? 3.5 : 2.8,
          averagePackage: college.type === CollegeType.GOVERNMENT ? 22 : 12,
          medianPackage: college.type === CollegeType.GOVERNMENT ? 18 : 9,
          placementRate: college.type === CollegeType.GOVERNMENT ? 92 : 85,
          topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey"],
        },
        {
          collegeId: created.id,
          year: 2023,
          highestPackage: college.type === CollegeType.GOVERNMENT ? 3.2 : 2.5,
          averagePackage: college.type === CollegeType.GOVERNMENT ? 20 : 11,
          medianPackage: college.type === CollegeType.GOVERNMENT ? 16 : 8,
          placementRate: college.type === CollegeType.GOVERNMENT ? 90 : 82,
          topRecruiters: ["Google", "Deloitte", "Infosys", "TCS", "Flipkart"],
        },
      ],
    });
  }

  // Demo user for testing saved colleges
  const bcrypt = await import("bcryptjs");
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@collegefinder.com" },
    update: {},
    create: {
      name: "Demo Student",
      email: "demo@collegefinder.com",
      password: await bcrypt.hash("Demo1234", 12),
    },
  });

  const iitBombay = await prisma.college.findUnique({ where: { slug: "iit-bombay" } });
  const bitsPilani = await prisma.college.findUnique({ where: { slug: "bits-pilani" } });

  if (iitBombay && bitsPilani) {
    await prisma.savedCollege.createMany({
      data: [
        { userId: demoUser.id, collegeId: iitBombay.id },
        { userId: demoUser.id, collegeId: bitsPilani.id },
      ],
      skipDuplicates: true,
    });
  }

  console.log(`✅ Seeded ${colleges.length} colleges`);
  console.log("📧 Demo user: demo@collegefinder.com / Demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
