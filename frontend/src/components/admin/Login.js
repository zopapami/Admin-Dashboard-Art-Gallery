import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// Firebase
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
// Services
import FirebaseService from "../../services/firebase-service.js";
// Components
import Dashboard from "./Dashboard.js";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(FirebaseService.auth, (user) => {
      if (user) {
        const uid = user.uid;
        setIsLoggedIn(true);
        console.log(`Admin with id:${uid} is logged in successfully!`);
      } else {
        setIsLoggedIn(false);
        console.log("Admin is logged out!");
      };
    }); 
  }, []);

  // Login
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(FirebaseService.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("dashboard");
        console.log(user);
      })
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        console.log(errCode, errMessage);
      }); 
  };

  // Render
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Routes>
            <Route path="dashboard/*" element={<Dashboard />} />
          </Routes>
        </div>
      ) : (
        <div>
          <form>
            <div className="mb-3 d-flex flex-column">
              <label className="mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email-address"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>
            <div className="mb-3 d-flex flex-column">
              <label className="mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              onClick={onLogin}
            >
              LOGIN
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
