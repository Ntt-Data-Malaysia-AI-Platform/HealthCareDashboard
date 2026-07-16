import { useState } from 'react';
import * as Icons from 'lucide-react';
import { OBSERVATION_REPORTS, MIN_CLAIMS_FOR_REPORT, ECOSYSTEM_SERVICES } from '../data';
import type { BenchmarkStatus } from '../types';

const STATUS_CHIP: Record<BenchmarkStatus, { label: string; cls: string }> = {
  high: { label: 'High side', cls: 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-400' },
  acceptable: { label: 'Acceptable', cls: 'bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400' },
  low: { label: 'Low side', cls: 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400' },
};

const SERVICE_ICONS = new Map(ECOSYSTEM_SERVICES.map((s) => [s.name, s.icon]));

export function ObservationsReport() {
  const [period, setPeriod] = useState(OBSERVATION_REPORTS[0].period);
  const report = OBSERVATION_REPORTS.find((r) => r.period === period)!;
  const suppressed = report.claimCount < MIN_CLAIMS_FOR_REPORT;
  const maxDiseaseCost = Math.max(1, ...report.topDiseases.map((d) => d.cost));

  return (
    <div className="card p-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-ai animate-pulse-glow">
            <Icons.Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">AI Observations &amp; Suggestions Report</h3>
            <p className="text-xs text-slate-400">
              Auto-generated from collected outpatient claims — the commentary TPAs reserve for RM1M+ premium customers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {OBSERVATION_REPORTS.map((r) => (
            <button
              key={r.period}
              onClick={() => setPeriod(r.period)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                period === r.period ? 'bg-brand-500 text-white shadow-soft' : 'bg-slate-100 dark:bg-navy-800 text-slate-500 hover:text-navy-700 dark:hover:text-slate-200'
              }`}
            >
              {r.period}
            </button>
          ))}
        </div>
      </div>

      {/* Report meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5 text-xs text-slate-400">
        <span className="font-medium text-navy-700 dark:text-slate-200">{report.label}</span>
        <span>Generated {report.generatedOn}</span>
        <span>{report.claimCount.toLocaleString()} claims · {report.headcount.toLocaleString()} covered employees</span>
      </div>

      {suppressed ? (
        /* Minimum-data threshold: suppress statistically insignificant analysis */
        <div className="p-5 rounded-xl border border-warn-100 dark:border-warn-500/20 bg-warn-50/40 dark:bg-warn-500/5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-warn-50 dark:bg-warn-500/10 flex items-center justify-center text-warn-600 dark:text-warn-400 shrink-0">
              <Icons.AlertCircle className="w-4.5 h-4.5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-navy-900 dark:text-white mb-1">Not enough data for meaningful analysis</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                This period recorded {report.claimCount} claims — below the {MIN_CLAIMS_FOR_REPORT}-claim minimum for statistically
                significant conclusions. Generating observations from a sample this small risks misleading action plans, so the
                report is suppressed. This is common for small SMEs and newly onboarded groups; analysis resumes automatically
                once claim volume is sufficient.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Observations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icons.Eye className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <h4 className="text-sm font-semibold text-navy-900 dark:text-white">Observations</h4>
            </div>
            <div className="space-y-2">
              {report.observations.map((o, i) => (
                <div key={o.metric} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-navy-800">
                  <div className="w-6 h-6 rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">{o.metric}</span>
                      <span className="text-sm font-bold text-navy-900 dark:text-white">{o.value}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${STATUS_CHIP[o.status].cls}`}>
                        {STATUS_CHIP[o.status].label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{o.commentary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions with ecosystem links */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icons.Lightbulb className="w-4 h-4 text-warn-600 dark:text-warn-400" />
              <h4 className="text-sm font-semibold text-navy-900 dark:text-white">Suggestions</h4>
              <span className="text-xs text-slate-400">— linked to Health Savvy ecosystem providers; HR decides whether to engage</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {report.suggestions.map((s, i) => (
                <div key={s.title} className="p-4 rounded-xl border border-slate-100 dark:border-navy-800">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-warn-50 dark:bg-warn-500/10 flex items-center justify-center text-warn-600 dark:text-warn-400 text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">{s.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">{s.detail}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.services.map((name) => {
                      const Icon = (Icons as any)[SERVICE_ICONS.get(name) || 'Activity'] || Icons.Activity;
                      return (
                        <span key={name} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-400 text-[11px] font-medium">
                          <Icon className="w-3 h-3" />
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top-10 disease analysis (ICD-10) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icons.Tags className="w-4 h-4 text-accent-600 dark:text-accent-400" />
              <h4 className="text-sm font-semibold text-navy-900 dark:text-white">Top-10 Diseases</h4>
              <span className="text-xs text-slate-400">— ICD-10 codes captured by the Health Savvy system</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 border-b border-slate-100 dark:border-navy-800">
                    <th className="text-left font-medium py-2 px-3">#</th>
                    <th className="text-left font-medium py-2 px-3">ICD-10</th>
                    <th className="text-left font-medium py-2 px-3">Disease</th>
                    <th className="text-center font-medium py-2 px-3">Type</th>
                    <th className="text-right font-medium py-2 px-3">Claims</th>
                    <th className="text-right font-medium py-2 px-3">Total Cost</th>
                    <th className="text-right font-medium py-2 px-3">Avg / Claim</th>
                    <th className="text-left font-medium py-2 px-3 w-32">Cost Share</th>
                  </tr>
                </thead>
                <tbody>
                  {report.topDiseases.map((d, i) => (
                    <tr key={d.code} className="border-b border-slate-50 dark:border-navy-800/50">
                      <td className="py-2.5 px-3 text-slate-400 text-xs">{i + 1}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{d.code}</span>
                      </td>
                      <td className="py-2.5 px-3 font-medium text-navy-800 dark:text-slate-200">{d.name}</td>
                      <td className="py-2.5 px-3 text-center">
                        {d.chronic ? (
                          <span className="badge bg-warn-50 text-warn-700 dark:bg-warn-500/10 dark:text-warn-400">Chronic</span>
                        ) : (
                          <span className="badge bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-400">Acute</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-600 dark:text-slate-300">{d.claims}</td>
                      <td className="py-2.5 px-3 text-right font-semibold text-navy-800 dark:text-slate-200">RM{d.cost.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right text-slate-500 dark:text-slate-400">RM{Math.round(d.cost / d.claims)}</td>
                      <td className="py-2.5 px-3">
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${d.chronic ? 'bg-warn-500' : 'bg-brand-500'}`}
                            style={{ width: `${(d.cost / maxDiseaseCost) * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Footer note */}
      <p className="mt-5 pt-4 border-t border-slate-100 dark:border-navy-800 text-[11px] text-slate-400 leading-relaxed">
        Generated by AI from collected claims data as decision support for HR — not medical advice. Analysis is produced only
        above {MIN_CLAIMS_FOR_REPORT} claims per period to remain statistically meaningful. Ecosystem referrals are optional and
        engaged at HR's discretion.
      </p>
    </div>
  );
}
