import type { KpiCard, Notification, Role, Page, ClaimRecord, ObservationsReportData } from './types';

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'NTT DATA Healthcare AI Platform';
export const APP_SUBTITLE = import.meta.env.VITE_APP_SUBTITLE || 'AI Care Management Platform for Employers';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0';

export const ROLES: Role[] = [
  'HR',
  'Doctor',
  'Patient',
];

export const NAV_ITEMS: { id: Page; label: string; icon: string; roles: Role[] }[] = [
  { id: 'hr', label: 'HR Dashboard', icon: 'Users', roles: ['HR'] },
  { id: 'doctor', label: 'Doctor Workspace', icon: 'Stethoscope', roles: ['Doctor'] },
  { id: 'patient', label: 'Patient Portal', icon: 'HeartPulse', roles: ['Patient'] },
];

export const KPIS: KpiCard[] = [
  { id: 'employees', label: 'Total Employees', value: 12480, change: 3.2, trend: [120,122,121,123,124,124,124.8], icon: 'Users', accent: 'brand' },
  { id: 'patients', label: 'Active Patients', value: 8642, change: 5.1, trend: [80,81,82,83,84,85,86.4], icon: 'UserRound', accent: 'accent' },
  { id: 'consults', label: "Today's Consultations", value: 327, change: 8.4, trend: [280,290,300,310,315,320,327], icon: 'Stethoscope', accent: 'brand' },
  { id: 'claims', label: 'Medical Claims', value: 1842, change: -2.3, trend: [19,19,18.8,18.6,18.5,18.4,18.4], icon: 'FileText', accent: 'navy' },
  { id: 'approvals', label: 'Pending Approvals', value: 96, change: -12.5, trend: [120,115,110,105,100,98,96], icon: 'Clock', accent: 'warn' },
  { id: 'cost', label: 'Monthly Healthcare Cost', value: 2840000, unit: '$', change: 11.0, trend: [2.1,2.2,2.3,2.4,2.5,2.7,2.84], icon: 'DollarSign', accent: 'danger' },
  { id: 'healthscore', label: 'AI Health Score', value: 87, unit: '/100', change: 2.1, trend: [82,83,84,84,85,86,87], icon: 'Sparkles', accent: 'accent' },
  { id: 'satisfaction', label: 'Satisfaction Score', value: 4.7, unit: '/5', change: 1.4, trend: [4.4,4.5,4.5,4.6,4.6,4.6,4.7], icon: 'Smile', accent: 'brand' },
];

export const COST_TREND = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [2.1, 2.25, 2.4, 2.35, 2.5, 2.62, 2.84, 2.7, 2.55, 2.6, 2.75, 2.9],
};

export const CONSULTATION_TREND = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [285, 312, 298, 340, 327, 180, 95],
};

export const BENEFIT_UTILIZATION = {
  labels: ['Outpatient', 'Inpatient', 'Dental', 'Vision', 'Mental Health', 'Preventive', 'Pharmacy'],
  values: [78, 45, 62, 38, 71, 84, 69],
};

export const DISEASE_DISTRIBUTION = {
  labels: ['Respiratory', 'Diabetes', 'Hypertension', 'Cardiac', 'Mental Health', 'Musculoskeletal', 'Other'],
  values: [24, 18, 22, 12, 14, 7, 3],
};

export const LEAVE_TREND = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  values: [142, 128, 165, 180, 156, 198, 210, 175, 160, 148, 172, 190],
};

export const DEPT_HEALTH = {
  labels: ['Engineering', 'Sales', 'Operations', 'Finance', 'HR', 'R&D', 'Support'],
  values: [88, 82, 79, 91, 85, 87, 76],
};

export const HOSPITAL_PERF = {
  labels: ['NTT Medical Ctr', 'St. Mary', 'Riverside Gen', 'HealthFirst', 'CarePlus'],
  values: [4.8, 4.5, 4.2, 4.6, 4.3],
};

export const TOP_CLINICS = [
  { name: 'NTT Wellness Clinic', visits: 1240, rating: 4.9, cost: 320000 },
  { name: 'Downtown Health Hub', visits: 980, rating: 4.7, cost: 285000 },
  { name: 'Riverside Family Care', visits: 760, rating: 4.6, cost: 210000 },
  { name: 'CarePlus Specialist', visits: 620, rating: 4.5, cost: 195000 },
  { name: 'HealthFirst Urgent', visits: 540, rating: 4.3, cost: 168000 },
];

