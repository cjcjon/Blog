import configedAxios from "../axios";

// delete와 get은 body에 데이터가 들어가지 않는다
// 두 번째 인자에 data: {} attribute 넣으면 해결

const recentPost = () => {
  return configedAxios.get("/api/post/recent");
};

const recommandPost = () => {
  return configedAxios.get("/api/post/recommand");
};

const mostViewPost = () => {
  return configedAxios.get("/api/post/views");
};

const uploadImage = (formData) => {
  return configedAxios.post("/api/post/image", formData);
};

const deleteImage = (imageName) => {
  return configedAxios.delete(`/api/post/image/${imageName}`);
};

const writePost = (formData) => {
  return configedAxios.post("/api/post", formData);
};

const readPost = (postId) => {
  return configedAxios.get(`/api/post/${postId}`);
};

const postApi = {
  recentPost,
  recommandPost,
  mostViewPost,
  uploadImage,
  deleteImage,
  writePost,
  readPost,
};

export default postApi;
