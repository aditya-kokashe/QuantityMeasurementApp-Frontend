import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setTab: (tab: "login" | "signup") => void;
};

const Login = ({ setTab }: Props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("qm_user", email);
    navigate("/dashboard");
  };

  return (
    <div className="form-panel active">
      <div className="field">
        <label>Email Id</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn-submit" onClick={handleLogin}>
        Login
      </button>

      <div className="switch-link">
        Don't have an account?{" "}
        <a onClick={() => setTab("signup")}>Sign Up</a>
      </div>
    </div>
  );
};

export default Login;