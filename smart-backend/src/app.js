import express from "express";
import cors from "cors";
import morgan from "morgan";
import { db, generateId } from "./data/store.js";

const app = express();

const configuredOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalDevOrigin = (origin) => {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
};

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || configuredOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "smart-curriculum-backend", date: new Date().toISOString() });
});

app.post("/api/auth/login", (req, res) => {
  const { role, email, password } = req.body;
  if (!role || !db.users[role]) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const user = db.users[role];
  const emailMatch = !email || user.email.toLowerCase() === String(email).toLowerCase();
  const passMatch = !password || user.password === password;

  if (!emailMatch || !passMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const { password: _, ...safeUser } = user;
  return res.json({ user: safeUser, token: `demo-token-${safeUser.role}-${safeUser._id}` });
});

app.get("/api/subjects", (_req, res) => {
  res.json(db.subjects);
});

app.post("/api/subjects", (req, res) => {
  const { name, code, department, semester, credits, description, faculty } = req.body;
  if (!name || !code) {
    return res.status(400).json({ message: "name and code are required" });
  }

  const subject = {
    _id: generateId("sub"),
    name,
    code,
    department: department || "Computer Engineering",
    semester: Number(semester) || 4,
    credits: Number(credits) || 4,
    description: description || "",
    faculty: faculty || db.users.faculty.name,
    totalLectures: 20,
    completedLectures: 0,
    curriculum: []
  };

  db.subjects.unshift(subject);
  db.attendance[subject._id] = {};
  db.students.forEach((student) => {
    db.attendance[subject._id][student._id] = { present: 0, total: 0, sessions: [] };
  });

  res.status(201).json(subject);
});

app.delete("/api/subjects/:id", (req, res) => {
  const { id } = req.params;
  const before = db.subjects.length;
  db.subjects = db.subjects.filter((subject) => subject._id !== id);

  if (db.subjects.length === before) {
    return res.status(404).json({ message: "Subject not found" });
  }

  delete db.attendance[id];
  res.status(204).send();
});

app.get("/api/students", (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.json(db.students);
  }

  const text = String(q).toLowerCase();
  const filtered = db.students.filter((student) => {
    return (
      student.name.toLowerCase().includes(text) ||
      student.rollNo.includes(text) ||
      student.email.toLowerCase().includes(text)
    );
  });

  return res.json(filtered);
});

app.get("/api/attendance", (req, res) => {
  const { subjectId, studentId } = req.query;

  if (subjectId && studentId) {
    const data = db.attendance[subjectId]?.[studentId] || { present: 0, total: 0, sessions: [] };
    return res.json(data);
  }

  if (subjectId) {
    return res.json(db.attendance[subjectId] || {});
  }

  return res.json(db.attendance);
});

app.post("/api/attendance/mark", (req, res) => {
  const { subjectId, date, type, topic, marks } = req.body;

  if (!subjectId || !marks || typeof marks !== "object") {
    return res.status(400).json({ message: "subjectId and marks object are required" });
  }

  if (!db.attendance[subjectId]) {
    db.attendance[subjectId] = {};
  }

  Object.entries(marks).forEach(([studentId, status]) => {
    if (!db.attendance[subjectId][studentId]) {
      db.attendance[subjectId][studentId] = { present: 0, total: 0, sessions: [] };
    }

    const rec = db.attendance[subjectId][studentId];
    rec.total += 1;
    if (status === "present" || status === "late") {
      rec.present += 1;
    }

    rec.sessions.unshift({
      date: date || new Date().toISOString().split("T")[0],
      topic: topic || "Class session",
      type: type || "lecture",
      status
    });
  });

  res.status(201).json({ message: "Attendance marked successfully" });
});

app.get("/api/assignments", (req, res) => {
  const { subjectId } = req.query;
  const data = subjectId
    ? db.assignments.filter((a) => a.subjectId === subjectId)
    : db.assignments;

  res.json(data);
});

app.post("/api/assignments", (req, res) => {
  const { title, description, subjectId, dueDate, totalMarks } = req.body;
  if (!title || !subjectId || !dueDate) {
    return res.status(400).json({ message: "title, subjectId and dueDate are required" });
  }

  const subject = db.subjects.find((item) => item._id === subjectId);
  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  const assignment = {
    _id: generateId("a"),
    title,
    description: description || "",
    subjectId,
    subjectName: subject.name,
    dueDate,
    totalMarks: Number(totalMarks) || 10,
    submitted: false,
    submittedAt: null,
    marks: null,
    feedback: "",
    status: null
  };

  db.assignments.unshift(assignment);
  db.submissions[assignment._id] = [];
  res.status(201).json(assignment);
});

