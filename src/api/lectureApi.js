import configedAxios from "../axios";

const lectureList = () => {
  return configedAxios.get("/api/lectures/list");
};

const lectureInfo = (lectureId) => {
  return configedAxios.get(`/api/lectures/${lectureId}`);
};

const lecturePostList = (lectureId) => {
  return configedAxios.get(`/api/lectures/${lectureId}/posts`);
};

const recommandLectures = () => {
  return configedAxios.get("/api/lectures/recommand");
};

const writeLecture = (formData) => {
  return configedAxios.post("/api/lectures", formData);
};

const deleteLecture = (deleteId) => {
  return configedAxios.delete(`/api/lectures/${deleteId}`);
};

const modifyLecture = (formData) => {
  return configedAxios.patch(`/api/lectures/${formData.get("id")}`, formData);
};

const lectureApi = {
  lectureList,
  lectureInfo,
  lecturePostList,
  recommandLectures,
  writeLecture,
  deleteLecture,
  modifyLecture,
};

export default lectureApi;
