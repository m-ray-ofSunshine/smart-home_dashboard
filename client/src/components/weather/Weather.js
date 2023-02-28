import { useEffect, useState } from 'react'
import env from "react-dotenv";
import './Weather.css'
function Weather() {
    const api_key = env.weather_api_key
    const lat = env.latitude
    const long = env.longitude

    const [weatherData, setWeatherData] = useState();

    function getIconImage(iconCode) {
        var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";
        var image = <img src={iconUrl} alt={weatherData.weather[0].description} width="75" height="75" ></img>
        return image;
    }

    useEffect(() => {
        const getWeatherData = async () => {
            return await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&units=imperial&exclude=minutely,hourly,daily&appid=${api_key}`)
                .then(res => res.json())
        };

        if (!weatherData) {
            getWeatherData()
                .then(data => {
                    setWeatherData(data.current)
                });
        }
    }, [weatherData, lat, long, api_key]);
    console.log(weatherData);
    return (
        <>
            {weatherData &&
                <div className="weather-wrapper">

                    <div className='current-temp'>
                        <div className='temp'>{weatherData.temp} f &#176;</div>
                        <div>{getIconImage(weatherData.weather[0].icon)}</div>
                    </div>
                    <div className='hourly-weather'>
                        <div>hour weather</div>
                        <div>hour weather</div>
                        <div>hour weather</div>
                    </div>
                    <div className='weather-other'>
                        <div>Wind speed: <span>{weatherData.wind_speed} mph</span></div>
                        <div>Feels like: <span>{weatherData.feels_like} f &#176;</span></div>
                        <div>Sunrise: <span>{new Date(weatherData.sunrise*1000).toLocaleTimeString()}</span></div>
                        <div>Sunset: <span>{new Date(weatherData.sunset*1000).toLocaleTimeString()}</span></div>
                    </div>
                    <div className='hourly-weather'>
                        <div>day weather</div>
                        <div>day weather</div>
                        <div>day weather</div>
                    </div>
                </div>
            }
        </>
    );
}

export default Weather;