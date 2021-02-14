import configedAxios from "../axios";

const seriesList = () => {
  return configedAxios.get("/api/series/list");
};

const seriesInfo = (seriesId) => {
  return configedAxios.get(`/api/series/${seriesId}`);
};

const seriesPostList = (seriesId) => {
  return configedAxios.get(`/api/series/${seriesId}/posts`);
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
  seriesInfo,
  seriesPostList,
  recommandSeries,
  writeSeries,
  deleteSeries,
  modifySeries,
};

export default seriesApi;
