const USERS = {
  student: {
    _id: "s1",
    name: "Rishi Chandel",
    email: "demo@rait.ac.in",
    password: "demo123",
    role: "student",
    rollNo: "2024031",
    semester: 4,
    division: "A",
    department: "Computer Engineering"
  },
  faculty: {
    _id: "f1",
    name: "Dr. Rishi Sharma",
    email: "faculty@rait.ac.in",
    password: "demo123",
    role: "faculty",
    employeeId: "FAC001",
    designation: "Associate Professor",
    department: "Computer Engineering"
  }
};

const SUBJECTS = [
  {
    _id: "sub1",
    name: "Data Storage Engineering",
    code: "DSE401",
    semester: 4,
    credits: 4,
    department: "Computer Engineering",
    faculty: "Dr. Rishi Sharma",
    description: "Storage systems, RAID, cloud storage and data management",
    totalLectures: 24,
    completedLectures: 16,
    curriculum: [
      {
        unit: 1,
        title: "Storage Fundamentals",
        topics: ["HDD & SSD", "RAID Levels", "Storage Protocols"],
        lecturesPlanned: 8,
        lecturesCompleted: 8,
        status: "completed"
      },
      {
        unit: 2,
        title: "Cloud & Distributed Storage",
        topics: ["Object Storage", "HDFS", "S3", "Replication"],
        lecturesPlanned: 8,
        lecturesCompleted: 8,
        status: "completed"
      },
      {
        unit: 3,
        title: "Data Management & Backup",
        topics: ["Backup Strategies", "Disaster Recovery", "Snapshots"],
        lecturesPlanned: 8,
        lecturesCompleted: 0,
        status: "pending"
      }
    ]
  },
  {
    _id: "sub2",
    name: "Cryptography & Network Security",
    code: "CNS402",
    semester: 4,
    credits: 4,
    department: "Computer Engineering",
    faculty: "Dr. Rishi Sharma",
    description: "Symmetric and asymmetric cryptography, PKI, network protocols",
    totalLectures: 22,
    completedLectures: 14,
    curriculum: [
      {
        unit: 1,
        title: "Cryptographic Foundations",
        topics: ["AES", "DES", "Hash Functions"],
        lecturesPlanned: 8,
        lecturesCompleted: 8,
        status: "completed"
      },
      {
        unit: 2,
        title: "Public Key Infrastructure",
        topics: ["RSA", "ECC", "Digital Signatures"],
        lecturesPlanned: 8,
        lecturesCompleted: 6,
        status: "in-progress"
      }
    ]
  }
];

const STUDENTS = [
  {
    _id: "s1",
    name: "Rishi Chandel",
    rollNo: "2024031",
    division: "A",
    semester: 4,
    email: "rishi.chandel@rait.ac.in",
    phone: "9123456780"
  },
  {
    _id: "s2",
    name: "Sherwin DSouza",
    rollNo: "2024032",
    division: "A",
    semester: 4,
    email: "sherwin@rait.ac.in",
    phone: "9123456781"
  },
  {
    _id: "s3",
    name: "Chris Fernandes",
    rollNo: "2024033",
    division: "A",
    semester: 4,
    email: "chris@rait.ac.in",
    phone: "9123456782"
  }
];

const ATTENDANCE = {
  sub1: {
    s1: { present: 14, total: 16, sessions: [] },
    s2: { present: 10, total: 16, sessions: [] },
    s3: { present: 15, total: 16, sessions: [] }
  },
  sub2: {
    s1: { present: 11, total: 14, sessions: [] },
    s2: { present: 8, total: 14, sessions: [] },
    s3: { present: 13, total: 14, sessions: [] }
  }
};

const ASSIGNMENTS = [
  {
    _id: "a1",
    title: "RAID Implementation Lab Report",
    subjectId: "sub1",
    subjectName: "Data Storage Engineering",
    description: "Implement RAID 0, 1 and 5 using software RAID.",
    dueDate: "2026-04-20",
    totalMarks: 20,
    submitted: false,
    submittedAt: null,
    marks: null,
    feedback: "",
    status: null
  },
  {
    _id: "a2",
    title: "RSA Encryption Implementation",
    subjectId: "sub2",
    subjectName: "Cryptography & Network Security",
    description: "Implement RSA key generation, encryption and decryption.",
    dueDate: "2026-04-15",
    totalMarks: 15,
    submitted: true,
    submittedAt: "2026-04-13",
    marks: 13,
    feedback: "Excellent implementation!",
    status: "graded"
  }
];

const MATERIALS = [
  {
    _id: "m1",
    title: "DSE Unit 1 Notes",
    subjectId: "sub1",
    subjectName: "DSE",
    type: "notes",
    unit: 1,
    description: "RAID levels, HDD vs SSD, and storage protocols.",
    downloads: 38,
    uploadedAt: "2026-03-01"
  },
  {
    _id: "m2",
    title: "CNS Cryptography Cheat Sheet",
    subjectId: "sub2",
    subjectName: "CNS",
    type: "reference",
    unit: 1,
    description: "Quick reference for encryption algorithms.",
    downloads: 72,
    uploadedAt: "2026-03-02"
  }
];

const MARKS = [
  {
    _id: "mk1",
    studentId: "s1",
    subjectId: "sub1",
    subjectName: "DSE",
    examType: "UT1",
    marksObtained: 16,
    totalMarks: 20,
    feedback: "Good understanding of RAID concepts.",
    date: "2026-03-15"
  },
  {
    _id: "mk2",
    studentId: "s1",
    subjectId: "sub2",
    subjectName: "CNS",
    examType: "UT1",
    marksObtained: 18,
    totalMarks: 20,
    feedback: "Strong grasp of cryptographic algorithms.",
    date: "2026-03-16"
  }
];

const ALL_SUBMISSIONS = {
  a1: [
    {
      studentId: "s2",
      studentName: "Sherwin DSouza",
      rollNo: "2024032",
      submittedAt: "2026-04-10",
      fileName: "sherwin_raid.pdf",
      marks: null,
      feedback: "",
      status: "submitted"
    }
  ],
  a2: [
    {
      studentId: "s1",
      studentName: "Rishi Chandel",
      rollNo: "2024031",
      submittedAt: "2026-04-13",
      fileName: "rishi_rsa.py",
      marks: 13,
      feedback: "Excellent!",
      status: "graded"
    }
  ]
};

const db = {
  users: USERS,
  subjects: SUBJECTS,
  students: STUDENTS,
  attendance: ATTENDANCE,
  assignments: ASSIGNMENTS,
  materials: MATERIALS,
  marks: MARKS,
  submissions: ALL_SUBMISSIONS
};

const generateId = (prefix) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

export { db, generateId };