app.post("/api/assignments/:id/submit", (req, res) => {
  const { id } = req.params;
  const { studentId, fileName } = req.body;
  const assignment = db.assignments.find((item) => item._id === id);
  const student = db.students.find((item) => item._id === studentId);

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  assignment.submitted = true;
  assignment.submittedAt = new Date().toISOString().split("T")[0];
  assignment.status = "submitted";

  if (!db.submissions[id]) {
    db.submissions[id] = [];
  }

  const existing = db.submissions[id].find((row) => row.studentId === studentId);
  if (existing) {
    existing.submittedAt = assignment.submittedAt;
    existing.fileName = fileName || existing.fileName;
    existing.status = "submitted";
  } else {
    db.submissions[id].push({
      studentId,
      studentName: student.name,
      rollNo: student.rollNo,
      submittedAt: assignment.submittedAt,
      fileName: fileName || `${student.rollNo}_${id}.pdf`,
      marks: null,
      feedback: "",
      status: "submitted"
    });
  }

  res.status(201).json({ message: "Assignment submitted successfully" });
});

app.get("/api/assignments/:id/submissions", (req, res) => {
  const { id } = req.params;
  res.json(db.submissions[id] || []);
});

app.post("/api/assignments/:id/grade", (req, res) => {
  const { id } = req.params;
  const { studentId, marks, feedback } = req.body;
  const submission = (db.submissions[id] || []).find((row) => row.studentId === studentId);

  if (!submission) {
    return res.status(404).json({ message: "Submission not found" });
  }

  submission.marks = Number(marks);
  submission.feedback = feedback || "";
  submission.status = "graded";

  res.json(submission);
});

app.get("/api/materials", (req, res) => {
  const { q, type, subjectId } = req.query;
  let rows = [...db.materials];

  if (type && type !== "all") {
    rows = rows.filter((item) => item.type === type);
  }

  if (subjectId) {
    rows = rows.filter((item) => item.subjectId === subjectId);
  }

  if (q) {
    const text = String(q).toLowerCase();
    rows = rows.filter((item) => {
      return item.title.toLowerCase().includes(text) || item.subjectName.toLowerCase().includes(text);
    });
  }

  res.json(rows);
});

app.post("/api/materials", (req, res) => {
  const { title, subjectId, type, unit, description } = req.body;
  if (!title || !subjectId) {
    return res.status(400).json({ message: "title and subjectId are required" });
  }

  const subject = db.subjects.find((item) => item._id === subjectId);
  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  const material = {
    _id: generateId("m"),
    title,
    subjectId,
    subjectName: subject.code,
    type: type || "notes",
    unit: unit ? Number(unit) : undefined,
    description: description || "",
    downloads: 0,
    uploadedAt: new Date().toISOString().split("T")[0]
  };

  db.materials.unshift(material);
  res.status(201).json(material);
});

app.delete("/api/materials/:id", (req, res) => {
  const { id } = req.params;
  const before = db.materials.length;
  db.materials = db.materials.filter((item) => item._id !== id);

  if (before === db.materials.length) {
    return res.status(404).json({ message: "Material not found" });
  }

  res.status(204).send();
});

app.get("/api/marks", (req, res) => {
  const { subjectId, studentId } = req.query;
  let rows = [...db.marks];

  if (subjectId) {
    rows = rows.filter((item) => item.subjectId === subjectId);
  }

  if (studentId) {
    rows = rows.filter((item) => item.studentId === studentId);
  }

  res.json(rows);
});

app.post("/api/marks", (req, res) => {
  const { studentId, subjectId, examType, marksObtained, totalMarks, feedback } = req.body;
  if (!studentId || !subjectId || !examType) {
    return res.status(400).json({ message: "studentId, subjectId and examType are required" });
  }

  const subject = db.subjects.find((item) => item._id === subjectId);
  if (!subject) {
    return res.status(404).json({ message: "Subject not found" });
  }

  const row = {
    _id: generateId("mk"),
    studentId,
    subjectId,
    subjectName: subject.name,
    examType,
    marksObtained: Number(marksObtained),
    totalMarks: Number(totalMarks),
    feedback: feedback || "",
    date: new Date().toISOString().split("T")[0]
  };

  db.marks.unshift(row);
  res.status(201).json(row);
});

app.delete("/api/marks/:id", (req, res) => {
  const { id } = req.params;
  const before = db.marks.length;
  db.marks = db.marks.filter((item) => item._id !== id);

  if (before === db.marks.length) {
    return res.status(404).json({ message: "Marks entry not found" });
  }

  res.status(204).send();
});

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
