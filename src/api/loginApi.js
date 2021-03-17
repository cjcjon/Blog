import configedAxios from "../axios";

const login = (formData) => {
  return configedAxios.post("/api/users/login", formData);
};

const loginApi = {
  login,
};

export default loginApi;
