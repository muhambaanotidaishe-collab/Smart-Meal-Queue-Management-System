import React, { useEffect, useState } from 'react';
import SlotCard from '../../components/SlotCard';
import { slotTimes } from '../../utils/slotData';

export default function BookMeal() {
  const [slot, setSlot] = useState('');
  const [msg, setMsg] = useState('');
  const [slotsInfo, setSlotsInfo] = useState({});
  const [capacity, setCapacity] = useState(50);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const savedCapacity = parseInt(localStorage.getItem('slotCapacity')) || 50;
    setCapacity(savedCapacity);
    const counts = {};
    Object.keys(slotTimes).forEach(s => counts[s] = savedBookings.filter(b => b.slot === s).length);
    setSlotsInfo(counts);
  }, []);

   const handleBooking = () => {
    if (!slot) { setMsg('Please select a slot'); return; }
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const count = bookings.filter(b => b.slot === slot).length;
    if (count >= capacity) { setMsg('This slot is full. Choose another.'); return; }
    const queueNumber = count + 1;
    const newBooking = {
      slot,
      start: slotTimes[slot].start,
      end: slotTimes[slot].end,
      status: 'Active',
      qrValid: true,
      queueNumber,
      collected: false,
      id: Date.now()
    };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('mealBooking', JSON.stringify(newBooking));
    setMsg('Booked ${slot}. Your queue number is ${queueNumber}');
    setSlotsInfo({...slotsInfo, [slot]: count+1});
  };

   return (
    <div className="container">
      <h2>Book Meal Slot</h2>
      <div>
        <h4>Available Slots</h4>
        {Object.keys(slotTimes).map(s => (
          <SlotCard key={s} slot={s} booked={slotsInfo[s] || 0} capacity={capacity} />
        ))}
      </div>

      <div style={{marginTop:12}}>
        <select value={slot} onChange={(e)=>setSlot(e.target.value)}>
          <option value="">Select Meal Slot</option>
          {Object.keys(slotTimes).map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <button onClick={handleBooking} style={{marginLeft:8}}>Confirm Booking</button>
        <p style={{marginTop:12}} className="small">{msg}</p>
      </div>
    </div>
  );
}




