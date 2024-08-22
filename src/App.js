import React, { useState } from 'react';
import Keys from './Keys';
import './App.css';

const api = {
    key: Keys.API_KEY,
    base: Keys.BASE_URL
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const dataBuild = () => {
        let data = String(new Date());
        data = data.slice(3, 15);
        return data;
    }

    const search = (event) => {
        if (event.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
                .then(response => response.json())
                .then((results) => {
                    setQuery("");
                    setWeather(results);
                })
                .catch(error => console.error("Error fetching weather data:", error));
        }
    }

    return (
        <div className={ typeof weather.main !== "undefined" ? weather.main.temp > 16 ? "App hot" : "App cold" : "App" }>
            <main>
                <div className='block'></div>
                <div className='search-container'>
                    <input 
                        type='text'
                        placeholder='Search...'
                        className='search-bar'
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyDown={search} 
                    />
                </div>
                {weather.main && (
                    <div className='location-container'>
                        <div className='location'>
                            {weather.name}
                        </div>
                        <div className='date'>{dataBuild()}</div>  
                    </div>
                )}
                {weather.main && (
                    <div className='weather-container'>
                        <div className='temperature'>
                            {weather.main && weather.main.temp ? `${weather.main.temp}°C` : '30°C'}
                        </div>
                        <div className='weather'>
                            {weather.weather && weather.weather[0] ? weather.weather[0].description : 'Clouds'}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
