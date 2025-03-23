 function reformatDate(str) {
  var strParts = str.split("-")
  return `${strParts[1]}/${strParts[2]}/${strParts[0]}`
 }
function handleEventType(event) {
  return Object.keys(event.start).length > 1 ?
    new Date(event.start.dateTime) :
    new Date(reformatDate(event.start.date))
}

function sortEvents(events, month) {
  const serializedEvents = events.map(event => {
    let day = handleEventType(event)
    let month = new Date(Object.values(event.start)[0]).getMonth()
    return { ...event, "monthDate": day.getDate(), "monthNum": month }
  })

  return serializedEvents.filter(event => event.monthNum === month.monthNum)
}

function getDayText(i, sortedEvents) {
  let str = [<span key={Math.random() * 1000} className="dayNum">{i}</span>]
  sortedEvents.forEach(event => {
    if (event.monthDate === i) {
      str.push(<span key={Math.random() * 1000} className="event">{event.summary}</span>)
    }
    return str
  })
  return str
}

export const getCalendar = async (startDate, endDate, req, res) => {
  try {
    const response = await fetch(`backend/api/calendar/${startDate}/${endDate}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return []; // Return empty array as fallback
  }
  
};

export const getNext5Events = async (req, res) => {
  try {
    const response = await fetch(`backend/api/calendar/next5`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching next 5 events:', error);
    return []; // Return empty array as fallback
  }
};

export function Month(date) {
  //Date format of today
  this.today = date;
  //Month name in long string form
  this.monthName = this.today.toLocaleString("default", { month: "long" });
  //Month number
  this.monthNum = this.today.getMonth()
  //last day of month
  this.lastDayOfMonth = new Date(
    this.today.getFullYear(),
    this.today.getMonth() + 1,
    0
  ).getDate();
  //Day of week for first day in the month
  this.firstDayOfWeek = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    1
  ).getDay();
  //where the calendar starts
  this.firstDayStyle = { gridColumnStart: this.firstDayOfWeek + 1 };
  //first day of month
  this.firstDateISO = new Date(
    this.today.getFullYear(),
    this.today.getMonth(),
    1
  ).toISOString();
  this.lastDateISO = new Date(
    this.today.getFullYear(),
    this.today.getMonth() + 1,
    1
  ).toISOString();
};

export const generateDays = (month, currentMonth, events) => {
  const sortedEvents = sortEvents(events, month)
  let days = [];
  for (let i = 1; i <= month.lastDayOfMonth; i++) {
    if (i === 1) {
      days.push(
        <li
          key={i}
          id="first-day"
          className="day-number"
          style={month.firstDayStyle}
        >
          {getDayText(i, sortedEvents)}
        </li>
      );
    } else if (currentMonth && month.today.getDate() === i) {
      days.push(
        <li key={i} className="currentDay day-number">
          {getDayText(i, sortedEvents)}
        </li>
      );
    } else {
      days.push(
        <li key={i} className="day-number">
          {getDayText(i, sortedEvents)}
        </li>
      );
    }

  }

  return days;
};


