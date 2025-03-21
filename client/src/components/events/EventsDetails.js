function EventDetails({ event }) {
    
    function handleEventTimeText(event) {
        
        let timeGridCell;
        if(Object.keys(event.start).length > 1 ) {
            const startDate = new Date(event.start.dateTime);
            const endDate = new Date(event.end.dateTime);
            
            const month = (startDate.getMonth() + 1).toString();
            const day = startDate.getDate().toString().padStart(2, '0');
            const year = startDate.getFullYear().toString().slice(-2);
            
            let startHour = startDate.getHours();
            const startMinutes = startDate.getMinutes();
            const startAmPm = startHour >= 12 ? 'pm' : 'am';
            startHour = startHour % 12 || 12;
            
            let endHour = endDate.getHours();
            const endMinutes = endDate.getMinutes();
            const endAmPm = endHour >= 12 ? 'pm' : 'am';
            endHour = endHour % 12 || 12;
            
            const startTimeStr = startMinutes === 0 ? `${startHour}` : `${startHour}:${startMinutes.toString().padStart(2, '0')}`;
            const endTimeStr = endMinutes === 0 ? `${endHour}${endAmPm}` : `${endHour}:${endMinutes.toString().padStart(2, '0')}${endAmPm}`;
            
            timeGridCell = `${month}/${day}/${year} ${startTimeStr}-${endTimeStr}`;
        } else {

            const date = new Date(event.start.date);
            const month = (date.getMonth() + 1).toString();
            const day = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);
            timeGridCell = `${month}/${day}/${year}`;

        }
        return timeGridCell;
    }




    return (
        <div className="single-grid-row">
            <p className="row-cell-one">{handleEventTimeText(event)}</p>
            <p className="row-cell-two">{event.summary}</p>
        </div>
    )
}
export default EventDetails;