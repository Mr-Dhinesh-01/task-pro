import { Navigate } from 'react-router-dom';
import { useAuthStore } from './authStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);

  // not signed in → bounce to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}