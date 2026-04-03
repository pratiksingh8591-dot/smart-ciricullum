import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SUBJECTS, ATTENDANCE, ASSIGNMENTS } from '../../data/mockData';
import { BookOpen, Calendar, ClipboardList, AlertTriangle, CheckCircle } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function StudentDashboard() {
  const { user } = useAuth();
  const sid = user._id;

  const attList = SUBJECTS.map(s => {
    const a = ATTENDANCE[s._id]?.[sid] || { present: 0, total: 0 };
    return { ...s, present: a.present, total: a.total, pct: a.total ? Math.round((a.present / a.total) * 100) : 0 };
  });
  const avgAtt = Math.round(attList.reduce((a, s) => a + s.pct, 0) / attList.length);
  const pending = ASSIGNMENTS.filter(a => !a.submitted).length;
  const atRisk  = attList.filter(s => s.pct < 75).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome, {user.name.split(' ')[0]} 👋</h1>
        <p className="text-slate-500 text-sm mt-1">Roll No: {user.rollNo} · Semester {user.semester} · Division {user.division}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Enrolled Subjects',    value: SUBJECTS.length, icon: BookOpen,     bg: 'bg-violet-50', icon_c: 'text-violet-600', border: 'border-violet-100' },
          { label: 'Avg. Attendance',       value: `${avgAtt}%`,   icon: Calendar,      bg: avgAtt>=75?'bg-emerald-50':'bg-red-50', icon_c: avgAtt>=75?'text-emerald-600':'text-red-600', border: avgAtt>=75?'border-emerald-100':'border-red-100' },
          { label: 'Pending Assignments',   value: pending,         icon: ClipboardList, bg: 'bg-amber-50', icon_c: 'text-amber-600', border: 'border-amber-100' },
          { label: 'Subjects at Risk',      value: atRisk,          icon: AlertTriangle, bg: 'bg-red-50',   icon_c: 'text-red-600',   border: 'border-red-100' },
        ].map(({ label, value, icon: Icon, bg, icon_c, border }) => (
          <div key={label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
              </div>
              <div className={`p-3 rounded-xl ${bg} border ${border}`}><Icon size={20} className={icon_c} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Radial */}
        <div className="card flex flex-col items-center">
          <h3 className="font-semibold text-slate-800 mb-2 self-start">Overall Attendance</h3>
          <div className="w-full h-36">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="65%" outerRadius="90%"
                data={[{ value: avgAtt, fill: avgAtt >= 75 ? '#059669' : '#dc2626' }]}
                startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#f1f5f9' }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <p className={`text-4xl font-bold mt-1 ${avgAtt >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>{avgAtt}%</p>
          <p className="text-xs text-slate-400 mt-1">Required minimum: 75%</p>
          <span className={`mt-2 ${avgAtt >= 75 ? 'badge-green' : 'badge-red'}`}>{avgAtt >= 75 ? '✓ Eligible' : '⚠ At Risk'}</span>
        </div>

        {/* Subject-wise */}
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-4">Subject-wise Attendance</h3>
          <div className="space-y-4">
            {attList.map(s => (
              <div key={s._id}>
                <div className="flex justify-between items-center mb-1.5">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-400">{s.code} · {s.present}/{s.total} lectures</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${s.pct >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>{s.pct}%</span>
                    {s.pct >= 75 ? <CheckCircle size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className="text-red-500" />}
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${s.pct >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Assignments */}
      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-4">Upcoming Assignments</h3>
        <div className="divide-y divide-slate-100">
          {ASSIGNMENTS.filter(a => !a.submitted).map(a => {
            const days = Math.ceil((new Date(a.dueDate) - new Date()) / 864e5);
            return (
              <div key={a._id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{a.title}</p>
                  <p className="text-xs text-slate-400">{a.subjectName} · {a.totalMarks} marks</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-semibold ${days <= 2 ? 'text-red-600' : 'text-amber-600'}`}>{days}d left</p>
                  <span className="badge-yellow">Pending</span>
                </div>
              </div>
            );
          })}
          {ASSIGNMENTS.filter(a => !a.submitted).length === 0 && <p className="text-slate-400 text-sm py-4 text-center">All caught up! 🎉</p>}
        </div>
      </div>
    </div>
  );
}
