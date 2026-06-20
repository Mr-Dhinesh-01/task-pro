import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuthStore } from './authStore';
import type { AuthResult } from './authService';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const signIn = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();

  const handleAuthed = (result: AuthResult) => {
    signIn(result);
    navigate('/board', { replace: true });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
        {mode === 'login' ? (
          <LoginForm onAuthed={handleAuthed} onSwitchToSignup={() => setMode('signup')} />
        ) : (
          <SignupForm onAuthed={handleAuthed} onSwitchToLogin={() => setMode('login')} />
        )}
      </div>
    </div>
  );
}