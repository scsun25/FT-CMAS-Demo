import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import { useAuth } from '../context/AuthContext';
import { handleAuth, handleGoogleSignUp } from '../features/auth/firebaseAuthHandlers';

const LoginPage: React.FC = () => {
  // User Hook
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  // Declare state variables
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signUpVisible, setSignUpVisible] = useState<boolean>(false);
  const [checkTerms, setCheckTerms] = useState<boolean>(false);
  const [greet, setGreet] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (mode: 'signin' | 'signup') => {
    await handleAuth(mode, email, password, setGreet, setError, setUser);
  };

  const clearMailAndPassword = () => {
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <img src={reactLogo} className="p-4" alt="React Logo" />
      {user?.displayName !== undefined ? (
        (() => {
          navigate('/');
          return null;
        })()
      ) : (
        <Card className="max-w-md min-w-[300px] mx-auto shadow-2xl border border-gray-200 rounded-xl">
          <div className="std-layout flex flex-col">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full"
            />

            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              toggleMask
              feedback={false}
              inputClassName="w-full"
            />
            <button className="button">Forgot password ?</button>
            <div id="space" />
            <Button
              label="Sign In"
              className="w-full"
              onClick={() => handleSubmit('signin')}
              disabled={!(email.length > 0 && password.length > 0)}
            />
            <button
              className="button"
              onClick={() => {
                clearMailAndPassword();
                setSignUpVisible(true);
              }}
            >
              Don't have an account ?
            </button>
            {error && <div className="text-red-600 text-center mt-2">{error}</div>}
            {greet && <div className="text-green-700 text-center mt-2">{greet}</div>}
          </div>

          <Dialog
            header="Welcom to join CMAS !"
            visible={signUpVisible}
            style={{ width: '50vw' }}
            position={'top'}
            onHide={() => {
              clearMailAndPassword();
              setSignUpVisible(false);
              if (!signUpVisible) return;
            }}
          >
            <Card className="max-w-md min-w-[150px] mx-auto shadow-2xl border border-gray-200 rounded-xl">
              <div className="std-layout flex flex-col">
                <InputText
                  id="email-signup"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full"
                  style={{ marginTop: '0rem' }}
                />
                <Password
                  id="password-signup"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  toggleMask
                  feedback={false}
                  className="w-full"
                  inputClassName="w-full"
                />
                <Button
                  label="Create new account"
                  className="w-full"
                  onClick={() => handleSubmit('signup')}
                  disabled={!checkTerms || !(email.length > 0 && password.length > 0)}
                />
                <Button
                  outlined
                  label="Sign up with Google account"
                  className="w-full"
                  onClick={async () => {
                    await handleGoogleSignUp(setGreet, setError, setUser);
                  }}
                  disabled={!checkTerms}
                />
                <div
                  className="pure flex flex-wrap"
                  style={{ marginTop: '0.5rem', alignItems: 'center' }}
                >
                  <Checkbox
                    className="pure"
                    style={{ marginRight: '0.5rem' }}
                    onChange={(e) => setCheckTerms(!!e.checked)}
                    checked={checkTerms}
                  ></Checkbox>
                  <div style={{ fontSize: '0.75rem' }}> I agree CMAS Terms of Use</div>
                </div>

                {error && <div className="text-red-600 text-center mt-2">{error}</div>}
                {greet && <div className="text-green-700 text-center mt-2">{greet}</div>}
              </div>
            </Card>
          </Dialog>
        </Card>
      )}
    </div>
  );
};

export default LoginPage;
