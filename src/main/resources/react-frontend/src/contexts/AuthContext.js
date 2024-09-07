import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [userEmail, setUserEmail] = useState(AuthService.getUserEmail());
  const [userId, setUserId] = useState(AuthService.getUserId());
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProjectManager, setIsProjectManager] = useState(false);
  const [isTeamLeader, setIsTeamLeader] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isTester, setIsTester] = useState(false);

  useEffect(() => {
    const token = AuthService.getAccessToken();
    const email = AuthService.getUserEmail();
    const id = AuthService.getUserId(); // Get the user ID
    const role = AuthService.getUserRole();

    if (token) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserId(id);
      setIsAdmin(role === 'ROLE_ADMIN'); // adjust role check as needed
      setIsTeamLeader(role === 'ROLE_TEAMLEADER');
      setIsProjectManager(role === 'ROLE_PROJECTMANAGER');
      setIsDeveloper(role === 'ROLE_DEVELOPER');
      setIsTester(role === 'ROLE_TESTER');
    }
  }, []);

  const login = async (loginData) => {
    await AuthService.login(loginData);
    const role = AuthService.getUserRole();
    setIsAuthenticated(true);
    setUserEmail(AuthService.getUserEmail());
    setUserId(AuthService.getUserId());
    setIsAdmin(role === 'ROLE_ADMIN'); // adjust role check as needed
    setIsTeamLeader(role === 'ROLE_TEAMLEADER');
    setIsProjectManager(role === 'ROLE_PROJECTMANAGER');
    setIsDeveloper(role === 'ROLE_DEVELOPER');
    setIsTester(role === 'ROLE_TESTER');
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserId(null);
    setIsAdmin(false);
    setIsTeamLeader(false);
    setIsProjectManager(false);
    setIsDeveloper(false);
    setIsTester(false);
  };

  const register = async (registerData) => {
    const user = await AuthService.register(registerData);
    const role = AuthService.getUserRole();
    setIsAuthenticated(true);
    setUserEmail(AuthService.getUserEmail());
    setUserId(AuthService.getUserId());
    setIsAdmin(role === 'ROLE_ADMIN');
    setIsTeamLeader(role === 'ROLE_TEAMLEADER');
    setIsProjectManager(role === 'ROLE_PROJECTMANAGER');
    setIsDeveloper(role === 'ROLE_DEVELOPER');
    setIsTester(role === 'ROLE_TESTER');
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, userId, isAdmin, isProjectManager, isTeamLeader, isDeveloper, isTester, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
