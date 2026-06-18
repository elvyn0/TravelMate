import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function Header() {
  const { api, user, setUser, navigate } = useContext(AppContext);

  // logout handler
  const handleLogout = async () => {
    try {
      const { data } = await api.post("/api/user/logout");

      if (data.success) {
        setUser(null);
        localStorage.removeItem("user");

        toast.success(data.message);

        navigate("/");
      }
    } catch (error) {
      console.error("Logout Error:", error);

      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-row justify-between p-5">
      <div>
        <h1 className="font-bold text-lg md:text-4xl text-teal-800">Ai TravelMate</h1>
      </div>
      {!user ? (
        <NavLink
          to="/login"
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl shadow-sm hover:bg-blue-500 hover:shadow-md transition-all duration-300"
        >
          SingIn
        </NavLink>
      ) : (
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl shadow-sm hover:bg-slate-700 hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          SingOut
        </button>
      )}
    </div>
  );
}

export default Header;
