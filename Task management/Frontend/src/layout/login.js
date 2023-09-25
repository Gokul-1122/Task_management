import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }

      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), 
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        window.location.href = '/dashboard';
        setError('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="log-wrapper">
      <div className="LOG-form-wrapper">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          className="email"
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input
          className="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='login-btn'>
          <button className="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

