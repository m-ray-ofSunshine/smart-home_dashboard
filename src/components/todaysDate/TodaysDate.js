function TodaysDate() {
    return ( 
        <div>
            {new Date().toLocaleDateString()}
        </div>
     );
}

export default TodaysDate;