import { useState } from 'react';
import { signup, type AuthResult } from './authService';

interface SignupFormProps {
  onAuthed: (result: AuthResult) => void;
  onSwitchToLogin: () => void;
}

export default function SignupForm({ onAuthed, onSwitchToLogin }: SignupFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Please enter your name.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await signup(name.trim(), email.trim(), password);
      onAuthed(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>Create account</h2>

      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }}
      />

      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', fontSize: '14px' }}
      />

      <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Choose a password (min 6 chars)"
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
        {loading ? 'Creating…' : 'Create account'}
      </button>

      <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', color: '#0891b2', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
          Sign in
        </button>
      </p>
    </form>
  );
}