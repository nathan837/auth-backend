import React, { useState } from "react";

const BASE_URL = "http://localhost:5000/api/auth";

function App() {
  const [signupUser, setSignupUser] = useState({ username: "", password: "" });
  const [loginUser, setLoginUser] = useState({ username: "", password: "" });
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupUser.username || !signupUser.password) {
      setResponse("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(signupUser),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      if (res.ok) setActiveTab("login");
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginUser.username || !loginUser.password) {
      setResponse("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginUser),
      });
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {activeTab === "login" ? "Sign In" : "Sign Up"}
        </h2>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="login-username">Username</label>
              <input
                id="login-username"
                type="text"
                value={loginUser.username}
                onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })}
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={loginUser.password}
                onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                value={signupUser.username}
                onChange={(e) => setSignupUser({ ...signupUser, username: e.target.value })}
                placeholder="Choose a username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={signupUser.password}
                onChange={(e) => setSignupUser({ ...signupUser, password: e.target.value })}
                placeholder="Choose a password"
              />
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        )}

        {response && (
          <div className="response-box">
            <h3>Response:</h3>
            <pre>{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// CSS Styles (Add this to your App.css or a separate CSS file)
const styles = `
.auth-container {
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 400px;
}

.auth-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.auth-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.auth-tab {
  flex: 1;
  padding: 10px;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.3s;
}

.auth-tab.active {
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-size: 14px;
  color: #555;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  transition: border 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #2563eb;
}

.auth-button {
  padding: 12px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #1d4ed8;
}

.auth-button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.response-box {
  margin-top: 20px;
  padding: 15px;
  background-color: #f3f4f6;
  border-radius: 5px;
  font-size: 13px;
}

.response-box h3 {
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

.response-box pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
}
`;

// Inject styles (optional, or add them to a CSS file)
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);