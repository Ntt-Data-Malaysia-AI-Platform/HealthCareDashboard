import { useCountUp, formatNumber } from '../hooks/useCountUp';
import { MiniSparkline } from './Charts';
import * as Icons from 'lucide-react';
import type { KpiCard as KpiCardType } from '../types';

const ACCENT_COLORS: Record<string, { bg: string; text: string; spark: string }> = {
  brand: { bg: 'bg-brand-50 dark:bg-brand-500/10', text: 'text-brand-600 dark:text-brand-400', spark: '#3366ff' },
  accent: { bg: 'bg-accent-50 dark:bg-accent-500/10', text: 'text-accent-600 dark:text-accent-400', spark: '#10b981' },
  navy: { bg: 'bg-navy-50 dark:bg-navy-500/10', text: 'text-navy-600 dark:text-navy-300', spark: '#2d4f87' },
  warn: { bg: 'bg-warn-50 dark:bg-warn-500/10', text: 'text-warn-600 dark:text-warn-400', spark: '#f59e0b' },
  danger: { bg: 'bg-danger-50 dark:bg-danger-500/10', text: 'text-danger-600 dark:text-danger-400', spark: '#ef4444' },
};

export function KpiCard({ kpi, index = 0 }: { kpi: KpiCardType; index?: number }) {
  const animated = useCountUp(kpi.value);
  const Icon = (Icons as any)[kpi.icon] || Icons.Activity;
  const accent = ACCENT_COLORS[kpi.accent] || ACCENT_COLORS.brand;
  const isPositive = kpi.change >= 0;

  return (
    <div
      className="card p-5 group hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 animate-fade-in cursor-default"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent.bg} ${accent.text}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`badge ${isPositive ? 'bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400' : 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-400'}`}>
          {isPositive ? <Icons.TrendingUp className="w-3 h-3" /> : <Icons.TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{kpi.change}%
        </div>
      </div>
      <div className="text-2xl font-bold text-navy-900 dark:text-white tracking-tight">
        {formatNumber(animated, kpi.unit)}
        {kpi.unit && kpi.unit !== '$' && kpi.unit !== '/100' && kpi.unit !== '/5' ? '' : ''}
        {kpi.unit === '/100' && <span className="text-base text-slate-400 font-medium">/100</span>}
        {kpi.unit === '/5' && <span className="text-base text-slate-400 font-medium">/5</span>}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{kpi.label}</div>
      <div className="mt-3 flex items-end justify-between">
        <MiniSparkline data={kpi.trend} color={accent.spark} width={90} height={32} />
      </div>
    </div>
  );
}
