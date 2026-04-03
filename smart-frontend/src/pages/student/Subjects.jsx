import React, { useState } from 'react';
import { SUBJECTS } from '../../data/mockData';
import { BookOpen, User, ChevronDown, ChevronUp } from 'lucide-react';

const statusCls = { completed: 'badge-green', 'in-progress': 'badge-blue', pending: 'badge-yellow' };
const barCls    = { completed: 'bg-emerald-500', 'in-progress': 'bg-violet-500', pending: 'bg-slate-300' };

export default function StudentSubjects() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">My Subjects</h1>
      <div className="grid gap-4">
        {SUBJECTS.map(s => {
          const done  = s.curriculum.reduce((a, u) => a + u.lecturesCompleted, 0);
          const total = s.curriculum.reduce((a, u) => a + u.lecturesPlanned, 0);
          const pct   = Math.round((done / total) * 100);
          const open  = expanded === s._id;
          return (
            <div key={s._id} className="card">
              <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpanded(open ? null : s._id)}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-50 border border-violet-100 rounded-xl mt-0.5"><BookOpen size={20} className="text-violet-600" /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{s.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{s.code} · {s.credits} Credits · Sem {s.semester}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1"><User size={11} />{s.faculty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-violet-600 hidden sm:block">{pct}%</p>
                  {open ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5"><span>Syllabus Progress</span><span>{done}/{total} lectures</span></div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
              {open && (
                <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                  {s.curriculum.map(u => {
                    const uPct = Math.round((u.lecturesCompleted / u.lecturesPlanned) * 100);
                    return (
                      <div key={u.unit} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-sm font-medium text-slate-800">Unit {u.unit}: {u.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{u.topics.join(' · ')}</p>
                          </div>
                          <span className={statusCls[u.status]}>{u.status}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${barCls[u.status]}`} style={{ width: `${uPct}%` }} />
                          </div>
                          <span className="text-xs text-slate-400">{u.lecturesCompleted}/{u.lecturesPlanned}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
