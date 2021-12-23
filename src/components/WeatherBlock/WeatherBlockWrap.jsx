import React, { useCallback, useEffect, useState } from "react";
import { Button, Layout, Row, Col } from "antd";

import { CityBlock } from "../CityBlock/CityBlock";
import { AddCityModal } from "../AddCityModal/AddCityModal";
import { Logo } from "../Logo/Logo";

import { logOutRequest } from "../../service/auth/auth.service";

import style from "./weather-block-wrap.module.scss";

const { Header, Content } = Layout;

const defaultArray = [
  { city: "" },
  { city: "" },
  { city: "" },
  { city: "" },
  { city: "" },
  { city: "" },
  { city: "" },
  { city: "" },
];

export const WeatherBlockWrap = () => {
  const [cities, setCities] = useState(defaultArray);
  const [modalState, setModalState] = useState({
    isOpen: false,
    currentAddCardIndex: null,
  });

  const logOut = useCallback(() => logOutRequest(), []);

  useEffect(() => {
    const storedArrJson = localStorage.getItem("storedCities");
    if (!storedArrJson) {
      localStorage.setItem("storedCities", JSON.stringify({}));
      return;
    }
    const storedArray = JSON.parse(storedArrJson);
    const newArray = defaultArray.map((item, index) => {
      if (storedArray[index]) {
        return { ...item, city: storedArray[index], isPinned: true };
      }
      return item;
    });
    setCities(newArray);
  }, []);

  const handlePinCity = (item, index, isPinned) => {
    const storedCitiesObject = JSON.parse(localStorage.getItem("storedCities"));
    if (isPinned) {
      storedCitiesObject[index] = item.city;
    } else {
      delete storedCitiesObject[index];
    }
    localStorage.setItem("storedCities", JSON.stringify(storedCitiesObject));
  };

  const handleAddCityModalOpen = (index) => {
    setModalState({
      isOpen: true,
      currentAddCardIndex: index,
    });
  };

  const handleAddCityModalClose = () => {
    setModalState({
      isOpen: false,
      currentAddCardIndex: null,
    });
  };

  const addCity = (city) => {
    const newCities = [...cities];
    newCities.splice(modalState.currentAddCardIndex, 1, {
      city,
    });
    setCities(newCities);
    handleAddCityModalClose();
  };

  const handleRemoveCity = (index) => {
    const newCities = [...cities];
    newCities.splice(index, 1, {
      city: "",
    });
    handlePinCity(undefined, index, false);
    setCities(newCities);
  };

  return (
    <Layout className={style.layout}>
      <Header className={style.header}>
        <div className={style.headerContent}>
          <Logo />
          <Button onClick={logOut}>Logout</Button>
        </div>
      </Header>
      <Content className={style.content}>
        <Row gutter={16}>
          {cities.map((item, index) => {
            return (
              <Col className={style.col} key={index} span={6}>
                <CityBlock
                  cityName={item.city}
                  handleAddCityModalOpen={() => handleAddCityModalOpen(index)}
                  handleRemoveCity={() => handleRemoveCity(index)}
                  isPinned={item.isPinned}
                  handlePinCity={(isPinned) =>
                    handlePinCity(item, index, isPinned)
                  }
                />
              </Col>
            );
          })}
        </Row>
      </Content>
      <AddCityModal
        handleAddCity={addCity}
        handleClose={handleAddCityModalClose}
        isOpen={modalState.isOpen}
      />
    </Layout>
  );
};