export const TOP_MEDICINES = [
  { name: 'Metformin 500mg', prescriptions: 1840, category: 'Diabetes' },
  { name: 'Lisinopril 10mg', prescriptions: 1620, category: 'Hypertension' },
  { name: 'Atorvastatin 20mg', prescriptions: 1410, category: 'Cholesterol' },
  { name: 'Amoxicillin 500mg', prescriptions: 1180, category: 'Antibiotic' },
  { name: 'Omeprazole 20mg', prescriptions: 960, category: 'GI' },
  { name: 'Sertraline 50mg', prescriptions: 840, category: 'Mental Health' },
];

export const CHRONIC_DISEASE = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  series: [
    { name: 'Diabetes', values: [1820, 1850, 1840, 1860] },
    { name: 'Hypertension', values: [2100, 2150, 2180, 2240] },
    { name: 'Respiratory', values: [980, 1120, 1340, 1560] },
  ],
};

// NOTE (requirements alignment, Jul 2026): all wellness scoring, health/risk
// scores, program stats, rewards and campaigns are removed platform-wide —
// the current Health Savvy system has no data capture for them and published
// health scores require endorsement by health professionals. Phase 2 only.
// See REQUIREMENTS.md R5–R8 and the reviewer confirmations of 15 Jul 2026.

export const PATIENTS = [
  { id: 'P-1001', name: 'John Anderson', age: 45, gender: 'M', department: 'Engineering', risk: 'Medium', lastVisit: '2026-07-02', conditions: ['Hypertension', 'Pre-diabetes'] },
  { id: 'P-1002', name: 'Sarah Chen', age: 38, gender: 'F', department: 'Sales', risk: 'Low', lastVisit: '2026-07-05', conditions: ['Asthma'] },
  { id: 'P-1003', name: 'Michael Lim', age: 52, gender: 'M', department: 'Operations', risk: 'High', lastVisit: '2026-06-28', conditions: ['Type 2 Diabetes', 'Hypertension', 'Hyperlipidemia'] },
  { id: 'P-1004', name: 'Emily Watson', age: 29, gender: 'F', department: 'R&D', risk: 'Low', lastVisit: '2026-07-08', conditions: ['Anxiety'] },
  { id: 'P-1005', name: 'David Kumar', age: 47, gender: 'M', department: 'Finance', risk: 'Medium', lastVisit: '2026-07-01', conditions: ['GERD', 'Obesity'] },
  { id: 'P-1006', name: 'Lisa Park', age: 34, gender: 'F', department: 'HR', risk: 'Low', lastVisit: '2026-07-06', conditions: ['Migraine'] },
];

export const PATIENT_VITALS = [
  { label: 'Heart Rate', value: 78, unit: 'bpm', normal: '60-100', status: 'normal' },
  { label: 'Blood Pressure', value: '142/88', unit: 'mmHg', normal: '<120/80', status: 'high' },
  { label: 'Temperature', value: 36.8, unit: '°C', normal: '36-37.2', status: 'normal' },
  { label: 'Blood Glucose', value: 128, unit: 'mg/dL', normal: '70-99', status: 'high' },
  { label: 'Oxygen Sat', value: 98, unit: '%', normal: '95-100', status: 'normal' },
  { label: 'BMI', value: 28.4, unit: 'kg/m²', normal: '18.5-24.9', status: 'high' },
];

export const PATIENT_TIMELINE = [
  { date: '2026-07-08', type: 'Consultation', title: 'Follow-up - Hypertension', doctor: 'Dr. Sarah Mitchell', detail: 'BP elevated, adjusted medication' },
  { date: '2026-06-28', type: 'Lab Report', title: 'HbA1c & Lipid Panel', doctor: 'Lab', detail: 'HbA1c 6.8%, LDL 142 mg/dL' },
  { date: '2026-06-15', type: 'Prescription', title: 'Lisinopril 10mg', doctor: 'Dr. Sarah Mitchell', detail: 'Once daily, 30-day supply' },
  { date: '2026-05-20', type: 'Imaging', title: 'Chest X-Ray', doctor: 'Radiology', detail: 'No acute findings' },
  { date: '2026-05-10', type: 'Consultation', title: 'Annual Physical', doctor: 'Dr. Sarah Mitchell', detail: 'Overall stable, lifestyle counseling' },
];

export const PRESCRIPTIONS = [
  { name: 'Metformin 500mg', dose: 'Twice daily', duration: '90 days', status: 'active' },
  { name: 'Lisinopril 10mg', dose: 'Once daily', duration: '30 days', status: 'active' },
  { name: 'Atorvastatin 20mg', dose: 'At bedtime', duration: '90 days', status: 'active' },
];

export const LAB_REPORTS = [
  { date: '2026-06-28', test: 'HbA1c', result: '6.8%', range: '<5.7%', flag: 'high' },
  { date: '2026-06-28', test: 'LDL Cholesterol', result: '142 mg/dL', range: '<100 mg/dL', flag: 'high' },
  { date: '2026-06-28', test: 'Creatinine', result: '0.9 mg/dL', range: '0.6-1.2 mg/dL', flag: 'normal' },
  { date: '2026-05-15', test: 'Fasting Glucose', result: '128 mg/dL', range: '70-99 mg/dL', flag: 'high' },
];

