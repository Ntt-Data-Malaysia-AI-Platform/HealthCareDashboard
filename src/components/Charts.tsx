import { useMemo } from 'react';

interface LineChartProps {
  labels: string[];
  values: number[];
  height?: number;
  color?: string;
  fill?: boolean;
  showAxis?: boolean;
  showDots?: boolean;
  className?: string;
}

export function LineChart({
  labels,
  values,
  height = 200,
  color = '#3366ff',
  fill = true,
  showAxis = true,
  showDots = true,
  className = '',
}: LineChartProps) {
  const width = 600;
  const pad = { top: 16, right: 16, bottom: showAxis ? 28 : 8, left: showAxis ? 36 : 8 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  const { path, area, points, min, max } = useMemo(() => {
    const min = Math.min(...values) * 0.95;
    const max = Math.max(...values) * 1.05;
    const range = max - min || 1;
    const stepX = cw / (values.length - 1 || 1);
    const pts = values.map((v, i) => ({
      x: pad.left + i * stepX,
      y: pad.top + ch - ((v - min) / range) * ch,
    }));
    const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    const area = `${path} L ${pts[pts.length - 1].x.toFixed(1)} ${pad.top + ch} L ${pts[0].x.toFixed(1)} ${pad.top + ch} Z`;
    return { path, area, points: pts, min, max };
  }, [values, cw, ch, pad.left, pad.top]);

  const gid = `grad-${color.replace('#', '')}`;
  const yTicks = 4;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full ${className}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {showAxis &&
        Array.from({ length: yTicks + 1 }).map((_, i) => {
          const y = pad.top + (ch / yTicks) * i;
          const val = max - ((max - min) / yTicks) * i;
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
              <text x={pad.left - 8} y={y + 3} textAnchor="end" fontSize="10" fill="currentColor" fillOpacity="0.5">
                {val >= 1000 ? `${(val / 1000).toFixed(1)}K` : val.toFixed(0)}
              </text>
            </g>
          );
        })}
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {showDots &&
        points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke={color} strokeWidth="2" className="transition-all hover:r-5" />
        ))}
      {showAxis &&
        labels.map((l, i) => {
          const x = pad.left + (cw / (labels.length - 1 || 1)) * i;
          return (
            <text key={i} x={x} y={height - 8} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5">
              {l}
            </text>
          );
        })}
    </svg>
  );
}

interface BarChartProps {
  labels: string[];
  values: number[];
  height?: number;
  color?: string;
  horizontal?: boolean;
  showValues?: boolean;
  className?: string;
}

