import React, { useState } from 'react';
import { useAssignments } from '../../context/AssignmentsContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Upload, ClipboardList, CheckCircle } from 'lucide-react';

export default function StudentAssignments() {
  const { assignments, submitAssignment } = useAssignments();
  const { user } = useAuth();

  const submit = (id, fileName) => {
    if (!user) return;
    submitAssignment({ assignmentId: id, student: user, fileName });
    toast.success('Assignment submitted successfully!');
  };

  const pending   = assignments.filter(a => !a.submitted);
  const submitted = assignments.filter(a => a.submitted);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Assignments</h1>
        <div className="flex gap-2">
          <span className="badge-yellow">{pending.length} Pending</span>
          <span className="badge-green">{submitted.length} Submitted</span>
        </div>
      </div>

      {pending.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">⏳ Pending</h2>
          <div className="space-y-3">
            {pending.map(a => {
              const days = Math.ceil((new Date(a.dueDate) - new Date()) / 864e5);
              return (
                <div key={a._id} className="card border-l-4 border-l-amber-400">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-50 border border-amber-100 rounded-xl mt-0.5"><ClipboardList size={16} className="text-amber-600" /></div>
                      <div>
                        <h3 className="font-semibold text-slate-800">{a.title}</h3>
                        <p className="text-xs text-slate-400">{a.subjectName} · {a.totalMarks} marks</p>
                        <p className="text-sm text-slate-500 mt-1.5">{a.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={days <= 2 ? 'badge-red' : 'badge-yellow'}>
                            {days < 0 ? `Overdue by ${Math.abs(days)}d` : `${days}d left`}
                          </span>
                          <span className="text-xs text-slate-400">Due: {a.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <label className="cursor-pointer min-w-[150px]">
                      <div className="btn-primary text-xs justify-center py-2"><Upload size={13} /> Submit</div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => submit(a._id, e.target.files?.[0]?.name)}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {submitted.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">✅ Submitted</h2>
          <div className="space-y-3">
            {submitted.map(a => (
              <div key={a._id} className="card border-l-4 border-l-emerald-400">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-xl mt-0.5"><CheckCircle size={16} className="text-emerald-600" /></div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{a.title}</h3>
                      <p className="text-xs text-slate-400">{a.subjectName} · {a.totalMarks} marks</p>
                      <p className="text-xs text-slate-400 mt-1">Submitted: {a.submittedAt}</p>
                      {a.marks !== null && (
                        <div className="mt-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                          <p className="text-sm text-slate-800 font-medium">
                            Score: <span className="text-emerald-600 font-bold">{a.marks}/{a.totalMarks}</span>
                            <span className="text-slate-400 text-xs ml-2">({Math.round(a.marks/a.totalMarks*100)}%)</span>
                          </p>
                          {a.feedback && <p className="text-xs text-slate-500 mt-1 italic">"{a.feedback}"</p>}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={a.status === 'graded' ? 'badge-green' : 'badge-blue'}>{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
