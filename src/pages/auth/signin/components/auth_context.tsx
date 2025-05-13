// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthCtx {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuth] = useState<boolean>(
    () => localStorage.getItem('auth') === '1'
  );
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const res = await fetch(
      'https://api.projectdevdnkchain.ru/test-admin-auth',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          auth: password,
          login: email
        }
      }
    );

    if (res.status === 200) {
      localStorage.setItem('auth', '1');
      setAuth(true);
      navigate('/users', { replace: true });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(false);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
};