export const HR_BENEFIT_DATA = {
  utilization: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [62, 68, 74, 81] },
  spending: { labels: ['Outpatient', 'Inpatient', 'Pharmacy', 'Dental', 'Mental Health', 'Preventive'], values: [820, 540, 680, 180, 240, 380] },
  deptComparison: { labels: ['Engineering', 'Sales', 'Operations', 'Finance', 'HR', 'R&D'], values: [2400, 3100, 2800, 1900, 2100, 2300] },
  claims: { labels: ['Approved', 'Pending', 'Rejected'], values: [1640, 96, 106] },
  leave: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], values: [142, 128, 165, 180, 156, 198, 210] },
  wellness: { labels: 'Participation', enrolled: 8420, total: 12480 },
};

export const HIGH_COST_EMPLOYEES = [
  { name: 'Michael Lim', dept: 'Operations', cost: 48200, conditions: 3, flag: 'Chronic' },
  { name: 'Robert Chen', dept: 'Sales', cost: 38500, conditions: 2, flag: 'Specialist' },
  { name: 'Jennifer Wu', dept: 'Engineering', cost: 32100, conditions: 2, flag: 'Surgery' },
  { name: 'Kevin Tan', dept: 'Operations', cost: 28900, conditions: 1, flag: 'ER visits' },
  { name: 'Maria Santos', dept: 'Support', cost: 26400, conditions: 2, flag: 'Chronic' },
];

export const PATIENT_APPOINTMENTS = [
  { date: 'Jul 15, 2026', time: '10:00 AM', doctor: 'Dr. Sarah Mitchell', type: 'Follow-up', location: 'NTT Wellness Clinic' },
  { date: 'Jul 22, 2026', time: '2:30 PM', doctor: 'Dr. James Lee', type: 'Dental Checkup', location: 'Downtown Health Hub' },
  { date: 'Aug 03, 2026', time: '9:00 AM', doctor: 'Dr. Sarah Mitchell', type: 'Lab Review', location: 'NTT Wellness Clinic' },
];

export const PATIENT_PRESCRIPTIONS = [
  { name: 'Metformin 500mg', dose: 'Twice daily', refill: 'Aug 28', remaining: 42 },
  { name: 'Lisinopril 10mg', dose: 'Once daily', refill: 'Jul 28', remaining: 12 },
  { name: 'Atorvastatin 20mg', dose: 'At bedtime', refill: 'Sep 15', remaining: 58 },
];

export const PATIENT_CLAIMS = [
  { date: 'Jul 08', provider: 'NTT Wellness Clinic', amount: 320, status: 'approved' },
  { date: 'Jun 28', provider: 'Downtown Health Hub', amount: 180, status: 'approved' },
  { date: 'Jun 15', provider: 'CarePlus Clinic', amount: 95, status: 'pending' },
  { date: 'May 20', provider: 'Riverside Family Care', amount: 240, status: 'approved' },
];

export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'fraud', title: 'Potential Claim Fraud Detected', message: 'Claim #CLM-8842 shows duplicate billing pattern from CarePlus Specialist.', time: '12 min ago', read: false, priority: 'high' },
  { id: 'n2', type: 'risk', title: 'High-Risk Patient Alert', message: 'Michael Lim (P-1003) — HbA1c rising, BP uncontrolled. Review recommended.', time: '38 min ago', read: false, priority: 'high' },
  { id: 'n3', type: 'budget', title: 'Budget Exceeded', message: 'Operations department exceeded Q3 healthcare budget by 14%.', time: '1 hour ago', read: false, priority: 'medium' },
  { id: 'n4', type: 'ai', title: 'AI Recommendation', message: 'AI engine suggests launching a seasonal vaccination campaign targeting 3,200 at-risk employees.', time: '2 hours ago', read: false, priority: 'medium' },
  { id: 'n5', type: 'claim', title: 'Claim Approved', message: 'Claim #CLM-8839 ($320) for John Anderson has been approved.', time: '3 hours ago', read: true, priority: 'low' },
  { id: 'n6', type: 'appointment', title: 'Appointment Reminder', message: 'You have a follow-up with Dr. Sarah Mitchell tomorrow at 10:00 AM.', time: '5 hours ago', read: true, priority: 'medium' },
  { id: 'n7', type: 'medicine', title: 'Medicine Reminder', message: 'Time to refill Lisinopril 10mg — only 12 days remaining.', time: '6 hours ago', read: true, priority: 'low' },
  { id: 'n8', type: 'leave', title: 'Medical Leave Approved', message: '3-day medical leave for Emily Watson has been approved by HR.', time: '8 hours ago', read: true, priority: 'low' },
];

