import axios from "axios";

const configedAxios = axios.create();

// 프록시 설정
configedAxios.defaults.proxy = {
  host: "localhost",
  port: "4000",
};

export default configedAxios;
