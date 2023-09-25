import React, { useState } from 'react';
import '../css/login.css'


const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
 

  const handleSignup = async () => {
    try {
      if (!email || !username || !password || !confirmPassword) {
        setError('All fields are required');
        return;
      }

      if (password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      if (!email.includes('@') || !email.includes('.com')) {
        setError('Invalid email format');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await fetch('http://localhost:3001/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
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
    <div className='back'>
      <div className='sign-wrapper'>
        <div className='sign-form-wrapper'>
          <h2>Sign Up</h2>
          {error && <p className="error">{error}</p>}
          <input 
            type="text" 
            placeholder='Email Id'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className='signup-btn'>
            <button onClick={handleSignup}>Signup</button>
          </div>
          <p>Already have an account <a href="/">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
