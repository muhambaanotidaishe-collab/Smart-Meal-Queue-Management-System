import React, { useEffect, useState } from 'react';
import { getNowServing, advanceQueue } from '../../utils/queueManager';

export default function StaffDashboard() {
  const [now, setNow] = useState(getNowServing());
  const [newCap, setNewCap] = useState('');

  useEffect(()=> {
    setNow(getNowServing());
  }, []);

  const next = () => {
    const updated = advanceQueue();
    setNow(updated);
  };

  const updateCapacity = () => {
    const n = parseInt(newCap);
    if (!n || n < 1) { alert('Enter valid positive number'); return; }
    localStorage.setItem('slotCapacity', n);
    alert('Slot capacity updated to '+n);
  };

  return (
    <div className="container">
      <h2>Staff Dashboard</h2>
      <p>Now Serving: <strong>{now}</strong></p>
      <button onClick={next}>Advance Queue</button>

      <div style={{marginTop:12}}>
        <h4>Update Slot Capacity (global)</h4>
        <input placeholder="50" value={newCap} onChange={(e)=>setNewCap(e.target.value)} />
        <button onClick={updateCapacity} style={{marginLeft:8}}>Update Capacity</button>
      </div>
    </div>
  );
}
