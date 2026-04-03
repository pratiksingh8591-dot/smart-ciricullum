// ── MOCK DATA – No backend needed ──────────────────────────────

export const USERS = {
  student: {
    _id: 's1', name: 'Rishi Chandel', email: 'rishi.chandel@rait.ac.in',
    role: 'student', rollNo: '2024031', semester: 4, division: 'A', department: 'Computer Engineering',
  },
  faculty: {
    _id: 'f1', name: 'Dr. Rishi Sharma', email: 'faculty@rait.ac.in',
    role: 'faculty', employeeId: 'FAC001', designation: 'Associate Professor', department: 'Computer Engineering',
  },
};

export const SUBJECTS = [
  {
    _id: 'sub1', name: 'Data Storage Engineering', code: 'DSE401',
    semester: 4, credits: 4, department: 'Computer Engineering',
    faculty: 'Dr. Rishi Sharma', description: 'Storage systems, RAID, cloud storage and data management',
    totalLectures: 24, completedLectures: 16,
    curriculum: [
      { unit: 1, title: 'Storage Fundamentals', topics: ['HDD & SSD', 'RAID Levels', 'Storage Protocols'], lecturesPlanned: 8, lecturesCompleted: 8, status: 'completed' },
      { unit: 2, title: 'Cloud & Distributed Storage', topics: ['Object Storage', 'HDFS', 'S3', 'Replication'], lecturesPlanned: 8, lecturesCompleted: 8, status: 'completed' },
      { unit: 3, title: 'Data Management & Backup', topics: ['Backup Strategies', 'Disaster Recovery', 'Snapshots'], lecturesPlanned: 8, lecturesCompleted: 0, status: 'pending' },
    ],
  },
  {
    _id: 'sub2', name: 'Cryptography & Network Security', code: 'CNS402',
    semester: 4, credits: 4, department: 'Computer Engineering',
    faculty: 'Dr. Rishi Sharma', description: 'Symmetric & asymmetric cryptography, PKI, network security protocols',
    totalLectures: 22, completedLectures: 14,
    curriculum: [
      { unit: 1, title: 'Cryptographic Foundations', topics: ['AES', 'DES', 'Hash Functions', 'Symmetric Encryption'], lecturesPlanned: 8, lecturesCompleted: 8, status: 'completed' },
      { unit: 2, title: 'Public Key Infrastructure', topics: ['RSA', 'ECC', 'Digital Signatures', 'Certificates'], lecturesPlanned: 8, lecturesCompleted: 6, status: 'in-progress' },
      { unit: 3, title: 'Network Security Protocols', topics: ['TLS/SSL', 'IPSec', 'Firewalls', 'VPN'], lecturesPlanned: 6, lecturesCompleted: 0, status: 'pending' },
    ],
  },
  {
    _id: 'sub3', name: 'Internet of Things', code: 'IOT403',
    semester: 4, credits: 3, department: 'Computer Engineering',
    faculty: 'Prof. Sunita Mehta', description: 'IoT architecture, sensors, protocols and edge computing',
    totalLectures: 20, completedLectures: 12,
    curriculum: [
      { unit: 1, title: 'IoT Architecture & Sensors', topics: ['IoT Layers', 'Sensors & Actuators', 'Microcontrollers'], lecturesPlanned: 6, lecturesCompleted: 6, status: 'completed' },
      { unit: 2, title: 'IoT Communication Protocols', topics: ['MQTT', 'CoAP', 'Zigbee', 'LoRa', 'BLE'], lecturesPlanned: 8, lecturesCompleted: 6, status: 'in-progress' },
      { unit: 3, title: 'Edge Computing & Applications', topics: ['Edge Nodes', 'Smart Home', 'Industrial IoT'], lecturesPlanned: 6, lecturesCompleted: 0, status: 'pending' },
    ],
  },
  {
    _id: 'sub4', name: 'Theory of Computation', code: 'TCS404',
    semester: 4, credits: 4, department: 'Computer Engineering',
    faculty: 'Prof. Rajesh Kumar', description: 'Automata theory, formal languages, Turing machines and complexity',
    totalLectures: 22, completedLectures: 18,
    curriculum: [
      { unit: 1, title: 'Finite Automata & Regular Languages', topics: ['DFA', 'NFA', 'Regular Expressions', 'Pumping Lemma'], lecturesPlanned: 8, lecturesCompleted: 8, status: 'completed' },
      { unit: 2, title: 'Context-Free Grammars', topics: ['CFG', 'PDA', 'CYK Algorithm', 'Parse Trees'], lecturesPlanned: 8, lecturesCompleted: 8, status: 'completed' },
      { unit: 3, title: 'Turing Machines & Complexity', topics: ['TM', 'Decidability', 'P vs NP', 'NP-Complete'], lecturesPlanned: 6, lecturesCompleted: 2, status: 'in-progress' },
    ],
  },
  {
    _id: 'sub5', name: 'Soft Computing & Bio-inspired Learning', code: 'SBL405',
    semester: 4, credits: 3, department: 'Computer Engineering',
    faculty: 'Prof. Anita Desai', description: 'Neural networks, fuzzy logic, genetic algorithms and swarm intelligence',
    totalLectures: 18, completedLectures: 8,
    curriculum: [
      { unit: 1, title: 'Fuzzy Logic Systems', topics: ['Fuzzy Sets', 'Membership Functions', 'Fuzzy Inference'], lecturesPlanned: 6, lecturesCompleted: 6, status: 'completed' },
      { unit: 2, title: 'Neural Networks', topics: ['Perceptron', 'Backpropagation', 'CNN Basics', 'RNN'], lecturesPlanned: 8, lecturesCompleted: 2, status: 'in-progress' },
      { unit: 3, title: 'Genetic & Swarm Algorithms', topics: ['GA', 'PSO', 'Ant Colony', 'Simulated Annealing'], lecturesPlanned: 4, lecturesCompleted: 0, status: 'pending' },
    ],
  },
];

