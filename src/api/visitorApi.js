import configedAxios from "../axios";

const dayCount = () => {
  return configedAxios.get("/api/visitors");
};

const visit = () => {
  return configedAxios.get("/api/visitors/visit");
};

const visitorApi = {
  dayCount,
  visit,
};

export default visitorApi;
