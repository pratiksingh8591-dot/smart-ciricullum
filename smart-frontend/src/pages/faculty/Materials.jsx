import React, { useState } from 'react';
import { SUBJECTS } from '../../data/mockData';
import { useMaterials } from '../../context/MaterialsContext';
import toast from 'react-hot-toast';
import { Plus, FileText, Trash2, X } from 'lucide-react';

const typeCls = { notes:'badge-blue', slides:'badge-green', reference:'badge-yellow', other:'badge-purple' };

export default function FacultyMaterials() {
  const { materials, addMaterial, removeMaterial } = useMaterials();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ title:'', description:'', subjectId:SUBJECTS[0]._id, unit:'', type:'notes' });

  const create = (e) => {
    e.preventDefault();
    addMaterial(form);
    toast.success('Material uploaded!'); setShow(false);
    setForm({title:'',description:'',subjectId:SUBJECTS[0]._id,unit:'',type:'notes'});
  };
  const remove=(id)=>{removeMaterial(id);toast.success('Deleted');};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Study Materials</h1>
        <button onClick={()=>setShow(true)} className="btn-primary"><Plus size={18}/>Upload</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map(m=>(
          <div key={m._id} className="card group hover:border-violet-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-violet-50 group-hover:border-violet-100 transition-all"><FileText size={18} className="text-slate-400 group-hover:text-violet-600 transition-all"/></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-800 text-sm leading-snug">{m.title}</h3>
                <p className="text-xs text-slate-400">{m.subjectName}</p>
                <div className="flex gap-2 mt-1.5"><span className={typeCls[m.type]||'badge-blue'}>{m.type}</span>{m.unit&&<span className="text-xs text-slate-400">Unit {m.unit}</span>}</div>
              </div>
              <button onClick={()=>remove(m._id)} className="opacity-0 group-hover:opacity-100 transition-all text-slate-400 hover:text-red-500"><Trash2 size={15}/></button>
            </div>
            {m.description&&<p className="text-xs text-slate-500 mt-3">{m.description}</p>}
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs text-slate-400">{m.downloads} downloads · {m.uploadedAt}</span>
            </div>
          </div>
        ))}
      </div>
      {show&&(
        <div className="modal-overlay">
          <div className="modal">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-slate-800">Upload Material</h2>
              <button onClick={()=>setShow(false)}><X size={20} className="text-slate-400"/></button>
            </div>
            <form onSubmit={create} className="space-y-4">
              <div><label className="label">Title</label><input required className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Unit 2 Notes – MQTT"/></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Subject</label><select className="input" value={form.subjectId} onChange={e=>setForm({...form,subjectId:e.target.value})}>{SUBJECTS.map(s=><option key={s._id} value={s._id}>{s.code}</option>)}</select></div>
                <div><label className="label">Type</label><select className="input" value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{['notes','slides','reference','other'].map(t=><option key={t} value={t}>{t}</option>)}</select></div>
              </div>
              <div><label className="label">Unit (optional)</label><input type="number" min={1} className="input" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} placeholder="1"/></div>
              <div><label className="label">Description</label><textarea className="input resize-none" rows={2} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div>
              <div><label className="label">File</label><input type="file" className="input py-2"/></div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={()=>setShow(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
                <button type="submit" className="btn-primary flex-1 justify-center">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
