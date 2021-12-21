import React from "react";
import { Typography } from "antd";

import style from "./logo.module.scss";

const { Title } = Typography;

export const Logo = () => {
  return <Title className={style.logo}>Weather App</Title>;
};
