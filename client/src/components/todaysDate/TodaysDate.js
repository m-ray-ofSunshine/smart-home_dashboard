import "./TodaysDate.css"
function TodaysDate() {
    return ( 
        <div className="date-wrapper">
            {new Date().toLocaleDateString()}
        </div>
     );
}

export default TodaysDate;