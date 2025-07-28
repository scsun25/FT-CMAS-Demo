import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { onAuthStateChanged } from 'firebase/auth';
import { PrimeReactProvider } from 'primereact/api';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { auth } from './firebase';

function RootWithProgress() {
  const { loading, setLoading } = useProgress();
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
      {/* Auth status indicator */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] text-lg font-bold text-white bg-black bg-opacity-60 px-6 py-2 rounded-full shadow-lg select-none pointer-events-none">
        {currentUser ? 'valid' : 'invalid'}
      </div>
      <div className={loading ? 'pointer-events-none select-none bg-gray-900 opacity-50' : ''}>
        <App />
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen pointer-events-auto">
          <div className="relative z-10 flex items-center justify-center pointer-events-auto">
            <ProgressSpinner style={{ width: '10rem', height: '10rem' }} strokeWidth="4" />
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <ProgressProvider>
        <AuthProvider>
          <RootWithProgress />
        </AuthProvider>
      </ProgressProvider>
    </PrimeReactProvider>
  </StrictMode>
);
