
export const getCalendar = async (req, res) => {
  return await fetch("/api/calendar")
      .then(res => res.json());
  
};

 
