// the public surface of the auth feature
export { default as AuthPage } from './AuthPage';
export { default as ProtectedRoute } from './ProtectedRoute';
export { useAuthStore } from './authStore';

// LoginForm and SignupForm are used only inside AuthPage,
// so we deliberately do NOT export them here.