export const STUDENTS = [
  { _id: 's1', name: 'Rishi Chandel',   rollNo: '2024031', division: 'A', semester: 4, email: 'rishi.chandel@rait.ac.in', phone: '9123456780' },
  { _id: 's2', name: 'Sherwin DSouza',  rollNo: '2024032', division: 'A', semester: 4, email: 'sherwin@rait.ac.in',        phone: '9123456781' },
  { _id: 's3', name: 'Chris Fernandes', rollNo: '2024033', division: 'A', semester: 4, email: 'chris@rait.ac.in',          phone: '9123456782' },
  { _id: 's4', name: 'Dhruv Dubey',     rollNo: '2024034', division: 'A', semester: 4, email: 'dhruv@rait.ac.in',          phone: '9123456783' },
  { _id: 's5', name: 'Neha Joshi',      rollNo: '2024035', division: 'A', semester: 4, email: 'neha@rait.ac.in',           phone: '9123456784' },
  { _id: 's6', name: 'Dev Kumar',       rollNo: '2024036', division: 'A', semester: 4, email: 'dev@rait.ac.in',            phone: '9123456785' },
  { _id: 's7', name: 'Sana Khan',       rollNo: '2024037', division: 'A', semester: 4, email: 'sana@rait.ac.in',           phone: '9123456786' },
  { _id: 's8', name: 'Arjun Rao',       rollNo: '2024038', division: 'A', semester: 4, email: 'arjun@rait.ac.in',          phone: '9123456787' },
];

