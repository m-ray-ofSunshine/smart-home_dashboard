import "./calendar.css";

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
    this.firstDayStyle = {"gridColumnStart": this.firstDayOfWeek,}
  }
  const month = new Month(today);

  const nextMonth = new Month(new Date(today.setMonth(today.getMonth() + 1)));


  const generateDays = (month) => {
    let days = [];
    for (let i = 1; i <= month.lastDayOfMonth; i++) {
      if(i === 1){
    days.push(<li id='first-day' className="day-number" style={month.firstDayStyle}>{i}</li>);
      } else {
      days.push(<li className="day-number"><p>{i}</p></li>);
      }
    }
    console.log(days);
   return days;
  };

  return (
    <div className="calendar-wrapper">
      <h1>{currentMonth ? month.monthName : nextMonth.monthName}</h1>
      <ol className="calendar">
        <li className="day-name">Sun</li>
        <li className="day-name">Mon</li>
        <li className="day-name">Tue</li>
        <li className="day-name">Wed</li>
        <li className="day-name">Thu</li>
        <li className="day-name">Fri</li>
        <li className="day-name">Sat</li>

      {generateDays(currentMonth ? month : nextMonth)}
        {/* <li className="first-day day-number">1</li>

        <li className="day-number">2</li>
        <li className="day-number">3</li>
        <li className="day-number">4</li>
        <li className="day-number">5</li>
        <li className="day-number">6</li>
        <li className="day-number">7</li>
        <li className="day-number">8</li>
        <li className="day-number">9</li>
        <li className="day-number">10</li>
        <li className="day-number">11</li>
        <li className="day-number">12</li>
        <li className="day-number">13</li>
        <li className="day-number">14</li>
        <li className="day-number">15</li>
        <li className="day-number">16</li>
        <li className="day-number">17</li>
        <li className="day-number">18</li>
        <li className="day-number">19</li>
        <li className="day-number">20</li>
        <li className="day-number">21</li>
        <li className="day-number">22</li>
        <li className="day-number">23</li>
        <li className="day-number">24</li>
        <li className="day-number">25</li>
        <li className="day-number">26</li>
        <li className="day-number">27</li>
        <li className="day-number">28</li>
        <li className="day-number">29</li>
        <li className="day-number">30</li>
        <li className="day-number">31</li>*/}
      </ol>
    </div> 
  );
}

export default Calander;
