import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { checkMissedSlot } from '../../utils/checkMissedSlot';
import { canAccessQR } from '../../utils/canAccessQR';

export default function QRCodePage() {
  const [booking, setBooking] = useState(null);
  const [notice, setNotice] = useState('');
  const [accessMsg, setAccessMsg] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mealBooking'));
    setBooking(saved);
    const result = checkMissedSlot();
    if (result?.missed) {
      setNotice('❗ Your QR code is invalid. You missed your slot.');
      setBooking(JSON.parse(localStorage.getItem('mealBooking')));
      return;
    }
    const access = canAccessQR(saved);
    if (!access.allowed) setAccessMsg(access.message);
  }, []);

  if (!booking) return <p>No active booking found.</p>;

   return (
    <div className="container">
      <h2>Your QR Code</h2>
      {notice && <p className="red">{notice}</p>}
      {accessMsg ? (
        <p className="orange">{accessMsg}</p>
      ) : booking.status === 'Active' ? (
        <>
          <p>Present this QR code to collect your meal.</p>
          <QRCode value={JSON.stringify(booking)} size={220} />
        </>
      ) : (
        <p className="red">QR unavailable</p>
      )}
    </div>
  );
}


