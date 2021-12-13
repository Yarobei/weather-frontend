import React, { useEffect, useState } from "react";

import style from "./weather-block-wrap.module.scss";
import CityBlock from "../CityBlock/CityBlock";
import Modal from "../Modal/Modal";

const defaultArr = [
  { index: 0, city: "" },
  { index: 1, city: "" },
  { index: 2, city: "" },
  { index: 3, city: "" },
  { index: 4, city: "" },
  { index: 5, city: "" },
  { index: 6, city: "" },
  { index: 7, city: "" },
];

const WeatherBlockWrap = ({ isAuthorized, setIsAuthorized }) => {
  const [cities, setCities] = useState(defaultArr);
  const [modalProps, setModalProps] = useState({ isOpen: false, index: null });

  useEffect(() => {
    const storedArrJson = localStorage.getItem("storedCities");
    try {
      if (!storedArrJson) {
        localStorage.setItem("storedCities", JSON.stringify(defaultArr));
      } else {
        setCities(JSON.parse(storedArrJson));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("storedCities", JSON.stringify(cities));
  // }, [cities]);

  const handlePinCity = (isPin, index, city) => {
    const storedArrJson = localStorage.getItem("storedCities");
    try {
      const storedArr = JSON.parse(storedArrJson);
      debugger;
      storedArr.splice(index, 1, {
        index,
        city: isPin ? city : "",
      });
      localStorage.setItem("storedCities", JSON.stringify(storedArr));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={style.wrap}>
        {cities.map((item) => {
          return (
            <CityBlock
              key={item.index}
              cityItem={item}
              isAuthorized={isAuthorized}
              setIsAuthorized={setIsAuthorized}
              setModalProps={setModalProps}
              cities={cities}
              setCities={setCities}
              handlePinCity={handlePinCity}
            />
          );
        })}
      </div>
      <Modal
        modalProps={modalProps}
        setModalProps={setModalProps}
        cities={cities}
        setCities={setCities}
      />
    </>
  );
};

export default WeatherBlockWrap;
