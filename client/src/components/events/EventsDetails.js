function EventDetails({ event }) {

    const formatter = new Intl.DateTimeFormat("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

    
    function handleEventTimeText(event) {
        let timeGridCell;
        if(Object.keys(event.start).length > 1 ) {
            // 02/17/2022 6:00-7:00pm
            
            var startTime = formatter.formatToParts(new Date(event.start.dateTime))
            var endTime = formatter.formatToParts(new Date(event.end.dateTime))
            const dateFormatter = arr => `${arr[2].value}/${arr[4].value}/${arr[6].value}`
            const timeFormatter = arr => `${arr[8].value}:${arr[10].value}${arr[12].value.toLowerCase()}`
            timeGridCell = `${dateFormatter(startTime)} ${timeFormatter(startTime)}-${timeFormatter(endTime)}`
            
        } else {

            timeGridCell = `${new Date(event.start.date).toLocaleDateString("en-US")} All Day Event`

        }
        return timeGridCell;
    }




    return (
        <div className="single-grid-row">

            <p className="row-cell-one">{event.summary}</p>
            <p className="row-cell-two">{handleEventTimeText(event)}</p>
            <p className="row-cell-three">{event.location ? event.location: "N/A"}</p>

        </div>

    )
}
export default EventDetails;