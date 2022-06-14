import React, { createContext, useContext, useEffect, useState } from "react";

import api, { apiLogin } from "../services/api";

const AuthContext = createContext({});
const LOCAL_USER = "@ToDo:user";

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(info) {
    try {
      const response = await apiLogin(info.email, info.password);

      api.defaults.headers.common["Authorization"] = response.token;
      setUser(response);

      if (info.remember)
        localStorage.setItem(LOCAL_USER, JSON.stringify(response));
      else sessionStorage.setItem(LOCAL_USER, JSON.stringify(response));
    } catch (error) {
      alert("Erro no login!");
    }
  }

  function logout() {
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    localStorage.removeItem(LOCAL_USER);
    sessionStorage.removeItem(LOCAL_USER);
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem(LOCAL_USER)
      ? localStorage.getItem(LOCAL_USER)
      : sessionStorage.getItem(LOCAL_USER);

    if (storagedUser) {
      const data = JSON.parse(storagedUser);
      if (new Date(data.exp).getTime() < Date.now()) return;

      setUser(data);
      api.defaults.headers.common["Authorization"] = data.token;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
