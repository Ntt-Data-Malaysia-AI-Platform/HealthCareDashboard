import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ChatAssistant } from './components/ChatAssistant';
import { HrPage } from './pages/HrPage';
import { DoctorPage } from './pages/DoctorPage';
import { PatientPage } from './pages/PatientPage';
import { ROLE_PERMISSIONS } from './data';
import { LanguageProvider } from './lib/i18n';
import type { Page, Role } from './types';

function App() {
  const [page, setPage] = useState<Page>('hr');
  const [role, setRole] = useState<Role>('HR');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  // When role changes, navigate to that role's page
  useEffect(() => {
    const allowed = ROLE_PERMISSIONS[role];
    if (allowed.length > 0 && !allowed.includes(page)) {
      setPage(allowed[0]);
    }
  }, [role]);

  const allowed = ROLE_PERMISSIONS[role];
  const effectivePage = allowed.includes(page) ? page : allowed[0] || 'hr';

  return (
    <LanguageProvider>
      <Layout page={effectivePage} setPage={setPage} role={role} setRole={setRole} dark={dark} setDark={setDark}>
        {effectivePage === 'hr' && <HrPage />}
        {effectivePage === 'doctor' && <DoctorPage />}
        {effectivePage === 'patient' && <PatientPage />}
      </Layout>
      <ChatAssistant />
    </LanguageProvider>
  );
}

export default App;
