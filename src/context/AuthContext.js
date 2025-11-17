import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {email, role}

  const login = (email, role) => {
    const u = { email, role };
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('user'));
    if (saved) setUser(saved);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};