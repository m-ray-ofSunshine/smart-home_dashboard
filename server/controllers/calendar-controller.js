const { google } = require("googleapis");
require("dotenv").config();
const keyFile = require('../utils/keys.json')

const GOOGLE_PRIVATE_KEY = process.env.private_key;
const GOOGLE_CLIENT_EMAIL = process.env.client_email;
const GOOGLE_PROJECT_NUMBER = process.env.project_number;
const GOOGLE_CALENDAR_ID = process.env.calendar_id;

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

const auth = new google.auth.GoogleAuth({
  keyFile: keyFile,
  scopes: SCOPES,
});

module.exports = {
    async getAllEvents(req, res) {
        let result;
        try {
             result = await calendar.events.list(
                {
                  calendarId: GOOGLE_CALENDAR_ID,
                  timeMin: new Date().toISOString(),
                  maxResults: 10,
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