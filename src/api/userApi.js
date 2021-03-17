import configedAxios from "../axios";

const check = () => {
  return configedAxios.get("/api/users/check");
};

const logout = () => {
  return configedAxios.post("/api/users/logout");
};

const userApi = {
  check,
  logout,
};

export default userApi;
