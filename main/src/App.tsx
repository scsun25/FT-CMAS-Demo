import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
function App() {
  const [email, setEmail] = useState('');
  const [greet, setGreet] = useState('');

  const handleLogin = () => {
    setGreet(`Welcome to CMAS Project${email ? ', ' + email : ''}!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-1/4 min-w-[300px] max-w-md p-6 shadow-2xl border border-gray-200 rounded-xl">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Sign in</h2>
          <p className="text-gray-600 text-center w-full mb-8">to continue to CMAS Project</p>
          <div className="w-full flex flex-col gap-6" style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="w-full">
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-2 border border-gray-300 rounded focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                autoFocus
              />
            </div>
          </div>
          <Button
            label="Next"
            icon="pi pi-arrow-right"
            iconPos="right"
            onClick={handleLogin}
            className="w-full p-button-primary mt-2 mb-8"
          />
          {greet && (
            <div className="text-center text-blue-700 text-base font-bold mt-2">{greet}</div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default App;
