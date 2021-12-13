import React, { useEffect, useState } from "react";

import Authorization from "./components/Authorization/Authorization";
import WeatherBlockWrap from "./components/WeatherBlock/WeatherBlockWrap";

import style from "./app.module.scss";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    try {
      await checkAuthorization();
      setIsAuthorized(true);
    } catch (err) {
      setIsAuthorized(false);
    }
  };

  return (
    <div className={style.wrap}>
      <h1 className={style.header}>Weather App</h1>
      <Authorization
        isAuthorized={isAuthorized}
        setIsAuthorized={setIsAuthorized}
      />
      {isAuthorized && (
        <WeatherBlockWrap
          isAuthorized={isAuthorized}
          setIsAuthorized={setIsAuthorized}
        />
      )}
    </div>
  );
};

export default App;
