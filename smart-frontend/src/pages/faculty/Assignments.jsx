import React, { useState } from 'react';
import { SUBJECTS } from '../../data/mockData';
import { useAssignments } from '../../context/AssignmentsContext';
import toast from 'react-hot-toast';
import { Plus, ClipboardList, Eye, X, Check } from 'lucide-react';

export default function FacultyAssignments() {
  const { assignments, submissions, createAssignment, gradeSubmission } = useAssignments();
  const [show, setShow]   = useState(false);
  const [viewing, setViewing] = useState(null);
  const [grades, setGrades]   = useState({});
  const [form, setForm]   = useState({ title:'', description:'', subjectId:SUBJECTS[0]._id, dueDate:'', totalMarks:10 });

  const create = (e) => {
    e.preventDefault();
    createAssignment(form);
    toast.success('Assignment created!'); setShow(false);
    setForm({title:'',description:'',subjectId:SUBJECTS[0]._id,dueDate:'',totalMarks:10});
  };

  const grade=(asgnId,stuId)=>{
    const key=`${asgnId}_${stuId}`;
    const g=grades[key];
    if(!g?.marks) return toast.error('Enter marks first');
    gradeSubmission({ assignmentId: asgnId, studentId: stuId, marks: g.marks, feedback: g.feedback });
    toast.success('Graded!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Assignments</h1>
        <button onClick={()=>setShow(true)} className="btn-primary"><Plus size={18}/>Create</button>
      </div>
      <div className="space-y-4">
        {assignments.map(a=>{
          const subs=submissions[a._id]||[];
          const graded=subs.filter(s=>s.status==='graded').length;
          return (
            <div key={a._id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-amber-50 border border-amber-100 rounded-xl mt-0.5"><ClipboardList size={16} className="text-amber-600"/></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{a.title}</h3>
                    <p className="text-xs text-slate-400">{a.subjectName} · {a.totalMarks} marks · Due: {a.dueDate}</p>
                    {a.description&&<p className="text-sm text-slate-500 mt-1">{a.description}</p>}
                    <div className="flex gap-2 mt-2">
                      <span className="badge-blue">{subs.length} submissions</span>
                      <span className="badge-green">{graded} graded</span>
                      <span className="badge-yellow">{subs.length-graded} pending</span>
                    </div>
                  </div>
                </div>
                <button onClick={()=>setViewing(a._id)} className="btn-secondary text-xs py-1.5"><Eye size={13}/>View</button>
              </div>
            </div>
          );
        })}
      </div>

      {show&&(
        <div className="modal-overlay">
          <div className="modal">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-slate-800">Create Assignment</h2>
              <button onClick={()=>setShow(false)}><X size={20} className="text-slate-400"/></button>
            </div>
            <form onSubmit={create} className="space-y-4">
              <div><label className="label">Title</label><input required className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Assignment title"/></div>
              <div><label className="label">Description</label><textarea className="input resize-none" rows={2} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Subject</label><select className="input" value={form.subjectId} onChange={e=>setForm({...form,subjectId:e.target.value})}>{SUBJECTS.map(s=><option key={s._id} value={s._id}>{s.code}</option>)}</select></div>
                <div><label className="label">Total Marks</label><input type="number" min={1} className="input" value={form.totalMarks} onChange={e=>setForm({...form,totalMarks:+e.target.value})}/></div>
              </div>
              <div><label className="label">Due Date</label><input type="date" required className="input" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/></div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={()=>setShow(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewing&&(
        <div className="modal-overlay">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-800">{assignments.find(a=>a._id===viewing)?.title}</h2>
                <p className="text-xs text-slate-400">{(submissions[viewing]||[]).length} submissions</p>
              </div>
              <button onClick={()=>setViewing(null)}><X size={20} className="text-slate-400"/></button>
            </div>
            <div className="space-y-4">
              {(submissions[viewing]||[]).map(sub=>{
                const key=`${viewing}_${sub.studentId}`;
                const g=grades[key]||{marks:sub.marks??'',feedback:sub.feedback??''};
                return (
                  <div key={sub.studentId} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-medium text-slate-800">{sub.studentName}</p>
                        <p className="text-xs text-slate-400">{sub.rollNo} · {sub.submittedAt}</p>
                        <p className="text-xs text-violet-600 mt-0.5">📎 {sub.fileName}</p>
                      </div>
                      <span className={sub.status==='graded'?'badge-green':'badge-blue'}>{sub.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="label text-xs">Marks /{assignments.find(a=>a._id===viewing)?.totalMarks}</label><input type="number" className="input text-sm py-2" value={g.marks} onChange={e=>setGrades(p=>({...p,[key]:{...g,marks:e.target.value}}))}/></div>
                      <div><label className="label text-xs">Feedback</label><input className="input text-sm py-2" value={g.feedback} onChange={e=>setGrades(p=>({...p,[key]:{...g,feedback:e.target.value}}))}/></div>
                    </div>
                    <button onClick={()=>grade(viewing,sub.studentId)} className="btn-success mt-3 text-xs py-1.5"><Check size={13}/>Save Grade</button>
                  </div>
                );
              })}
              {(submissions[viewing]||[]).length===0&&<p className="text-center text-slate-400 py-8">No submissions yet.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
