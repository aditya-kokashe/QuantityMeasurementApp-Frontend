import { useState } from "react";
import "../styles/auth.css";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const AuthPage = () => {
    const [tab, setTab] = useState<"login" | "signup">("login");

    return (
        <div className="card">
            {/* LEFT SIDE BRAND */}
            <div className="brand">
                <svg className="brand-icon" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
                    <rect x="28" y="0" width="24" height="12" rx="4" fill="#5dade2" />
                    <rect x="30" y="12" width="20" height="14" rx="2" fill="#85c1e9" />
                    <rect x="14" y="24" width="52" height="58" rx="10" fill="#aed6f1" />
                    <rect x="14" y="50" width="52" height="32" rx="0" fill="#5dade2" clip-path="url(#bottleClip)" />
                    <line x1="20" y1="54" x2="30" y2="54" stroke="#2980b9" stroke-width="2" />
                    <line x1="20" y1="62" x2="34" y2="62" stroke="#2980b9" stroke-width="2" />
                    <line x1="20" y1="70" x2="30" y2="70" stroke="#2980b9" stroke-width="2" />
                    <clipPath id="bottleClip">
                        <rect x="14" y="24" width="52" height="58" rx="10" />
                    </clipPath>
                    <rect x="8" y="82" width="64" height="14" rx="4" fill="#e59866" />
                    <line x1="14" y1="82" x2="14" y2="96" stroke="#d35400" stroke-width="1" />
                    <line x1="22" y1="82" x2="22" y2="96" stroke="#d35400" stroke-width="1" />
                    <line x1="30" y1="82" x2="30" y2="96" stroke="#d35400" stroke-width="1" />
                    <line x1="38" y1="82" x2="38" y2="96" stroke="#d35400" stroke-width="1" />
                    <line x1="46" y1="82" x2="46" y2="96" stroke="#d35400" stroke-width="1" />
                    <line x1="54" y1="82" x2="54" y2="96" stroke="#d35400" stroke-width="1" />
                    <line x1="62" y1="82" x2="62" y2="96" stroke="#d35400" stroke-width="1" />
                </svg>
                <div className="brand-title">Quantity<br />Measurement</div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="form-section">
                <div className="tabs">
                    <div
                        className={`tab ${tab === "login" ? "active" : ""}`}
                        onClick={() => setTab("login")}
                    >
                        Login
                    </div>
                    <div
                        className={`tab ${tab === "signup" ? "active" : ""}`}
                        onClick={() => setTab("signup")}
                    >
                        Signup
                    </div>
                </div>

                {tab === "login" ? (
                    <Login setTab={setTab} />
                ) : (
                    <Signup setTab={setTab} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;