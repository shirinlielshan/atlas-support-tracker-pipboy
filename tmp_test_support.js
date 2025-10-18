// Quick test harness to validate getSupporterForDate behavior
// Re-implement minimal logic from supportSchedule.js for Node testing
const team = ['Omar Bashirzada', 'Elshan Shirinli', 'Abulfat Nasirli', 'Akhmed Sadigov', 'Elgun Mahmudov', 'Ravan Hasanzada'];

function getSupporterForDate(date) {
  const startDate = new Date('2025-07-28');
  startDate.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date < startDate) return 'No one';
  if (date.getDay() === 0 || date.getDay() === 6) return 'No one';

  let current = new Date(startDate);
  let weekdayCount = 0;
  while (current.getTime() < date.getTime()) {
    if (current.getDay() !== 0 && current.getDay() !== 6) weekdayCount++;
    current.setDate(current.getDate() + 1);
  }

  if (!Array.isArray(team) || team.length === 0) return 'Unassigned';
  const index = weekdayCount % team.length;
  return team[index] || 'Unassigned';
}

// Print a sample month (August 2025) mapping
const year = 2025, month = 7; // August (0-based months)
let date = new Date(year, month, 1);
while (date.getMonth() === month) {
  const d = new Date(date);
  console.log(d.toISOString().slice(0,10), '-', getSupporterForDate(d));
  date.setDate(date.getDate() + 1);
}
