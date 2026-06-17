function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center text-teal-700">
      <div className="p-2  shadow-lg">
        <div className="text-center">
          <h1>Login</h1>
        </div>
        {/* Inputs */}
        <div>
          {/* Name */}
          <div>
            <label htmlFor="name">Name</label>
            <input />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <input />
          </div>
        </div>
        <div className="text-center">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
