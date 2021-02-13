import configedAxios from "../axios";

const seriesList = () => {
  return configedAxios.get("/api/series");
};

const recommandSeries = () => {
  return configedAxios.get("/api/series/recommand");
};

const writeSeries = (formData) => {
  return configedAxios.post("/api/series", formData);
};

const deleteSeries = (deleteId) => {
  return configedAxios.delete(`/api/series/${deleteId}`);
};

const modifySeries = (formData) => {
  return configedAxios.patch(`/api/series/${formData.get("id")}`, formData);
};

const seriesApi = {
  seriesList,
  recommandSeries,
  writeSeries,
  deleteSeries,
  modifySeries,
};

export default seriesApi;
