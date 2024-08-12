// /contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    const storedToken = Cookies.get('access_token');
    if (storedUsername && storedToken) {
      setUsername(storedUsername);
      setToken(storedToken);
    } else {
      setUsername('');
      setToken(null);
    }
  }, []);

  const login = (username, token) => {
    Cookies.set('username', username, { expires: 1, secure: true, sameSite: 'Lax' });
    Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'Lax' });
    setUsername(username);
    setToken(token);
    router.push('/');
  };

  const logout = () => {
    Cookies.remove('username');
    Cookies.remove('access_token');
    setUsername('');
    setToken(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
