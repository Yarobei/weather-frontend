import { url } from "../../constants/constants";

export const getWeatherByCity = (city) => {
  return fetch(`${url}/weather?cityName=${city}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => {
      if (res.ok) {
        return res;
      }
      return Promise.reject({ status: res.status, statusText: res.statusText });
    })
    .catch((err) => {
      throw err;
    });
};
