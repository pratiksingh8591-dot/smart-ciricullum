import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    login(role);
    navigate(role === 'faculty' ? '/faculty' : '/student');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"
      style={{ backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.08), transparent)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-600 mb-4 shadow-lg shadow-violet-200">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">SmartCurriculum</h1>
          <p className="text-slate-400 text-sm mt-1">Attendance & Learning Management</p>
          <p className="text-slate-400 text-xs mt-0.5">Ramrao Adik Institute of Technology</p>
        </div>

        <div className="card">
          <h2 className="text-base font-semibold text-slate-700 mb-4 text-center">Select your role to continue</h2>

          <form onSubmit={handle} className="space-y-4">
            {/* Role selection */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { r: 'student', emoji: '🎓', label: 'Student', sub: 'Rishi Chandel' },
                { r: 'faculty', emoji: '🧑‍🏫', label: 'Faculty', sub: 'Dr. Rishi Sharma' },
              ].map(({ r, emoji, label, sub }) => (
                <button type="button" key={r} onClick={() => setRole(r)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${role === r
                    ? 'border-violet-500 bg-violet-50'
                    : 'border-slate-200 bg-white hover:border-violet-300'}`}>
                  <p className="text-2xl mb-1">{emoji}</p>
                  <p className="text-sm font-semibold text-slate-800">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                </button>
              ))}
            </div>

            {/* Dummy credentials display */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-600 mb-1">Demo credentials</p>
              <p>📧 Email: <span className="font-mono">demo@rait.ac.in</span></p>
              <p>🔑 Password: <span className="font-mono">demo123</span></p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Email</label>
                <input className="input text-sm" defaultValue="demo@rait.ac.in" readOnly />
              </div>
              <div>
                <label className="label">Password</label>
                <input className="input text-sm" type="password" defaultValue="demo123" readOnly />
              </div>
            </div>

            <button type="submit"
              className="btn-primary w-full justify-center py-3 text-base">
              Login as {role === 'student' ? 'Student' : 'Faculty'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
