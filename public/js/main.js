document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('support-name')) {
    // Home page logic
    const today = new Date();
    const supporter = getSupporterForDate(today);
    const typed = new Typed('#support-name', {
      strings: [supporter],
      typeSpeed: 60,
      showCursor: true,
      cursorChar: '|',
      backSpeed: 20,
      loop: false
    });
  }

  if (document.getElementById('calendar')) {
    // Calendar page logic
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: [],
      // >>>>>> THIS IS THE CRITICAL CHANGE FOR COLORS <<<<<<
      eventBackgroundColor: 'var(--event-bg-color)', // Use CSS variable
      eventBorderColor: 'var(--event-border-color)', // Use CSS variable
      eventTextColor: 'var(--event-text-color)',     // Use CSS variable
      // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today'
      },
      eventDisplay: 'block',
      eventClick: function(info) {
        const text = `DATE: ${info.event.start.toLocaleDateString()} | SUPPORT: ${info.event.title}`;
        showModal(text);
      },
      datesSet: function(info) {
        const year = info.view.currentStart.getFullYear();
        const month = info.view.currentStart.getMonth();
        calendar.removeAllEvents();
        // Load events for previous month if it exists
        if (month > 0) {
          calendar.addEventSource(getSupportScheduleForMonth(year, month - 1));
        } else {
          calendar.addEventSource(getSupportScheduleForMonth(year - 1, 11));
        }
        // Load events for current month
        calendar.addEventSource(getSupportScheduleForMonth(year, month));
        // Load events for next month if it exists
        if (month < 11) {
          calendar.addEventSource(getSupportScheduleForMonth(year, month + 1));
        } else {
          calendar.addEventSource(getSupportScheduleForMonth(year + 1, 0));
        }
      }
    });
    calendar.render();
  }
});

function showModal(text) {
  document.getElementById('event-details').innerHTML = '';
  const typed = new Typed('#event-details', {
    strings: [text],
    typeSpeed: 40,
    showCursor: true,
    cursorChar: '_'
  });
  document.getElementById('event-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('event-modal').style.display = 'none';
}