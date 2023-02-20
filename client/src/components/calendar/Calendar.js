import { useEffect } from "react";
import "./calendar.css";
import { getCalendar, Month, generateDays } from "../../utils/calendarUtils";



function CalendarContainer({ events, setEvents, currentMonth }) {

  
  const today = new Date();
  
    const month = new Month(today);
    
    const nextMonth = new Month(new Date(today.setMonth(today.getMonth() + 1)));    
  
  useEffect(() => {
    const apiCall = async () => {
      const calEvents = await getCalendar(month.firstDateISO, nextMonth.lastDateISO);
      setEvents(calEvents);
    };
    apiCall();
  }, [setEvents, month.firstDateISO, nextMonth.lastDateISO]);
  return (
    <div className="calendar-wrapper">
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

      </ol>
      <ol className="calendar days-grid">
        {events &&
        generateDays((currentMonth ? month : nextMonth), currentMonth, events)}
      </ol>
      
    </div>
  );
}

export default CalendarContainer;