export const ADMIN_USERS = [
  { name: 'Dr. Sarah Mitchell', email: 's.mitchell@nttdata.com', role: 'Doctor', status: 'active', lastActive: '2 min ago' },
  { name: 'James Park', email: 'j.park@nttdata.com', role: 'HR', status: 'active', lastActive: '15 min ago' },
  { name: 'Linda Chen', email: 'l.chen@nttdata.com', role: 'Finance', status: 'active', lastActive: '1 hour ago' },
  { name: 'Robert Wu', email: 'r.wu@nttdata.com', role: 'Auditor', status: 'active', lastActive: '3 hours ago' },
  { name: 'Maria Santos', email: 'm.santos@nttdata.com', role: 'Patient', status: 'inactive', lastActive: '2 days ago' },
  { name: 'Kevin Tan', email: 'k.tan@nttdata.com', role: 'Management', status: 'active', lastActive: '5 min ago' },
];

export const ROLE_PERMISSIONS: Record<Role, Page[]> = {
  'HR': ['hr'],
  'Doctor': ['doctor'],
  'Patient': ['patient'],
};

export const REPORT_TEMPLATES = [
  { name: 'Executive Healthcare Summary', format: 'PDF', schedule: 'Monthly', ai: true, icon: 'FileText' },
  { name: 'Department Health Index', format: 'Excel', schedule: 'Quarterly', ai: true, icon: 'Sheet' },
  { name: 'Claims & Fraud Analysis', format: 'PDF', schedule: 'Monthly', ai: true, icon: 'ShieldAlert' },
  { name: 'HR Benefits Utilization', format: 'Excel', schedule: 'Monthly', ai: false, icon: 'Users' },
  { name: 'Chronic Disease Analytics', format: 'PowerPoint', schedule: 'Quarterly', ai: true, icon: 'Presentation' },
  { name: 'Cost Forecast Report', format: 'PDF', schedule: 'Monthly', ai: true, icon: 'TrendingUp' },
  { name: 'Wellness Program Impact', format: 'CSV', schedule: 'Quarterly', ai: false, icon: 'HeartPulse' },
  { name: 'Raw Claims Export', format: 'CSV', schedule: 'On-demand', ai: false, icon: 'Database' },
];

export const AI_CAPABILITIES = [
  { name: 'Executive AI Assistant', icon: 'Sparkles', desc: 'Natural-language executive insights and summaries', category: 'Executive' },
  { name: 'Doctor Copilot', icon: 'Stethoscope', desc: 'SOAP notes, ICD codes, drug interaction checks', category: 'Clinical' },
  { name: 'Patient Assistant', icon: 'HeartPulse', desc: 'Personalized health guidance and reminders', category: 'Patient' },
  { name: 'HR Intelligence', icon: 'Users', desc: 'Benefit optimization and cost prediction', category: 'HR' },
  { name: 'Medical Document Summarization', icon: 'FileText', desc: 'Summarize lab reports and clinical documents', category: 'Clinical' },
  { name: 'ICD Recommendation', icon: 'Tags', desc: 'AI-suggested ICD-10 codes from clinical notes', category: 'Clinical' },
  { name: 'Prescription Validation', icon: 'Pill', desc: 'Validate prescriptions against guidelines', category: 'Clinical' },
  { name: 'Drug Interaction Detection', icon: 'AlertTriangle', desc: 'Detect potential drug-drug interactions', category: 'Clinical' },
  { name: 'Benefit Recommendation', icon: 'Gift', desc: 'Personalized benefit plan recommendations', category: 'HR' },
  { name: 'Health Risk Prediction', icon: 'Activity', desc: 'Predict patient risk scores from history', category: 'Clinical' },
  { name: 'Healthcare Cost Prediction', icon: 'DollarSign', desc: 'Forecast monthly and annual healthcare spend', category: 'Finance' },
  { name: 'Disease Trend Forecasting', icon: 'TrendingUp', desc: 'Forecast disease prevalence by department', category: 'Executive' },
  { name: 'Claim Fraud Detection', icon: 'ShieldAlert', desc: 'Anomaly detection on claim patterns', category: 'Finance' },
  { name: 'Medical Report Search', icon: 'Search', desc: 'Natural-language search across all records', category: 'Executive' },
  { name: 'Natural Language Analytics', icon: 'MessageSquare', desc: 'Ask questions, get charts and answers', category: 'Executive' },
  { name: 'Voice Assistant', icon: 'Mic', desc: 'Voice-driven queries and commands', category: 'Executive' },
  { name: 'Document Q&A', icon: 'FileQuestion', desc: 'Ask questions about any medical document', category: 'Clinical' },
  { name: 'Smart Notifications', icon: 'Bell', desc: 'Context-aware proactive alerts', category: 'Executive' },
  { name: 'Predictive Insights', icon: 'Brain', desc: 'Forward-looking health and cost predictions', category: 'Executive' },
];

