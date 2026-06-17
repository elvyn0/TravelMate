import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-row justify-between p-5">
      <div>
        <h1>Ai TravelMate</h1>
      </div>
      <div>
        <p>ai</p>
      </div>
      <div>
        <NavLink to="/login">
          <button>Login/SingUp</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
