import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

const useAuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromLocalStorage = window.localStorage.getItem('user');
    if (!userFromLocalStorage) {
      return;
    }
    setUser(JSON.parse(userFromLocalStorage));
  }, []);

  const fetchUserWithToken = async token => {
    const rawUserData = await fetch(`${API_HOST}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonUserData = await rawUserData.json();
    setUser(jsonUserData);
    window.localStorage.setItem('user', JSON.stringify(jsonUserData));
  };

  return {
    user,
    fetchUserWithToken,
  };
};

const AuthProvider = ({ children }) => {
  const auth = useAuthStatus();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
