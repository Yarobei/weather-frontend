import React, { useEffect, useState } from "react";

import { getWeatherByCity } from "../../service/weather/weather.service";

import style from "./city-block.module.scss";

const CityBlock = ({
  cityItem,
  setModalProps,
  isAuthorized,
  handlePinCity,
}) => {
  const [currWeather, setCurrWeather] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const { index, city } = cityItem;

  useEffect(() => {
    const isPinnedStored = JSON.parse(localStorage.getItem("storedCities"));
    setIsPinned(
      Boolean(isPinnedStored?.find((item) => item.index === index).city)
    );
    (async () => {
      setCurrWeather(null);
      debugger;
      if (city && isAuthorized) {
        const weatherResponse = await getWeatherByCity(city);
        debugger;
        if (weatherResponse?.status === 200) {
          const weather = await weatherResponse.json();
          setCurrWeather(weather);
        } else {
          throw new Error();
        }
      }
    })();
  }, [city]);

  const handleModalOpen = () => {
    setModalProps({ index, isOpen: true });
  };

  const handlePin = () => {
    setIsPinned(!isPinned);
    handlePinCity(!isPinned, index, city);
  };

  return (
    <div className={style.wrap}>
      <div className={style.content}>
        {city && (
          <button className={style.pinButton} onClick={handlePin}>
            {isPinned ? "Unpin" : "Pin"}
          </button>
        )}
        <p>City: {city}</p>
        {currWeather && (
          <>
            <p>Temperature: {currWeather.main.temp}</p>
            <p>Feels like: {currWeather.main.feels_like}</p>
            <p>Weather description: {currWeather.weather[0].description}</p>
          </>
        )}
      </div>
      <button className={style.addButton} onClick={handleModalOpen}>
        {city ? "Change city" : "Add city"}
      </button>
    </div>
  );
};

export default CityBlock;
