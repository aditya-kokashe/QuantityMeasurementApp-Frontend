import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../utils/api";

type Props = {
  setTab: (tab: "login" | "signup") => void;
};

const Login = ({ setTab }: Props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login(email, password);
      
      // Backend returns token on success, not a success flag
      if (response.token) {
        // Store token and user info
        localStorage.setItem("qm_token", response.token);
        localStorage.setItem("qm_user", response.email || email);
        localStorage.setItem("qm_username", response.username || email);
        
        navigate("/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="form-panel active">
      {error && <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      
      <div className="field">
        <label>Email Id</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      <div className="field">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      <button className="btn-submit" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="switch-link">
        Don't have an account?{" "}
        <a onClick={() => setTab("signup")}>Sign Up</a>
      </div>
    </div>
  );
};

export default Login;