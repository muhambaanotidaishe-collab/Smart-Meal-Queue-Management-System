import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) return;
    login(email, 'student');
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <h2>Student Login</h2>
      <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}