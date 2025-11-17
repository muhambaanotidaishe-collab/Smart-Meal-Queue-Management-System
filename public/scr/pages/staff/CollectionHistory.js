import React from 'react';

export default function CollectionHistory() {
  const hist = JSON.parse(localStorage.getItem('collectionHistory')) || [];
  return (
    <div className="container">
      <h2>Collection History</h2>
      {hist.length === 0 && <p>No collections yet.</p>}
      {hist.map((h,i) => <div key={i}><strong>{h.slot}</strong> - {h.queueNumber} - {h.time}</div>)}
    </div>
  );
}