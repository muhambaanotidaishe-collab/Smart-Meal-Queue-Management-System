import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/student/Dashboard';
import BookMeal from './pages/student/BookMeal';
import BookingStatus from './pages/student/BookingStatus';
import QRCodePage from './pages/student/QRCodePage';
import Login from './pages/auth/Login';
import StaffLogin from './pages/auth/StaffLogin';
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffScanner from './pages/staff/StaffScanner';
import VerifyBooking from './pages/staff/VerifyBooking';
import CollectionHistory from './pages/staff/CollectionHistory';
import NotFound from './pages/common/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book" element={<BookMeal />} />
            <Route path="/booking-status" element={<BookingStatus />} />
            <Route path="/qr" element={<QRCodePage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/staff-login" element={<StaffLogin />} />

            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/scan" element={<StaffScanner />} />
            <Route path="/verify" element={<VerifyBooking />} />
            <Route path="/collection-history" element={<CollectionHistory />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}