export const ATTENDANCE = {
  sub1: {
    s1: { present: 14, total: 16, sessions: [
      { date: '2025-07-10', topic: 'HDFS Architecture', type: 'lecture', status: 'present' },
      { date: '2025-07-09', topic: 'RAID Levels Lab', type: 'lab', status: 'present' },
      { date: '2025-07-08', topic: 'Cloud Object Storage', type: 'lecture', status: 'absent' },
      { date: '2025-07-07', topic: 'SSD vs HDD Performance', type: 'lecture', status: 'present' },
      { date: '2025-07-04', topic: 'Storage Protocols', type: 'lecture', status: 'present' },
      { date: '2025-07-03', topic: 'RAID 5 & 6 Deep Dive', type: 'tutorial', status: 'absent' },
      { date: '2025-07-02', topic: 'Backup Strategies', type: 'lecture', status: 'present' },
      { date: '2025-07-01', topic: 'Introduction to DSE', type: 'lecture', status: 'present' },
    ]},
    s2:{present:10,total:16,sessions:[]}, s3:{present:15,total:16,sessions:[]},
    s4:{present:9,total:16,sessions:[]},  s5:{present:12,total:16,sessions:[]},
    s6:{present:7,total:16,sessions:[]},  s7:{present:14,total:16,sessions:[]}, s8:{present:11,total:16,sessions:[]},
  },
  sub2: {
    s1: { present: 11, total: 14, sessions: [
      { date: '2025-07-10', topic: 'RSA Algorithm', type: 'lecture', status: 'present' },
      { date: '2025-07-08', topic: 'Digital Signatures Lab', type: 'lab', status: 'present' },
      { date: '2025-07-07', topic: 'AES Encryption', type: 'lecture', status: 'absent' },
      { date: '2025-07-04', topic: 'Hash Functions', type: 'lecture', status: 'present' },
    ]},
    s2:{present:8,total:14,sessions:[]}, s3:{present:13,total:14,sessions:[]},
    s4:{present:7,total:14,sessions:[]}, s5:{present:10,total:14,sessions:[]},
    s6:{present:5,total:14,sessions:[]}, s7:{present:12,total:14,sessions:[]}, s8:{present:9,total:14,sessions:[]},
  },
  sub3: {
    s1: { present: 10, total: 12, sessions: [
      { date: '2025-07-09', topic: 'MQTT Protocol Lab', type: 'lab', status: 'present' },
      { date: '2025-07-07', topic: 'Zigbee & LoRa', type: 'lecture', status: 'present' },
      { date: '2025-07-04', topic: 'Sensor Interfacing', type: 'lab', status: 'absent' },
    ]},
    s2:{present:8,total:12,sessions:[]}, s3:{present:11,total:12,sessions:[]},
    s4:{present:6,total:12,sessions:[]}, s5:{present:9,total:12,sessions:[]},
    s6:{present:4,total:12,sessions:[]}, s7:{present:10,total:12,sessions:[]}, s8:{present:8,total:12,sessions:[]},
  },
  sub4: {
    s1: { present: 17, total: 18, sessions: [
      { date: '2025-07-10', topic: 'Turing Machines', type: 'lecture', status: 'present' },
      { date: '2025-07-08', topic: 'P vs NP Problems', type: 'lecture', status: 'absent' },
      { date: '2025-07-07', topic: 'CYK Parsing Algorithm', type: 'tutorial', status: 'present' },
    ]},
    s2:{present:13,total:18,sessions:[]}, s3:{present:17,total:18,sessions:[]},
    s4:{present:11,total:18,sessions:[]}, s5:{present:15,total:18,sessions:[]},
    s6:{present:9,total:18,sessions:[]},  s7:{present:16,total:18,sessions:[]}, s8:{present:14,total:18,sessions:[]},
  },
  sub5: {
    s1: { present: 7, total: 8, sessions: [
      { date: '2025-07-10', topic: 'Backpropagation Neural Net', type: 'lecture', status: 'present' },
      { date: '2025-07-08', topic: 'Fuzzy Inference Lab', type: 'lab', status: 'absent' },
      { date: '2025-07-04', topic: 'Membership Functions', type: 'lecture', status: 'present' },
    ]},
    s2:{present:5,total:8,sessions:[]}, s3:{present:8,total:8,sessions:[]},
    s4:{present:4,total:8,sessions:[]}, s5:{present:6,total:8,sessions:[]},
    s6:{present:3,total:8,sessions:[]}, s7:{present:7,total:8,sessions:[]}, s8:{present:6,total:8,sessions:[]},
  },
};

export const ASSIGNMENTS = [
  { _id:'a1', title:'RAID Implementation Lab Report', subjectId:'sub1', subjectName:'Data Storage Engineering',
    description:'Implement RAID 0, 1 & 5 using software RAID. Document performance benchmarks.',
    dueDate:'2025-07-22', totalMarks:20, submitted:false, submittedAt:null, marks:null, feedback:'', status:null },
  { _id:'a2', title:'RSA Encryption Implementation', subjectId:'sub2', subjectName:'Cryptography & Network Security',
    description:'Implement RSA key generation, encryption & decryption in Python. Submit code + report.',
    dueDate:'2025-07-15', totalMarks:15, submitted:false, submittedAt:null, marks:null, feedback:'', status:null },
  { _id:'a3', title:'IoT Smart Home Prototype', subjectId:'sub3', subjectName:'Internet of Things',
    description:'Build a mini IoT system using Arduino/RPi with at least 2 sensors. Demo video required.',
    dueDate:'2025-07-20', totalMarks:25, submitted:false, submittedAt:null, marks:null, feedback:'', status:null },
  { _id:'a4', title:'DFA to Regex Conversion Problems', subjectId:'sub4', subjectName:'Theory of Computation',
    description:'Solve 10 DFA/NFA to Regular Expression conversion problems with all steps.',
    dueDate:'2025-07-25', totalMarks:10, submitted:false, submittedAt:null, marks:null, feedback:'', status:null },
  { _id:'a5', title:'Fuzzy Logic Controller Design', subjectId:'sub5', subjectName:'Soft Computing & Bio-inspired Learning',
    description:'Design a fuzzy logic controller for temperature regulation in MATLAB/Python.',
    dueDate:'2025-07-28', totalMarks:20, submitted:false, submittedAt:null, marks:null, feedback:'', status:null },
];

