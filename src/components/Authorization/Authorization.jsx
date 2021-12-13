import React from "react";

import { login } from "../../service/auth/auth.service";

import style from "./authorization.module.scss";
import commonStyles from "../../common.module.scss";

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
        <button
          className={`${style.loginButton} ${commonStyles.animateButton}`}
          onClick={authorize}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Authorization;
