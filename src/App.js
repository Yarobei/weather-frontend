import React, { useEffect } from "react";
import shallow from "zustand/shallow";

import { ContentPreloader } from "./components/ContentPreloader/ContentPreloader";
import { Authorization } from "./components/Authorization/Authorization";
import { WeatherBlockWrap } from "./components/WeatherBlock/WeatherBlockWrap";

import { checkAuthorization } from "./service/auth/auth.service";

import { useAuthStore } from "./store/auth.store";

export const App = () => {
  const { isAuthorized, isContentLoading } = useAuthStore(
    (state) => ({
      isAuthorized: state.isAuthorized,
      isContentLoading: state.isContentLoading,
    }),
    shallow
  );

  useEffect(() => {
    checkAuthorization();
  }, []);

  if (isContentLoading) {
    return <ContentPreloader />;
  } else if (!isAuthorized) {
    return <Authorization />;
  }
  return <WeatherBlockWrap />;
};
