import configedAxios from "../axios";

const recommandSeries = () => {
  return configedAxios.get("/api/series/recommand");
};

const seriesApi = {
  recommandSeries,
};

export default seriesApi;
