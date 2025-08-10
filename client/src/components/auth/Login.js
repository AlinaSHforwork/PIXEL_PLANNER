// client/src/components/auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://pixel-planner-backend.onrender.com/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      // Redirect or show dashboard
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input className="pixel-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br/><br/>
        <input className="pixel-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br/><br/>
        <button className="pixel-button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;