export type Page = 'hr' | 'doctor' | 'patient';

export type Role = 'HR' | 'Doctor' | 'Patient';

export interface KpiCard {
  id: string;
  label: string;
  value: number;
  unit?: string;
  change: number;
  trend: number[];
  icon: string;
  accent: string;
}

export interface NavItem {
  id: Page;
  label: string;
  icon: string;
  roles: Role[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  chart?: ChatChart;
  timestamp: number;
}

export interface ChatChart {
  type: 'bar' | 'line' | 'donut';
  title: string;
  labels: string[];
  values: number[];
}

export interface Notification {
  id: string;
  type: 'medicine' | 'appointment' | 'claim' | 'leave' | 'risk' | 'fraud' | 'budget' | 'ai';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

// Health Savvy currently captures outpatient claims only, settled via one of
// three payment types. No pharmacy/specialist/imaging/mental-health/inpatient/
// emergency categories exist in the source system.
export type PaymentType = 'Cashless' | 'Self-payment' | 'Reimbursement';

export interface ClaimRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  provider: string;
  paymentType: PaymentType;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  pdfUrl?: string;
}

// ── AI Observations & Suggestions report (Phase 1.5) ─────────────────────────
// Quarterly / semi-annual claims commentary auto-generated from collected
// outpatient data — the analysis TPAs only produce for RM1M+ premium customers.

export type BenchmarkStatus = 'high' | 'acceptable' | 'low';

export interface ReportObservation {
  metric: string;
  value: string;
  status: BenchmarkStatus;
  commentary: string;
}

export interface ReportSuggestion {
  title: string;
  detail: string;
  services: string[]; // names from ECOSYSTEM_SERVICES
}

export interface DiseaseStat {
  code: string; // ICD-10 code captured by Health Savvy
  name: string;
  claims: number;
  cost: number;
  chronic: boolean;
}

export interface ObservationsReportData {
  period: string;
  label: string;
  generatedOn: string;
  claimCount: number;
  headcount: number;
  observations: ReportObservation[];
  suggestions: ReportSuggestion[];
  topDiseases: DiseaseStat[];
}

export interface EmployeeClaimSummary {
  employeeId: string;
  employeeName: string;
  tier: string;
  claimCount: number;
  totalAmount: number;
  limit: number;
  remaining: number;
  exceeded: boolean;
  claims: ClaimRecord[];
}
