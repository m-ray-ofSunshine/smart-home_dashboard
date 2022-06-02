import "./App.css";
import Calander from "./components/calendar/Calendar";
import Events from "./components/events/Events";
import Notes from "./components/notes/Notes";
import ShoppingList from "./components/shoppingList/ShoppingList";
import TodaysDate from "./components/todaysDate/TodaysDate";
import Weather from "./components/weather/Weather";

function App() {
  return (
    <div className="App">
      <div className="top-panel">
        <div className="daily-info-wrapper">
          <TodaysDate />
          <Weather />
        </div>
        <Events />
      </div>
      <div className="calender-panel">
        <Calander />
        <Calander />
      </div>
      <div className="bottom-panel">
        <ShoppingList />
        <Notes />
      </div>
    </div>
  );
}

export default App;
