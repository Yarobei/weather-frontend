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
  const [error, setError] = useState(null);
  const { index, city } = cityItem;

  useEffect(() => {
    const isPinnedStored = JSON.parse(localStorage.getItem("storedCities"));
    setIsPinned(
      Boolean(isPinnedStored?.find((item) => item.index === index).city)
    );
    setCurrWeather(null);
    if (city && isAuthorized) {
      getData();
    }
  }, [city]);

  const getData = async () => {
    try {
      const weatherResponse = await getWeatherByCity(city);
      const weather = await weatherResponse.json();
      setCurrWeather(weather);
    } catch (error) {
      setError(error);
    }
  };

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
        {currWeather ? (
          <>
            <p>Temperature: {currWeather.main.temp}</p>
            <p>Feels like: {currWeather.main.feels_like}</p>
            <p>Weather description: {currWeather.weather[0].description}</p>
          </>
        ) : error ? (
          <>
            <p>{error.status}</p>
            <p>{error.statusText}</p>
          </>
        ) : null}
      </div>
      <button className={style.addButton} onClick={handleModalOpen}>
        {city ? "Change city" : "Add city"}
      </button>
    </div>
  );
};

export default CityBlock;
