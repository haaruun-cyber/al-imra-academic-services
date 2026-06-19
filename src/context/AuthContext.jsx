import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('al_imra_user') || 'null'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('al_imra_token');
    if (!token) return;
    setLoading(true);
    api.get('/auth/me')
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem('al_imra_user', JSON.stringify(data.user));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('al_imra_token', data.token);
    localStorage.setItem('al_imra_user', JSON.stringify(data.user));
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('al_imra_token');
    localStorage.removeItem('al_imra_user');
    setUser(null);
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
