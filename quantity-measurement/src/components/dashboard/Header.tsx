import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("qm_user");
    navigate("/");
  };

  return (
    <header>
      <h1>Welcome To Quantity Measurement</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;