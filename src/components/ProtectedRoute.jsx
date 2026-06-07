import { useAuthStore } from '../stores/authStore';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component that checks if user is authenticated
 * If not authenticated, redirects to login page
 */
export function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.accessToken);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666',
      }}>
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/**
 * PublicRoute component that redirects authenticated users
 * Useful for login/signup pages
 */
export function PublicRoute({ children }) {
  const token = useAuthStore((state) => state.accessToken);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
