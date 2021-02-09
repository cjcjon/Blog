import configedAxios from "../axios";

const groupTag = () => {
  return configedAxios.get("/api/tag/group");
};

const tagApi = {
  groupTag,
};

export default tagApi;
