// Products.js
import React, { useRef, useEffect, useState } from 'react';
import thermometer from '../images/thermometer-mercury-cold.svg';
import clear from '../images/01d.svg';
import clearn from '../images/01n.svg';
import fewclouds from '../images/02d.svg';
import fewcloudsn from '../images/02n.svg';
import scatteredclouds from '../images/03d.svg';
import scatteredcloudsn from '../images/03n.svg';
import brokenclouds from '../images/04d.svg';
import brokencloudsn from '../images/04n.svg';
import shower from '../images/09d.svg';
import showern from '../images/09n.svg';
import rain from '../images/10d.svg';
import rainn from '../images/10n.svg';
import thunderstorm from '../images/11d.svg';
import thunderstormn from '../images/11n.svg';
import snow from '../images/13d.svg';
import snown from '../images/13n.svg';
import mist from '../images/50d.svg';
import mistn from '../images/50n.svg';

export default function MainDisplay() {
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('Paris');
    const [units, setUnits] = useState('metric');
    const searchRef = useRef();

    // Define the mapping of icon IDs to SVG imports
    const iconMap = {
        "01d": clear, "01n": clearn,
        "02d": fewclouds, "02n": fewcloudsn,
        "03d": scatteredclouds, "03n": scatteredcloudsn,
        "04d": brokenclouds, "04n": brokencloudsn,
        "09d": shower, "09n": showern,
        "10d": rain, "10n": rainn,
        "11d": thunderstorm, "11n": thunderstormn,
        "13d": snow, "13n": snown,
        "50d": mist, "50n": mistn
    };

    const weatherData = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&id=524901&units=${units}&appid=3e43c3d8b684e8223c23a336c725a765`);

        const data = await response.json();
        console.log(data);
        setWeather(data);
    };

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (pos) => console.log(pos),
            (e) => console.log(e)
        );
    };
    getCurrentLocation();

    useEffect(() => {
        weatherData();
    }, [city, units]);

    const search = () => {
        setCity(searchRef.current.value);
    };

    const formatDateTime = (unixTime) => {
        const date = new Date(unixTime * 1000);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        return `${formattedDate} ${formattedTime}`;
    };

    return (
        <div className='maindisplay-container'>
            <div className='city-temp-container'>
                <div className='city-country'>
                    <img src={`https://flagcdn.com/28x21/${weather.sys?.country?.toLowerCase()}.png`}
                        width="30" alt="flag"
                    />
                    <h1><big className='city-text'>{weather.name}</big></h1>
                    <small>{weather.sys?.country}</small>
                    
                </div>
                
                <div className='search-container'>
                    <input type='text' placeholder='Search City' className='search-bar' ref={searchRef} />
                    <button className='search-button' onClick={search}>Search</button>
                </div>
                <span className='time-temp'>
                    <h2>{weather.dt ? formatDateTime(weather.dt) : ''}</h2>
                </span>
            </div>
            <div className='weather-details-container'>
                <div className='weather-icon'>
                    <img
                        className='icon-image'
                        src={iconMap[weather.weather?.[0]?.icon] || thermometer}
                        alt='weather-icon'
                    />
                </div>
                <div className='temperature-container'>
                    <h2><big className='temperature'>{weather.main ? Math.round(weather.main.temp) : ''}°{units === 'metric' ? 'C' : 'F'}</big></h2>
                    {units === 'metric'
                        ? <button className='unit-button' onClick={() => setUnits('imperial')}>°F</button>
                        : <button className='unit-button' onClick={() => setUnits('metric')}>°C</button>
                    }
                </div>
                <h2 className='weather-type'>{weather.weather?.[0]?.description}</h2>
                <hr />
                <h3 className='weather-description'>Humidity: <b>{weather.main?.humidity}%</b></h3>
                <hr />
                <h3 className='weather-description'>Feels like: <b>{weather.main ? Math.round(weather.main.feels_like) : ''}°{units === 'metric' ? 'C' : 'F'}</b></h3>
                <hr />
                <h3 className='weather-description'>Visibility: <b>{weather.visibility} m</b></h3>
                <hr />
                <h3 className='weather-description'>Wind Speed: <b>{weather.wind?.speed} mph</b></h3>
            </div>
        </div>
    );
};