import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SUBJECTS, ATTENDANCE } from '../../data/mockData';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function StudentAttendance() {
  const { user } = useAuth();
  const sid = user._id;
  const [sel, setSel] = useState(SUBJECTS[0]._id);

  const attList = SUBJECTS.map(s => {
    const a = ATTENDANCE[s._id]?.[sid] || { present: 0, total: 0, sessions: [] };
    return { ...s, ...a, pct: a.total ? Math.round((a.present / a.total) * 100) : 0 };
  });
  const selSub = attList.find(s => s._id === sel);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">My Attendance</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {attList.map(s => (
          <button key={s._id} onClick={() => setSel(s._id)}
            className={`p-4 rounded-xl border text-left transition-all ${sel === s._id ? 'border-violet-400 bg-violet-50 shadow-sm' : 'border-slate-200 bg-white hover:border-violet-200 shadow-sm'}`}>
            <p className="text-sm font-semibold text-slate-800 truncate">{s.code}</p>
            <p className={`text-2xl font-bold mt-2 ${s.pct >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>{s.pct}%</p>
            <div className="mt-1.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${s.pct >= 75 ? 'bg-emerald-500' : 'bg-red-500'}`} style={{ width: `${s.pct}%` }} />
            </div>
            <p className="text-xs text-slate-400 mt-1">{s.present}/{s.total}</p>
          </button>
        ))}
      </div>

      {selSub && (
        <div className="card">
          <div className="flex justify-between items-start mb-5">
            <div>
              <h3 className="font-semibold text-slate-800">{selSub.name}</h3>
              <p className="text-xs text-slate-400">{selSub.code} · Session Log</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${selSub.pct >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>{selSub.pct}%</p>
              <span className={selSub.pct >= 75 ? 'badge-green' : 'badge-red'}>{selSub.pct >= 75 ? 'Eligible' : 'At Risk'}</span>
            </div>
          </div>
          {selSub.sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr className="border-b border-slate-100"><th className="th">Date</th><th className="th">Topic</th><th className="th">Type</th><th className="th">Status</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {selSub.sessions.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="td font-mono text-xs">{s.date}</td>
                      <td className="td">{s.topic}</td>
                      <td className="td"><span className="badge-blue capitalize">{s.type}</span></td>
                      <td className="td">
                        {s.status === 'present'
                          ? <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium"><CheckCircle size={13} />Present</span>
                          : s.status === 'late'
                          ? <span className="flex items-center gap-1 text-amber-600 text-xs font-medium"><Clock size={13} />Late</span>
                          : <span className="flex items-center gap-1 text-red-600 text-xs font-medium"><XCircle size={13} />Absent</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-slate-400 text-sm py-8 text-center">No session log available for this subject.</p>}
        </div>
      )}
    </div>
  );
}
