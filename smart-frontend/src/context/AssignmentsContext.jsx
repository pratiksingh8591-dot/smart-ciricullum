import React, { createContext, useContext, useMemo, useState } from 'react';
import { ASSIGNMENTS, ALL_SUBMISSIONS, SUBJECTS } from '../data/mockData';

const STORAGE_KEY = 'smart_curriculum_assignments_state_v3_20260404';
const AssignmentsContext = createContext(null);

const getInitialState = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return { assignments: ASSIGNMENTS, submissions: ALL_SUBMISSIONS };

    const parsed = JSON.parse(cached);
    if (!parsed || !Array.isArray(parsed.assignments) || typeof parsed.submissions !== 'object') {
      return { assignments: ASSIGNMENTS, submissions: ALL_SUBMISSIONS };
    }

    return parsed;
  } catch {
    return { assignments: ASSIGNMENTS, submissions: ALL_SUBMISSIONS };
  }
};

export const AssignmentsProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState);

  const saveState = (next) => {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const createAssignment = (payload) => {
    const sub = SUBJECTS.find((s) => s._id === payload.subjectId);
    const nextAssignment = {
      ...payload,
      _id: `a_${Date.now()}`,
      subjectName: sub?.name || payload.subjectName || 'N/A',
      submitted: false,
      submittedAt: null,
      marks: null,
      feedback: '',
      status: null,
    };

    saveState({
      assignments: [nextAssignment, ...state.assignments],
      submissions: { ...state.submissions, [nextAssignment._id]: [] },
    });
  };

  const submitAssignment = ({ assignmentId, student, fileName }) => {
    const submittedAt = new Date().toISOString().split('T')[0];

    const nextAssignments = state.assignments.map((a) =>
      a._id === assignmentId
        ? { ...a, submitted: true, submittedAt, status: 'submitted' }
        : a
    );

    const existing = state.submissions[assignmentId] || [];
    const alreadySubmitted = existing.some((s) => s.studentId === student._id);
    const nextForAssignment = alreadySubmitted
      ? existing.map((s) =>
          s.studentId === student._id
            ? {
                ...s,
                submittedAt,
                fileName: fileName || s.fileName || 'submission.pdf',
                status: 'submitted',
              }
            : s
        )
      : [
          ...existing,
          {
            studentId: student._id,
            studentName: student.name,
            rollNo: student.rollNo || 'N/A',
            submittedAt,
            fileName: fileName || 'submission.pdf',
            marks: null,
            feedback: '',
            status: 'submitted',
          },
        ];

    saveState({
      assignments: nextAssignments,
      submissions: { ...state.submissions, [assignmentId]: nextForAssignment },
    });
  };

  const gradeSubmission = ({ assignmentId, studentId, marks, feedback }) => {
    const nextSubmissions = {
      ...state.submissions,
      [assignmentId]: (state.submissions[assignmentId] || []).map((s) =>
        s.studentId === studentId ? { ...s, marks: Number(marks), feedback: feedback || '', status: 'graded' } : s
      ),
    };

    const nextAssignments = state.assignments.map((a) => {
      if (a._id !== assignmentId) return a;
      const studentSubmission = (nextSubmissions[assignmentId] || []).find((s) => s.studentId === 's1');
      if (!studentSubmission) return a;

      return {
        ...a,
        marks: studentSubmission.marks,
        feedback: studentSubmission.feedback,
        status: studentSubmission.status,
      };
    });

    saveState({ assignments: nextAssignments, submissions: nextSubmissions });
  };

  const value = useMemo(
    () => ({
      assignments: state.assignments,
      submissions: state.submissions,
      createAssignment,
      submitAssignment,
      gradeSubmission,
    }),
    [state]
  );

  return <AssignmentsContext.Provider value={value}>{children}</AssignmentsContext.Provider>;
};

export const useAssignments = () => {
  const ctx = useContext(AssignmentsContext);
  if (!ctx) throw new Error('useAssignments must be used inside AssignmentsProvider');
  return ctx;
};
