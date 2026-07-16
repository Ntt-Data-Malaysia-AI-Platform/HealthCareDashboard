import { Fragment, useState, useMemo, useEffect, useCallback } from 'react';
import * as Icons from 'lucide-react';
import { BarChart, DonutChart } from '../components/Charts';
import {
  CLAIM_RECORDS,
  CLAIM_LIMIT_TIERS,
  getEmployeeLimit,
  getEmployeeTier,
  ECOSYSTEM_SERVICES,
} from '../data';
import { generateClaimPdfDataUrl, downloadClaimPdf, openClaimPdfInNewTab } from '../lib/claimPdf';
import { ObservationsReport } from '../components/ObservationsReport';
import type { ClaimRecord, EmployeeClaimSummary } from '../types';

// Health Savvy captures outpatient claims only (Cashless / Self-payment /
// Reimbursement); no department tracking; limits vary by benefit tier.
const STATUS_FILTERS = ['All', 'Exceeded Limit', 'Pending Claims'] as const;

function buildEmployeeSummaries(records: ClaimRecord[]): EmployeeClaimSummary[] {
  const map = new Map<string, EmployeeClaimSummary>();
  for (const c of records) {
    if (!map.has(c.employeeId)) {
      const limit = getEmployeeLimit(c.employeeId);
      map.set(c.employeeId, {
        employeeId: c.employeeId,
        employeeName: c.employeeName,
        tier: getEmployeeTier(c.employeeId),
        claimCount: 0,
        totalAmount: 0,
        limit,
        remaining: limit,
        exceeded: false,
        claims: [],
      });
    }
    const emp = map.get(c.employeeId)!;
    emp.claims.push(c);
    emp.claimCount++;
    if (c.status === 'approved' || c.status === 'pending') {
      emp.totalAmount += c.amount;
    }
  }
  for (const emp of map.values()) {
    emp.remaining = Math.max(0, emp.limit - emp.totalAmount);
    emp.exceeded = emp.totalAmount > emp.limit;
  }
  return Array.from(map.values()).sort((a, b) => b.totalAmount - a.totalAmount);
}

const STATUS_BADGE: Record<string, string> = {
  approved: 'bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400',
  pending: 'bg-warn-50 text-warn-700 dark:bg-warn-500/10 dark:text-warn-400',
  rejected: 'bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-400',
};

