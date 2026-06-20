import { Board } from './Board';
import { useAuthStore } from '@/features/auth/authStore';

export default function BoardPage() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', padding: '24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', margin: 0 }}>task-pro</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '14px', color: '#475569' }}>{user?.name}</span>
            <button onClick={signOut} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 14px', fontSize: '14px', fontWeight: 600, color: '#0f172a', cursor: 'pointer' }}>Sign out</button>
          </div>
        </div>
        <Board />
      </div>
    </div>
  );
}