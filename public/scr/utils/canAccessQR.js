export function canAccessQR(booking) {
  if (!booking) return { allowed: false, message: "No booking found." };

  const now = new Date();
  const today = new Date().toISOString().split("T")[0];

  const breakfastSlots = ["06:00 - 06:30", "06:30 - 07:00"];
  const lunchSlots = ["12:00 - 12:30", "12:30 - 13:00", "13:00 - 13:30"];
  const dinnerSlots = ["17:00 - 17:30", "17:30 - 18:00", "18:00 - 18:30"];

  // breakfast unlock 04:00
  if (breakfastSlots.includes(booking.slot)) {
    const unlockTime = new Date('${today}T04:00:00');
    if (now >= unlockTime) return { allowed: true };
    return { allowed:false, message: '⏳ Breakfast QR codes unlock at 04:00 AM.' };
  }

  if (lunchSlots.includes(booking.slot)) {
    const unlockTime = new Date('${today}T10:00:00');
    if (now >= unlockTime) return { allowed: true };
    return { allowed:false, message: '⏳ Lunch QR codes unlock at 10:00 AM.' };
  }

  if (dinnerSlots.includes(booking.slot)) {
    const unlockTime = new Date('${today}T15:00:00');
    if (now >= unlockTime) return { allowed: true };
    return { allowed:false, message: '⏳ Dinner QR codes unlock at 3:00 PM.' };
  }

  return { allowed: false, message: "Invalid meal slot." };
}