import React from 'react';

import {login} from "../../service/auth/auth.service";

import style from "./authorization.module.scss"

const Authorization = ({isAuthorized, setIsAuthorized}) => {
  const authorize = async () => {
    const response = await login()
    if (response.status === 200) {
      setIsAuthorized(true)
    } else {
      console.log(response)
      setIsAuthorized(false)
    }
  }

  return (
    <div className={style.wrap}>
      {isAuthorized ? (
        <span>Вы авторизованы</span>
      ) : (

      <button onClick={authorize}>Авторизоваться</button>
      )}
    </div>
  );
};

export default Authorization;