const { google } = require("googleapis");
require("dotenv").config();


const GOOGLE_PRIVATE_KEY = process.env.PRIVATE_KEY;
const GOOGLE_CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const GOOGLE_PROJECT_NUMBER = process.env.PROJECT_NUMBER;
const GOOGLE_CALENDAR_ID = process.env.CALENDAR_ID
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

const jwtClient = new google.auth.JWT(
  GOOGLE_CLIENT_EMAIL,
  null,
  GOOGLE_PRIVATE_KEY,
  SCOPES
);

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: jwtClient,
});


module.exports = {
  async getAllEvents(req, res) {
    
    let result;
    try {
      result = await calendar.events.list(
        {
          calendarId: GOOGLE_CALENDAR_ID,
          timeMin: req.params.startDate,
          timeMax: req.params.endDate,
          maxResults: 250,
          singleEvents: true,
          orderBy: "startTime",
        }
        );
      } catch(err) {
        console.log(err);
      }      
      res.json(result.data.items)
        
      },
  async getNext5Events(req, res) {
    
    let result;
    try {
      result = await calendar.events.list(
        {
          calendarId: GOOGLE_CALENDAR_ID,
          timeMin: new Date().toISOString(),
          maxResults: 5,
          singleEvents: true,
          orderBy: "startTime",
        }
        );
      } catch(err) {
        console.log(err);
      }      
      res.json(result.data.items)
        
      },

}