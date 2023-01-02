import React, { useState } from 'react'

const api = {
  key: "dfaf972a70314f16efc33da0801f0460",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  //to make app dynamic
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});//set to an empty object

  //creating the search function, evt stands for event
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          // console.log(result);
        });
    }
  }

  // arrow function to hold date
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 23) ? 'app warm' : 'app') : 'app'}>
      <main>

        <div className="search-container">
          <input type="text" className="search-input" placeholder="Search for your city..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} required/>
        </div>

        {(typeof weather.main != "undefined") ? (
        <div className="container">
          <div className="location-container">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-container">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}

      </main>
    </div>
  )
}

export default App
