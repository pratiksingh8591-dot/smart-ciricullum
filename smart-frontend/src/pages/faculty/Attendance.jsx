import React, { useState } from 'react';
import { SUBJECTS, STUDENTS, ATTENDANCE as INIT } from '../../data/mockData';
import toast from 'react-hot-toast';
import { Save, Users } from 'lucide-react';

export default function FacultyAttendance() {
  const [selSub, setSelSub] = useState(SUBJECTS[0]._id);
  const [date, setDate]   = useState(new Date().toISOString().split('T')[0]);
  const [type, setType]   = useState('lecture');
  const [topic, setTopic] = useState('');
  const [marks, setMarks] = useState(() => { const m={}; STUDENTS.forEach(s=>{m[s._id]='present';}); return m; });
  const [view, setView]   = useState('mark');
  const [attData]         = useState(INIT);

  const toggle = (sid,val) => setMarks(p=>({...p,[sid]:val}));
  const markAll = (val) => { const m={}; STUDENTS.forEach(s=>{m[s._id]=val;}); setMarks(m); };
  const save = () => { toast.success(`Attendance saved for ${new Date(date).toDateString()}!`); setTopic(''); };
  const present = Object.values(marks).filter(v=>v==='present').length;

  const summary = STUDENTS.map(st=>{
    const a=attData[selSub]?.[st._id]||{present:0,total:0};
    const pct=a.total?Math.round((a.present/a.total)*100):0;
    return {...st,present:a.present,total:a.total,pct,status:pct>=75?'eligible':'at-risk'};
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
        <div className="flex gap-2">
          {['mark','report'].map(v=>(
            <button key={v} onClick={()=>setView(v)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all border ${view===v?'bg-violet-600 text-white border-violet-600':'bg-white text-slate-500 border-slate-200 hover:border-violet-300'}`}>{v}</button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="label">Subject</label>
            <select value={selSub} onChange={e=>setSelSub(e.target.value)} className="input">
              {SUBJECTS.map(s=><option key={s._id} value={s._id}>{s.code}</option>)}
            </select>
          </div>
          <div><label className="label">Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input"/></div>
          <div><label className="label">Type</label>
            <select value={type} onChange={e=>setType(e.target.value)} className="input">
              {['lecture','lab','tutorial'].map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div><label className="label">Topic</label><input value={topic} onChange={e=>setTopic(e.target.value)} className="input" placeholder="e.g. RAID Levels"/></div>
        </div>
      </div>
      {view==='mark'&&(
        <>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <Users size={16}/> {STUDENTS.length} students ·
              <span className="text-emerald-600 font-medium">{present} present</span> ·
              <span className="text-red-600 font-medium">{STUDENTS.length-present} absent</span>
            </p>
            <div className="flex gap-2">
              <button onClick={()=>markAll('present')} className="btn-success text-xs py-1.5">✓ All Present</button>
              <button onClick={()=>markAll('absent')}  className="btn-danger  text-xs py-1.5">✗ All Absent</button>
            </div>
          </div>
          <div className="card divide-y divide-slate-100">
            {STUDENTS.map(s=>(
              <div key={s._id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center font-bold text-sm text-violet-700 flex-shrink-0">{s.name[0]}</div>
                  <div><p className="text-sm font-medium text-slate-800">{s.name}</p><p className="text-xs text-slate-400">{s.rollNo}</p></div>
                </div>
                <div className="flex gap-2">
                  {['present','absent','late'].map(val=>(
                    <button key={val} onClick={()=>toggle(s._id,val)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-all
                        ${marks[s._id]===val
                          ? val==='present'?'bg-emerald-100 text-emerald-700 border-emerald-300'
                          : val==='absent'?'bg-red-100 text-red-700 border-red-300'
                          :'bg-amber-100 text-amber-700 border-amber-300'
                          :'bg-transparent text-slate-400 border-slate-200 hover:border-slate-400'}`}>
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={save} className="btn-primary ml-auto"><Save size={16}/>Save Attendance</button>
        </>
      )}
      {view==='report'&&(
        <div className="card">
          <h3 className="font-semibold text-slate-800 mb-4">Attendance Summary – {SUBJECTS.find(s=>s._id===selSub)?.code}</h3>
          <table className="w-full">
            <thead><tr className="border-b border-slate-100"><th className="th">Student</th><th className="th">Roll No.</th><th className="th">Attendance</th><th className="th">Status</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {summary.map(r=>(
                <tr key={r._id} className="hover:bg-slate-50">
                  <td className="td font-medium text-slate-800">{r.name}</td>
                  <td className="td font-mono text-xs">{r.rollNo}</td>
                  <td className="td">
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.pct>=75?'bg-emerald-500':'bg-red-500'}`} style={{width:`${r.pct}%`}}/>
                      </div>
                      <span className={`text-sm font-bold ${r.pct>=75?'text-emerald-600':'text-red-600'}`}>{r.pct}%</span>
                      <span className="text-xs text-slate-400">{r.present}/{r.total}</span>
                    </div>
                  </td>
                  <td className="td"><span className={r.status==='eligible'?'badge-green':'badge-red'}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
