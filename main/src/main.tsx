import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
// import 'primereact/resources/primereact.min.css';

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { PrimeReactProvider } from 'primereact/api';
import { ProgressSpinner } from 'primereact/progressspinner';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { auth } from './features/auth/firebase.ts';
import './index.css';
import AppRouter from './routes/AppRouter';
import { updateGlobalProgressSpinner } from './utils/useGlobalProgress.ts';

const RootWithProgress = () => {
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
      updateGlobalProgressSpinner(false, setLoading, 500);
    }
  }, [authChecked, setLoading, currentUser]);

  return (
    <AppRouter currentUser={currentUser} loading={loading}>
      {loading && (
        <ProgressSpinner
          id="loading-spinner"
          style={{ width: '1rem', height: '1rem' }}
          strokeWidth="4"
        />
      )}
    </AppRouter>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider>
      <PrimeReactProvider>
        <AuthProvider>
          <BrowserRouter>
            <RootWithProgress />
          </BrowserRouter>
        </AuthProvider>
      </PrimeReactProvider>
    </ProgressProvider>
  </StrictMode>
);
