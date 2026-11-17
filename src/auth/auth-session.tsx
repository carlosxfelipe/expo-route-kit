import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

// Set to false to disable the login flow and start directly on the main tabs.
export const REQUIRE_AUTH = true;

interface AuthSessionContextValue {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthSessionContext = createContext<AuthSessionContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!REQUIRE_AUTH);

  const signIn = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    if (!REQUIRE_AUTH) return;
    setIsAuthenticated(false);
  }, []);

  const value = useMemo<AuthSessionContextValue>(
    () => ({
      isAuthenticated,
      signIn,
      signOut,
    }),
    [isAuthenticated, signIn, signOut]
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export function useAuthSession(): AuthSessionContextValue {
  const context = useContext(AuthSessionContext);
  if (!context) {
    throw new Error('useAuthSession must be used within an AuthProvider');
  }
  return context;
}
