// AuthProvider.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Check localStorage on initial load
    const storedAdminName = localStorage.getItem('adminName');
    if (storedAdminName) {
      setAdminName(storedAdminName);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username) => {
    setAdminName(username);
    setIsAuthenticated(true);
    localStorage.setItem('adminName', username); // Store adminName in localStorage
  };

  const logout = () => {
    setAdminName('');
    setIsAuthenticated(false);
    localStorage.removeItem('adminName'); // Remove adminName from localStorage on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);