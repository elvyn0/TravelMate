import { useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useContext } from "react";

function Login() {
  const { api, setUser, navigate } = useContext(AppContext);

  const [currentState, setCurrentState] = useState("singUp");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // User register
    try {
      if (currentState === "singUp") {
        const trimedName = name.trim();
        const trimedEmail = email.trim();
        const trimedPassword = password.trim();

        if (!trimedName || !trimedEmail | !trimedPassword) {
          return toast.error("All fields are required");
        }

        const response = await api.post("/api/user/register", {
          name: trimedName,
          email: trimedEmail,
          password: trimedPassword,
        });

        if (response.data.success) {
          setUser(response.data.userData);
          localStorage.setItem("user", response.data.userData);
          toast.success("Welcome to Ai TravelMate");
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        // User login
        const response = await api.post("/api/user/login", { email, password });
        if (response.data.success) {
          setUser(response.data.userData);
          localStorage.setItem("user", JSON.stringify(response.data.userData));
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-5 shadow-lg">
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-teal-700">Ai TravelMate</h1>
        </div>
        {/* Inputs */}
        <form onSubmit={handleSubmit} className="text-gray-600 text-sm">
          {currentState === "singUp" ? (
            <div className="flex flex-col">
              {/* Name */}
              <label htmlFor="name">Name</label>
              <input
                className="border w-80 h-10 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          ) : (
            ""
          )}
          {/* Email */}
          <div className="flex flex-col mt-2">
            <label htmlFor="email">Email</label>
            <input
              className="border w-80 h-10 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div className="flex flex-col mt-2 rounded-lg">
            <label htmlFor="password">Password</label>
            <input
              className="border w-80 h-10 rounded-lg"
              value={password}
              onChange={(e) => setPasword(e.target.value)}
              required
            />
          </div>
          {currentState === "singUp" ? (
            <p onClick={() => setCurrentState("singIn")} className="cursor-pointer text-blue-800 mt-1">
              Login here
            </p>
          ) : (
            <p onClick={() => setCurrentState("singUp")} className="cursor-pointer text-blue-800 mt-1">
              Create account
            </p>
          )}
          <div className="text-center text-lg mt-5">
            <button
              type="submit"
              className="bg-orange-500 text-white font-semibold px-4 py-1 rounded-md cursor-pointer hover:bg-orange-600 transition-all duration-300"
            >
              {currentState === "singIn" ? "SingIn" : "SingUp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
