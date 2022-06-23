import "./calendar.css";
import {
  getCalendar,
} from "../../utils/calendarUtils"

function Calander({ currentMonth }) {
  const today = new Date();
  function Month(date) {
    this.today = date;
    this.monthName = this.today.toLocaleString("default", { month: "long" });
    this.lastDayOfMonth = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 1,
      0
    ).getDate();
    this.firstDayOfWeek = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      1
    ).getDay();
    this.firstDayStyle = {"gridColumnStart": this.firstDayOfWeek + 1,}
  }
  const month = new Month(today);

  const nextMonth = new Month(new Date(today.setMonth(today.getMonth() + 1)));


  const generateDays = (month) => {
    let days = [];
    for (let i = 1; i <= month.lastDayOfMonth; i++) {
      if(i === 1){
    days.push(<li key={i} id='first-day' className="day-number" style={month.firstDayStyle}>{i}</li>);
      } else if (currentMonth && (month.today.getDate() + 1) === i) {
      days.push(<li key={i} className="currentDay day-number"><p>{i}</p></li>);
      } else {
      days.push(<li key={i} className="day-number"><p>{i}</p></li>);
      }
    }
   return days;
  };

  return (
    <div className="calendar-wrapper">
      <button onClick={getCalendar}>search</button>
      <h1 className="monthName">{currentMonth ? month.monthName : nextMonth.monthName}</h1>
      <ol className="calendar">
        <li className="day-name">Sun</li>
        <li className="day-name">Mon</li>
        <li className="day-name">Tue</li>
        <li className="day-name">Wed</li>
        <li className="day-name">Thu</li>
        <li className="day-name">Fri</li>
        <li className="day-name">Sat</li>

      {generateDays(currentMonth ? month : nextMonth)}
      </ol>
    </div> 
  );
}

export default Calander;
