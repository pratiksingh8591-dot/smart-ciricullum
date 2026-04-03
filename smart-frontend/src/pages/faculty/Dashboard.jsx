import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { SUBJECTS, STUDENTS, ASSIGNMENTS, ATTENDANCE } from '../../data/mockData';
import { BookOpen, Users, ClipboardList, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const chartData = SUBJECTS.map(s => ({ name: s.code, pct: Math.round((s.completedLectures / s.totalLectures) * 100) }));
  const atRiskCount = STUDENTS.filter(st => {
    const pcts = SUBJECTS.map(s => { const a = ATTENDANCE[s._id]?.[st._id] || {present:0,total:0}; return a.total?(a.present/a.total)*100:100; });
    return pcts.some(p => p < 75);
  }).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Faculty Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">{user.designation} · {user.department}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'My Subjects',     value:SUBJECTS.length,   icon:BookOpen,     bg:'bg-violet-50', ic:'text-violet-600', border:'border-violet-100' },
          { label:'Total Students',  value:STUDENTS.length,   icon:Users,        bg:'bg-blue-50',   ic:'text-blue-600',   border:'border-blue-100' },
          { label:'Assignments',     value:ASSIGNMENTS.length,icon:ClipboardList,bg:'bg-amber-50',  ic:'text-amber-600',  border:'border-amber-100' },
          { label:'Students at Risk',value:atRiskCount,       icon:AlertTriangle,bg:'bg-red-50',    ic:'text-red-600',    border:'border-red-100' },
        ].map(({ label, value, icon: Icon, bg, ic, border }) => (
          <div key={label} className="card">
            <div className="flex items-start justify-between">
              <div><p className="text-xs text-slate-500 font-medium">{label}</p><p className="text-3xl font-bold text-slate-800 mt-1">{value}</p></div>
              <div className={`p-3 rounded-xl ${bg} border ${border}`}><Icon size={20} className={ic} /></div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4">Curriculum Completion (%)</h3>
          <div className="h-48">
            <ResponsiveContainer>
              <BarChart data={chartData} barSize={28}>
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis domain={[0,100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip formatter={v => [`${v}%`,'Complete']} contentStyle={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, color:'#334155' }} />
                <Bar dataKey="pct" fill="#7c3aed" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4">Subject Progress</h3>
          <div className="space-y-4">
            {SUBJECTS.map(s => {
              const pct = Math.round((s.completedLectures/s.totalLectures)*100);
              return (
                <div key={s._id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-700 font-medium">{s.code}</span>
                    <span className="text-violet-600 font-semibold">{pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width:`${pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{s.completedLectures}/{s.totalLectures} lectures</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
