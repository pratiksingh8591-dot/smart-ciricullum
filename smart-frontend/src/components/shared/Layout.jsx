import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, BookOpen, Calendar, ClipboardList,
  FileText, BarChart2, Users, GraduationCap, Menu, LogOut
} from 'lucide-react';

const studentNav = [
  { to: '/student',             icon: LayoutDashboard, label: 'Dashboard',       end: true },
  { to: '/student/subjects',    icon: BookOpen,         label: 'Subjects' },
  { to: '/student/attendance',  icon: Calendar,         label: 'Attendance' },
  { to: '/student/assignments', icon: ClipboardList,    label: 'Assignments' },
  { to: '/student/materials',   icon: FileText,         label: 'Study Materials' },
  { to: '/student/marks',       icon: BarChart2,        label: 'Marks & Feedback' },
];
const facultyNav = [
  { to: '/faculty',             icon: LayoutDashboard, label: 'Dashboard',        end: true },
  { to: '/faculty/subjects',    icon: BookOpen,         label: 'Subjects' },
  { to: '/faculty/attendance',  icon: Calendar,         label: 'Mark Attendance' },
  { to: '/faculty/assignments', icon: ClipboardList,    label: 'Assignments' },
  { to: '/faculty/materials',   icon: FileText,         label: 'Study Materials' },
  { to: '/faculty/marks',       icon: BarChart2,        label: 'Marks & Feedback' },
  { to: '/faculty/students',    icon: Users,            label: 'Students' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const nav = user?.role === 'faculty' ? facultyNav : studentNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-200">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-sm leading-tight">SmartCurriculum</h2>
            <p className="text-[10px] text-slate-400">RAIT · Dept. of Comp. Eng.</p>
          </div>
        </div>
        {/* User card */}
        <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
          <p className="text-[10px] font-semibold text-violet-500 uppercase tracking-widest">
            {user?.role === 'faculty' ? '🧑‍🏫 Faculty' : '🎓 Student'}
          </p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5 truncate">{user?.name}</p>
          <p className="text-[11px] text-slate-500 truncate">
            {user?.role === 'student' ? user?.rollNo : user?.employeeId}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {nav.map(({ to, icon: Icon, label, end }) => (
          <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
               ${isActive
                 ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                 : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`
            }>
            <Icon size={17} />{label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-100">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                     text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200
                     hover:border-red-200 transition-all">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 flex-col flex-shrink-0 shadow-sm">
        <SidebarContent />
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-60 flex flex-col z-10 shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3.5 flex items-center gap-3 flex-shrink-0 shadow-sm">
          <button onClick={() => setOpen(true)} className="lg:hidden text-slate-400 hover:text-slate-700">
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border
            ${user?.role === 'faculty'
              ? 'bg-purple-50 text-purple-600 border-purple-200'
              : 'bg-violet-50 text-violet-600 border-violet-200'}`}>
            {user?.role === 'faculty' ? '🧑‍🏫 Faculty View' : '🎓 Student View'}
          </span>
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-sm text-white shadow-sm">
            {user?.name?.[0]}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.name}</p>
            <p className="text-[11px] text-slate-400">{user?.department}</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
