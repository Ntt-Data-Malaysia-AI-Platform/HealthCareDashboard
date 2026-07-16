import { useState } from 'react';
import * as Icons from 'lucide-react';
import { AI_INSIGHTS } from '../data';

export function AiInsightPanel() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-ai animate-pulse-glow">
            <Icons.Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-navy-900 dark:text-white">AI Executive Insights</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Demo insights — simulated AI output</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-500/10">
          <Icons.Gauge className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400" />
          <span className="text-xs font-semibold text-accent-700 dark:text-accent-400">{AI_INSIGHTS.confidence}% confidence</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Healthcare Summary</h4>
          <div className="space-y-2">
            {AI_INSIGHTS.summary.map((s, i) => (
              <div key={i} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <Icons.Circle className="w-1.5 h-1.5 text-brand-500 mt-1.5 shrink-0 fill-brand-500" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-navy-800 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">AI Recommendations</h4>
          <div className="space-y-2.5">
            {AI_INSIGHTS.recommendations.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-100 dark:border-navy-800 p-3 hover:border-brand-200 dark:hover:border-brand-500/30 transition">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center shrink-0">
                      <Icons.Lightbulb className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-navy-800 dark:text-slate-200">{r.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`badge ${r.impact === 'High' ? 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-400' : 'bg-warn-50 text-warn-700 dark:bg-warn-500/10 dark:text-warn-400'}`}>
                          {r.impact} impact
                        </span>
                        <span className="text-xs text-slate-400">{r.confidence}% confidence</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline shrink-0"
                  >
                    {expanded === i ? 'Show less' : 'Explain more'}
                  </button>
                </div>
                {expanded === i && (
                  <p className="mt-2.5 ml-9 text-xs text-slate-500 dark:text-slate-400 leading-relaxed animate-fade-in">
                    Based on analysis of 12,480 employee health records, this recommendation targets departments with elevated risk factors. Implementation is projected to reduce related healthcare costs by 8-15% over the next quarter.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
