import { useState } from "react";
import { authAPI } from "../../utils/api";

type Props = {
  setTab: (tab: "login" | "signup") => void;
};

const Signup = ({ setTab }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("Please fill all required fields (name, email, password)");
      return;
    }

    // Basic validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authAPI.register(name, email, password, "USER");

      // Backend returns token on success, not a success flag
      if (response.token) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => {
          setTab("login");
        }, 2000);
      } else {
        setError(response.message || "Signup failed");
      }
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="form-panel active">
      {error && <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      {success && <div className="success-message" style={{ color: "green", marginBottom: "10px" }}>{success}</div>}
      
      <div className="field">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      <div className="field">
        <label>Mobile Number (Optional)</label>
        <input
          type="tel"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </div>

      <button className="btn-submit" onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>

      <div className="switch-link">
        Already have an account?{" "}
        <a onClick={() => setTab("login")}>Login</a>
      </div>
    </div>
  );
};

export default Signup;