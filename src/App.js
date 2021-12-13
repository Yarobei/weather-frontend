import React, { useEffect, useState } from "react";

import Authorization from "./components/Authorization/Authorization";
import WeatherBlockWrap from "./components/WeatherBlock/WeatherBlockWrap";

import { checkAuthorization } from "./service/auth/auth.service";

import style from "./app.module.scss";

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    (async () => {
      const authResponse = await checkAuthorization();
      if (authResponse.status === 200) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    })();
  }, []);

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
