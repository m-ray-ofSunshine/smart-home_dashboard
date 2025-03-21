import "./Events.css"
import {useState, useEffect} from "react"
import { getNext5Events } from "../../utils/calendarUtils";
import EventDetails from "./EventsDetails";

function Events() {
    const [events, setEvents] = useState()

    useEffect(() => {
        const apiCall = async () => {
          const calEvents = await getNext5Events();
          setEvents(calEvents);
        };
        apiCall();
      }, [setEvents]);
        
    return ( 
        <div className="event-wrapper">
            <h2 className="single-grid-row">Events</h2>
            <ol className="single-grid-row">
                <li className="row-cell-one grid-header">Time</li>
                <li className="row-cell-two grid-header">Summary</li>
            </ol>
            { Array.isArray(events) &&
            events.slice(0, 5).map((event) => {
        return <EventDetails key={event.id} event={event}/>})}
        </div>
     );
}

export default Events;