import { useState } from 'react';
import { login, type AuthResult } from './authService';

interface LoginFormProps {
  onAuthed: (result: AuthResult) => void;
  onSwitchToSignup: () => void;
}

export default function LoginForm({ onAuthed, onSwitchToSignup }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await login(email.trim(), password);
      onAuthed(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Sign in</h2>

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="sarah.johnson@company.com"
        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }}
      />

      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }}
      />

      {error && (
        <div style={{ background: '#fef2f2', borderLeft: '3px solid #dc2626', borderRadius: '0 8px 8px 0', padding: '10px 14px', color: '#991b1b', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{ background: '#61dafb', color: '#0f172a', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', fontWeight: 700, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
        No account?{' '}
        <button type="button" onClick={onSwitchToSignup} style={{ background: 'none', border: 'none', color: '#0891b2', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
          Create one
        </button>
      </p>
    </form>
  );
}