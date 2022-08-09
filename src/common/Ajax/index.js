import ajax from "./Ajax";

const loginRequest = (username = "", password = "") =>
  ajax({
    url: "/user/login",
    method: "post",
    data: {
      username: username,
      password: password,
    },
  });

const registerRequest = (username = "", password = "") =>
  ajax({
    url: "/user/register",
    method: "post",
    data: {
      username: username,
      password: password,
    },
  });

const getFoldersAndFilesRequest = (data = {}) =>
  ajax({
    url: "/netdisk/nextList",
    method: "post",
    data,
  });

const recycleFileAndFolderRequest = (params = {}) =>
  ajax({
    url: "/netdisk/recycleFileAndFolder",
    method: "post",
    params,
  });

const getPictureList = (data = {}) =>
  ajax({
    url: "/netdisk/nextList?type=1",
    method: "post",
    data: {},
  });

const getDocList = (data = {}) =>
  ajax({
    url: "/netdisk/nextList?type=2",
    method: "post",
    data,
  });

const getVideoList = (data = {}) =>
  ajax({
    url: "/netdisk/nextList",
    method: "post",
    data,
  });

const addFolder = (data) =>
  ajax({
    url: "/netdisk/addFolder",
    method: "post",
    data,
  });

const reName = (params = {}) =>
  ajax({
    url: "/netdisk/reNameFolder",
    method: "post",
    params,
  });

const getNextFolderReq = (data = {}) =>
  ajax({
    url: "/netdisk/nextList",
    method: "post",
    data,
  });

const Ajax = {
  loginRequest,
  registerRequest,
  getFoldersAndFilesRequest,
  recycleFileAndFolderRequest,
  getPictureList,
  getDocList,
  getVideoList,
  addFolder,
  addFolder,
  reName,
  getNextFolderReq,
};

export default Ajax;
