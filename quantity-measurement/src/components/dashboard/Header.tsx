import { useNavigate } from "react-router-dom";
import { authAPI } from "../../utils/api";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("qm_username") || localStorage.getItem("qm_user") || "User";

  const logout = () => {
    authAPI.logout();
    navigate("/");
  };

  return (
    <header>
      <h1>Welcome To Quantity Measurement</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span>Hello, {username}!</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;