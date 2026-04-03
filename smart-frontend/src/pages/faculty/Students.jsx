import React, { useState } from 'react';
import { STUDENTS, SUBJECTS, ATTENDANCE } from '../../data/mockData';
import { Search } from 'lucide-react';

export default function FacultyStudents() {
  const [search, setSearch] = useState('');
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.includes(search) || s.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Students</h1>
        <p className="text-slate-400 text-sm mt-1">{STUDENTS.length} enrolled students · SE Division A</p>
      </div>
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-3 text-slate-400"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, roll no or email…" className="input pl-10"/>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(s=>{
          const pcts=SUBJECTS.map(sub=>{const a=ATTENDANCE[sub._id]?.[s._id]||{present:0,total:0};return a.total?Math.round((a.present/a.total)*100):0;});
          const avg=Math.round(pcts.reduce((a,p)=>a+p,0)/pcts.length);
          return (
            <div key={s._id} className="card hover:border-violet-200 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center font-bold text-xl text-violet-700 flex-shrink-0">{s.name[0]}</div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-800 truncate">{s.name}</h3>
                  <p className="text-xs text-slate-400 font-mono">{s.rollNo}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 truncate mb-3">{s.email}</p>
              <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
                <div><p className="text-xs text-slate-400">Sem</p><p className="text-sm font-bold text-slate-800">{s.semester}</p></div>
                <div><p className="text-xs text-slate-400">Div</p><p className="text-sm font-bold text-slate-800">{s.division}</p></div>
                <div><p className="text-xs text-slate-400">Att.</p><p className={`text-sm font-bold ${avg>=75?'text-emerald-600':'text-red-600'}`}>{avg}%</p></div>
              </div>
              <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${avg>=75?'bg-emerald-500':'bg-red-500'}`} style={{width:`${avg}%`}}/>
              </div>
              <p className="text-xs text-center mt-1.5"><span className={avg>=75?'badge-green':'badge-red'}>{avg>=75?'Eligible':'At Risk'}</span></p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
