import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check session on initial load
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('access_token');
    if (storedUsername && storedToken) {
      setUsername(storedUsername);
      setToken(storedToken);
    } else {
      setUsername('');
      setToken(null);
    }
  }, []);

  const login = (username, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('access_token', token);
    setUsername(username);
    setToken(token);
    router.push('/');
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
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
