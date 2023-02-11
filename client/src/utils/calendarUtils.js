
export const getCalendar = async (startDate, endDate, req, res) => {
  return await fetch(`/api/calendar/${startDate}/${endDate}`)
  .then(res => res.json())
  
};
export function Month(date) {
  //Date format of today
  this.today = date;
  //Month name in long string form
  this.monthName = this.today.toLocaleString("default", { month: "long" });
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
    0
      ).toISOString();
  };
  export const generateDays = (month, currentMonth, events) => {
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
          {i}
        </li>
      );
    } else if (currentMonth && month.today.getDate() === i) {
      days.push(
        <li key={i} className="currentDay day-number">
          <p>{i}</p>
        </li>
      );
    } else {
      days.push(
        <li key={i} className="day-number">
          <p>{i}</p>
        </li>
      );
    }
  }
  return days;
};

 
