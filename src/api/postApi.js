import configedAxios from "../axios";

// delete와 get은 body에 데이터가 들어가지 않는다
// 두 번째 인자에 data: {} attribute 넣으면 해결

const recentPosts = () => {
  return configedAxios.get("/api/posts/recent");
};

const recommandPosts = () => {
  return configedAxios.get("/api/posts/recommand");
};

const mostViewPosts = () => {
  return configedAxios.get("/api/posts/views");
};

const uploadImage = (formData) => {
  return configedAxios.post("/api/posts/image", formData);
};

const deleteImage = (imageName) => {
  return configedAxios.delete(`/api/posts/image/${imageName}`);
};

const writePost = (formData) => {
  return configedAxios.post("/api/posts", formData);
};

const readPost = (postId) => {
  return configedAxios.get(`/api/posts/${postId}`);
};

const likePost = (postId) => {
  return configedAxios.post(`/api/posts/${postId}/like`);
};

const postApi = {
  recentPosts,
  recommandPosts,
  mostViewPosts,
  uploadImage,
  deleteImage,
  writePost,
  readPost,
  likePost,
};

export default postApi;
