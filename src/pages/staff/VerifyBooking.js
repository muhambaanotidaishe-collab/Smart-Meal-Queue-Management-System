import React, { useEffect, useState } from 'react';

export default function VerifyBooking() {
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(()=> {
    const qrData = localStorage.getItem('scannedQR');
    if (!qrData) { setMessage('No QR scanned'); return; }
    try {
      const parsed = JSON.parse(qrData);
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const found = bookings.find(b => b.slot === parsed.slot && b.queueNumber === parsed.queueNumber);
      if (!found) { setMessage('No matching booking found'); return; }
      const now = new Date();
      const today = new Date().toISOString().split('T')[0];
      const end = new Date('${today}T${found.end}:00');
      let status = found.status;
      if (found.collected) status = 'Collected';
      else if (now > end) status = 'Missed';
      setBooking({...found, status});
    } catch (e) {
      setMessage('Invalid QR data');
    }
  }, []);

  const markCollected = () => {
    if (!booking) return;
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const idx = bookings.findIndex(b => b.slot === booking.slot && b.queueNumber === booking.queueNumber);
    if (idx === -1) return;
    bookings[idx].collected = true;
    localStorage.setItem('bookings', JSON.stringify(bookings));
    let hist = JSON.parse(localStorage.getItem('collectionHistory')) || [];
    hist.push({ slot: booking.slot, time: new Date().toLocaleString(), queueNumber: booking.queueNumber });
    localStorage.setItem('collectionHistory', JSON.stringify(hist));
    setMessage('Marked as collected');
  };

  if (message) return <div className="container"><p>{message}</p></div>;
  if (!booking) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h2>Verify Booking</h2>
      <p><strong>Slot:</strong> {booking.slot}</p>
      <p><strong>Queue:</strong> {booking.queueNumber}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      {booking.status === 'Active' && <button onClick={markCollected}>Mark as Collected</button>}
      {booking.status === 'Missed' && <p className="red">Student missed slot. Deny collection.</p>}
      {booking.status === 'Collected' && <p className="green">Already collected.</p>}
      <p style={{marginTop:10}}>{message}</p>
    </div>
  );
}