// ── Claim tracking data ──────────────────────────────────────────────────────
// Health Savvy captures outpatient claims only (Cashless / Self-payment /
// Reimbursement). Monthly limits vary by benefit tier, not a flat amount.

export const CLAIM_LIMIT_TIERS: Record<string, number> = {
  'Tier 1': 300,
  'Tier 2': 500,
  'Tier 3': 800,
};

export const EMPLOYEE_TIERS: Record<string, string> = {
  'E-2001': 'Tier 1',
  'E-2002': 'Tier 2',
  'E-2003': 'Tier 1',
  'E-2004': 'Tier 1',
  'E-2005': 'Tier 2',
  'E-2006': 'Tier 1',
  'E-2007': 'Tier 2',
  'E-2008': 'Tier 1',
  'E-2009': 'Tier 3',
  'E-2010': 'Tier 2',
  'E-2011': 'Tier 1',
  'E-2012': 'Tier 1',
  'E-2013': 'Tier 1',
  'E-2014': 'Tier 1',
};

export const DEFAULT_TIER = 'Tier 1';

export function getEmployeeTier(employeeId: string): string {
  return EMPLOYEE_TIERS[employeeId] || DEFAULT_TIER;
}

export function getEmployeeLimit(employeeId: string): number {
  return CLAIM_LIMIT_TIERS[getEmployeeTier(employeeId)];
}

// Wellness services arranged via the Health Savvy ecosystem. Referral only —
// there is no data feed into the dashboard yet (Phase 2).
export const ECOSYSTEM_SERVICES = [
  { name: 'Smoking Cessation', icon: 'CigaretteOff', desc: 'Structured quit programs with counselling support' },
  { name: 'Weight Management', icon: 'Scale', desc: 'Guided weight-loss and lifestyle programs' },
  { name: 'Nutrition Coaching', icon: 'Apple', desc: 'Dietitian-led nutrition plans and coaching' },
  { name: 'Chronic Disease Management', icon: 'HeartPulse', desc: 'Ongoing support for diabetes, hypertension and asthma' },
  { name: 'Health Coaching', icon: 'Sparkles', desc: 'One-on-one preventive health coaching' },
];

// ── AI Observations & Suggestions report (Phase 1.5) ─────────────────────────
// Auto-generated quarterly / semi-annual claims commentary. Below this claim
// volume the analysis is statistically insignificant (small SMEs) and the
// report is suppressed rather than risk misleading conclusions.

export const MIN_CLAIMS_FOR_REPORT = 100;

// Monthly outpatient claims trend, derived from submitted claims (RM).
export const OUTPATIENT_CLAIMS_TREND = {
  labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  amounts: [2410, 2680, 2950, 3140, 3260, 3320],
  counts: [22, 24, 27, 28, 29, 30],
};

