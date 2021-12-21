import { url } from "../../constants/constants";
import { handleErrors } from "../../utils/utils";
import { useAuthStore } from "../../store/auth.store";

export const checkAuthorization = () => {
  return fetch(`${url}/authorization`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .finally(() => useAuthStore.getState().setIsContentLoading(false))
    .then(handleErrors)
    .then((res) => {
      if (res?.ok) {
        useAuthStore.getState().setIsAuthorized(true);
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const login = (credentials) => {
  return fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  })
    .then(handleErrors)
    .catch((err) => {
      throw err;
    });
};

export const logOutRequest = () => {
  return fetch(`${url}/logOut`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(handleErrors)
    .then(() => {
      localStorage.removeItem("storedCities");
      useAuthStore.getState().setIsAuthorized(false);
    })
    .catch((err) => {
      throw err;
    });
};
