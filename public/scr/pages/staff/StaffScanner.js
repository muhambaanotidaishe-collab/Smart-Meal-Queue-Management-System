import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export default function StaffScanner() {
  const [scanResult, setScanResult] = useState('');

  const handleScan = (result) => {
    if (result?.text) {
      setScanResult(result.text);
      localStorage.setItem('scannedQR', result.text);
      window.location.href = '/verify';
    }
  };

  return (
    <div className="container">
      <h2>Scan Student QR Code</h2>
      <div style={{width:320}}>
        <QrReader onResult={(res)=>handleScan(res)} constraints={{facingMode:'environment'}} />
      </div>
      <p>Scan result: {scanResult}</p>
    </div>
  );
}