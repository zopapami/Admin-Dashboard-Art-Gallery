import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// Firebase
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
// CSS
import "../../assets/css/Login.scss";
// Services
import FirebaseService from "../../services/firebase-service.js";
// Components
import Dashboard from "./dashboard/Dashboard.js";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    onAuthStateChanged(FirebaseService.auth, (user) => {
      setLoader(false);
      if (user) {
        const uid = user.uid;
        setIsLoggedIn(true);
        console.log(`Admin with id:${uid} is logged in successfully!`);
      } else {
        setIsLoggedIn(false);
        console.log("Admin is logged out!");
      }
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
      {loader ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {isLoggedIn ? (
            <div>
              <Routes>
                <Route path="dashboard/*" element={<Dashboard />} />
              </Routes>
            </div>
          ) : (
            <div className="bg-login h100">
              <div className="card position-absolute margin-relative">
                <form className="m-4">
                  <div className="m-3 form-group">
                    <label className="mb-1" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email-address"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email address"
                    />
                  </div>
                  <div className="m-3 form-group">
                    <label className="mb-1" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Password"
                    />
                  </div>
                  <div className="m-3 form-group">
                    <button
                      type="submit"
                      className="mt-2 btn button"
                      onClick={onLogin}
                    >
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
