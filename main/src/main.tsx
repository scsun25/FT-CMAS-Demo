// import 'primeflex/primeflex.css';
// import 'primeicons/primeicons.css';
// import 'primereact/resources/primereact.min.css';

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { PrimeReactProvider } from 'primereact/api';
import { ProgressSpinner } from 'primereact/progressspinner';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { auth } from './features/auth/firebase.ts';
import './index.css';
import HomePageLayout from './pages/home.tsx';

function RootWithProgress() {
  const { loading, setLoading } = useProgress();
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authChecked) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [authChecked, setLoading]);

  return (
    <>
      <div className={loading ? 'pointer-events-none select-none bg-gray-900 opacity-50' : ''}>
        <HomePageLayout currentUser={currentUser} />
      </div>
      {loading && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center h-screen w-screen pointer-events-none select-none">
          <div className="relative z-10 flex items-center justify-center">
            <ProgressSpinner style={{ width: '10rem', height: '10rem' }} strokeWidth="4" />
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider>
      <AuthProvider>
        <PrimeReactProvider>
          <RootWithProgress />
        </PrimeReactProvider>
      </AuthProvider>
    </ProgressProvider>
  </StrictMode>
);
