# Smart Display

## Purpose
Smart Display is designed to replace a physical whiteboard calendar while introducing smart functionalities. It dynamically integrates weather forecasts, Google Calendar events, and provides interactive features like a shopping list and notes that can be managed using an Alexa skill.

## Features

### Overview
- **Dynamic Calendar**: Custom-built calendar dynamically highlights the current day and displays events from a linked Google Calendar, including their times and locations.
- **Weather Section**: Displays current weather details such as temperature, wind speed, and feels-like temperature, along with:
  - Sunrise and sunset times.
  - Hourly forecast for the next 6 hours.
  - Daily forecast for the next 3 days.
- **Shopping List and Notes**: 
  - Managed via the app or Alexa skill.
  - Shopping list and notes are stored in DynamoDB and accessed through a shared Lambda backend API.
- **Alexa Skill Integration**:
  - Add or remove items from the shopping list and notes using voice commands.
  - Commands synchronize with the app in real-time.
  - [Lambda repo](https://github.com/m-ray-ofSunshine/smart-home_lambda/blob/master/index.mjs)

### Voice Commands

#### Shopping List:
- **Add Items**:
  - `Add {ItemName} to the list.`
  - `Put {ItemName} to my list.`
- **Remove Items**:
  - `Remove {ItemName} from my list.`
  - `Take {ItemName} off my list.`

#### Notes:
- **Add Notes**:
  - `Add {Note} to the notes.`
  - `Put {Note} in my notes.`
- **Remove Notes**:
  - `Remove {NoteIdentifier} from my notes.`
  - `Delete {NoteIdentifier} from my notes.`

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js (shared Lambda backend for both API and Alexa skill)
- **Database**: DynamoDB for shopping list and notes storage
- **APIs**:
  - Google Calendar API
  - OpenWeatherMap API

## Setup Instructions

### Prerequisites
- Node.js installed on your machine.
- API keys for:
  - Google Calendar
  - OpenWeatherMap

### Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add the following environment variables:
   - `GOOGLE_CALENDAR_API_KEY`
   - `OPEN_WEATHER_MAP_API_KEY`
   - Any other necessary configuration keys.
4. Start the application locally using `npm start`.

## Deployment
Currently, Smart Display is not deployed. The planned deployment is to a local home server for local network access.

## Future Enhancements
- **Spotify Now Playing Widget**: Displaying currently playing music.
- **Dedicated Smart Display Hardware**: A standalone display device for this application.

## Infrastructure Diagram
(TODO: Add a diagram illustrating the relationships between components, including React frontend, Node.js backend, AWS Lambda, DynamoDB, Google Calendar API, and OpenWeatherMap API.)

## License
(TODO: Determine and specify the license under which this project will be shared.)

