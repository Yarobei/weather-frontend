import { url } from "../../constants/constants";

export const getWeatherByCity = (city) => {
  return fetch(`${url}/weather?cityName=${city}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res)
    .catch((err) => console.log(err));
};
