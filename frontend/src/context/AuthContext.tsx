import { createContext, useContext, useEffect, useState } from 'react';
import { getMe } from '../services/profile';
import { getToken } from '../services/session';

type User = {
  id: number;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  reload: () => void;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, reload: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!getToken()) { setLoading(false); return; }
    setLoading(true);
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <AuthContext.Provider value={{ user, loading, reload: load }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);