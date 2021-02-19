import configedAxios from "../axios";

const groupTags = () => {
  return configedAxios.get("/api/tags/group");
};

const tagApi = {
  groupTags,
};

export default tagApi;