function PdfPreviewModal({
  claim,
  employeeName,
  onClose,
  statusBadge,
}: {
  claim: ClaimRecord;
  employeeName?: string;
  onClose: () => void;
  statusBadge: string;
}) {
  const [pdfDataUrl, setPdfDataUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const url = generateClaimPdfDataUrl(claim, employeeName);
      setPdfDataUrl(url);
      setIsLoading(false);
    }, 100);
  }, [claim, employeeName]);

  const handleDownload = useCallback(() => {
    downloadClaimPdf(claim, employeeName);
  }, [claim, employeeName]);

  const handleOpenInNewTab = useCallback(() => {
    openClaimPdfInNewTab(claim, employeeName);
  }, [claim, employeeName]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-5xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-danger-50 dark:bg-danger-500/10 flex items-center justify-center text-danger-600 dark:text-danger-400">
              <Icons.FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-navy-900 dark:text-white">{claim.id} — Medical Claim</h3>
              <p className="text-xs text-slate-400">Outpatient · {claim.paymentType} · {claim.provider}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
            >
              <Icons.Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handleOpenInNewTab}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-navy-700 text-navy-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors"
            >
              <Icons.ExternalLink className="w-4 h-4" />
              Open
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            >
              <Icons.X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - PDF Preview */}
        <div className="h-[70vh] bg-slate-100 dark:bg-navy-800 overflow-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-4 border-brand-200 border-t-brand-500 animate-spin mx-auto mb-4" />
                <p className="text-sm text-slate-400">Generating document preview...</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src={pdfDataUrl}
                alt={`${claim.id} Medical Claim Document`}
                className="max-w-full h-auto rounded-lg shadow-lg bg-white"
              />
            </div>
          )}
        </div>

        {/* Modal Footer with Claim Details */}
        <div className="p-4 border-t border-slate-100 dark:border-navy-800 bg-slate-50 dark:bg-navy-800/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-400 mb-1">Employee</p>
              <p className="font-medium text-navy-800 dark:text-slate-200">{employeeName || claim.employeeName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Amount</p>
              <p className="font-medium text-navy-800 dark:text-slate-200">RM{claim.amount}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Date</p>
              <p className="font-medium text-navy-800 dark:text-slate-200">{claim.date}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Status</p>
              <span className={`badge ${statusBadge}`}>{claim.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HrPage() {
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_FILTERS)[number]>('All');
  const [selectedEmp, setSelectedEmp] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewClaim, setPreviewClaim] = useState<ClaimRecord | null>(null);

  const allSummaries = useMemo(() => buildEmployeeSummaries(CLAIM_RECORDS), []);

  const filteredSummaries = useMemo(() => {
    let result = allSummaries;
    if (statusFilter === 'Exceeded Limit') {
      result = result.filter((e) => e.exceeded);
    } else if (statusFilter === 'Pending Claims') {
      result = result.filter((e) => e.claims.some((c) => c.status === 'pending'));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e) =>
        e.employeeName.toLowerCase().includes(q) ||
        e.employeeId.toLowerCase().includes(q) ||
        e.tier.toLowerCase().includes(q) ||
        e.claims.some((c) =>
          c.id.toLowerCase().includes(q) ||
          c.provider.toLowerCase().includes(q) ||
          c.paymentType.toLowerCase().includes(q)
        )
      );
    }
    return result;
  }, [allSummaries, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const totalClaims = filteredSummaries.reduce((s, e) => s + e.claimCount, 0);
    const totalAmount = filteredSummaries.reduce((s, e) => s + e.totalAmount, 0);
    const exceededCount = filteredSummaries.filter((e) => e.exceeded).length;
    const repeatCount = filteredSummaries.filter((e) => e.claimCount >= 2).length;
    const pendingCount = filteredSummaries.reduce((s, e) => s + e.claims.filter((c) => c.status === 'pending').length, 0);
    const totalOverage = filteredSummaries.filter((e) => e.exceeded).reduce((s, e) => s + (e.totalAmount - e.limit), 0);
    return { totalClaims, totalAmount, exceededCount, repeatCount, pendingCount, totalOverage, employeeCount: filteredSummaries.length };
  }, [filteredSummaries]);

  const paymentData = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of CLAIM_RECORDS) {
      map.set(c.paymentType, (map.get(c.paymentType) || 0) + c.amount);
    }
    return { labels: Array.from(map.keys()), values: Array.from(map.values()) };
  }, []);

  const statusData = useMemo(() => {
    let approved = 0, pending = 0, rejected = 0;
    for (const c of CLAIM_RECORDS) {
      if (c.status === 'approved') approved++;
      else if (c.status === 'pending') pending++;
      else rejected++;
    }
    return { labels: ['Approved', 'Pending', 'Rejected'], values: [approved, pending, rejected] };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-white">HR Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Outpatient claim tracking · monthly limits vary by benefit tier</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search employees, claims, providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 pr-4 py-2 text-xs w-64 focus:w-80 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: 'Employees', value: stats.employeeCount, icon: 'Users', color: 'brand' },
          { label: 'Total Claims', value: stats.totalClaims, icon: 'FileText', color: 'navy' },
          { label: 'Total Amount', value: `RM${stats.totalAmount.toLocaleString()}`, icon: 'Banknote', color: 'brand' },
          { label: 'Exceeded Limit', value: stats.exceededCount, icon: 'AlertTriangle', color: 'danger' },
          { label: 'Pending', value: stats.pendingCount, icon: 'Clock', color: 'warn' },
        ].map((k, i) => {
          const Icon = (Icons as any)[k.icon];
          return (
            <div key={k.label} className="card p-4 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${k.color === 'danger' ? 'bg-danger-50 dark:bg-danger-500/10 text-danger-600 dark:text-danger-400' : k.color === 'warn' ? 'bg-warn-50 dark:bg-warn-500/10 text-warn-600 dark:text-warn-400' : k.color === 'navy' ? 'bg-navy-50 dark:bg-navy-500/10 text-navy-600 dark:text-navy-300' : 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <p className="text-xl font-bold text-navy-900 dark:text-white">{k.value}</p>
              <p className="text-xs text-slate-400">{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card p-5 animate-fade-in lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Icons.BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Outpatient Claims by Payment Type</h3>
              <p className="text-xs text-slate-400">Cashless · Self-payment · Reimbursement</p>
            </div>
          </div>
          <BarChart labels={paymentData.labels} values={paymentData.values} height={200} color="#3366ff" horizontal showValues />
        </div>
        <div className="card p-5 animate-fade-in">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center text-accent-600 dark:text-accent-400">
              <Icons.PieChart className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Claim Status</h3>
          </div>
          <DonutChart labels={statusData.labels} values={statusData.values} size={160} colors={['#10b981', '#f59e0b', '#ef4444']} />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              statusFilter === s ? 'bg-brand-500 text-white shadow-soft' : 'bg-slate-100 dark:bg-navy-800 text-slate-500 hover:text-navy-700 dark:hover:text-slate-200'
            }`}
          >
            {s}
            {s === 'Exceeded Limit' && stats.exceededCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-danger-500 text-white text-[10px]">{stats.exceededCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Employee claim table */}
      <div className="card p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Icons.Users className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Employee Claims This Month</h3>
          </div>
          <span className="text-xs text-slate-400">
            Limits by tier: {Object.entries(CLAIM_LIMIT_TIERS).map(([t, l]) => `${t} RM${l}`).join(' · ')}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-slate-100 dark:border-navy-800">
                <th className="text-left font-medium py-2 px-3">Employee</th>
                <th className="text-left font-medium py-2 px-3">Tier</th>
                <th className="text-center font-medium py-2 px-3">Claims</th>
                <th className="text-right font-medium py-2 px-3">Total</th>
                <th className="text-right font-medium py-2 px-3">Remaining</th>
                <th className="text-center font-medium py-2 px-3">Progress</th>
                <th className="text-center font-medium py-2 px-3">Status</th>
                <th className="text-center font-medium py-2 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredSummaries.map((e) => {
                const pct = Math.min(100, (e.totalAmount / e.limit) * 100);
                const isSelected = selectedEmp === e.employeeId;
                return (
                  <Fragment key={e.employeeId}>
                    <tr
                      className={`transition cursor-pointer ${
                        isSelected
                          ? 'bg-brand-50/70 dark:bg-brand-500/10'
                          : `border-b border-slate-50 dark:border-navy-800/50 hover:bg-slate-50 dark:hover:bg-navy-800/30 ${e.exceeded ? 'bg-danger-50/30 dark:bg-danger-500/5' : ''}`
                      }`}
                      onClick={() => setSelectedEmp(isSelected ? null : e.employeeId)}
                    >
                      <td className={`py-3 px-3 border-l-4 ${isSelected ? 'border-l-brand-500' : 'border-l-transparent'}`}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-semibold">
                            {e.employeeName.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-navy-800 dark:text-slate-200">{e.employeeName}</p>
                            <p className="text-xs text-slate-400">{e.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-slate-600 dark:text-slate-300 font-medium">{e.tier}</p>
                        <p className="text-xs text-slate-400">RM{e.limit}/mo</p>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="badge bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-400">
                          {e.claimCount}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-navy-800 dark:text-slate-200">RM{e.totalAmount}</td>
                      <td className={`py-3 px-3 text-right font-semibold ${e.exceeded ? 'text-danger-600 dark:text-danger-400' : 'text-accent-600 dark:text-accent-400'}`}>
                        RM{e.remaining}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${e.exceeded ? 'bg-danger-500' : pct > 80 ? 'bg-warn-500' : 'bg-brand-500'}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400">{Math.round(pct)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        {e.exceeded ? (
                          <span className="badge bg-danger-50 text-danger-700 dark:bg-danger-500/10 dark:text-danger-400">
                            <Icons.AlertTriangle className="w-3 h-3" /> Exceeded
                          </span>
                        ) : pct > 80 ? (
                          <span className="badge bg-warn-50 text-warn-700 dark:bg-warn-500/10 dark:text-warn-400">
                            <Icons.AlertCircle className="w-3 h-3" /> Near Limit
                          </span>
                        ) : (
                          <span className="badge bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400">
                            <Icons.CheckCircle className="w-3 h-3" /> Normal
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Icons.ChevronDown className={`w-4 h-4 mx-auto transition-transform ${isSelected ? 'rotate-180 text-brand-500' : 'text-slate-300 dark:text-navy-700'}`} />
                      </td>
                    </tr>

                    {/* Expanded claim detail — rendered as a child row so it stays visually attached */}
                    {isSelected && (
                      <tr className="animate-fade-in">
                        <td colSpan={8} className="p-0 border-l-4 border-l-brand-500 border-b-2 border-b-brand-200 dark:border-b-brand-500/30">
                          <div className="p-4 bg-brand-50/40 dark:bg-navy-800/30 border-t-2 border-t-brand-200 dark:border-t-brand-500/30">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-semibold text-navy-900 dark:text-white">
                                {e.employeeName}'s Claims — {e.claims.length} total
                              </h4>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-slate-400">Total: <span className="font-bold text-navy-700 dark:text-slate-200">RM{e.totalAmount}</span></span>
                                <span className="text-slate-400">Limit ({e.tier}): <span className="font-bold text-navy-700 dark:text-slate-200">RM{e.limit}</span></span>
                                <span className={e.exceeded ? 'font-bold text-danger-600 dark:text-danger-400' : 'font-bold text-accent-600 dark:text-accent-400'}>
                                  {e.exceeded ? `Over by RM${e.totalAmount - e.limit}` : `RM${e.remaining} remaining`}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {e.claims.map((c) => (
                                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 hover:border-brand-200 dark:hover:border-brand-500/30 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                                      <Icons.FileText className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-navy-800 dark:text-slate-200">{c.id} · Outpatient · {c.paymentType}</p>
                                      <p className="text-xs text-slate-400">{c.date} · {c.provider}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-navy-800 dark:text-slate-200">RM{c.amount}</span>
                                    <span className={`badge ${STATUS_BADGE[c.status]}`}>{c.status}</span>
                                    {c.pdfUrl && (
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={(ev) => { ev.stopPropagation(); setPreviewClaim(c); }}
                                          className="p-1.5 rounded-md text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors"
                                          title="Preview PDF"
                                        >
                                          <Icons.Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                          onClick={(ev) => { ev.stopPropagation(); downloadClaimPdf(c, e.employeeName); }}
                                          className="p-1.5 rounded-md text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-colors"
                                          title="Download PDF"
                                        >
                                          <Icons.Download className="w-4 h-4" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Observations & Suggestions report (Phase 1.5 differentiator) */}
      <ObservationsReport />

      {/* Ecosystem wellness services — referral only, no data feed yet (Phase 2) */}
      <div className="card p-5 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center text-accent-600 dark:text-accent-400">
              <Icons.HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-navy-900 dark:text-white">Wellness Services via Ecosystem</h3>
              <p className="text-xs text-slate-400">Arranged through Health Savvy partners — program tracking arrives in Phase 2</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-400">
            Referral only
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {ECOSYSTEM_SERVICES.map((svc) => {
            const Icon = (Icons as any)[svc.icon] || Icons.Activity;
            return (
              <div key={svc.name} className="p-4 rounded-xl border border-slate-100 dark:border-navy-800">
                <div className="w-10 h-10 rounded-lg bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-navy-800 dark:text-slate-200 mb-1">{svc.name}</h4>
                <p className="text-xs text-slate-400">{svc.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* HR intelligence reports (rule-based today; AI on the Phase 2 roadmap) */}
      <div className="card p-5 animate-fade-in">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-ai">
            <Icons.FileBarChart className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-navy-900 dark:text-white">HR Intelligence Reports</h3>
            <p className="text-xs text-slate-400">Rule-based claim analytics · AI capabilities on the Phase 2 roadmap</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border border-slate-100 dark:border-navy-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-danger-50 dark:bg-danger-500/10 flex items-center justify-center text-danger-600 dark:text-danger-400">
                  <Icons.AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">Threshold Exceeded</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-400">Rule-based</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {stats.exceededCount} employees exceeded their tier claim limit this month. Total overage: RM{stats.totalOverage}. Recommend reviewing high-cost claims and the affected employees' benefit tiers.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 dark:border-navy-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-warn-50 dark:bg-warn-500/10 flex items-center justify-center text-warn-600 dark:text-warn-400">
                  <Icons.Repeat className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">Repeat Claimants</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 dark:bg-navy-800 dark:text-slate-400">Rule-based</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {stats.repeatCount} employees submitted 2 or more claims this month. Frequent visits may indicate chronic or recurring conditions — consider referrals to ecosystem services such as chronic disease management or health coaching.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 dark:border-navy-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400">
                  <Icons.TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">Spending Forecast</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">AI planned · Phase 2</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Total claims this month: RM{stats.totalAmount.toLocaleString()} across {stats.employeeCount} employees. Simple run-rate projection: RM{Math.round(stats.totalAmount * 1.4).toLocaleString()} by month end. Reliable AI forecasting for HR budgeting will be introduced once sufficient claims history has been collected.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 dark:border-navy-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center text-accent-600 dark:text-accent-400">
                  <Icons.ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-navy-800 dark:text-slate-200">Anomaly Detection</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-accent-50 text-accent-700 dark:bg-accent-500/10 dark:text-accent-400">AI-assisted</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {stats.pendingCount} claims are pending approval. No unusual claiming patterns flagged this month. AI elements to surface hidden signs in claim patterns are on the Phase 2 roadmap.
            </p>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewClaim && (
        <PdfPreviewModal
          claim={previewClaim}
          employeeName={previewClaim.employeeName}
          onClose={() => setPreviewClaim(null)}
          statusBadge={STATUS_BADGE[previewClaim.status]}
        />
      )}
    </div>
  );
}
