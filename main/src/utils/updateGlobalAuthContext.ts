import type { User } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

/**
 * Reusable function to update the global AuthContext from any component.
 * Usage:
 *   const updateAuth = updateGlobalAuthContext();
 *   updateAuth(user); // set user in AuthContext
 */
export const updateGlobalAuthContext = () => {
  const { setUser } = useAuth();
  return (user: User | null) => setUser(user);
};
