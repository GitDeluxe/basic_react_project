import React , {useEffect, useState} from 'react';

import './App.css';
import axios from 'axios';
const WEATHER_API_KEY = "10e295f3e3f3b5cdde7ea86fc5c6d5b2";

function App() {

  const [lat , setLat] = useState(10);
  const [lon , setLon] = useState(40);
  const [nbrJour , setNbrJour] = useState(1);
  const [meteo , setMeteo] = useState(null)
  useEffect(()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(function(position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        getTemperature(position.coords.latitude, position.coords.longitude , nbrJour)
      });
    } else {
      /* la géolocalisation n'est pas disponible */
    }
  },[])

  const getTemperature = async (lat , lon , nbrJour) => {
    const data  = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${nbrJour}&appid=${WEATHER_API_KEY}&lang=fr&units=metric`);
    console.log(data);
    setMeteo(data.data);
  }


  return (
    <div className="App">
      <div className="header">
        Test d'aptitude technique Quos 
      </div>
      <div className="flex-column height-inherit">
      {meteo && (
        meteo.list.map((list)=>{
          return (
          <div className="flex-column margin-auto text">
            <img src={`http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`}/>
            <span>{list.temp.day}</span>
            <span>{list.weather[0].description}</span>
          </div>
          )
        })
        
      )}
      </div>
    </div>
  );
}

export default App;
