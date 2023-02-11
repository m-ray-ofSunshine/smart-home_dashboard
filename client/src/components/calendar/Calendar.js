import { useEffect, useState } from "react";
import "./calendar.css";
import { getCalendar, Month, generateDays } from "../../utils/calendarUtils";

function Calander({ currentMonth }) {
  const [events, setEvents] = useState();

  
  const today = new Date();
  
    const month = new Month(today);
    
    const nextMonth = new Month(new Date(today.setMonth(today.getMonth() + 1)));    
  
  useEffect(() => {
    const apiCall = async () => {
      const calEvents = await getCalendar(month.firstDateISO, month.lastDateISO);
      setEvents(calEvents);
    };
    apiCall();
  }, [month.firstDateISO, month.lastDateISO]);
  return (
    <div className="calendar-wrapper">
      <button onClick={()=>{console.log(events);}}>search</button>
      <h1 className="monthName">
        {currentMonth ? month.monthName : nextMonth.monthName}
      </h1>
      <ol className="calendar">
        <li className="day-name">Sun</li>
        <li className="day-name">Mon</li>
        <li className="day-name">Tue</li>
        <li className="day-name">Wed</li>
        <li className="day-name">Thu</li>
        <li className="day-name">Fri</li>
        <li className="day-name">Sat</li>

        {events &&
        generateDays((currentMonth ? month : nextMonth), currentMonth, events)}
      </ol>
    </div>
  );
}

export default Calander;
