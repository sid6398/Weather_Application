import React, { useEffect, useRef, useState } from "react";

const WeatherComponent = () => {
  const [weatherdata, setWeatherData] = useState(false);

  const inputref = useRef();

  const search = async (city) => {
    if(city === ""){
      alert("Enter city Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);

      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      // console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      setWeatherData(false);

    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div
      className="container mx-auto card p-5 bg-orange-300 rounded-2xl w-80
     text-center"
    >
      <input
        className="p-2 rounded-md"
        type="text"
        placeholder="Enter location"
        ref={inputref}
      />
      <button
        className="bg-blue-400 text-white rounded-md p-2 my-3 block w-full"
        onClick={() => search(inputref.current.value)}
      >
        Get Weather
      </button>
      {weatherdata ? (
        <>
          {" "}
          <div>
            <img
              src={weatherdata.icon}
              alt="weather_icon"
              className="block m-auto"
            />
            <h1 className="text-5xl">{weatherdata.temperature}°C</h1>

            <h3 className="text-3xl">{weatherdata.location}</h3>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WeatherComponent;
