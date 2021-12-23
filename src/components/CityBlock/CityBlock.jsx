import React, { useEffect, useState } from "react";
import { Button, Card, message, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { CityBlockContent } from "./CityBlockContent";

import { getWeatherByCity } from "../../service/weather/weather.service";

import style from "./city-block.module.scss";

export const CityBlock = ({
  cityName,
  handleAddCityModalOpen,
  handleRemoveCity,
  isPinned,
  handlePinCity,
}) => {
  const [currWeather, setCurrWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cityName) {
      getData();
    } else {
      setCurrWeather(null);
    }
  }, [cityName]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const weatherResponse = await getWeatherByCity(cityName);
      if (weatherResponse.ok) {
        const weather = await weatherResponse.json();
        setCurrWeather(weather);
      } else {
        handleRemoveCity();
        message.warning(weatherResponse.statusText);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contentRender = () => {
    if (currWeather) {
      return <CityBlockContent currWeather={currWeather} />;
    }
    return (
      <Button
        className={style.addButton}
        shape={"circle"}
        size={"large"}
        icon={<PlusOutlined />}
        onClick={handleAddCityModalOpen}
      />
    );
  };

  return (
    <Card
      title={currWeather?.name}
      className={style.wrap}
      bordered={true}
      loading={isLoading}
      extra={
        currWeather && (
          <Switch
            size={"small"}
            defaultChecked={isPinned}
            onChange={handlePinCity}
          />
        )
      }
      actions={
        currWeather && [
          <Button
            type={"primary"}
            key={"change"}
            onClick={handleAddCityModalOpen}
          >
            Change
          </Button>,
          <Button danger={true} onClick={handleRemoveCity}>
            Remove
          </Button>,
        ]
      }
    >
      <div className={style.content}>{contentRender()}</div>
    </Card>
  );
};
