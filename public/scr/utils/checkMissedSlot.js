export function checkMissedSlot() {
  let booking = JSON.parse(localStorage.getItem("mealBooking"));
  if (!booking) return null;

  const now = new Date();
  const today = new Date().toISOString().split('T')[0];
  const endTime = new Date('${today}T${booking.end}:00');

  if (now > endTime && booking.status !== "Missed") {
    booking.status = "Missed";
    booking.qrValid = false;
    localStorage.setItem("mealBooking", JSON.stringify(booking));
    return { message: "❗ You missed your meal slot. Please reschedule if possible.", missed: true };
  }

  return { missed: booking?.status === "Missed", message: "" };
}