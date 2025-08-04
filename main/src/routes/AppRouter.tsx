import type { User } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import PatientManage from '../pages/PatientManage';
import MainLayout from './MainLayout';

interface AppRouterProps {
  currentUser: User | null;
  loading: boolean;
  children?: React.ReactNode;
}

const AppRouter: React.FC<AppRouterProps> = ({ currentUser, loading, children }) => (
  <div className={loading ? 'pointer-events-none select-none bg-gray-900 opacity-50' : ''}>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/patient" element={<PatientManage />} />
      </Route>
    </Routes>
    {children}
  </div>
);

export default AppRouter;
