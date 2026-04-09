import { useState } from "react";
import "./Login.css";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.text())
      .then(data => {
        alert(data);

        if (data === "Login Successful") {
          localStorage.setItem("user", username);
          alert("Welcome, " + username + "!");
        }else{
            alert("Invalid credentials. Please try again.");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;