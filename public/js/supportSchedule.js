const team = ['Omar Bashirzada', 'Elshan Shirinli', 'Abulfat Nasirli', 'Akhmed Sadigov', 'Elgun Mahmudov', 'Ravan Hasanzada'];

function getSupporterForDate(date) {
  const startDate = new Date('2025-07-28'); // Monday, July 28, 2025, with Parvin Etibarli
  startDate.setHours(0, 0, 0, 0); // Normalize startDate to start of day
  date.setHours(0, 0, 0, 0);       // Normalize current date to start of day for accurate comparison

  // If the date is strictly before July 28, 2025, return 'No one'
  if (date < startDate) {
    return 'No one';
  }

  // Handle weekends for dates on or after startDate
  if (date.getDay() === 0 || date.getDay() === 6) {
    return 'No one'; // Weekends
  }

  // If we are here, date is >= startDate and it's a weekday
  let current = new Date(startDate);
  let weekdayCount = 0;

  // Count weekdays from startDate up to, but not including, the given date
  while (current.getTime() < date.getTime()) { // Use getTime() for robust date comparison
    if (current.getDay() !== 0 && current.getDay() !== 6) {
      weekdayCount++;
    }
    current.setDate(current.getDate() + 1);
  }

  // Use team.length so rotation adapts to removed/added members
  if (!Array.isArray(team) || team.length === 0) return 'Unassigned';
  const index = weekdayCount % team.length; // Index 0 for July 28, increases with each weekday
  return team[index] || 'Unassigned';
}

function getSupportScheduleForMonth(year, month) {
  const events = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    const supporter = getSupporterForDate(date);
    if (supporter !== 'No one') {
      events.push({
        title: supporter,
        start: new Date(date),
        allDay: true
      });
    }
    date.setDate(date.getDate() + 1);
  }
  return events;
}