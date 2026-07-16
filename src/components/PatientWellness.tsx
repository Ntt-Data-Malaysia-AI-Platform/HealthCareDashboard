import { useState } from 'react';
import * as Icons from 'lucide-react';
import { RadialProgress, MiniSparkline, MultiLineChart } from './Charts';
import { useCountUp } from '../hooks/useCountUp';
import { WELLNESS_INDEX, WELLNESS_TREND } from '../data';

const DIMENSION_META = [
  { key: 'Physical', icon: 'Dumbbell', color: '#3366ff', bg: 'bg-brand-50 dark:bg-brand-500/10', text: 'text-brand-600 dark:text-brand-400', tip: 'Keep up your step count and strength training to maintain this strong score.' },
  { key: 'Mental', icon: 'Brain', color: '#8b5cf6', bg: 'bg-violet-50 dark:bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400', tip: 'Try 10 minutes of mindfulness daily to improve your mental wellness score.' },
  { key: 'Social', icon: 'Users', color: '#10b981', bg: 'bg-accent-50 dark:bg-accent-500/10', text: 'text-accent-600 dark:text-accent-400', tip: 'Your social connections are strong — keep nurturing team and community ties.' },
  { key: 'Financial', icon: 'Wallet', color: '#f59e0b', bg: 'bg-warn-50 dark:bg-warn-500/10', text: 'text-warn-600 dark:text-warn-400', tip: 'Schedule a financial wellness consultation to boost this dimension.' },
  { key: 'Nutritional', icon: 'Apple', color: '#ef4444', bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-600 dark:text-danger-400', tip: 'Aim for 5 servings of fruits and vegetables daily to improve nutrition.' },
];

const BIOMETRIC_CARDS = [
  { label: 'Resting HR', value: 74, unit: 'bpm', icon: 'HeartPulse', color: '#ef4444', normal: '60-100', status: 'normal' },
  { label: 'Avg Sleep', value: 6.8, unit: 'hrs', icon: 'Moon', color: '#8b5cf6', normal: '7-9 hrs', status: 'low' },
  { label: 'Daily Steps', value: 6840, unit: '', icon: 'Footprints', color: '#10b981', normal: '10K goal', status: 'low' },
  { label: 'Blood Glucose', value: 102, unit: 'mg/dL', icon: 'Droplet', color: '#f59e0b', normal: '70-99', status: 'high' },
];

const GOALS = [
  { label: '10K Steps / Day', progress: 68, icon: 'Footprints', color: '#10b981' },
  { label: '8 hrs Sleep / Night', progress: 85, icon: 'Moon', color: '#8b5cf6' },
  { label: '5 Veggie Servings', progress: 60, icon: 'Apple', color: '#ef4444' },
  { label: '150 min Exercise / Week', progress: 73, icon: 'Dumbbell', color: '#3366ff' },
];

const REWARDS = [
  { label: 'Step Challenge', points: 284, icon: 'Footprints', status: 'earned' },
  { label: 'Mindfulness Program', points: 165, icon: 'Brain', status: 'in-progress' },
  { label: 'Annual Screening', points: 100, icon: 'HeartPulse', status: 'earned' },
];

const STATUS_STYLE: Record<string, string> = {
  normal: 'text-accent-600 dark:text-accent-400',
  high: 'text-danger-600 dark:text-danger-400',
  low: 'text-warn-600 dark:text-warn-400',
  earned: 'bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400',
  'in-progress': 'bg-warn-50 text-warn-700 dark:bg-warn-500/10 dark:text-warn-400',
};

const RADIAL_SIZE = 80;
const RADIAL_STROKE = 7;
const RADIAL_FONT = 16;

function getIcon(name: string) {
  return (Icons as any)[name] || Icons.Activity;
}

export function PatientWellness() {
  const [activeDim, setActiveDim] = useState(0);
  const overall = Math.round(WELLNESS_INDEX.values.reduce((a, b) => a + b, 0) / WELLNESS_INDEX.values.length);
  const animatedOverall = useCountUp(overall, 1400);
  const dim = DIMENSION_META[activeDim];
  const dimValue = WELLNESS_INDEX.values[activeDim];

  return (
    <div className="space-y-4">
      {/* ── Hero: Overall Score + 5 Dimension Cards ───────────────────── */}
      <div className="card p-5 sm:p-6 animate-fade-in bg-gradient-to-br from-accent-50/60 via-white to-brand-50/60 dark:from-navy-800 dark:via-navy-900 dark:to-navy-800">
        <div className="flex flex-col xl:flex-row items-stretch gap-4">
          {/* Overall hero card */}
          <div className="flex flex-col items-center justify-center text-center shrink-0 xl:w-56 xl:border-r xl:border-slate-100 xl:dark:border-navy-700 xl:pr-6">
            <RadialProgress
              value={animatedOverall}
              size={140}
              strokeWidth={10}
              fontSize={28}
              color="#10b981"
              sublabel="Wellness"
              showLabel={false}
            />
            <p className="text-sm font-semibold text-navy-800 dark:text-slate-200 mt-3">Overall Wellness</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Icons.TrendingUp className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400" />
              <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">+12 pts YTD</span>
            </div>
          </div>

          {/* 5 dimension cards — uniform sizing */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {DIMENSION_META.map((d, i) => {
              const val = WELLNESS_INDEX.values[i];
              const isActive = i === activeDim;
              const DimIcon = getIcon(d.icon);
              return (
                <button
                  key={d.key}
                  onClick={() => setActiveDim(i)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 ${
                    isActive
                      ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-500/10 shadow-glow'
                      : 'border-transparent bg-slate-50/60 dark:bg-navy-800/40 hover:bg-white dark:hover:bg-navy-800 hover:shadow-soft'
                  }`}
                  style={{ minHeight: '168px' }}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${d.bg} ${d.text}`}>
                    <DimIcon className="w-4 h-4" />
                  </div>
                  <RadialProgress
                    value={val}
                    size={RADIAL_SIZE}
                    strokeWidth={RADIAL_STROKE}
                    fontSize={RADIAL_FONT}
                    color={d.color}
                    showLabel={false}
                  />
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{d.key}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active Dimension Detail + Trend Chart ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Detail card */}
        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${dim.bg} ${dim.text}`}>
              {(() => { const I = getIcon(dim.icon); return <I className="w-4 h-4" />; })()}
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">{dim.key} Wellness</h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <RadialProgress
                value={dimValue}
                size={100}
                strokeWidth={8}
                fontSize={20}
                color={dim.color}
                showLabel={false}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-3xl font-bold text-navy-900 dark:text-white tabular-nums">{dimValue}</span>
                <span className="text-sm text-slate-400">/ 100</span>
              </div>
              <div className="flex items-center gap-1.5 mb-3">
                {dimValue >= 80 ? (
                  <Icons.CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                ) : dimValue >= 70 ? (
                  <Icons.AlertCircle className="w-4 h-4 text-warn-600 dark:text-warn-400" />
                ) : (
                  <Icons.AlertTriangle className="w-4 h-4 text-danger-600 dark:text-danger-400" />
                )}
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {dimValue >= 80 ? 'Excellent' : dimValue >= 70 ? 'Good — room to grow' : 'Needs attention'}
                </span>
              </div>
            </div>
          </div>

          {/* AI Recommendation card */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-brand-50 via-brand-50/50 to-accent-50 dark:from-brand-500/10 dark:via-brand-500/5 dark:to-accent-500/10 border border-brand-100/60 dark:border-brand-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-ai">
                <Icons.Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-bold text-brand-700 dark:text-brand-300 uppercase tracking-wide">AI Recommendation</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{dim.tip}</p>
          </div>
        </div>

        {/* Trend chart — full height, no overlap */}
        <div className="card p-5 animate-fade-in lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                <Icons.TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Wellness Score Trend</h3>
            </div>
            <span className="text-xs text-slate-400">7-month rolling</span>
          </div>
          <div className="flex-1 min-h-0 pb-2">
            <MultiLineChart
              labels={WELLNESS_TREND.labels}
              series={[
                { name: 'Overall', values: WELLNESS_TREND.overall, color: '#10b981' },
                { name: 'Physical', values: WELLNESS_TREND.physical, color: '#3366ff' },
                { name: 'Mental', values: WELLNESS_TREND.mental, color: '#8b5cf6' },
              ]}
              height={200}
            />
          </div>
        </div>
      </div>

      {/* ── Biometric Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {BIOMETRIC_CARDS.map((b, i) => {
          const I = getIcon(b.icon);
          return (
            <div
              key={b.label}
              className="card p-4 animate-fade-in hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${b.color}15` }}>
                  <I className="w-4 h-4" style={{ color: b.color }} />
                </div>
                <span className={`text-xs font-semibold ${STATUS_STYLE[b.status]}`}>
                  {b.status === 'normal' ? 'Normal' : b.status === 'high' ? 'High' : 'Low'}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-navy-900 dark:text-white tabular-nums">{b.value}</span>
                {b.unit && <span className="text-xs text-slate-400">{b.unit}</span>}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{b.label}</p>
              <p className="text-[10px] text-slate-400 mt-1">Normal: {b.normal}</p>
            </div>
          );
        })}
      </div>

      {/* ── Goals + Rewards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Icons.Target className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Wellness Goals</h3>
          </div>
          <div className="space-y-3">
            {GOALS.map((g) => {
              const I = getIcon(g.icon);
              return (
                <div key={g.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <I className="w-4 h-4" style={{ color: g.color }} />
                      <span className="text-sm font-medium text-navy-800 dark:text-slate-200">{g.label}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums">{g.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${g.progress}%`, background: `linear-gradient(90deg, ${g.color}aa, ${g.color})` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-5 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-warn-50 dark:bg-warn-500/10 flex items-center justify-center text-warn-600 dark:text-warn-400">
                <Icons.Gift className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Rewards & Points</h3>
            </div>
            <span className="text-xs font-bold text-warn-600 dark:text-warn-400 tabular-nums">549 pts</span>
          </div>
          <div className="space-y-2.5">
            {REWARDS.map((r) => {
              const I = getIcon(r.icon);
              return (
                <div key={r.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-navy-800/50">
                  <div className="flex items-center gap-3">
                    <I className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-navy-800 dark:text-slate-200">{r.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-navy-700 dark:text-slate-300 tabular-nums">{r.points} pts</span>
                    <span className={`badge ${STATUS_STYLE[r.status]}`}>{r.status === 'earned' ? 'Earned' : 'In Progress'}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-warn-50 to-brand-50 dark:from-navy-800 dark:to-navy-800 flex items-center gap-2">
            <Icons.Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
            <p className="text-xs text-slate-600 dark:text-slate-300">Complete the Mindfulness Program to earn 40 more points and unlock the Gold tier badge.</p>
          </div>
        </div>
      </div>

      {/* ── Sparkline Row ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {DIMENSION_META.map((d, i) => (
          <div key={d.key} className="card p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{d.key}</span>
              <span className="text-sm font-bold tabular-nums" style={{ color: d.color }}>{WELLNESS_INDEX.values[i]}</span>
            </div>
            <MiniSparkline
              data={d.key === 'Physical' ? WELLNESS_TREND.physical : d.key === 'Mental' ? WELLNESS_TREND.mental : WELLNESS_TREND.overall}
              color={d.color}
              width={120}
              height={36}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
