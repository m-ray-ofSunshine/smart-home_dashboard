
export const getCalendar = () => {
  try {
  
    fetch("/api/calendar")
      .then((response) => response.json())
      .then((data) => console.log(data));
  } catch (error) {
      console.log(error);
  }
};

 
