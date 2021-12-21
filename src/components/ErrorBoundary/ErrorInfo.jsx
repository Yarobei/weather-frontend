import React from "react";
import { Result, Button } from "antd";

import style from "./error-boundary.module.scss";

export const ErrorInfo = ({ error }) => {
  const description = !(error instanceof Error)
    ? error.result.value
    : "Unknown error";

  return (
    <div className={style.wrap}>
      <Result
        status="500"
        subTitle={description}
        extra={
          <Button type="primary" onClick={() => document.location.reload()}>
            Reload page
          </Button>
        }
      />
    </div>
  );
};
