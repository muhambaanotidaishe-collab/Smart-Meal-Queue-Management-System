import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email) return;
    login(email, 'staff');
    navigate('/staff-dashboard');
  };

  return (
    <div className="container">
      <h2>Staff Login</h2>
      <input placeholder="Staff Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}