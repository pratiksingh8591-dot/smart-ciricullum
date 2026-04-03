import React, { useEffect, useState } from 'react';
import { SUBJECTS as INIT } from '../../data/mockData';
import toast from 'react-hot-toast';
import { Plus, BookOpen, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';

const statusCls = { completed:'badge-green', 'in-progress':'badge-blue', pending:'badge-yellow' };
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function FacultySubjects() {
  const [subjects, setSubjects] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name:'', code:'', department:'Computer Engineering', semester:4, credits:4, description:'' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/subjects`);
        if (!res.ok) throw new Error('Failed to load subjects');
        const data = await res.json();
        setSubjects(data || []);
      } catch (err) {
        console.error(err);
        toast.error('Could not load subjects from server, showing sample data');
        setSubjects(INIT);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Failed to create subject');
      const created = await res.json();
      setSubjects(p => [created, ...p]);
      toast.success('Subject created!');
      setShow(false);
      setForm({ name:'', code:'', department:'Computer Engineering', semester:4, credits:4, description:'' });
    } catch (err) {
      console.error(err);
      toast.error('Could not create subject');
    } finally {
      setSaving(false);
    }
  };
  const remove = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/subjects/${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete');
      setSubjects(p => p.filter(s=>s._id!==id));
      toast.success('Subject deleted');
    } catch (err) {
      console.error(err);
      toast.error('Could not delete subject');
    }
  };

  if (loading) {
    return <div className="p-4 text-sm text-slate-500">Loading subjects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">My Subjects</h1>
        <button onClick={()=>setShow(true)} className="btn-primary"><Plus size={18}/>Add Subject</button>
      </div>
      <div className="grid gap-4">
        {subjects.map(s => {
          const done  = s.curriculum?.reduce((a,u)=>a+u.lecturesCompleted,0)||s.completedLectures;
          const total = s.curriculum?.reduce((a,u)=>a+u.lecturesPlanned,0)||s.totalLectures||1;
          const pct   = Math.round((done/total)*100);
          const open  = expanded===s._id;
          return (
            <div key={s._id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 cursor-pointer flex-1" onClick={()=>setExpanded(open?null:s._id)}>
                  <div className="p-3 bg-violet-50 border border-violet-100 rounded-xl mt-0.5"><BookOpen size={20} className="text-violet-600"/></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-slate-800">{s.name}</h3>
                      {open?<ChevronUp size={15} className="text-slate-400"/>:<ChevronDown size={15} className="text-slate-400"/>}
                    </div>
                    <p className="text-xs text-slate-400">{s.code} · {s.credits} Credits · Sem {s.semester}</p>
                    {s.description&&<p className="text-sm text-slate-500 mt-1">{s.description}</p>}
                  </div>
                </div>
                <button onClick={()=>remove(s._id)} className="btn-danger py-1.5 px-2.5 text-xs ml-3"><Trash2 size={13}/></button>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5"><span>Progress</span><span>{done}/{total} · {pct}%</span></div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full" style={{width:`${pct}%`}}/></div>
              </div>
              {open&&s.curriculum?.length>0&&(
                <div className="mt-4 pt-4 border-t border-slate-100 grid sm:grid-cols-3 gap-2">
                  {s.curriculum.map(u=>(
                    <div key={u.unit} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                      <p className="text-xs font-semibold text-slate-800">U{u.unit}: {u.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{u.lecturesCompleted}/{u.lecturesPlanned} lectures</p>
                      <span className={`mt-1.5 ${statusCls[u.status]}`}>{u.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {show&&(
        <div className="modal-overlay">
          <div className="modal">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-slate-800">Create Subject</h2>
              <button onClick={()=>setShow(false)}><X size={20} className="text-slate-400"/></button>
            </div>
            <form onSubmit={create} className="space-y-4">
              <div><label className="label">Subject Name</label><input required className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Machine Learning"/></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Code</label><input required className="input" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} placeholder="CS501"/></div>
                <div><label className="label">Credits</label><input type="number" min={1} max={6} className="input" value={form.credits} onChange={e=>setForm({...form,credits:+e.target.value})}/></div>
                <div><label className="label">Semester</label><input type="number" min={1} max={8} required className="input" value={form.semester} onChange={e=>setForm({...form,semester:+e.target.value})}/></div>
              </div>
              <div><label className="label">Description</label><textarea className="input resize-none" rows={2} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={()=>setShow(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center" disabled={saving}>{saving?'Saving...':'Create Subject'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
