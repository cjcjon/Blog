import configedAxios from "../axios";

const seriesList = () => {
  return configedAxios.get("/api/series");
};

const recommandSeries = () => {
  return configedAxios.get("/api/series/recommand");
};

const write = (payload) => {
  return configedAxios.post("/api/series", payload);
};

const seriesApi = {
  seriesList,
  recommandSeries,
  write,
};

export default seriesApi;
