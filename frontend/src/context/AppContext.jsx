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

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get("/api/user/me");
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
        toast.error(error.data?.message || "Something went wrong");
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