export function BarChart({
  labels,
  values,
  height = 200,
  color = '#3366ff',
  horizontal = false,
  showValues = false,
  className = '',
}: BarChartProps) {
  const max = Math.max(...values) * 1.1 || 1;

  if (horizontal) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {labels.map((l, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 w-28 truncate text-right">{l}</span>
            <div className="flex-1 h-7 bg-slate-100 dark:bg-navy-800 rounded-lg overflow-hidden relative">
              <div
                className="h-full rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-2"
                style={{ width: `${(values[i] / max) * 100}%`, background: `linear-gradient(90deg, ${color}cc, ${color})` }}
              >
                {showValues && <span className="text-xs font-semibold text-white">{values[i]}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-end justify-between gap-2 ${className}`} style={{ height }}>
      {values.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-80 relative"
              style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(180deg, ${color}, ${color}aa)` }}
            >
              {showValues && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {v}
                </span>
              )}
            </div>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate w-full text-center">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

interface DonutChartProps {
  labels: string[];
  values: number[];
  colors?: string[];
  size?: number;
  className?: string;
}

export function DonutChart({
  labels,
  values,
  colors = ['#3366ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'],
  size = 180,
  className = '',
}: DonutChartProps) {
  const total = values.reduce((a, b) => a + b, 0);
  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;
  const strokeWidth = 22;

  let cumulative = 0;
  const segments = values.map((v, i) => {
    const fraction = v / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const endAngle = (cumulative + fraction) * 2 * Math.PI - Math.PI / 2;
    cumulative += fraction;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const largeArc = fraction > 0.5 ? 1 : 0;
    return {
      d: `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      color: colors[i % colors.length],
      label: labels[i],
      value: v,
      pct: (fraction * 100).toFixed(1),
    };
  });

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((s, i) => (
          <path
            key={i}
            d={s.d}
            fill="none"
            stroke={s.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-500 hover:opacity-80"
          />
        ))}
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor">
          {total > 1000 ? `${(total / 1000).toFixed(1)}K` : total}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5">
          Total
        </text>
      </svg>
      <div className="flex flex-col gap-1.5 flex-1">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-slate-600 dark:text-slate-300 flex-1 truncate">{s.label}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MiniSparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function MiniSparkline({ data, color = '#3366ff', width = 80, height = 28 }: MiniSparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => `${(i * stepX).toFixed(1)},${(height - ((v - min) / range) * height).toFixed(1)}`);
  const path = `M ${pts.join(' L ')}`;
  const gid = `spark-${color.replace('#', '')}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${width},${height} L 0,${height} Z`} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface MultiLineChartProps {
  labels: string[];
  series: { name: string; values: number[]; color: string }[];
  height?: number;
  showLegend?: boolean;
}

export function MultiLineChart({ labels, series, height = 200, showLegend = true }: MultiLineChartProps) {
  const width = 600;
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  const allValues = series.flatMap(s => s.values);
  const min = Math.min(...allValues) * 0.95;
  const max = Math.max(...allValues) * 1.05;
  const range = max - min || 1;

  const seriesPaths = series.map(s => {
    const stepX = cw / (s.values.length - 1 || 1);
    const pts = s.values.map((v, i) => ({
      x: pad.left + i * stepX,
      y: pad.top + ch - ((v - min) / range) * ch,
    }));
    const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
    return { name: s.name, path, color: s.color, pts };
  });

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
        {/* Y-axis grid */}
        {[0, 1, 2, 3, 4].map(i => {
          const y = pad.top + (ch / 4) * i;
          const val = max - ((max - min) / 4) * i;
          return (
            <g key={i}>
              <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="currentColor" strokeOpacity="0.08" />
              <text x={pad.left - 8} y={y + 3} textAnchor="end" fontSize="10" fill="currentColor" fillOpacity="0.5">
                {val.toFixed(0)}
              </text>
            </g>
          );
        })}
        {/* X-axis labels */}
        {labels.map((l, i) => {
          const x = pad.left + (cw / (labels.length - 1)) * i;
          return (
            <text key={i} x={x} y={height - 8} textAnchor="middle" fontSize="10" fill="currentColor" fillOpacity="0.5">
              {l}
            </text>
          );
        })}
        {/* Lines */}
        {seriesPaths.map((s, si) => (
          <g key={si}>
            <path d={s.path} fill="none" stroke={s.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {s.pts.map((p, pi) => (
              <circle key={pi} cx={p.x} cy={p.y} r="3" fill="white" stroke={s.color} strokeWidth="2" />
            ))}
          </g>
        ))}
      </svg>
      {showLegend && (
        <div className="flex items-center justify-center gap-6 mt-3">
          {series.map(s => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: s.color }} />
              <span className="text-xs text-slate-500 dark:text-slate-400">{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface RadialProgressProps {
  value: number;
  max?: number;
  size?: number;
  color?: string;
  label?: string;
  sublabel?: string;
  strokeWidth?: number;
  fontSize?: number;
  showLabel?: boolean;
}

export function RadialProgress({ value, max = 100, size = 120, color = '#3366ff', label, sublabel, strokeWidth = 8, fontSize = 22, showLabel = true }: RadialProgressProps) {
  const pct = Math.min(100, (value / max) * 100);
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth={strokeWidth} />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cy})`}
          className="transition-all duration-700"
        />
        <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="middle" fontSize={fontSize} fontWeight="700" fill="currentColor">
          {pct.toFixed(0)}%
        </text>
        {sublabel && (
          <text x={cx} y={cy + size * 0.22} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.5">
            {sublabel}
          </text>
        )}
      </svg>
      {label && showLabel && <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</span>}
    </div>
  );
}
