import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Backend
  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,

    withCredentials: true,
  });

  // Get logged user
  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await api.get("/api/user/me");
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        setUser(null);
        if (error.response?.status !== 401) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      }
    };
    loadUser();
  }, []);

  const value = {
    api,
    user,
    setUser,
    navigate,
  };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
