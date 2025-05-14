export function calculateInnings(previousShooter, currentShooter, previousBreaker) {
  if (currentShooter === previousBreaker && previousShooter !== previousBreaker) {
    return true; // New inning
  }
  return false;
}
