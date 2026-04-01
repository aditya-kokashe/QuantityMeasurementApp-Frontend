import { useState } from "react";

type Props = {
  setTab: (tab: "login" | "signup") => void;
};

const Signup = ({ setTab }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !mobile) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("qm_user", email);
    alert("Signup successful!");

    setTab("login");
  };

  return (
    <div className="form-panel active">
      <div className="field">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Mobile Number</label>
        <input
          type="tel"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <button className="btn-submit" onClick={handleSignup}>
        Signup
      </button>

      <div className="switch-link">
        Already have an account?{" "}
        <a onClick={() => setTab("login")}>Login</a>
      </div>
    </div>
  );
};

export default Signup;