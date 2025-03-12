import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [showContact, setShowContact] = useState(false); // State to toggle contact info

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:9191/api/weather/${city}`);
            console.log(response.data); // Log the response for debugging
            setWeatherData(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
            setWeatherData(null);
        }
    };

    return (
        <div className="weather-app">
            {/* Moving Clouds */}
            <div className="clouds">
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
                <div className="cloud"></div>
            </div>

            {/* Weather Container */}
            <div className="weather-container">
                <h1>Weather App</h1>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button onClick={fetchWeather}>Get Weather</button>
                </div>
                {error && <p className="error">{error}</p>}
                {weatherData && (
                    <div className="weather-info">
                        <h2>{weatherData.city}</h2>
                        <p>Temperature: {weatherData.temperature}°C</p>
                        <p>Description: {weatherData.description}</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="footer">
                <button className="contact-button" onClick={() => setShowContact(!showContact)}>
                    {showContact ? 'Hide Contact' : 'Contact Us'}
                </button>
                {showContact && (
                    <div className="contact-info">
                        <p>Created By @Kishor Darkunde</p>
                        <p>Contact: 7517425821</p>
                        <p>Email: kishordarkunde4@gmail.com</p>
                    </div>
                )}
            </footer>
        </div>
    );
};

export default Weather;