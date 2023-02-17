import React, { useState } from "react";
import axios from "axios";

import startBg from "./assets/startBg.jpg"
import sumBg from "./assets/summer/sunset.jpg";
import winBg from "./assets/winter/sunset.jpg";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [bg, setBg] = useState(startBg);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=ru&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        if (response.data.main.temp < 9) setBg(winBg);
        else setBg(sumBg);
        setData(response.data);
      });
      setLocation('');
    }
  }

  return (
    <div className="app" style={{background: `url(${bg}) no-repeat center center/cover`}}>
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
            {data.weather ? <p>{data.weather[0].description.replace(/./,x=>x.toUpperCase())}</p> : null}
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