export const MATERIALS = [
  { _id:'m1', title:'DSE Unit 1 – Storage Fundamentals Notes', subjectId:'sub1', subjectName:'DSE', type:'notes', unit:1, description:'RAID levels, HDD vs SSD, storage protocols explained.', downloads:38, uploadedAt:'2025-07-01' },
  { _id:'m2', title:'DSE Slides – Cloud & Distributed Storage', subjectId:'sub1', subjectName:'DSE', type:'slides', unit:2, description:'Slides covering HDFS, S3 and distributed storage.', downloads:45, uploadedAt:'2025-07-05' },
  { _id:'m3', title:'CNS Cryptography Cheat Sheet', subjectId:'sub2', subjectName:'CNS', type:'reference', unit:1, description:'Quick reference for all encryption algorithms and key sizes.', downloads:72, uploadedAt:'2025-07-02' },
  { _id:'m4', title:'CNS Unit 2 – PKI & Digital Signatures', subjectId:'sub2', subjectName:'CNS', type:'notes', unit:2, description:'RSA, ECC, certificate chains and trust hierarchies.', downloads:55, uploadedAt:'2025-07-04' },
  { _id:'m5', title:'IoT Protocol Comparison Slides', subjectId:'sub3', subjectName:'IoT', type:'slides', unit:2, description:'MQTT vs CoAP vs HTTP – comparison with use cases.', downloads:61, uploadedAt:'2025-07-06' },
  { _id:'m6', title:'TCS Automata Practice Problems', subjectId:'sub4', subjectName:'TCS', type:'reference', unit:1, description:'40 solved DFA/NFA problems with step-by-step solutions.', downloads:89, uploadedAt:'2025-07-03' },
  { _id:'m7', title:'TCS Unit 2 – CFG & PDA Notes', subjectId:'sub4', subjectName:'TCS', type:'notes', unit:2, description:'Context-free grammars, pushdown automata and CYK parsing.', downloads:47, uploadedAt:'2025-07-05' },
  { _id:'m8', title:'SBL Fuzzy Logic MATLAB Guide', subjectId:'sub5', subjectName:'SBL', type:'reference', unit:1, description:'Step-by-step guide to implement fuzzy inference in MATLAB.', downloads:34, uploadedAt:'2025-07-07' },
];

export const MARKS = [
  { _id:'mk1', subjectId:'sub1', subjectName:'DSE', examType:'UT1', marksObtained:16, totalMarks:20, feedback:'Good understanding of RAID concepts!', date:'2025-06-15' },
  { _id:'mk2', subjectId:'sub2', subjectName:'CNS', examType:'UT1', marksObtained:18, totalMarks:20, feedback:'Excellent! Strong grasp of cryptographic algorithms.', date:'2025-06-16' },
  { _id:'mk3', subjectId:'sub3', subjectName:'IoT', examType:'UT1', marksObtained:14, totalMarks:20, feedback:'Good work. Revise MQTT QoS levels.', date:'2025-06-17' },
  { _id:'mk4', subjectId:'sub4', subjectName:'TCS', examType:'UT1', marksObtained:17, totalMarks:20, feedback:'Outstanding performance in automata theory!', date:'2025-06-18' },
  { _id:'mk5', subjectId:'sub5', subjectName:'SBL', examType:'UT1', marksObtained:13, totalMarks:20, feedback:'Improve understanding of defuzzification methods.', date:'2025-06-19' },
  { _id:'mk6', subjectId:'sub2', subjectName:'CNS', examType:'Practical', marksObtained:23, totalMarks:25, feedback:'Excellent RSA implementation!', date:'2025-07-01' },
  { _id:'mk7', subjectId:'sub4', subjectName:'TCS', examType:'Assignment', marksObtained:9, totalMarks:10, feedback:'Perfect DFA conversions.', date:'2025-07-05' },
];

export const ALL_SUBMISSIONS = {
  a1: [
    { studentId:'s2', studentName:'Sherwin DSouza',  rollNo:'2024032', submittedAt:'2025-07-20', fileName:'sherwin_raid.pdf', marks:null, feedback:'', status:'submitted' },
    { studentId:'s3', studentName:'Chris Fernandes', rollNo:'2024033', submittedAt:'2025-07-19', fileName:'chris_raid.pdf',   marks:18,   feedback:'Excellent benchmarks!', status:'graded' },
  ],
  a2: [
    { studentId:'s3', studentName:'Chris Fernandes', rollNo:'2024033', submittedAt:'2025-07-14', fileName:'chris_rsa.py',    marks:14,   feedback:'Very good!', status:'graded' },
    { studentId:'s7', studentName:'Sana Khan',       rollNo:'2024037', submittedAt:'2025-07-15', fileName:'sana_rsa.py',     marks:null, feedback:'', status:'submitted' },
  ],
  a3: [
    { studentId:'s4', studentName:'Dhruv Dubey',     rollNo:'2024034', submittedAt:'2025-07-17', fileName:'dhruv_iot.zip',   marks:21,   feedback:'Creative sensor integration.', status:'graded' },
  ],
  a4:[], a5:[],
};
