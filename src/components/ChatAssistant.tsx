import { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { getAssistantResponse } from '../lib/assistant';
import { useLanguage, type Language } from '../lib/i18n';
import type { ChatMessage, ChatChart } from '../types';
import { BarChart, LineChart, DonutChart } from './Charts';

const SUGGESTIONS: Record<string, string[]> = {
  en: [
    "Summarize this month's claims",
    'Show employees over their tier limit',
    'Project spending for this month',
    'List the top-10 diseases (ICD-10)',
    'Check for claim anomalies',
    'What wellness services are in the ecosystem?',
  ],
  zh: [
    '总结本月理赔',
    '哪些员工超出限额？',
    '预测本月支出',
    '十大疾病（ICD-10）',
    '检查理赔异常',
    '生态系统有哪些健康服务？',
  ],
  id: [
    'Ringkaskan tuntutan bulan ini',
    'Pekerja yang melebihi had tier',
    'Unjuran perbelanjaan bulan ini',
    '10 penyakit teratas (ICD-10)',
    'Semak anomali tuntutan',
    'Perkhidmatan kesihatan dalam ekosistem?',
  ],
};

const WELCOME_MESSAGES: Record<string, string> = {
  en: "Hello! I'm the Health Savvy demo assistant. My responses are simulated from the platform's outpatient claims data — no external AI service is called. Ask me about claims, tier limits, diseases, or ecosystem services.",
  zh: '您好！我是 Health Savvy 演示助手。我的回复基于平台的门诊理赔数据模拟生成，不调用任何外部 AI 服务。您可以询问理赔、等级限额、疾病或生态系统服务。',
  id: 'Halo! Saya pembantu demo Health Savvy. Respons saya disimulasikan daripada data tuntutan pesakit luar platform — tiada perkhidmatan AI luaran dipanggil. Tanya saya tentang tuntutan, had tier, penyakit atau perkhidmatan ekosistem.',
};

const THINKING_MESSAGES: Record<string, string> = {
  en: 'Assistant is thinking...',
  zh: '助手正在思考...',
  id: 'Pembantu sedang berfikir...',
};

const PLACEHOLDER_MESSAGES: Record<string, string> = {
  en: 'Ask anything about your healthcare data...',
  zh: '询问有关医疗数据的任何问题...',
  id: 'Tanyakan apa sahaja tentang data kesihatan anda...',
};

function uid() {
  return Math.random().toString(36).slice(2);
}

function ChatChartView({ chart }: { chart: ChatChart }) {
  return (
    <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-navy-800/50 border border-slate-100 dark:border-navy-700">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">{chart.title}</p>
      {chart.type === 'bar' && <BarChart labels={chart.labels} values={chart.values} height={140} showValues />}
      {chart.type === 'line' && <LineChart labels={chart.labels} values={chart.values} height={140} />}
      {chart.type === 'donut' && <DonutChart labels={chart.labels} values={chart.values} size={140} />}
    </div>
  );
}

function formatMessage(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('• ') || line.match(/^\d+\.\s/)) {
      return <div key={i} className="text-sm leading-relaxed pl-1" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
    }
    if (line.trim() === '') return <div key={i} className="h-1.5" />;
    return <div key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
  });
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy-900 dark:text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-slate-500">$1</em>');
}

export function ChatAssistant() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'zh', label: '中文', flag: '中' },
    { code: 'id', label: 'بهاس ملايو', flag: 'ID' },
  ];

  const currentLang = languageOptions.find(l => l.code === language) || languageOptions[0];

  // Set welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en,
        timestamp: Date.now(),
      },
    ]);
  }, [language]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClick = () => setLangDropdownOpen(false);
    if (langDropdownOpen) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [langDropdownOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { id: uid(), role: 'user', content: text, timestamp: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const { text: replyText, chart } = await getAssistantResponse(text, history, language);
    const aiMsg: ChatMessage = { id: uid(), role: 'assistant', content: replyText, chart, timestamp: Date.now() };
    setMessages((m) => [...m, aiMsg]);
    setLoading(false);
  }

  function toggleVoice() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert('Voice input is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    if (listening) {
      setListening(false);
      return;
    }
    const recognition = new SR();
    // Set recognition language based on current language
    recognition.lang = language === 'zh' ? 'zh-CN' : language === 'id' ? 'id-ID' : 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  }

  const suggestions = SUGGESTIONS[language] || SUGGESTIONS.en;
  const thinkingMsg = THINKING_MESSAGES[language] || THINKING_MESSAGES.en;
  const placeholderMsg = PLACEHOLDER_MESSAGES[language] || PLACEHOLDER_MESSAGES.en;

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-ai flex items-center justify-center text-white hover:scale-105 transition-all duration-300 animate-float group"
          aria-label="Open AI Assistant"
        >
          <div className="absolute inset-0 rounded-2xl bg-brand-500 animate-pulse-glow opacity-60" />
          <Icons.Sparkles className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full border-2 border-white" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[420px] max-h-[600px] h-[min(600px,calc(100vh-3rem))] card flex flex-col overflow-hidden animate-scale-in shadow-glow">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Icons.Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">NTT DATA AI Assistant</h3>
                <p className="text-xs text-white/70">{t('appSubtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setLangDropdownOpen(!langDropdownOpen); }}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium"
                >
                  <span className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    {currentLang.flag}
                  </span>
                  <span className="hidden sm:inline text-xs">{currentLang.label}</span>
                  <Icons.ChevronDown className={`w-3 h-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {langDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-36 bg-white dark:bg-navy-900 rounded-lg border border-slate-200 dark:border-navy-800 shadow-lg animate-fade-in overflow-hidden z-50">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={(e) => { e.stopPropagation(); setLanguage(lang.code); setLangDropdownOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left transition ${
                          language === lang.code
                            ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400'
                            : 'hover:bg-slate-50 dark:hover:bg-navy-800 text-navy-700 dark:text-slate-200'
                        }`}
                      >
                        <span className="w-5 h-5 rounded bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-[10px] font-bold">
                          {lang.flag}
                        </span>
                        <span className="text-sm">{lang.label}</span>
                        {language === lang.code && <Icons.Check className="w-3.5 h-3.5 ml-auto text-brand-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition" aria-label="Close chat">
                <Icons.X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-navy-950">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] ${m.role === 'user' ? 'bg-brand-500 text-white' : 'card p-3'} rounded-2xl`}>
                  {m.role === 'assistant' && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Icons.Sparkles className="w-3.5 h-3.5 text-brand-500" />
                      <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">AI Assistant (Demo)</span>
                    </div>
                  )}
                  <div className={m.role === 'user' ? 'text-sm leading-relaxed' : 'text-slate-700 dark:text-slate-200'}>
                    {formatMessage(m.content)}
                  </div>
                  {m.chart && <ChatChartView chart={m.chart} />}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="card p-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-slate-400">{thinkingMsg}</span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5 bg-slate-50 dark:bg-navy-950">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-navy-700 text-slate-600 dark:text-slate-300 hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-400 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-slate-100 dark:border-navy-800 bg-white dark:bg-navy-900">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleVoice}
                className={`p-2.5 rounded-xl transition ${listening ? 'bg-danger-500 text-white animate-pulse' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800'}`}
                aria-label="Voice input"
              >
                <Icons.Mic className="w-4.5 h-4.5" />
              </button>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder={placeholderMsg}
                className="flex-1 input text-sm py-2"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-40 transition"
                aria-label="Send"
              >
                <Icons.SendHorizontal className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
