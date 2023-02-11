const fs = require('fs').promises;
const path = require('path');
const process = require('process');
require("dotenv").config();

//const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
// console.log(CREDENTIALS_PATH);
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
// async function loadSavedCredentialsIfExist() {
//     try {
//         const content = await fs.readFile(TOKEN_PATH);
//         const credentials = JSON.parse(content);
//         return google.auth.fromJSON(credentials);
//     } catch (err) {
//         return null;
//     }
// }

// /**
//  * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//     const content = await fs.readFile(CREDENTIALS_PATH);
//     const keys = JSON.parse(content);
//     const key = keys.installed || keys.web;
//     const payload = JSON.stringify({
//         type: 'authorized_user',
//         client_id: key.client_id,
//         client_secret: key.client_secret,
//         refresh_token: client.credentials.refresh_token,
//     });
//     await fs.writeFile(TOKEN_PATH, payload);
// }


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
        console.log(auth);
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
    //   const events = res.data.items;
    //   if (!events || events.length === 0) {
    //     console.log('No upcoming events found.');
    //     return;
    //   }
    //   console.log('Upcoming 10 events:');
    //   events.map((event, i) => {
    //     const start = event.start.dateTime || event.start.date;
    //     console.log(`${start} - ${event.summary}`);
    //   });
}
};
