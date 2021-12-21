import React from "react";
import style from "./city-block.module.scss";

export const CityBlockContent = ({ currWeather }) => {
  const currentWeatherObj = {
    Temp: {
      value: currWeather.main.temp,
      unit: "°C",
    },
    Hmdt: {
      value: currWeather?.main?.humidity,
      unit: "%",
    },
    Feels: {
      value: currWeather?.main?.feels_like,
      unit: "°C",
    },
    Desc: {
      value: currWeather?.weather?.[0]?.description,
      unit: null,
    },
  };

  return Object.keys(currentWeatherObj).map((item, index) => {
    return currentWeatherObj[item].value ? (
      <p key={index} className={style.contentItem}>
        <span className={style.contentLabel}>{item}:</span>{" "}
        {currentWeatherObj[item].value && (
          <span className={style.contentDescription}>
            {currentWeatherObj[item].value} {currentWeatherObj[item].unit}
          </span>
        )}
      </p>
    ) : null;
  });
};
