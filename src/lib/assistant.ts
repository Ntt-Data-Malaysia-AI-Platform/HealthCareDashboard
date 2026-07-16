import type { ChatChart } from '../types';
import type { Language } from './i18n';

// Demo assistant — all responses are mocked locally. There is no external AI
// call and no API key; live AI (via a server-side proxy) is a Phase 2 item.

interface AssistantResponse {
  text: string;
  chart?: ChatChart;
}

function parseChart(text: string): { cleanText: string; chart?: ChatChart } {
  const match = text.match(/\[CHART\]\s*({[\s\S]*?})/);
  if (!match) return { cleanText: text };
  try {
    const chart = JSON.parse(match[1]);
    return { cleanText: text.replace(match[0], '').trim(), chart };
  } catch {
    return { cleanText: text };
  }
}

// Mock responses aligned with the current Health Savvy data model:
// outpatient claims only (Cashless / Self-payment / Reimbursement), tiered
// monthly limits (RM300 / RM500 / RM800), no department tracking, RM currency.
function getMockResponse(query: string, language: Language): string {
  const lower = query.toLowerCase();

  if (language === 'zh') {
    if (lower.includes('总结') || lower.includes('summarize')) {
      return `**本月门诊理赔总结：**\n\n• **30 项门诊理赔**，涉及 14 名员工\n• 总金额：**RM3,320**\n• **3 名员工**超出其等级月度限额（超额共 RM240）\n• **6 项理赔**待审批\n• 支付方式：无现金 RM1,455 · 自付 RM1,140 · 报销 RM725\n\n提示：员工限额按福利等级划分（RM300 / RM500 / RM800）。`;
    }
    if (lower.includes('超') || lower.includes('限额') || lower.includes('exceed')) {
      return `**超出限额的员工（本月）：**\n\n1. **Michael Lim**（一级 RM300）— RM460，超额 RM160\n2. **John Anderson**（一级 RM300）— RM345，超额 RM45\n3. **Jennifer Wu**（一级 RM300）— RM335，超额 RM35\n\n建议审查高频就诊原因，并考虑生态系统内的健康管理转介。`;
    }
    if (lower.includes('预测') || lower.includes('predict') || lower.includes('预算')) {
      return `**支出预测（规则推算，非 AI）：**\n\n• 本月至今：**RM3,320**\n• 按当前速度，月底预计约 **RM4,648**\n\n注意：可靠的 AI 预测需要积累足够的理赔数据后才能启用（第二阶段路线图）。\n\n[CHART] {"type":"bar","title":"按支付方式划分的门诊理赔 (RM)","labels":["无现金","自付","报销"],"values":[1455,1140,725]}`;
    }
    if (lower.includes('疾病') || lower.includes('icd')) {
      return `**H1 2026 十大疾病（ICD-10，Health Savvy 系统采集）：**\n\n1. **J06.9** 上呼吸道感染 — 214 项\n2. **R50.9** 发热 — 186 项\n3. **A09** 肠胃炎 — 142 项\n4. **J02.9** 急性咽炎 — 118 项\n5. **I10** 原发性高血压 — 96 项（慢性）\n\n88% 的理赔为非慢性疾病。\n\n[CHART] {"type":"bar","title":"十大疾病理赔数 (H1 2026)","labels":["J06.9","R50.9","A09","J02.9","I10"],"values":[214,186,142,118,96]}`;
    }
    if (lower.includes('异常') || lower.includes('anomal') || lower.includes('重复')) {
      return `**理赔模式检查（规则引擎）：**\n\n• 本月未发现重复就诊模式\n• 6 项理赔待审批\n• HealthFirst Clinic 每次就诊平均 RM142，高于面板平均 RM82 — 建议关注\n\n注意：基于 AI 的隐藏模式检测在第二阶段路线图中。`;
    }
    if (lower.includes('健康') || lower.includes('wellness') || lower.includes('生态')) {
      return `**可通过 Health Savvy 生态系统转介的健康服务：**\n\n• 戒烟计划\n• 体重管理\n• 营养指导\n• 慢性病管理\n• 健康指导\n\n目前仅提供转介（尚无数据回流到仪表板）；由 HR 决定是否启用。`;
    }
    return `我是演示助手，回复均为模拟数据（当前系统仅采集门诊理赔）。您可以问我：\n\n• 总结本月理赔\n• 哪些员工超出限额\n• 支出预测\n• 十大疾病（ICD-10）\n• 理赔异常检查\n• 生态系统健康服务`;
  }

  if (language === 'id') {
    if (lower.includes('ringkas') || lower.includes('summarize')) {
      return `**Ringkasan tuntutan pesakit luar bulan ini:**\n\n• **30 tuntutan pesakit luar** daripada 14 pekerja\n• Jumlah: **RM3,320**\n• **3 pekerja** melebihi had bulanan tier mereka (lebihan RM240)\n• **6 tuntutan** menunggu kelulusan\n• Jenis bayaran: Tanpa tunai RM1,455 · Bayar sendiri RM1,140 · Tuntutan balik RM725\n\nNota: had berbeza mengikut tier faedah (RM300 / RM500 / RM800).`;
    }
    if (lower.includes('had') || lower.includes('lebih') || lower.includes('exceed')) {
      return `**Pekerja melebihi had (bulan ini):**\n\n1. **Michael Lim** (Tier 1 RM300) — RM460, lebihan RM160\n2. **John Anderson** (Tier 1 RM300) — RM345, lebihan RM45\n3. **Jennifer Wu** (Tier 1 RM300) — RM335, lebihan RM35\n\nSyorkan semakan sebab lawatan kerap dan rujukan ke perkhidmatan ekosistem.`;
    }
    if (lower.includes('ramal') || lower.includes('predict') || lower.includes('bajet')) {
      return `**Unjuran perbelanjaan (berasaskan peraturan, bukan AI):**\n\n• Bulan ini setakat: **RM3,320**\n• Unjuran hujung bulan: kira-kira **RM4,648**\n\nNota: ramalan AI yang boleh dipercayai memerlukan data tuntutan yang mencukupi (pelan Fasa 2).\n\n[CHART] {"type":"bar","title":"Tuntutan Pesakit Luar mengikut Jenis Bayaran (RM)","labels":["Tanpa tunai","Bayar sendiri","Tuntutan balik"],"values":[1455,1140,725]}`;
    }
    if (lower.includes('penyakit') || lower.includes('icd')) {
      return `**10 penyakit teratas H1 2026 (ICD-10 daripada sistem Health Savvy):**\n\n1. **J06.9** Jangkitan saluran pernafasan atas — 214\n2. **R50.9** Demam — 186\n3. **A09** Gastroenteritis — 142\n4. **J02.9** Faringitis akut — 118\n5. **I10** Hipertensi — 96 (kronik)\n\n88% tuntutan adalah bukan kronik.\n\n[CHART] {"type":"bar","title":"Penyakit Teratas mengikut Tuntutan (H1 2026)","labels":["J06.9","R50.9","A09","J02.9","I10"],"values":[214,186,142,118,96]}`;
    }
    if (lower.includes('anomali') || lower.includes('anomal')) {
      return `**Semakan corak tuntutan (enjin peraturan):**\n\n• Tiada corak lawatan berulang dikesan bulan ini\n• 6 tuntutan menunggu kelulusan\n• HealthFirst Clinic purata RM142 setiap lawatan berbanding purata panel RM82 — patut disemak\n\nNota: pengesanan corak tersembunyi berasaskan AI adalah dalam pelan Fasa 2.`;
    }
    if (lower.includes('kesihatan') || lower.includes('wellness') || lower.includes('ekosistem')) {
      return `**Perkhidmatan kesihatan melalui ekosistem Health Savvy:**\n\n• Berhenti merokok\n• Pengurusan berat badan\n• Bimbingan pemakanan\n• Pengurusan penyakit kronik\n• Bimbingan kesihatan\n\nRujukan sahaja buat masa ini (tiada suapan data ke papan pemuka); HR yang memutuskan.`;
    }
    return `Saya pembantu demo — semua respons adalah simulasi (sistem semasa merekod tuntutan pesakit luar sahaja). Anda boleh tanya:\n\n• Ringkasan tuntutan bulan ini\n• Pekerja yang melebihi had\n• Unjuran perbelanjaan\n• 10 penyakit teratas (ICD-10)\n• Semakan anomali tuntutan\n• Perkhidmatan ekosistem`;
  }

  // English responses
  if (lower.includes('summarize') || lower.includes('summary')) {
    return `**This month's outpatient claims summary:**\n\n• **30 outpatient claims** from 14 employees\n• Total: **RM3,320**\n• **3 employees** exceeded their tier monthly limit (RM240 total overage)\n• **6 claims** pending approval\n• Payment mix: Cashless RM1,455 · Self-payment RM1,140 · Reimbursement RM725\n\nNote: limits vary by benefit tier (RM300 / RM500 / RM800).`;
  }
  if (lower.includes('exceed') || lower.includes('limit') || lower.includes('tier')) {
    return `**Employees over their tier limit (this month):**\n\n1. **Michael Lim** (Tier 1 · RM300) — RM460, over by RM160\n2. **John Anderson** (Tier 1 · RM300) — RM345, over by RM45\n3. **Jennifer Wu** (Tier 1 · RM300) — RM335, over by RM35\n\nRecommend reviewing visit frequency for these employees and considering ecosystem referrals (e.g. health coaching).`;
  }
  if (lower.includes('predict') || lower.includes('forecast') || lower.includes('budget')) {
    return `**Spending projection (rule-based, not AI):**\n\n• Month to date: **RM3,320**\n• Simple run-rate projection: about **RM4,648** by month end\n\nNote: reliable AI forecasting for HR budgeting is on the Phase 2 roadmap — it needs sufficient claims history first.\n\n[CHART] {"type":"bar","title":"Outpatient Claims by Payment Type (RM)","labels":["Cashless","Self-payment","Reimbursement"],"values":[1455,1140,725]}`;
  }
  if (lower.includes('disease') || lower.includes('icd') || lower.includes('top 10') || lower.includes('top-10')) {
    return `**Top diseases, H1 2026 (ICD-10 codes captured by Health Savvy):**\n\n1. **J06.9** Upper respiratory infection — 214 claims\n2. **R50.9** Fever — 186\n3. **A09** Gastroenteritis — 142\n4. **J02.9** Acute pharyngitis — 118\n5. **I10** Essential hypertension — 96 (chronic)\n\n88% of claims were non-chronic. Full top-10 is in the AI Observations & Suggestions report on the HR dashboard.\n\n[CHART] {"type":"bar","title":"Top Diseases by Claims (H1 2026)","labels":["J06.9","R50.9","A09","J02.9","I10"],"values":[214,186,142,118,96]}`;
  }
  if (lower.includes('anomal') || lower.includes('duplicate') || lower.includes('fraud')) {
    return `**Claim pattern check (rule engine):**\n\n• No duplicate-visit patterns detected this month\n• 6 claims pending approval\n• **HealthFirst Clinic** averages RM142 per visit vs the RM82 panel average and accounts for over 30% of payout — worth a panel review\n\nNote: AI-based detection of hidden claim patterns is on the Phase 2 roadmap.`;
  }
  if (lower.includes('wellness') || lower.includes('ecosystem') || lower.includes('program')) {
    return `**Wellness services available via the Health Savvy ecosystem:**\n\n• Smoking Cessation\n• Weight Management\n• Nutrition Coaching\n• Chronic Disease Management\n• Health Coaching\n\nThese are referral-only today — there is no data feed back into the dashboard yet (Phase 2). HR decides whether to engage a provider.`;
  }
  if (lower.includes('report') || lower.includes('observation')) {
    return `**AI Observations & Suggestions report (H1 2026):**\n\n• Utilisation rate 74% — high side\n• Average claim RM86/visit — acceptable\n• Cost per covered headcount RM549 — high side, driven by visit frequency\n• 19 high utilizers with >5 visits\n\nThe full report, including suggestions linked to ecosystem providers and the top-10 ICD-10 disease table, is on the HR dashboard. Reports are suppressed below 100 claims per period to stay statistically meaningful.`;
  }
  return `I'm the demo assistant — responses are simulated from the current data model (outpatient claims only, tiered limits, RM currency). Try asking me to:\n\n• Summarize this month's claims\n• Show employees over their tier limit\n• Project spending\n• List the top-10 diseases (ICD-10)\n• Check for claim anomalies\n• List ecosystem wellness services`;
}

export async function getAssistantResponse(
  query: string,
  _history: { role: string; content: string }[],
  language: Language = 'en'
): Promise<AssistantResponse> {
  // Simulate a short response delay
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
  const text = getMockResponse(query, language);
  const { cleanText, chart } = parseChart(text);
  return { text: cleanText, chart };
}
