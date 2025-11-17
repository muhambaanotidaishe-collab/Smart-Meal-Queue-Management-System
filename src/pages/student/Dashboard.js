import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div className="container">
      <h2>Welcome {user?.email || 'Student'}</h2>
      <div style={{marginTop:12}}>
        <Link to="/book"><button>Book Meal Slot</button></Link>
        <Link to="/booking-status" style={{marginLeft:8}}><button>Booking Status</button></Link>
        <Link to="/qr" style={{marginLeft:8}}><button>QR Code</button></Link>
      </div>
    </div>
  );
}