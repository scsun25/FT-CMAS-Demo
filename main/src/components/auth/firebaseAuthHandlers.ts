import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../features/auth/firebase';

export const handleAuth = async (
  mode: 'signin' | 'signup',
  email: string,
  password: string,
  setGreet: (msg: string) => void,
  setError: (msg: string) => void
) => {
  setError('');
  setGreet('');
  try {
    if (mode === 'signin') {
      await signInWithEmailAndPassword(auth, email, password);
      setGreet(`Welcome back to CMAS Project${email ? ', ' + email : ''}!`);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      setGreet(`Account created! Welcome to CMAS Project${email ? ', ' + email : ''}!`);
    }
  } catch (err: any) {
    setError(err.message || 'Authentication failed');
  }
};

export const handleGoogleSignUp = async (
  setGreet: (msg: string) => void,
  setError: (msg: string) => void
) => {
  setError('');
  setGreet('');
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setGreet(`Welcome to CMAS Project, ${user.displayName || user.email}!`);
  } catch (err: any) {
    setError(err.message || 'Google Sign-Up failed');
  }
};
