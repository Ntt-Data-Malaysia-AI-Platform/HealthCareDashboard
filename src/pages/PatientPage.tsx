import * as Icons from 'lucide-react';
import { PATIENT_APPOINTMENTS, PATIENT_PRESCRIPTIONS, PATIENT_CLAIMS } from '../data';

const MEDICINE_REMINDERS = [
  { name: 'Metformin 500mg', time: '8:00 AM & 8:00 PM', status: 'due' },
  { name: 'Lisinopril 10mg', time: '9:00 AM', status: 'taken' },
  { name: 'Atorvastatin 20mg', time: '10:00 PM', status: 'upcoming' },
];

const VACCINATION_REMINDERS = [
  { name: 'Seasonal Flu Vaccine', due: 'Oct 2026', status: 'upcoming' },
  { name: 'COVID-19 Booster', due: 'Sep 2026', status: 'upcoming' },
  { name: 'Tetanus Booster', due: 'Overdue', status: 'overdue' },
];

const MEDICAL_HISTORY = [
  { date: 'Jul 2026', event: 'Follow-up — Hypertension', doctor: 'Dr. Sarah Mitchell' },
  { date: 'Jun 2026', event: 'HbA1c & Lipid Panel', doctor: 'LabCorp' },
  { date: 'May 2026', event: 'Chest X-Ray', doctor: 'Riverside Radiology' },
  { date: 'May 2026', event: 'Annual Physical', doctor: 'Dr. Sarah Mitchell' },
  { date: 'Mar 2026', event: 'Dental Cleaning', doctor: 'Dr. James Lee' },
  { date: 'Jan 2026', event: 'Eye Exam', doctor: 'Dr. Emily Chen' },
];

const STATUS_BADGE: Record<string, string> = {
  due: 'bg-warn-50 text-warn-700 dark:bg-warn-500/10 dark:text-warn-400',
  taken: 'bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400',
  upcoming: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400',
  overdue: 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-400',
  approved: 'bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400',
  pending: 'bg-warn-50 text-warn-700 dark:bg-warn-500/10 dark:text-warn-400',
};

export function PatientPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-5 bg-gradient-to-r from-brand-50 to-white dark:from-navy-800 dark:to-navy-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-lg font-bold shadow-glow">
              JA
            </div>
            <div>
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">John Anderson</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">P-1001 · Member since 2021</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mx-auto">
                <Icons.Gift className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <p className="text-2xl font-bold text-brand-600 dark:text-brand-400 mt-1">RM2,160</p>
              <p className="text-xs text-slate-400">Benefit Balance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments */}
      <div className="grid grid-cols-1 gap-4">
        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Icons.Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Upcoming Appointments</h3>
          </div>
          <div className="space-y-3">
            {PATIENT_APPOINTMENTS.map((a, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-navy-800 hover:border-brand-200 dark:hover:border-brand-500/30 transition">
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">{a.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold text-brand-700 dark:text-brand-300">{a.date.split(' ')[1].replace(',', '')}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-800 dark:text-slate-200">{a.type}</p>
                  <p className="text-xs text-slate-400">{a.doctor} · {a.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-navy-700 dark:text-slate-300">{a.time}</p>
                  <p className="text-xs text-slate-400">{a.date.split(', ')[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Prescriptions + Medicine reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Icons.Pill className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Digital Prescriptions</h3>
          </div>
          <div className="space-y-2">
            {PATIENT_PRESCRIPTIONS.map((p) => (
              <div key={p.name} className="p-3 rounded-xl border border-slate-100 dark:border-navy-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">{p.name}</span>
                  <span className="text-xs text-slate-400">Refill: {p.refill}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">{p.dose}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: `${(p.remaining / 90) * 100}%` }} />
                    </div>
                    <span className="text-xs text-slate-400">{p.remaining}d left</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-warn-50 dark:bg-warn-500/10 flex items-center justify-center text-warn-600 dark:text-warn-400">
              <Icons.Bell className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Medicine Reminders</h3>
          </div>
          <div className="space-y-2">
            {MEDICINE_REMINDERS.map((m) => (
              <div key={m.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-800/50">
                <div className="flex items-center gap-3">
                  <Icons.Pill className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-navy-800 dark:text-slate-200">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.time}</p>
                  </div>
                </div>
                <span className={`badge ${STATUS_BADGE[m.status]}`}>{m.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-navy-800">
            <h4 className="text-xs font-semibold text-slate-400 mb-2">Vaccination Reminders</h4>
            <div className="space-y-2">
              {VACCINATION_REMINDERS.map((v) => (
                <div key={v.name} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-navy-800/50">
                  <div className="flex items-center gap-2.5">
                    <Icons.Syringe className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-navy-800 dark:text-slate-200">{v.name}</p>
                      <p className="text-xs text-slate-400">Due: {v.due}</p>
                    </div>
                  </div>
                  <span className={`badge ${STATUS_BADGE[v.status]}`}>{v.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Claims + History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-navy-50 dark:bg-navy-500/10 flex items-center justify-center text-navy-600 dark:text-navy-300">
              <Icons.Shield className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Insurance Claims</h3>
          </div>
          <div className="space-y-2">
            {PATIENT_CLAIMS.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 dark:border-navy-800">
                <div>
                  <p className="text-sm font-medium text-navy-800 dark:text-slate-200">{c.provider}</p>
                  <p className="text-xs text-slate-400">{c.date} · RM{c.amount}</p>
                </div>
                <span className={`badge ${STATUS_BADGE[c.status]}`}>{c.status}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-sm">
            <span className="text-slate-400">Total claimed YTD</span>
            <span className="font-bold text-navy-800 dark:text-slate-200">RM835</span>
          </div>
        </div>

        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Icons.Clock className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Medical History</h3>
          </div>
          <div className="space-y-2.5">
            {MEDICAL_HISTORY.map((h, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5" />
                  {i < MEDICAL_HISTORY.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 dark:bg-navy-800" />}
                </div>
                <div className="pb-2">
                  <p className="text-sm font-medium text-navy-800 dark:text-slate-200">{h.event}</p>
                  <p className="text-xs text-slate-400">{h.date} · {h.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
