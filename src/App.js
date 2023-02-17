import React, { useState } from "react";
import axios from "axios";

import startBg from "./assets/startBg.jpg"
import sumNightBg from "./assets/summer/night.jpg";
import sumSunsetBg from "./assets/summer/sunset.jpg"
import sumMornBg from "./assets/summer/morning.jpg"
import winNightBg from "./assets/winter/night.jpg";
import winSunsetBg from "./assets/winter/sunset.jpg"
import winMornBg from "./assets/winter/morning.jpg"

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [bg, setBg] = useState(startBg);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=ru&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  const searchLocation = (event) => {
    let currentTime = getCurrentTime();
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        if (response.data.main.temp < 9) {
          if (19 <= currentTime || currentTime < 9) {
            setBg(winNightBg);
          }
          if (currentTime >= 9 && currentTime <= 16) {
            setBg(winSunsetBg);
          }
          if (currentTime >= 17 && currentTime <= 18) {
            setBg(winMornBg);
          }
        }
        if (response.data.main.temp >= 9) {
          if (22 <= currentTime || currentTime < 6) {
            setBg(sumNightBg);
          }
          if (currentTime >= 19 && currentTime <= 21) {
            setBg(sumSunsetBg);
          }
          if (currentTime >= 6 && currentTime <= 18) {
            setBg(sumMornBg);
          }
        }
        setData(response.data);
      });
      setLocation('');
    }
  }

  function getCurrentTime() {
    return new Date().getHours();
  }

  return (
    <div className="app" style={{ background: `url(${bg}) no-repeat center center/cover` }}>
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Введите локацию"
          onKeyDown={searchLocation}
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description.replace(/./, x => x.toUpperCase())}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}</p> : null}
              <p>Ощущается как</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Влажность</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}м/с</p> : null}
              <p>Сокрость ветра</p>
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
