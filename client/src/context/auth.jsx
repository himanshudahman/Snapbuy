import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => ({
    user: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    token: "",
  }));

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("auth"));
      if (data) {
        setAuth(data);
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
