import { useEffect, useState } from 'react'
import env from "react-dotenv";
import './Weather.css'
function Weather() {
    const api_key = env.weather_api_key
    const lat = env.latitude
    const long = env.longitude

    const [weatherData, setWeatherData] = useState();

    function getIconImage(iconCode, size="75") {
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        var image = <img src={iconUrl} alt={weatherData.current.weather[0].description} width={size} height={size} ></img>
        return image;
    }

    function generateDayWeatherTile(dailyData) {
        let dailyArr = [];
        for (let i = 1; i < 4; i++) {
            let data = dailyData[i]
            //console.log(data);
            let el = <div className='daily-weather-tile'>
                <div className='daily-weather-tile-date'>{new Intl.DateTimeFormat("en-US", {weekday: "short", month: "short", day: "numeric"}).format(new Date(data.dt*1000))}</div>
                <div>{Math.round(data.temp.day)} f &#176;</div>
                <div>{getIconImage(data.weather[0].icon, "35")}</div>
            </div>
            dailyArr.push(el)
        }
        return dailyArr
    }
    function generateHourWeatherTile(hourlyData) {
        let hourlyArr = [];
        for (let i = 0; i < 3; i++) {
            let data = hourlyData[i*2+2]
           // console.log(data);
            let el = <div className='hourly-weather-tile'>
                <div>{new Intl.DateTimeFormat("en-US", { hour: "numeric"}).format(new Date(data.dt*1000))}</div>
                <div>{Math.round(data.temp)} f &#176;</div>
                <div>{getIconImage(data.weather[0].icon, "35")}</div>
            </div>
            hourlyArr.push(el)
        }
        return hourlyArr
    }


    useEffect(() => {
        const getWeatherData = async () => {
            return await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely&appid=${api_key}`)
                .then(res => res.json())
        };

        if (!weatherData) {
            getWeatherData()
                .then(data => {
                    setWeatherData(data)
                });
        }
    }, [weatherData, lat, long, api_key]);
    console.log(weatherData);
    return (
        <>
            {weatherData &&
                <div className="weather-wrapper">

                    <div className='current-temp'>
                        <div className='temp'>{weatherData.current.temp.toPrecision(3)} f &#176;</div>
                        <div>{getIconImage(weatherData.current.weather[0].icon)}</div>
                    </div>
                    <div className='hourly-weather'>
                       {generateHourWeatherTile(weatherData.hourly)}
                    </div>
                    <div className='weather-other'>
                        <div>Wind speed: <span>{weatherData.current.wind_speed.toPrecision(3)} mph</span></div>
                        <div>Feels like: <span>{Math.round(weatherData.current.feels_like)} f &#176;</span></div>
                        <div>Sunrise: <span>{new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric"}).format(new Date(weatherData.current.sunrise*1000))}</span></div>
                        <div>Sunset: <span>{new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "numeric"}).format(new Date(weatherData.current.sunset*1000))}</span></div>
                    </div>
                    <div className='daily-weather'>
                        {generateDayWeatherTile(weatherData.daily)}
                    </div>
                </div>
            }
        </>
    );
}

export default Weather;