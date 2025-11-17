import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <h3 style={{margin:0}}>Meal Queue</h3>
      <nav style={{marginLeft:20}}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/book" style={{marginLeft:8}}>Book Meal</Link>
        <Link to="/booking-status" style={{marginLeft:8}}>Booking Status</Link>
        <Link to="/qr" style={{marginLeft:8}}>QR Code</Link>
        {!user && <Link to="/login" style={{marginLeft:8}}>Login</Link>}
        {!user && <Link to="/staff-login" style={{marginLeft:8}}>Staff Login</Link>}
        {user?.role === 'staff' && <Link to="/staff-dashboard" style={{marginLeft:8}}>Staff Dashboard</Link>}
        {user && <button onClick={logout} style={{marginLeft:12}}>Logout</button>}
      </nav>
    </header>
  );
}