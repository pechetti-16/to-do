import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated, setUsername } from "../redux/actions";

const Auth = () => {
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username && password) {
      dispatch(setAuthenticated(true));
      dispatch(setUsername(username));
    }
  };

  return (
    <div className="container mt-4">
      {isAuthenticated ? (
        <div className="text-center">
          <h3>Welcome, {username}!</h3>
        </div>
      ) : (
        <div className="card p-4 shadow-lg">
          <h3 className="text-center">Login</h3>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setLocalUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn w-100"
            onClick={handleLogin}
            style={{ backgroundColor: "#a8e4a0" }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
