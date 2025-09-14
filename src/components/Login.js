// src/components/Login.js
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import '../styles.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect to homepage
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setEmail("");
      setPassword("");
      navigate("/login"); // keep user on login page after signout
    } catch (err) {
      console.error("Sign-out error:", err);
      setError("Sign-out failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {user ? (
        <>
          <p>Signed in as <strong>{user.email}</strong></p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={handleSignOut} className="ui button">Sign out</button>
            <button onClick={() => navigate('/')} className="ui button">Go to Home</button>
          </div>
        </>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="ui button primary">Login</button>
        </form>
      )}

      <p style={{ marginTop: '12px' }}>
        If you don’t have an account you can: <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
