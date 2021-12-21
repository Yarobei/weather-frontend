import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

import "antd/dist/antd.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
