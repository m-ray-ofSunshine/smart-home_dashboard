import "./TodaysDate.css"
function TodaysDate() {

var weekday = new Intl.DateTimeFormat('en-US', {
    weekday: "long"
}).formatToParts(new Date())[0].value
var date = new Intl.DateTimeFormat('en-us', {
     year: "numeric",
     month: "numeric",
     day: "numeric",
}).format(new Date())

    return (
        <div className="date-wrapper">
            <h1 className="date-text">
                <span className="weekday-text">{weekday}</span> , {date}
            </h1>

        </div>
    );
}

export default TodaysDate;