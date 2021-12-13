import React from "react";

import { login } from "../../service/auth/auth.service";

import style from "./authorization.module.scss";

const Authorization = ({ isAuthorized, setIsAuthorized }) => {
  const authorize = async () => {
    try {
      await login();
      setIsAuthorized(true);
    } catch (err) {
      setIsAuthorized(false);
    }
  };

  return (
    <div className={style.wrap}>
      {isAuthorized ? (
        <span>You are authorized</span>
      ) : (
        <button onClick={authorize}>Login</button>
      )}
    </div>
  );
};

export default Authorization;
