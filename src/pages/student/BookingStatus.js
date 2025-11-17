import React, { useEffect, useState } from 'react';
import { checkMissedSlot } from '../../utils/checkMissedSlot';
import { slotTimes } from '../../utils/slotData';
import { canAccessQR } from '../../utils/canAccessQR';

export default function BookingStatus() {
  const [booking, setBooking] = useState(null);
  const [notice, setNotice] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [slotsInfo, setSlotsInfo] = useState({});
  const [capacity, setCapacity] = useState(50);
  const [rescheduleMsg, setRescheduleMsg] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mealBooking'));
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const savedCapacity = parseInt(localStorage.getItem('slotCapacity')) || 50;
    setCapacity(savedCapacity);
    setBooking(saved);
    const counts = {};
    Object.keys(slotTimes).forEach(s => counts[s] = savedBookings.filter(b => b.slot === s).length);
    setSlotsInfo(counts);
    const result = checkMissedSlot();
    if (result?.missed) {
      setNotice(result.message);
      const updated = JSON.parse(localStorage.getItem('mealBooking'));
      setBooking(updated);
    }
  }, []);

  const getSlotEnd = (slot) => slotTimes[slot].end;

  const getFutureSlots = () => {
    if (!booking) return [];
    const originalEnd = getSlotEnd(booking.slot);
    return Object.keys(slotTimes).filter(s => getSlotEnd(s) > originalEnd && (slotsInfo[s] || 0) < capacity);
  };

  const futureSlots = getFutureSlots();
  const noFutureSlotsAvailable = futureSlots.length === 0;

   const handleReschedule = () => {
    if (!newSlot) { setRescheduleMsg('Please select a new slot'); return; }
    if ((slotsInfo[newSlot] || 0) >= capacity) { setRescheduleMsg('Selected slot is full'); return; }
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const updatedBooking = {
      ...booking,
      slot: newSlot,
      start: slotTimes[newSlot].start,
      end: slotTimes[newSlot].end,
      status: 'Active',
      qrValid: true,
      queueNumber: (slotsInfo[newSlot] || 0) + 1,
      id: Date.now()
    };
    bookings.push(updatedBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('mealBooking', JSON.stringify(updatedBooking));
    setBooking(updatedBooking);
    setRescheduleMsg('Rescheduled to ${newSlot}. QR reactivated.');
  };

  if (!booking) return <p>No active booking.</p>;

  const access = canAccessQR(booking);

   return (
    <div className="container">
      <h2>Your Booking Status</h2>
      {notice && <p className="red">{notice}</p>}

      <p><strong>Original Slot:</strong> {booking.slot}</p>
      <p><strong>Status:</strong> {booking.status}</p>

      <p><strong>Queue Number:</strong> {access.allowed ? booking.queueNumber : '⏳ Available when QR unlocks'}</p>
      {!access.allowed && <p className="orange">{access.message}</p>}

       {booking.status === 'Missed' && (
        <div style={{marginTop:12}}>
          <h3>Reschedule (future slots only)</h3>
          {noFutureSlotsAvailable ? (
            <p className="red">All future slots full. No meal available for you today.</p>
          ) : (
            <>
              <select onChange={(e)=>setNewSlot(e.target.value)}>
                <option value="">Select New Slot</option>
                {futureSlots.map(s => <option key={s} value={s}>{s} (Booked {slotsInfo[s]||0})</option>)}
              </select>
              <button onClick={handleReschedule} style={{marginLeft:8}}>Confirm New Slot</button>
              <p className="green">{rescheduleMsg}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}






