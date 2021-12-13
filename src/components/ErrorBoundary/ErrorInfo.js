import React from "react";

import style from "./error-boundary.module.scss";
import commonStyle from "../../common.module.scss";

const ErrorInfo = ({ error }) => {
  const description = !(error instanceof Error)
    ? error.result.value
    : undefined;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>{description}</p>
      <button
        className={`${style.reloadButton} ${commonStyle.animateButton}`}
        onClick={() => document.location.reload()}
      >
        Reload page
      </button>
    </div>
  );
};

export default ErrorInfo;
