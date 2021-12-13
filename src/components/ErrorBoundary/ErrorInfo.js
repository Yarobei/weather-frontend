import React from "react";

const ErrorInfo = ({ error }) => {
  // const title =
  //   error instanceof Error
  //     ? "Что-то пошло нет так"
  //     : error.result.status;
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
      <button onClick={() => document.location.reload()}>Reload page</button>
    </div>
  );
};

export default ErrorInfo;
