export function getNowServing() {
  return parseInt(localStorage.getItem("nowServing")) || 1;
}
export function advanceQueue() {
  let current = getNowServing();
  current++;
  localStorage.setItem("nowServing", current);
  return current;
}
export function resetQueue() {
  localStorage.setItem("nowServing", 1);
}