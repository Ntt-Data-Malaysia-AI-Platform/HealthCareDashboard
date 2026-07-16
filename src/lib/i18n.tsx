import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'en' | 'zh' | 'id';

const translations = {
  en: {
    // App
    appName: 'NTT DATA Healthcare AI',
    appSubtitle: 'AI Care Management Platform for Employers',

    // Navigation
    hrDashboard: 'HR Dashboard',
    doctorWorkspace: 'Doctor Workspace',
    patientPortal: 'Patient Portal',

    // Language names
    english: 'English',
    chinese: '中文',
    bahasa: 'بهاس ملايو',

    // Common
    search: 'Search...',
    filter: 'Filter',
    download: 'Download',
    preview: 'Preview',
    close: 'Close',
    open: 'Open',
    all: 'All',
    status: 'Status',
    date: 'Date',
    amount: 'Amount',
    total: 'Total',
    actions: 'Actions',
    loading: 'Loading...',

    // HR Dashboard
    claimTracking: 'Claim tracking with monthly limit',
    employees: 'Employees',
    totalClaims: 'Total Claims',
    totalAmount: 'Total Amount',
    exceededLimit: 'Exceeded Limit',
    submittedTwice: 'Submitted Twice+',
    pending: 'Pending',
    claimsByCategory: 'Claims by Category',
    claimStatus: 'Claim Status',
    employeeClaimsThisMonth: 'Employee Claims This Month',
    limit: 'Limit',
    remaining: 'remaining',
    overBy: 'Over by',
    monthlyLimit: 'Monthly limit',
    perEmployee: 'per employee',
    approved: 'Approved',
    rejected: 'Rejected',
    claims: 'claims',

    // Wellness Dashboard
    employeeWellnessDashboard: 'Employee Wellness Dashboard',
    comprehensiveWellnessMetrics: 'Comprehensive wellness metrics and program performance',
    overallScore: 'Overall Score',
    physical: 'Physical',
    mental: 'Mental',
    social: 'Social',
    financial: 'Financial',
    nutritional: 'Nutritional',
    overall: 'Overall',
    wellnessScoreTrend: 'Wellness Score Trend',
    sevenMonthRollingAverage: '7-month rolling average',
    departmentWellnessComparison: 'Department Wellness Comparison',
    overallScoresByDepartment: 'Overall scores by department',
    wellnessPrograms: 'Wellness Programs',
    activeProgramsParticipation: 'Active programs and participation rates',
    programsActive: 'programs active',
    enrolled: 'enrolled',
    completed: 'completed',
    completion: 'completion',
    reward: 'reward',
    healthRiskIndicators: 'Health Risk Indicators',
    highPriority: 'High Priority',
    mediumPriority: 'Medium Priority',
    employeesAffected: 'employees affected',
    trend: 'trend',
    upcomingHealthCampaigns: 'Upcoming Health Campaigns',
    scheduledInitiatives: 'Scheduled wellness initiatives',

    // AI
    geminiAiActive: 'Demo Assistant Active',
    aiCapabilitiesEnabled: 'AI capabilities enabled',
    hrAiIntelligence: 'HR AI Intelligence',
    poweredByGemini: 'Demo mode — simulated AI responses',
    thresholdExceeded: 'Threshold Exceeded',
    repeatClaimants: 'Repeat Claimants',
    spendingForecast: 'Spending Forecast',
    anomalyDetection: 'Anomaly Detection',

    // Charts
    outpatient: 'Outpatient',
    inpatient: 'Inpatient',
    dental: 'Dental',
    vision: 'Vision',
    mentalHealth: 'Mental Health',
    preventive: 'Preventive',
    pharmacy: 'Pharmacy',
    specialist: 'Specialist',
    imaging: 'Imaging',
    emergency: 'Emergency',

    // Footer
    enterpriseHealthcarePlatform: 'Enterprise Healthcare Intelligence Platform',
    version: 'Version',
  },
  zh: {
    // App
    appName: 'NTT DATA 医疗保健 AI',
    appSubtitle: '面向雇主的 AI 健康管理平台',

    // Navigation
    hrDashboard: 'HR 仪表板',
    doctorWorkspace: '医生工作区',
    patientPortal: '患者门户',

    // Language names
    english: 'English',
    chinese: '中文',
    bahasa: 'بهاس ملايو',

    // Common
    search: '搜索...',
    filter: '筛选',
    download: '下载',
    preview: '预览',
    close: '关闭',
    open: '打开',
    all: '全部',
    status: '状态',
    date: '日期',
    amount: '金额',
    total: '总计',
    actions: '操作',
    loading: '加载中...',

    // HR Dashboard
    claimTracking: '理赔跟踪，每月限额',
    employees: '员工',
    totalClaims: '总理赔数',
    totalAmount: '总金额',
    exceededLimit: '超额',
    submittedTwice: '提交两次+',
    pending: '待处理',
    claimsByCategory: '按类别理赔',
    claimStatus: '理赔状态',
    employeeClaimsThisMonth: '本月员工理赔',
    limit: '限额',
    remaining: '剩余',
    overBy: '超额',
    monthlyLimit: '每月限额',
    perEmployee: '每位员工',
    approved: '已批准',
    rejected: '已拒绝',
    claims: '理赔',

    // Wellness Dashboard
    employeeWellnessDashboard: '员工健康仪表板',
    comprehensiveWellnessMetrics: '综合健康指标和计划绩效',
    overallScore: '综合评分',
    physical: '身体',
    mental: '心理',
    social: '社交',
    financial: '财务',
    nutritional: '营养',
    overall: '综合',
    wellnessScoreTrend: '健康评分趋势',
    sevenMonthRollingAverage: '7个月滚动平均值',
    departmentWellnessComparison: '部门健康对比',
    overallScoresByDepartment: '各部门综合评分',
    wellnessPrograms: '健康计划',
    activeProgramsParticipation: '活跃计划和参与率',
    programsActive: '个活跃计划',
    enrolled: '已报名',
    completed: '已完成',
    completion: '完成率',
    reward: '奖励',
    healthRiskIndicators: '健康风险指标',
    highPriority: '高优先级',
    mediumPriority: '中优先级',
    employeesAffected: '受影响员工',
    trend: '趋势',
    upcomingHealthCampaigns: '即将开展的健康活动',
    scheduledInitiatives: '计划中的健康活动',

    // AI
    geminiAiActive: '演示助手已激活',
    aiCapabilitiesEnabled: '项 AI 功能已启用',
    hrAiIntelligence: 'HR AI 智能',
    poweredByGemini: '演示模式 — 模拟 AI 回复',
    thresholdExceeded: '超限预警',
    repeatClaimants: '重复理赔者',
    spendingForecast: '支出预测',
    anomalyDetection: '异常检测',

    // Charts
    outpatient: '门诊',
    inpatient: '住院',
    dental: '牙科',
    vision: '眼科',
    mentalHealth: '心理健康',
    preventive: '预防保健',
    pharmacy: '药房',
    specialist: '专科',
    imaging: '影像',
    emergency: '急诊',

    // Footer
    enterpriseHealthcarePlatform: '企业医疗保健智能平台',
    version: '版本',
  },
  id: {
    // App
    appName: 'NTT DATA Healthcare AI',
    appSubtitle: 'Platform Pengurusan Penjagaan AI untuk Majikan',

    // Navigation
    hrDashboard: 'Papan Pemuka HR',
    doctorWorkspace: 'Ruang Kerja Doktor',
    patientPortal: 'Portal Pesakit',

    // Language names
    english: 'English',
    chinese: '中文',
    bahasa: 'بهاس ملايو',

    // Common
    search: 'Cari...',
    filter: 'Tapis',
    download: 'Muat Turun',
    preview: 'Pratonton',
    close: 'Tutup',
    open: 'Buka',
    all: 'Semua',
    status: 'Status',
    date: 'Tarikh',
    amount: 'Jumlah',
    total: 'Jumlah',
    actions: 'Tindakan',
    loading: 'Memuatkan...',

    // HR Dashboard
    claimTracking: 'Jejak tuntutan dengan had bulanan',
    employees: 'Pekerja',
    totalClaims: 'Jumlah Tuntutan',
    totalAmount: 'Jumlah Keseluruhan',
    exceededLimit: 'Melebihi Had',
    submittedTwice: 'Dihantar 2+',
    pending: 'Belum Selesai',
    claimsByCategory: 'Tuntutan per Kategori',
    claimStatus: 'Status Tuntutan',
    employeeClaimsThisMonth: 'Tuntutan Pekerja Bulan Ini',
    limit: 'Had',
    remaining: 'baki',
    overBy: 'Lebihan',
    monthlyLimit: 'Had bulanan',
    perEmployee: 'per pekerja',
    approved: 'Diluluskan',
    rejected: 'Ditolak',
    claims: 'tuntutan',

    // Wellness Dashboard
    employeeWellnessDashboard: 'Papan Pemuka Kesihatan Pekerja',
    comprehensiveWellnessMetrics: 'Metrik kesihatan komprehensif dan prestasi program',
    overallScore: 'Skor Keseluruhan',
    physical: 'Fizik',
    mental: 'Mental',
    social: 'Sosial',
    financial: 'Kewangan',
    nutritional: 'Pemakanan',
    overall: 'Keseluruhan',
    wellnessScoreTrend: 'Tren Skor Kesihatan',
    sevenMonthRollingAverage: 'Purata bergerak 7 bulan',
    departmentWellnessComparison: 'Perbandingan Kesihatan Jabatan',
    overallScoresByDepartment: 'Skor keseluruhan per jabatan',
    wellnessPrograms: 'Program Kesihatan',
    activeProgramsParticipation: 'Program aktif dan tahap penyertaan',
    programsActive: 'program aktif',
    enrolled: 'berdaftar',
    completed: 'selesai',
    completion: 'penyelesaian',
    reward: 'ganjaran',
    healthRiskIndicators: 'Penunjuk Risiko Kesihatan',
    highPriority: 'Keutamaan Tinggi',
    mediumPriority: 'Keutamaan Sederhana',
    employeesAffected: 'pekerja terjejas',
    trend: 'tren',
    upcomingHealthCampaigns: 'Kempen Kesihatan Akan Datang',
    scheduledInitiatives: 'Inisiatif kesihatan berjadual',

    // AI
    geminiAiActive: 'Pembantu Demo Aktif',
    aiCapabilitiesEnabled: 'keupayaan AI diaktifkan',
    hrAiIntelligence: 'Kecerdasan AI HR',
    poweredByGemini: 'Mod demo — respons AI simulasi',
    thresholdExceeded: 'Had Terlampaui',
    repeatClaimants: 'Pemohon Tuntutan Berulang',
    spendingForecast: 'Jangkaan Perbelanjaan',
    anomalyDetection: 'Pengesanan Anomali',

    // Charts
    outpatient: 'Pesakit Luar',
    inpatient: 'Pesakit Dalam',
    dental: 'Pergigian',
    vision: 'Mata',
    mentalHealth: 'Kesihatan Mental',
    preventive: 'Pencegahan',
    pharmacy: 'Farmasi',
    specialist: 'Pakar',
    imaging: 'Pengimejan',
    emergency: 'Kecemasan',

    // Footer
    enterpriseHealthcarePlatform: 'Platform Kecerdasan Kesihatan Korporat',
    version: 'Versi',
  },
};

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { translations };
