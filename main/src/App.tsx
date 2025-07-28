import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { useState } from 'react';

import { useAuth } from './context/AuthContext';
import { handleAuth, handleGoogleSignUp } from './features/auth/firebaseAuthHandlers';
import { auth } from './firebase';

function App() {
  const [email, setEmail]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState<string>('');
  const [password, setPassword]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState<string>('');
  const [showPassword, setShowPassword]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] =
    useState<boolean>(false);
  const [greet, setGreet]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState<string>('');
  const [error, setError]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState<string>('');
  const [mode, setMode]: [
    'signin' | 'signup',
    React.Dispatch<React.SetStateAction<'signin' | 'signup'>>,
  ] = useState<'signin' | 'signup'>('signin');
  const { user, setUser } = useAuth();

  if (user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-300">
        <Card className="max-w-md min-w-[300px] w-full mx-auto p-6 shadow-2xl border border-gray-200 rounded-xl">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome, {user.displayName || user.email}!
            </h2>
            <Button
              label="Sign Out"
              icon="pi pi-sign-out"
              onClick={() => auth.signOut()}
              className="w-full p-button-secondary mt-8"
            />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="max-w-md min-w-[300px] mx-auto p-6 shadow-2xl border border-gray-200 rounded-xl">
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
            onClick={() => handleAuth(mode, email, password, setGreet, setError)}
            className="w-full p-button-primary mt-2 mb-8"
          />

          <div className="w-full flex flex-col" style={{ marginBottom: '1rem' }}></div>
          <Button
            label="Sign in with Google"
            icon="pi pi-google"
            iconPos="left"
            onClick={() => handleGoogleSignUp(setGreet, setError)}
            className="w-full p-button-secondary mt-2 mb-8"
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
