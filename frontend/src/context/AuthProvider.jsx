import { useState } from "react";
import { AuthContext } from "./AuthContext";
import apiClient from "../api/apiClient";

export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const login = async (email, password) => {

    const res = await apiClient.post("auth/login/", {
      email,
      password
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    if (res.data.user) {
      localStorage.setItem("role", res.data.user.role);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}