export const OBSERVATION_REPORTS: ObservationsReportData[] = [
  {
    period: 'H1 2026',
    label: 'H1 2026 · Semi-annual (Jan–Jun)',
    generatedOn: '30 Jun 2026',
    claimCount: 1250,
    headcount: 620,
    observations: [
      {
        metric: 'Utilisation rate',
        value: '74%',
        status: 'high',
        commentary: '74% of covered employees made at least one outpatient claim this period — at the high side versus a typical 55–65% for comparable workforces.',
      },
      {
        metric: 'Average claim size',
        value: 'RM86 / visit',
        status: 'acceptable',
        commentary: 'Average cost per outpatient visit is RM86, within the acceptable range (RM70–RM100 benchmark).',
      },
      {
        metric: 'Claim cost per covered headcount',
        value: 'RM549',
        status: 'high',
        commentary: 'Cost per covered headcount is RM549 — at the high side, driven by high visit frequency rather than high cost per visit.',
      },
      {
        metric: 'Provider outlier',
        value: 'HealthFirst Clinic · RM142 / visit',
        status: 'high',
        commentary: 'HealthFirst Clinic averages RM142 per visit versus the panel average of RM82, and accounts for over 30% of total payout. Worth a panel review.',
      },
      {
        metric: 'Chronic vs non-chronic split',
        value: '88% non-chronic',
        status: 'acceptable',
        commentary: 'Over 88% of claims were non-chronic (fever, infections, minor ailments) — appropriately treated on an outpatient basis.',
      },
      {
        metric: 'Employee vs dependent split',
        value: '82% employees',
        status: 'acceptable',
        commentary: 'The majority of claims (82%) are attributed to the employee group rather than dependents.',
      },
      {
        metric: 'High utilizers',
        value: '19 employees · >5 visits',
        status: 'high',
        commentary: '19 employees visited a clinic more than 5 times this period — above the national average — with an average cost per visit of RM118. None resulted in extended medical leave.',
      },
    ],
    suggestions: [
      {
        title: 'Investigate fever & infection clusters',
        detail: 'A large share of claims relate to fever and infections. Check whether these are concentrated in the top-10 utilizers, then monitor and manage the affected group.',
        services: ['Health Coaching'],
      },
      {
        title: 'Manage recurring chronic-code visits',
        detail: 'Hypertension (I10) and type 2 diabetes (E11.9) claims recur across the same claimants. Early, structured management reduces long-term claim costs by 10–30%.',
        services: ['Chronic Disease Management', 'Nutrition Coaching'],
      },
      {
        title: 'Address stress-related consultations',
        detail: 'Anxiety-related visits (F41.9) trended up quarter-on-quarter. Early support reduces absenteeism and repeat outpatient claims.',
        services: ['Health Coaching'],
      },
      {
        title: 'Target smoking-linked respiratory claims',
        detail: 'Respiratory claims are over-represented among known smokers. A structured cessation program has the highest single-program ROI available in the ecosystem.',
        services: ['Smoking Cessation'],
      },
    ],
    topDiseases: [
      { code: 'J06.9', name: 'Upper respiratory infection', claims: 214, cost: 15408, chronic: false },
      { code: 'R50.9', name: 'Fever, unspecified', claims: 186, cost: 12276, chronic: false },
      { code: 'A09', name: 'Gastroenteritis', claims: 142, cost: 10508, chronic: false },
      { code: 'J02.9', name: 'Acute pharyngitis', claims: 118, cost: 8024, chronic: false },
      { code: 'I10', name: 'Essential hypertension', claims: 96, cost: 11328, chronic: true },
      { code: 'M54.5', name: 'Low back pain', claims: 84, cost: 9240, chronic: false },
      { code: 'E11.9', name: 'Type 2 diabetes mellitus', claims: 72, cost: 9864, chronic: true },
      { code: 'K30', name: 'Functional dyspepsia', claims: 65, cost: 4550, chronic: false },
      { code: 'F41.9', name: 'Anxiety disorder', claims: 58, cost: 7714, chronic: true },
      { code: 'J45.9', name: 'Asthma, unspecified', claims: 44, cost: 5720, chronic: true },
    ],
  },
  {
    period: 'Q2 2026',
    label: 'Q2 2026 · Quarterly (Apr–Jun)',
    generatedOn: '30 Jun 2026',
    claimCount: 680,
    headcount: 620,
    observations: [
      {
        metric: 'Utilisation rate',
        value: '46%',
        status: 'high',
        commentary: '46% of covered employees claimed within the quarter — tracking toward the elevated half-year utilisation trend.',
      },
      {
        metric: 'Average claim size',
        value: 'RM89 / visit',
        status: 'acceptable',
        commentary: 'Average cost per visit is RM89, within the acceptable range (RM70–RM100 benchmark).',
      },
      {
        metric: 'Claim cost per covered headcount',
        value: 'RM298',
        status: 'high',
        commentary: 'Quarterly cost per covered headcount is RM298 — annualising above RM1,100, at the high side for this workforce profile.',
      },
      {
        metric: 'Provider outlier',
        value: 'HealthFirst Clinic · RM138 / visit',
        status: 'high',
        commentary: 'HealthFirst Clinic remains the cost outlier at RM138 per visit versus the RM84 panel average.',
      },
      {
        metric: 'Chronic vs non-chronic split',
        value: '85% non-chronic',
        status: 'acceptable',
        commentary: '85% of claims were non-chronic. The chronic share rose 3 points versus Q1 — driven by hypertension and diabetes codes.',
      },
      {
        metric: 'High utilizers',
        value: '11 employees · >3 visits',
        status: 'high',
        commentary: '11 employees exceeded 3 visits within the quarter. Their combined claims represent 22% of quarterly payout.',
      },
    ],
    suggestions: [
      {
        title: 'Review the chronic-share uptick',
        detail: 'The chronic claim share rose from 12% to 15% quarter-on-quarter. Structured management for the affected claimants now avoids escalation.',
        services: ['Chronic Disease Management'],
      },
      {
        title: 'Re-check the provider panel',
        detail: 'HealthFirst Clinic has been the per-visit cost outlier two quarters running. Consider steering employees toward comparable nearby panel clinics.',
        services: ['Health Coaching'],
      },
    ],
    topDiseases: [
      { code: 'J06.9', name: 'Upper respiratory infection', claims: 118, cost: 8614, chronic: false },
      { code: 'R50.9', name: 'Fever, unspecified', claims: 96, cost: 6432, chronic: false },
      { code: 'A09', name: 'Gastroenteritis', claims: 74, cost: 5476, chronic: false },
      { code: 'I10', name: 'Essential hypertension', claims: 55, cost: 6490, chronic: true },
      { code: 'J02.9', name: 'Acute pharyngitis', claims: 52, cost: 3588, chronic: false },
      { code: 'E11.9', name: 'Type 2 diabetes mellitus', claims: 41, cost: 5658, chronic: true },
      { code: 'M54.5', name: 'Low back pain', claims: 38, cost: 4218, chronic: false },
      { code: 'F41.9', name: 'Anxiety disorder', claims: 34, cost: 4522, chronic: true },
      { code: 'K30', name: 'Functional dyspepsia', claims: 29, cost: 2030, chronic: false },
      { code: 'J45.9', name: 'Asthma, unspecified', claims: 23, cost: 2990, chronic: true },
    ],
  },
  {
    // Demonstrates the minimum-data threshold: onboarding quarter with too few
    // claims for statistically meaningful analysis (typical for small SMEs).
    period: 'Q1 2026',
    label: 'Q1 2026 · Quarterly (Jan–Mar)',
    generatedOn: '31 Mar 2026',
    claimCount: 42,
    headcount: 620,
    observations: [],
    suggestions: [],
    topDiseases: [],
  },
];

