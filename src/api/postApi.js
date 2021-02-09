import configedAxios from "../axios";

const recentPost = () => {
  return configedAxios.get("/api/post/recent");
};

const recommandPost = () => {
  return configedAxios.get("/api/post/recommand");
};

const mostViewPost = () => {
  return configedAxios.get("/api/post/views");
};

const postApi = {
  recentPost,
  recommandPost,
  mostViewPost,
};

export default postApi;
