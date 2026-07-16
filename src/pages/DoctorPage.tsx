import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PATIENTS, PATIENT_VITALS, PATIENT_TIMELINE, PRESCRIPTIONS, LAB_REPORTS } from '../data';

const COPILOT_ACTIONS = [
  { icon: 'FileText', label: 'Summarize Consultation' },
  { icon: 'Tags', label: 'Suggest ICD Codes' },
  { icon: 'Activity', label: 'Highlight Abnormal Vitals' },
  { icon: 'AlertTriangle', label: 'Check Drug Interactions' },
  { icon: 'FlaskConical', label: 'Suggest Additional Tests' },
  { icon: 'ClipboardList', label: 'Generate SOAP Notes' },
  { icon: 'Mail', label: 'Draft Referral Letter' },
  { icon: 'FileCheck', label: 'Generate Discharge Summary' },
];

const VITAL_STATUS = {
  normal: 'text-accent-600 bg-accent-50 dark:bg-accent-500/10 dark:text-accent-400',
  high: 'text-danger-600 bg-danger-50 dark:bg-danger-500/10 dark:text-danger-400',
  low: 'text-warn-600 bg-warn-50 dark:bg-warn-500/10 dark:text-warn-400',
};

export function DoctorPage() {
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[2]);
  const [copilotOutput, setCopilotOutput] = useState<string | null>(null);
  const [copilotLoading, setCopilotLoading] = useState(false);

  function runCopilot(action: string) {
    setCopilotLoading(true);
    setCopilotOutput(null);
    setTimeout(() => {
      setCopilotLoading(false);
      const outputs: Record<string, string> = {
        'Summarize Consultation': `**Consultation Summary — ${selectedPatient.name}**\n\n• 52-year-old male\n• Chief complaint: Follow-up for Type 2 Diabetes & Hypertension\n• Current BP: 142/88 (elevated), HbA1c: 6.8% (above target)\n• Medication adherence: Good (92%)\n• Lifestyle: Sedentary, diet needs improvement\n\n**Assessment:** Diabetes partially controlled. BP remains above target despite Lisinopril. Consider dose adjustment.\n\n**Plan:**\n1. Increase Lisinopril to 20mg daily\n2. Refer to dietitian\n3. Recheck BP in 2 weeks`,
        'Suggest ICD Codes': `**Suggested ICD-10 Codes:**\n\n• **E11.9** — Type 2 diabetes mellitus without complications (94% match)\n• **I10** — Essential (primary) hypertension (91% match)\n• **E78.5** — Hyperlipidemia, unspecified (88% match)\n• **Z79.4** — Long-term (current) use of insulin\n• **Z79.899** — Other long-term drug therapy\n\n*Confidence scores based on clinical notes analysis.*`,
        'Highlight Abnormal Vitals': `**Abnormal Vitals Detected:**\n\n• ⚠️ **Blood Pressure: 142/88 mmHg** — Above target (<130/80 for diabetic patients)\n• ⚠️ **Blood Glucose: 128 mg/dL** — Above fasting range (70-99)\n• ⚠️ **BMI: 28.4** — Overweight category\n\n**AI Recommendation:** BP is the most critical. Current Lisinopril 10mg may be insufficient. Consider titration to 20mg or adding Amlodipine.`,
        'Check Drug Interactions': `**Drug Interaction Check:**\n\n✅ Metformin + Lisinopril — No significant interaction\n⚠️ **Metformin + Atorvastatin** — Minor: monitor for myopathy risk\n✅ Lisinopril + Atorvastatin — No interaction\n\n**No major contraindications detected.** Continue current regimen with routine monitoring.`,
        'Suggest Additional Tests': `**Recommended Additional Tests:**\n\n1. **Urine Albumin/Creatinine Ratio** — Screen for diabetic nephropathy (annual)\n2. **Comprehensive Metabolic Panel** — Monitor kidney function on Lisinopril\n3. **Foot Exam** — Diabetic peripheral neuropathy screening\n4. **Dilated Eye Exam** — Refer to ophthalmologist (overdue 14 months)`,
        'Generate SOAP Notes': `**SOAP Note — ${selectedPatient.name}**\n\n**S (Subjective):** Patient reports feeling well, no chest pain or shortness of breath. Occasional headaches in mornings. Adherent to medications.\n\n**O (Objective):** BP 142/88, HR 78, BMI 28.4, HbA1c 6.8%, LDL 142. No peripheral edema.\n\n**A (Assessment):** Type 2 DM partially controlled. HTN not at goal. Hyperlipidemia.\n\n**P (Plan):** 1) ↑ Lisinopril to 20mg. 2) Dietitian referral. 3) Labs in 3 months. 4) BP recheck 2 weeks.`,
        'Draft Referral Letter': `**Referral Letter Draft:**\n\nDear Dr. [Dietitian],\n\nI am referring ${selectedPatient.name} (M, 52) for nutritional counseling. Patient has Type 2 Diabetes (HbA1c 6.8%) and BMI 28.4. Goals: weight management, glycemic control, and dietary modification.\n\nCurrent medications: Metformin 500mg BID, Lisinopril 10mg, Atorvastatin 20mg.\n\nPlease schedule at your earliest convenience.\n\nRegards,\nDr. Sarah Mitchell, MD`,
        'Generate Discharge Summary': `**Discharge Summary — ${selectedPatient.name}**\n\n**Admission:** N/A (outpatient visit)\n**Date:** July 8, 2026\n**Attending:** Dr. Sarah Mitchell, MD\n\n**Diagnosis:**\n1. Type 2 Diabetes Mellitus (E11.9) — partially controlled\n2. Essential Hypertension (I10) — not at goal\n3. Hyperlipidemia (E78.5)\n\n**Medications on discharge:**\n• Metformin 500mg BID\n• Lisinopril 20mg daily (increased)\n• Atorvastatin 20mg QHS\n\n**Follow-up:** 2 weeks for BP recheck, 3 months for labs.`,
      };
      setCopilotOutput(outputs[action] || 'Processing complete.');
    }, 800);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">Doctor Workspace</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Patient management with AI Copilot (demo)</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-accent-50 dark:bg-accent-500/10">
          <Icons.Stethoscope className="w-4 h-4 text-accent-600 dark:text-accent-400" />
          <span className="text-xs font-semibold text-accent-700 dark:text-accent-400">Dr. Sarah Mitchell, MD</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Patient list */}
        <div className="lg:col-span-3 card p-4">
          <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-3">Patients</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {PATIENTS.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPatient(p)}
                className={`w-full text-left p-3 rounded-xl border transition ${
                  selectedPatient.id === p.id
                    ? 'border-brand-300 bg-brand-50 dark:bg-brand-500/10 dark:border-brand-500/30'
                    : 'border-slate-100 dark:border-navy-800 hover:border-brand-200 dark:hover:border-navy-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">{p.name}</span>
                </div>
                <p className="text-xs text-slate-400">{p.id} · {p.age}{p.gender}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {p.conditions.map((c) => (
                    <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400">{c}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Patient detail */}
        <div className="lg:col-span-5 space-y-4">
          {/* Patient header + risk score */}
          <div className="card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold">
                  {selectedPatient.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 dark:text-white">{selectedPatient.name}</h3>
                  <p className="text-xs text-slate-400">{selectedPatient.id} · {selectedPatient.age}{selectedPatient.gender}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-1">Active Conditions</p>
                <span className="text-xl font-bold text-navy-800 dark:text-slate-200">{selectedPatient.conditions.length}</span>
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-3">Vitals</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PATIENT_VITALS.map((v) => (
                <div key={v.label} className="p-3 rounded-xl border border-slate-100 dark:border-navy-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{v.label}</span>
                    <span className={`badge ${VITAL_STATUS[v.status as keyof typeof VITAL_STATUS]}`}>{v.status}</span>
                  </div>
                  <p className="text-lg font-bold text-navy-900 dark:text-white mt-1">
                    {v.value} <span className="text-xs font-normal text-slate-400">{v.unit}</span>
                  </p>
                  <p className="text-[10px] text-slate-400">Normal: {v.normal}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-3">Patient Timeline</h3>
            <div className="space-y-3">
              {PATIENT_TIMELINE.map((t, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      t.type === 'Consultation' ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400' :
                      t.type === 'Lab Report' ? 'bg-warn-50 dark:bg-warn-500/10 text-warn-600 dark:text-warn-400' :
                      t.type === 'Prescription' ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400' :
                      'bg-navy-50 dark:bg-navy-500/10 text-navy-600 dark:text-navy-300'
                    }`}>
                      {t.type === 'Consultation' ? <Icons.Stethoscope className="w-4 h-4" /> :
                       t.type === 'Lab Report' ? <Icons.FlaskConical className="w-4 h-4" /> :
                       t.type === 'Prescription' ? <Icons.Pill className="w-4 h-4" /> :
                       <Icons.Image className="w-4 h-4" />}
                    </div>
                    {i < PATIENT_TIMELINE.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 dark:bg-navy-800 mt-1" />}
                  </div>
                  <div className="pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">{t.title}</span>
                      <span className="text-[10px] text-slate-400">{t.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.doctor} · {t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions + Lab reports */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-3">Prescriptions</h3>
              <div className="space-y-2">
                {PRESCRIPTIONS.map((p) => (
                  <div key={p.name} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-navy-800/50">
                    <div>
                      <p className="text-sm font-medium text-navy-800 dark:text-slate-200">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.dose} · {p.duration}</p>
                    </div>
                    <span className="badge bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400">{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-3">Lab Reports</h3>
              <div className="space-y-2">
                {LAB_REPORTS.map((l, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-navy-800/50">
                    <div>
                      <p className="text-sm font-medium text-navy-800 dark:text-slate-200">{l.test}</p>
                      <p className="text-xs text-slate-400">{l.date} · Range: {l.range}</p>
                    </div>
                    <span className={`text-sm font-bold ${l.flag === 'high' ? 'text-danger-600' : 'text-accent-600'}`}>{l.result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Copilot panel */}
        <div className="lg:col-span-4 card p-5 flex flex-col" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-ai animate-pulse-glow">
              <Icons.Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-navy-900 dark:text-white">AI Copilot (Demo)</h3>
              <p className="text-xs text-slate-400">Clinical decision support — simulated output</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {COPILOT_ACTIONS.map((a) => {
              const Icon = (Icons as any)[a.icon] || Icons.Sparkles;
              return (
                <button
                  key={a.label}
                  onClick={() => runCopilot(a.label)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 dark:border-navy-800 text-xs font-medium text-navy-700 dark:text-slate-300 hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition text-left"
                >
                  <Icon className="w-4 h-4 text-brand-500 shrink-0" />
                  <span className="truncate">{a.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto rounded-xl bg-slate-50 dark:bg-navy-800/30 p-4 border border-slate-100 dark:border-navy-800">
            {copilotLoading && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                Analyzing...
              </div>
            )}
            {!copilotLoading && !copilotOutput && (
              <div className="text-center py-8">
                <Icons.Sparkles className="w-8 h-8 text-brand-300 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Select an action above to let the AI copilot assist with clinical tasks</p>
              </div>
            )}
            {copilotOutput && (
              <div className="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap animate-fade-in">
                {copilotOutput.split('\n').map((line, i) => (
                  <div key={i} className={line.startsWith('**') ? 'font-semibold text-navy-900 dark:text-white mt-2 mb-1' : 'mb-0.5'}>
                    {line.replace(/\*\*/g, '')}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
