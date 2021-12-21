import React from "react";
import { Spin } from "antd";

import style from "./content-preloader.module.scss";

export const ContentPreloader = () => {
  return (
    <div className={style.wrap}>
      <Spin size={"large"} />
    </div>
  );
};
