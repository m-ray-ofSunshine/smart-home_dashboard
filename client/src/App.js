import "./App.css";
import { useState } from "react";

import CalendarContainer from "./components/calendar/Calendar";
import Events from "./components/events/Events";
import Notes from "./components/notes/Notes";
import ShoppingList from "./components/shoppingList/ShoppingList";
import TodaysDate from "./components/todaysDate/TodaysDate";
import Weather from "./components/weather/Weather";

function App() {
  const [events, setEvents] = useState(false);


  return (
    <div className="App">
      <div className="top-panel">
        <div className="daily-info-wrapper">
          <TodaysDate />
          <Weather />
        </div>
        <Events events={events}/>
      </div>
      <div className="calender-panel">
        <CalendarContainer events={events} setEvents={setEvents} currentMonth={true}/>
        <CalendarContainer events={events} setEvents={setEvents} currentMonth={false}/>
      </div>
      <div className="bottom-panel">
        <ShoppingList />
        <Notes />
      </div>
    </div>
  );
}

export default App;
