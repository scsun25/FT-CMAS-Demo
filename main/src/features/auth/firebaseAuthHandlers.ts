import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';

import type { User as FirebaseUser, UserCredential } from 'firebase/auth';

export const updateAuthContext = (
  setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>,
  user: FirebaseUser | null
) => {
  setUser(user);
};

export const handleAuth: (
  mode: 'signin' | 'signup',
  email: string,
  password: string,
  setGreet: (msg: string) => void,
  setError: (msg: string) => void,
  setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>
) => Promise<void> = async (mode, email, password, setGreet, setError, setUser) => {
  setError('');
  setGreet('');
  try {
    if (mode === 'signin') {
      result = await signInWithEmailAndPassword(auth, email, password);
      setGreet(`Welcome back to CMAS Project${email ? ', ' + email : ''}!`);
    } else {
      result = await createUserWithEmailAndPassword(auth, email, password);
      setGreet(`Account created! Welcome to CMAS Project${email ? ', ' + email : ''}!`);
    }
    updateAuthContext(setUser, result.user);
  } catch (err: any) {
    setError(err.message || 'Authentication failed');
  }
};

export const handleGoogleSignUp: (
  setGreet: (msg: string) => void,
  setError: (msg: string) => void,
  setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>
) => Promise<void> = async (setGreet, setError, setUser) => {
  setError('');
  setGreet('');
  try {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    const user = result.user;
    setGreet(`Welcome to CMAS Project, ${user.displayName || user.email}!`);
    updateAuthContext(setUser, user);
  } catch (err: any) {
    setError(err.message || 'Google Sign-Up failed');
  }
};
