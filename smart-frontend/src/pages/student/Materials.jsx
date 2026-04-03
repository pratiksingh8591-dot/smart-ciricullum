import React, { useState } from 'react';
import { useMaterials } from '../../context/MaterialsContext';
import toast from 'react-hot-toast';
import { FileText, Download, Search } from 'lucide-react';

const typeCls = { notes: 'badge-blue', slides: 'badge-green', reference: 'badge-yellow', other: 'badge-purple' };

export default function StudentMaterials() {
  const { materials } = useMaterials();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [counts, setCounts] = useState({});

  const filtered = materials.filter(m =>
    (filter === 'all' || m.type === filter) &&
    (m.title.toLowerCase().includes(search.toLowerCase()) || m.subjectName.toLowerCase().includes(search.toLowerCase()))
  );

  const download = (m) => {
    setCounts(p => ({ ...p, [m._id]: (p[m._id] || m.downloads) + 1 }));
    toast.success(`Downloading "${m.title}"`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Study Materials</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-3 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search materials…" className="input pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','notes','slides','reference'].map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-2 rounded-xl text-sm font-medium capitalize transition-all border ${filter === t ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-slate-500 border-slate-200 hover:border-violet-300 hover:text-violet-600'}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m => (
          <div key={m._id} className="card group hover:border-violet-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-violet-50 group-hover:border-violet-100 transition-all">
                <FileText size={18} className="text-slate-400 group-hover:text-violet-600 transition-all" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-800 text-sm leading-snug">{m.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{m.subjectName}</p>
                <div className="flex gap-2 mt-1.5">
                  <span className={typeCls[m.type]}>{m.type}</span>
                  {m.unit && <span className="text-xs text-slate-400">Unit {m.unit}</span>}
                </div>
              </div>
            </div>
            {m.description && <p className="text-xs text-slate-500 mt-3 leading-relaxed">{m.description}</p>}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">{counts[m._id] || m.downloads} downloads</span>
              <button onClick={() => download(m)} className="btn-primary text-xs py-1.5 px-3"><Download size={13} /> Download</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full card text-center py-12 text-slate-400">No materials found.</div>}
      </div>
    </div>
  );
}
