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
      debugger;
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

  const cityBlockContent = () => {
    const currWeatherObj = {
      Temperature: {
        value: currWeather?.main?.temp,
        unit: "°C",
      },
      Humidity: {
        value: currWeather?.main?.humidity,
        unit: "%",
      },
      "Feels like": {
        value: currWeather?.main?.feels_like,
        unit: "°C",
      },
      "Weather description": {
        value: currWeather?.weather?.[0]?.description,
        unit: null,
      },
    };
    if (error) {
      return (
        <>
          <p>{error.status}</p>
          <p>{error.statusText}</p>
        </>
      );
    }
    return Object.keys(currWeatherObj).map((item) => {
      return currWeatherObj[item].value ? (
        <p className={style.contentItem}>
          <span className={style.contentLabel}>{item}:</span>{" "}
          {currWeatherObj[item].value && (
            <span className={style.contentDescription}>
              {currWeatherObj[item].value} {currWeatherObj[item].unit}
            </span>
          )}
        </p>
      ) : null;
    });
  };

  return (
    <div className={style.wrap}>
      <div className={style.content}>
        {city && (
          <button
            className={`${style.pinButton} ${style.animateButton}`}
            onClick={handlePin}
          >
            {isPinned ? "Unpin" : "Pin"}
          </button>
        )}
        <p>City: {currWeather?.name ?? "-"}</p>
        {cityBlockContent()}
      </div>
      <button
        className={`${style.addButton} ${style.animateButton}`}
        onClick={handleModalOpen}
      >
        {city ? "Change city" : "Add city"}
      </button>
    </div>
  );
};

export default CityBlock;