export const CLAIM_RECORDS: ClaimRecord[] = [
  { id: 'CLM-9001', employeeId: 'E-2001', employeeName: 'John Anderson', date: 'Jul 02', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 85, status: 'approved', pdfUrl: '/claims/CLM-9001.pdf' },
  { id: 'CLM-9002', employeeId: 'E-2001', employeeName: 'John Anderson', date: 'Jul 09', provider: 'CarePlus Clinic', paymentType: 'Reimbursement', amount: 120, status: 'approved', pdfUrl: '/claims/CLM-9002.pdf' },
  { id: 'CLM-9003', employeeId: 'E-2001', employeeName: 'John Anderson', date: 'Jul 15', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 140, status: 'pending', pdfUrl: '/claims/CLM-9003.pdf' },
  { id: 'CLM-9004', employeeId: 'E-2002', employeeName: 'Sarah Chen', date: 'Jul 03', provider: 'Downtown Health Hub', paymentType: 'Cashless', amount: 65, status: 'approved', pdfUrl: '/claims/CLM-9004.pdf' },
  { id: 'CLM-9005', employeeId: 'E-2002', employeeName: 'Sarah Chen', date: 'Jul 11', provider: 'Downtown Health Hub', paymentType: 'Self-payment', amount: 280, status: 'approved', pdfUrl: '/claims/CLM-9005.pdf' },
  { id: 'CLM-9006', employeeId: 'E-2003', employeeName: 'Michael Lim', date: 'Jul 01', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 95, status: 'approved', pdfUrl: '/claims/CLM-9006.pdf' },
  { id: 'CLM-9007', employeeId: 'E-2003', employeeName: 'Michael Lim', date: 'Jul 05', provider: 'Riverside Family Care', paymentType: 'Reimbursement', amount: 180, status: 'approved', pdfUrl: '/claims/CLM-9007.pdf' },
  { id: 'CLM-9008', employeeId: 'E-2003', employeeName: 'Michael Lim', date: 'Jul 12', provider: 'CarePlus Clinic', paymentType: 'Cashless', amount: 75, status: 'approved', pdfUrl: '/claims/CLM-9008.pdf' },
  { id: 'CLM-9009', employeeId: 'E-2003', employeeName: 'Michael Lim', date: 'Jul 18', provider: 'NTT Wellness Clinic', paymentType: 'Self-payment', amount: 110, status: 'pending', pdfUrl: '/claims/CLM-9009.pdf' },
  { id: 'CLM-9010', employeeId: 'E-2004', employeeName: 'Emily Watson', date: 'Jul 04', provider: 'Downtown Health Hub', paymentType: 'Cashless', amount: 90, status: 'approved', pdfUrl: '/claims/CLM-9010.pdf' },
  { id: 'CLM-9011', employeeId: 'E-2005', employeeName: 'David Kumar', date: 'Jul 06', provider: 'CarePlus Clinic', paymentType: 'Reimbursement', amount: 55, status: 'approved', pdfUrl: '/claims/CLM-9011.pdf' },
  { id: 'CLM-9012', employeeId: 'E-2005', employeeName: 'David Kumar', date: 'Jul 10', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 70, status: 'approved', pdfUrl: '/claims/CLM-9012.pdf' },
  { id: 'CLM-9013', employeeId: 'E-2006', employeeName: 'Lisa Park', date: 'Jul 07', provider: 'Downtown Health Hub', paymentType: 'Cashless', amount: 45, status: 'approved', pdfUrl: '/claims/CLM-9013.pdf' },
  { id: 'CLM-9014', employeeId: 'E-2007', employeeName: 'Robert Chen', date: 'Jul 02', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 150, status: 'approved', pdfUrl: '/claims/CLM-9014.pdf' },
  { id: 'CLM-9015', employeeId: 'E-2007', employeeName: 'Robert Chen', date: 'Jul 08', provider: 'Riverside Family Care', paymentType: 'Self-payment', amount: 220, status: 'approved', pdfUrl: '/claims/CLM-9015.pdf' },
  { id: 'CLM-9016', employeeId: 'E-2007', employeeName: 'Robert Chen', date: 'Jul 14', provider: 'CarePlus Clinic', paymentType: 'Reimbursement', amount: 65, status: 'pending', pdfUrl: '/claims/CLM-9016.pdf' },
  { id: 'CLM-9017', employeeId: 'E-2008', employeeName: 'Jennifer Wu', date: 'Jul 03', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 110, status: 'approved', pdfUrl: '/claims/CLM-9017.pdf' },
  { id: 'CLM-9018', employeeId: 'E-2008', employeeName: 'Jennifer Wu', date: 'Jul 09', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 130, status: 'approved', pdfUrl: '/claims/CLM-9018.pdf' },
  { id: 'CLM-9019', employeeId: 'E-2008', employeeName: 'Jennifer Wu', date: 'Jul 16', provider: 'Downtown Health Hub', paymentType: 'Reimbursement', amount: 95, status: 'pending', pdfUrl: '/claims/CLM-9019.pdf' },
  { id: 'CLM-9020', employeeId: 'E-2009', employeeName: 'Kevin Tan', date: 'Jul 05', provider: 'HealthFirst Clinic', paymentType: 'Self-payment', amount: 290, status: 'approved', pdfUrl: '/claims/CLM-9020.pdf' },
  { id: 'CLM-9021', employeeId: 'E-2009', employeeName: 'Kevin Tan', date: 'Jul 13', provider: 'CarePlus Clinic', paymentType: 'Cashless', amount: 40, status: 'approved', pdfUrl: '/claims/CLM-9021.pdf' },
  { id: 'CLM-9022', employeeId: 'E-2010', employeeName: 'Maria Santos', date: 'Jul 04', provider: 'Downtown Health Hub', paymentType: 'Cashless', amount: 60, status: 'approved', pdfUrl: '/claims/CLM-9022.pdf' },
  { id: 'CLM-9023', employeeId: 'E-2010', employeeName: 'Maria Santos', date: 'Jul 11', provider: 'Downtown Health Hub', paymentType: 'Cashless', amount: 80, status: 'approved', pdfUrl: '/claims/CLM-9023.pdf' },
  { id: 'CLM-9024', employeeId: 'E-2010', employeeName: 'Maria Santos', date: 'Jul 17', provider: 'NTT Wellness Clinic', paymentType: 'Reimbursement', amount: 175, status: 'pending', pdfUrl: '/claims/CLM-9024.pdf' },
  { id: 'CLM-9025', employeeId: 'E-2011', employeeName: 'James Park', date: 'Jul 06', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 75, status: 'approved', pdfUrl: '/claims/CLM-9025.pdf' },
  { id: 'CLM-9026', employeeId: 'E-2012', employeeName: 'Linda Chen', date: 'Jul 08', provider: 'CarePlus Clinic', paymentType: 'Reimbursement', amount: 35, status: 'approved', pdfUrl: '/claims/CLM-9026.pdf' },
  { id: 'CLM-9027', employeeId: 'E-2012', employeeName: 'Linda Chen', date: 'Jul 12', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 95, status: 'approved', pdfUrl: '/claims/CLM-9027.pdf' },
  { id: 'CLM-9028', employeeId: 'E-2013', employeeName: 'Alex Rivera', date: 'Jul 09', provider: 'Downtown Health Hub', paymentType: 'Self-payment', amount: 120, status: 'approved', pdfUrl: '/claims/CLM-9028.pdf' },
  { id: 'CLM-9029', employeeId: 'E-2013', employeeName: 'Alex Rivera', date: 'Jul 15', provider: 'Downtown Health Hub', paymentType: 'Self-payment', amount: 120, status: 'pending', pdfUrl: '/claims/CLM-9029.pdf' },
  { id: 'CLM-9030', employeeId: 'E-2014', employeeName: 'Sophie Lee', date: 'Jul 07', provider: 'NTT Wellness Clinic', paymentType: 'Cashless', amount: 50, status: 'approved', pdfUrl: '/claims/CLM-9030.pdf' },
];
