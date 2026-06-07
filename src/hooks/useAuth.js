import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook to persist auth state from localStorage
 * Call this in your main App component
 */
export function useAuthPersistence() {
  const setToken = useAuthStore((state) => {
    return (token, refreshToken) => {
      if (token) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        state.accessToken = token;
        state.refreshToken = refreshToken;
      }
    };
  });

  useEffect(() => {
    // Load tokens from localStorage on app mount
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      useAuthStore.setState({
        accessToken,
        refreshToken,
      });

      // Optionally verify token is still valid
      // useAuthStore.getState().getCurrentUser().catch(() => {
      //   useAuthStore.getState().logout();
      // });
    }
  }, []);
}

/**
 * Hook to handle token refresh automatically
 * Refreshes token before it expires
 */
export function useTokenRefresh() {
  const { refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      refreshAccessToken().catch((error) => {
        console.log('Token refresh failed, user may need to login again:', error.message);
      });
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(refreshInterval);
  }, [refreshAccessToken]);
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  return useAuthStore((state) => state.accessToken !== null);
}

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useAuthStore((state) => state.user);
}

/**
 * Hook to perform logout
 */
export function useLogout() {
  return useAuthStore((state) => state.logout);
}

/**
 * Hook to handle Google login redirect
 */
export function useGoogleLoginHandler() {
  useEffect(() => {
    // Check if we're returning from Google OAuth
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');
    const userId = params.get('userId');

    if (accessToken && refreshToken) {
      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Update store
      useAuthStore.setState({
        accessToken,
        refreshToken,
        user: { userId },
      });

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Get full user profile
      useAuthStore.getState().getCurrentUser();
    }
  }, []);
}
