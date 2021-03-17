import configedAxios from "../axios";

const groupTags = () => {
  return configedAxios.get("/api/tags/group");
};

const searchByTag = (tagName) => {
  return configedAxios.get(`/api/tags/${encodeURIComponent(tagName)}`);
};

const tagApi = {
  groupTags,
  searchByTag,
};

export default tagApi;
