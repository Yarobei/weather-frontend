import {url} from "../../constants/constants";

export const checkAuthorization = () => {
  return fetch(`${url}/authorization`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })
    .then((res) => res)
    .catch((err) => console.log(err));
}

export const login = () => {
  return fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })
    .then((res) => res)
    .catch((err) => console.log(err));
}