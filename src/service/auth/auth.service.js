import { url } from "../../constants/constants";
import { handleErrors } from "../../utils/utils";

export const checkAuthorization = () => {
  return fetch(`${url}/authorization`, {
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

export const login = () => {
  return fetch(`${url}/login`, {
    method: "POST",
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
