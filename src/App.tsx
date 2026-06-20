import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '@/features/auth/AuthPage';
import ProtectedRoute from '@/features/auth/ProtectedRoute';

// the board's code is split into its own chunk, loaded on demand
const BoardPage = lazy(() => import('@/features/board/BoardPage'));

// a small fallback shown while the board chunk downloads
function PageLoading() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}>
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route
            path="/board"
            element={
              <ProtectedRoute>
                <BoardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/board" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}