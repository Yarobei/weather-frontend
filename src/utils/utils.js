export const handleErrors = (res) => {
  if (res.ok) {
    return res;
  }
  return Promise.reject({ status: res.status, statusText: res.statusText });
};
