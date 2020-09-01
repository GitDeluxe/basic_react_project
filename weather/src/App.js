import React , {useEffect, useState} from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
const WEATHER_API_KEY = "10e295f3e3f3b5cdde7ea86fc5c6d5b2";



function App() {
  const [lat , setLat] = useState(10);
  const [lon , setLon] = useState(40);
  const [temp, setTemp] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState ([]);
  const [iconSrc, setIconSrc] = useState ("");


  useEffect(()=>{
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(function(position) {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
                  });
      } else {
        /* la géolocalisation n'est pas disponible */
      }
    },[])

    const getWeather = (lat, lon) => {
      try {
        axios.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+WEATHER_API_KEY+"&lang=fr&units=metric")
        .then(res => {
          setWeatherInfo(res.data.weather[0].description);
          setTemp(res.data.main.temp);
          
          const tmp_icon = res.data.weather[0].icon.toString();
          
          setIconSrc("http://openweathermap.org/img/wn/"+tmp_icon+"@2x.png");
          console.log(iconSrc);
          
        })

      }
      catch(err){
        console.log(err);
      }

    }


    // le but de l'exercice est d'afficher la meteo du jour en focntion des coordonées GPS recuperé au dessus . 

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Test d'apititude technique Quos
        </p>
        
      </header>
        <div>
          {getWeather(lat, lon)}
        </div>
        <div className="info">
          <img scr={`${iconSrc}`} alt="weather_icon" />
          <p>{iconSrc}</p>
          <p>{temp}</p>
          <p>{weatherInfo}</p>
          

        </div>

      
      
    </div>
  );
}

export default App;
