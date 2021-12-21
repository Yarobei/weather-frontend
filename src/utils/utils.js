import { useAuthStore } from "../store/auth.store";

export const handleErrors = async (res) => {
  if (res.ok) {
    return res;
  }
  switch (res.status) {
    case 401:
      useAuthStore.getState().setIsAuthorized(false);
      break;
    case 404:
    case 429:
    case 403:
    case 500: {
      const parsedRes = await res.json();
      return { status: res.status, statusText: parsedRes.message };
    }
    default:
      return Promise.reject({ status: res.status, statusText: res.statusText });
  }
};
