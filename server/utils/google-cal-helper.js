const path = require('path');
require("dotenv").config();

const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];


const dateStart = new Date().toISOString()
const dateEnd = new Date('2022', '02', '28').toISOString()
module.exports = {
    
    /**
     * Load or request or authorization to call APIs.
    *
    */
   async authorize() {
       let client = await loadSavedCredentialsIfExist();
       if (client) {
           return client;
        }
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
            await saveCredentials(client);
        }
        return client;
    }
    ,
    /**
     * Lists the next 10 events on the user's primary calendar.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
   async listEvents() {
       const auth = new google.auth.GoogleAuth({
           keyFile: path.join(__dirname, 'keys.json'),
           scopes: 'https://www.googleapis.com/auth/drive.readonly',
        });
        const client = await auth.getClient();
        const calendar = google.calendar({ version: 'v3', auth: client });
    
    const res = await calendar.events.list({
        calendarId: 'h7tjv4n7n0aeqjqohcdqbh4td0@group.calendar.google.com',
        //calendarId: 'primary',
        timeMin: dateEnd,
        timeMax: dateStart,
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    });
    return res
   
}
};
