import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { NAV_ITEMS, APP_VERSION, ROLES, ROLE_PERMISSIONS } from '../data';
import { useLanguage } from '../lib/i18n';
import type { Page, Role } from '../types';

interface LayoutProps {
  page: Page;
  setPage: (p: Page) => void;
  role: Role;
  setRole: (r: Role) => void;
  dark: boolean;
  setDark: (d: boolean) => void;
  children: React.ReactNode;
}

export function Layout({ page, setPage, role, setRole, dark, setDark, children }: LayoutProps) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const allowedPages = ROLE_PERMISSIONS[role];
  const navItems = NAV_ITEMS.filter((n) => allowedPages.includes(n.id));

  return (
    <div className={`min-h-screen ${dark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-navy-950 flex flex-col">
        {/* Header */}
        <header className="h-16 glass border-b border-slate-200/60 dark:border-navy-800 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shrink-0 shadow-glow">
              <Icons.HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-navy-900 dark:text-white text-sm">
                {t('appName')}
              </h1>
              <p className="text-[10px] text-slate-400">{t('appSubtitle')}</p>
            </div>
          </div>

          {/* Right: Dark mode + Role selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl text-navy-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition"
              aria-label="Toggle dark mode"
            >
              {dark ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-navy-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-semibold">
                {role.charAt(0)}
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="text-xs font-medium bg-transparent text-navy-700 dark:text-slate-200 border-none focus:outline-none cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r} className="bg-white dark:bg-navy-900">
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <div key={page} className="animate-fade-in">{children}</div>
        </main>

        {/* Footer */}
        <footer className="hidden md:block px-6 py-4 border-t border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-navy-700 dark:text-slate-300">NTT DATA</span>
              <span className="text-slate-300 dark:text-navy-700">|</span>
              <span>{t('appSubtitle')}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{t('enterpriseHealthcarePlatform')}</span>
              <span className="text-slate-300 dark:text-navy-700">|</span>
              <span>{t('version')} {APP_VERSION}</span>
            </div>
          </div>
        </footer>

        {/* Bottom nav - mobile */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-navy-900 border-t border-slate-200 dark:border-navy-800 flex items-center justify-around px-2 py-1.5 safe-area">
            {navItems.map((item) => {
              const Icon = (Icons as any)[item.icon] || Icons.Circle;
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition flex-1 ${
                    active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-medium truncate max-w-[60px]">{item.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
}
