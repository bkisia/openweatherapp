// Products.js
import React, {useRef, useEffect, useState } from 'react';
import weathergif from '../images/WeatherIcons.gif'

export default function MainDisplay() {
  
    const [weather, setWeather] = useState({});
    const searchRef = useRef();

    const weatherData = async () => {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=paris&id=524901&units=metric&appid=3e43c3d8b684e8223c23a336c725a765');
        const data = await response.json();
        console.log(data);
        setWeather(data);
    }


    useEffect(() => {
        weatherData();
    }, []);
  
    const search = async () => {
        const response  = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchRef.current.value+'&appid=3e43c3d8b684e8223c23a336c725a765');
        const data = await response.json();
        setWeather(data);
    }
    return (
    <div className='maindisplay-container'>
       
        
          <div className='city-temp-container'>  
             
            <h1><big className='city-text'>{weather.name}</big></h1> <small>{weather.sys?.country}</small>
                <div className='search-container'>
                    <input type='text' placeholder='Search City' className='search-bar'ref={searchRef}/>
                    <button className='search-button' onClick={search}>Search</button>
                </div>
             
            <span className='time-temp' >
                <h2>{weather.dt}</h2>
                <h2><big className='temperature'>{weather.main?.temp}&deg;C</big></h2>
            </span>

          </div>

          <div className='weather-details-container'>
            <div className='weather-icon'>
                <img className='icon-image' src={weathergif} alt='cloudy'/>
            </div>
            <h2 className='weather-type'>{weather.weather?.[0]?.description}</h2>
            <hr/>
            <h3 className='weather-description'>  Humidity: &emsp; {weather.main?.humidity}% </h3>
            <hr/>
            <h3 className='weather-description'> Feels like: &emsp; {weather.main?.feels_like}&deg;C </h3>
            <hr/>
            <h3 className='weather-description'> Visibility: &emsp; {weather.visibility}m </h3>
            <hr/>
            <h3 className='weather-description'> Wind Speed: &emsp; {weather.wind?.speed} mph </h3>
          </div>
        
      
    </div>
  )
}
