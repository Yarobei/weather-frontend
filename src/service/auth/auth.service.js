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
