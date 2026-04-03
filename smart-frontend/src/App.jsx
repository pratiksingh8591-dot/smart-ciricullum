import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MaterialsProvider } from './context/MaterialsContext';
import { AssignmentsProvider } from './context/AssignmentsContext';
import Layout from './components/shared/Layout';
import Login from './pages/Login';

import StudentDashboard   from './pages/student/Dashboard';
import StudentSubjects    from './pages/student/Subjects';
import StudentAttendance  from './pages/student/Attendance';
import StudentAssignments from './pages/student/Assignments';
import StudentMaterials   from './pages/student/Materials';
import StudentMarks       from './pages/student/Marks';

import FacultyDashboard   from './pages/faculty/Dashboard';
import FacultySubjects    from './pages/faculty/Subjects';
import FacultyAttendance  from './pages/faculty/Attendance';
import FacultyAssignments from './pages/faculty/Assignments';
import FacultyMaterials   from './pages/faculty/Materials';
import FacultyMarks       from './pages/faculty/Marks';
import FacultyStudents    from './pages/faculty/Students';

const Guard = ({ role, children }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to={user?.role === 'faculty' ? '/faculty' : '/student'} replace />;
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  const home = user ? (user.role === 'faculty' ? '/faculty' : '/student') : '/login';
  return (
    <Routes>
      <Route path="/" element={<Navigate to={home} replace />} />
      <Route path="/login" element={user ? <Navigate to={home} replace /> : <Login />} />

      <Route path="/student" element={<Guard role="student"><Layout /></Guard>}>
        <Route index             element={<StudentDashboard />} />
        <Route path="subjects"   element={<StudentSubjects />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="assignments"element={<StudentAssignments />} />
        <Route path="materials"  element={<StudentMaterials />} />
        <Route path="marks"      element={<StudentMarks />} />
      </Route>

      <Route path="/faculty" element={<Guard role="faculty"><Layout /></Guard>}>
        <Route index             element={<FacultyDashboard />} />
        <Route path="subjects"   element={<FacultySubjects />} />
        <Route path="attendance" element={<FacultyAttendance />} />
        <Route path="assignments"element={<FacultyAssignments />} />
        <Route path="materials"  element={<FacultyMaterials />} />
        <Route path="marks"      element={<FacultyMarks />} />
        <Route path="students"   element={<FacultyStudents />} />
      </Route>

      <Route path="*" element={<Navigate to={home} replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MaterialsProvider>
        <AssignmentsProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster position="top-right" toastOptions={{
              style: { background: '#fff', color: '#1e293b', border: '1px solid #e2e8f0' },
              success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }} />
          </BrowserRouter>
        </AssignmentsProvider>
      </MaterialsProvider>
    </AuthProvider>
  );
}
