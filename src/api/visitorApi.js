import configedAxios from "../axios";

const dayCount = () => {
  return configedAxios.get("/api/visitors");
};

const visitorApi = {
  dayCount,
};

export default visitorApi;
