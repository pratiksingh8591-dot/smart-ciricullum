import React, { useState } from 'react';
import { MARKS as INIT, SUBJECTS, STUDENTS } from '../../data/mockData';
import toast from 'react-hot-toast';
import { Plus, X } from 'lucide-react';

const TYPES = ['UT1','UT2','Midterm','Final','Practical','Assignment'];

export default function FacultyMarks() {
  const [marks, setMarks]   = useState(INIT);
  const [selSub, setSelSub] = useState(SUBJECTS[0]._id);
  const [show, setShow]     = useState(false);
  const [form, setForm]     = useState({ studentId:'s1', examType:'UT1', marksObtained:'', totalMarks:20, feedback:'' });

  const subMarks=marks.filter(m=>m.subjectId===selSub);
  const sub=SUBJECTS.find(s=>s._id===selSub);

  const add=(e)=>{
    e.preventDefault();
    setMarks(p=>[{...form,_id:'mk_'+Date.now(),subjectId:selSub,subjectName:sub?.name,marksObtained:+form.marksObtained,date:new Date().toISOString().split('T')[0]},...p]);
    toast.success('Marks added!'); setShow(false);
    setForm({studentId:'s1',examType:'UT1',marksObtained:'',totalMarks:20,feedback:''});
  };
  const del=(id)=>{setMarks(p=>p.filter(m=>m._id!==id));toast.success('Deleted');};

  const byExam=subMarks.reduce((acc,m)=>{if(!acc[m.examType])acc[m.examType]=[];acc[m.examType].push(m);return acc;},{});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Marks & Feedback</h1>
        <button onClick={()=>setShow(true)} className="btn-primary"><Plus size={18}/>Add Marks</button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {SUBJECTS.map(s=>(
          <button key={s._id} onClick={()=>setSelSub(s._id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${selSub===s._id?'bg-violet-600 text-white border-violet-600':'bg-white text-slate-500 border-slate-200 hover:border-violet-300'}`}>
            {s.code}
          </button>
        ))}
      </div>
      {Object.entries(byExam).map(([examType,entries])=>{
        const avg=Math.round(entries.reduce((a,m)=>a+(m.marksObtained/m.totalMarks)*100,0)/entries.length);
        return (
          <div key={examType} className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-800">{examType}</h3>
              <span className="text-sm text-slate-400">Class avg: <span className="text-violet-600 font-bold">{avg}%</span></span>
            </div>
            <table className="w-full">
              <thead><tr className="border-b border-slate-100"><th className="th">Student</th><th className="th">Marks</th><th className="th">%</th><th className="th">Feedback</th><th className="th"/></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {entries.map(m=>{
                  const pct=Math.round((m.marksObtained/m.totalMarks)*100);
                  const st=STUDENTS.find(s=>s._id===m.studentId);
                  return (
                    <tr key={m._id} className="hover:bg-slate-50">
                      <td className="td font-medium text-slate-800">{st?.name||'Student'} <span className="text-slate-400 text-xs ml-1">{st?.rollNo}</span></td>
                      <td className="td">{m.marksObtained}/{m.totalMarks}</td>
                      <td className="td"><span className={`font-bold ${pct>=75?'text-emerald-600':pct>=50?'text-amber-600':'text-red-600'}`}>{pct}%</span></td>
                      <td className="td text-xs text-slate-500 max-w-[200px] truncate">{m.feedback||'—'}</td>
                      <td className="td text-right"><button onClick={()=>del(m._id)} className="text-slate-400 hover:text-red-500 text-xs">Delete</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
      {subMarks.length===0&&<div className="card text-center py-12 text-slate-400">No marks recorded for this subject yet.</div>}

      {show&&(
        <div className="modal-overlay">
          <div className="modal">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-slate-800">Add Marks – {sub?.code}</h2>
              <button onClick={()=>setShow(false)}><X size={20} className="text-slate-400"/></button>
            </div>
            <form onSubmit={add} className="space-y-4">
              <div><label className="label">Student</label><select className="input" value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})}>{STUDENTS.map(s=><option key={s._id} value={s._id}>{s.name} ({s.rollNo})</option>)}</select></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Exam Type</label><select className="input" value={form.examType} onChange={e=>setForm({...form,examType:e.target.value})}>{TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
                <div><label className="label">Total Marks</label><input type="number" min={1} className="input" value={form.totalMarks} onChange={e=>setForm({...form,totalMarks:+e.target.value})}/></div>
              </div>
              <div><label className="label">Marks Obtained</label><input type="number" required min={0} max={form.totalMarks} className="input" value={form.marksObtained} onChange={e=>setForm({...form,marksObtained:e.target.value})}/></div>
              <div><label className="label">Feedback</label><textarea className="input resize-none" rows={2} value={form.feedback} onChange={e=>setForm({...form,feedback:e.target.value})} placeholder="e.g. Good understanding of the topic."/></div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={()=>setShow(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Save Marks</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
