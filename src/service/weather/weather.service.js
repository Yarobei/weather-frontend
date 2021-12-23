import { url } from "../../constants/constants";
import { handleErrors } from "../../utils/utils";

export const getWeatherByCity = (city) => {
  return fetch(`${url}/weather?cityName=${city}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(handleErrors)
    .catch((err) => {
      throw err;
    });
};
