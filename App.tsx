
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import EditorDashboard from './components/EditorDashboard';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string) => {
    // Simulated login
    setUser({
      email,
      name: email.split('@')[0] || 'User'
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen">
      {user ? (
        <EditorDashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
