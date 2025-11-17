import React from 'react';
export default function SlotCard({slot, booked, capacity}) {
  const remaining = capacity - booked;
  const colorClass = remaining === 0 ? 'red' : remaining <=10 ? 'orange' : 'green';
  return (
    <div className="slot-card">
      <strong>{slot}</strong>
      <div>Booked: {booked} / {capacity} - <span className={colorClass}>{remaining} left</span></div>
    </div>
  );
}