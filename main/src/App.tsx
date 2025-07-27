import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useState } from 'react';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [greet, setGreet] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const handleAuth = async () => {
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

  const handleGoogleSignUp = async () => {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-1/4 min-w-[300px] max-w-md p-6 shadow-2xl border border-gray-200 rounded-xl mb-8">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800">{'Welcome to CMAS'}</h2>
          <div className="w-full flex flex-col gap-4 mb-8">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full py-2 border border-gray-300 rounded focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              autoFocus
            />
            <div className="w-full flex flex-col" style={{ marginBottom: '1rem' }}></div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              toggleMask
              feedback={false}
              style={{ display: 'block' }}
              inputClassName="w-full py-2 border border-gray-300 rounded focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="w-full flex flex-col" style={{ marginBottom: '1rem' }}></div>

          <Button
            label={mode === 'signin' ? 'Sign In' : 'Sign Up'}
            icon={mode === 'signin' ? 'pi pi-sign-in' : 'pi pi-user-plus'}
            iconPos="right"
            onClick={handleAuth}
            className="w-full p-button-primary mt-2 mb-8"
          />

          <div className="w-full flex flex-col" style={{ marginBottom: '1rem' }}></div>
          <Button
            label="Sign in with Google"
            icon="pi pi-google"
            iconPos="left"
            onClick={handleGoogleSignUp}
            className="w-full p-button-secondary mt-2 mb-8"
            // style={{ visibility: mode === 'signin' ? 'hidden' : '' }}
          />

          <div className="w-full flex flex-col" style={{ marginBottom: '1rem' }}></div>
          <button
            className="text-blue-600 hover:underline text-sm mb-2 bg-transparent border-none cursor-pointer"
            type="button"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
          {error && (
            <div className="text-center text-red-600 text-sm font-medium mt-2">{error}</div>
          )}
          {greet && (
            <div className="text-center text-blue-700 text-base font-bold mt-2">{greet}</div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default App;
