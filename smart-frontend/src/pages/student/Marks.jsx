import React from 'react';
import { MARKS } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function StudentMarks() {
  const bySubject = MARKS.reduce((acc, m) => {
    if (!acc[m.subjectId]) acc[m.subjectId] = { name: m.subjectName, entries: [] };
    acc[m.subjectId].entries.push(m);
    return acc;
  }, {});

  const chartData = MARKS.map(m => ({
    name: `${m.subjectName} – ${m.examType}`,
    pct: Math.round((m.marksObtained / m.totalMarks) * 100),
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Marks & Feedback</h1>
      <div className="card">
        <h3 className="font-semibold text-slate-800 mb-4">Performance Overview</h3>
        <div className="h-52">
          <ResponsiveContainer>
            <BarChart data={chartData} barSize={22}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} angle={-10} textAnchor="end" height={50} />
              <YAxis domain={[0,100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip formatter={v => [`${v}%`,'Score']} contentStyle={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, color:'#334155' }} />
              <Bar dataKey="pct" radius={[6,6,0,0]}>
                {chartData.map((d,i) => <Cell key={i} fill={d.pct>=75?'#10b981':d.pct>=50?'#f59e0b':'#ef4444'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {Object.values(bySubject).map(sub => {
        const avg = Math.round(sub.entries.reduce((a,m) => a + (m.marksObtained/m.totalMarks)*100, 0) / sub.entries.length);
        return (
          <div key={sub.name} className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-800">{sub.name}</h3>
              <div className="text-right">
                <p className="text-xs text-slate-400">Average</p>
                <p className={`text-2xl font-bold ${avg>=75?'text-emerald-600':avg>=50?'text-amber-600':'text-red-600'}`}>{avg}%</p>
              </div>
            </div>
            <div className="space-y-3">
              {sub.entries.map(m => {
                const pct = Math.round((m.marksObtained/m.totalMarks)*100);
                return (
                  <div key={m._id} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{m.examType}</p>
                        <p className="text-xs text-slate-400">{m.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${pct>=75?'text-emerald-600':pct>=50?'text-amber-600':'text-red-600'}`}>{m.marksObtained}/{m.totalMarks}</p>
                        <p className="text-xs text-slate-400">{pct}%</p>
                      </div>
                    </div>
                    {m.feedback && <div className="mt-2 pt-2 border-t border-slate-200"><p className="text-xs text-slate-500 italic">"{m.feedback}"</p></div>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
