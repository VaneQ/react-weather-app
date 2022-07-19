import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sky from './assets/sky.jpeg'

function App() {

  const [ lon, setLongitude ] = useState('');
  const [ lat, setLatitude ] = useState(''); 
  const [ location, setLocation ] = useState('');

  const [ data, setData ] = useState({})

  const key ='65e219cc1095b2e7b8f3c8b6875cfb37';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`
  //const url =`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}`;


  const onSuccess = async (position) => {

    const { latitude, longitude } = position.coords;
    setLongitude(longitude);
    setLatitude(latitude);

  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess)
  }

  const getWeatherInfo = () => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(data)
    })
    setLocation('');
  }

  
  // useEffect(() => {
  //     getLocation()
  //     getWeatherInfo()
  // },[lat,lon])


  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      getWeatherInfo();
    }
  }

  return (
    <div className="app">
      <div className='search'>
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter location"
          type="text"
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temperature'>
            {data.main ? <h1>{ data.main.temp.toFixed() } C°</h1> : null}
            
          </div>
          <div className='description'>
            <p>{data.weather ? data.weather[0].description : null}</p>
            
          </div>
        </div>

        { data.main ? 
          <div className='bottom'>
          <div className='feels'>
            <p className='bold'>Feels like</p>
            { data.main ? <p>{ data.main.feels_like } C°</p> : <p>No data</p>}
          </div>
          <div className='humidity'>
            <p className='bold'>Humidity</p>
            { data.main ? <p>{data.main.humidity} %</p> : <p>No data</p> }
            
          </div>
          <div className='wind'>
            <p className='bold'>Wind</p>
            { data.wind ? <p>{data.wind.speed} M/seg</p> : <p>No data</p>}
          </div>
        </div> : null }
        
      </div> 
    </div>
  );
}

export default App;
