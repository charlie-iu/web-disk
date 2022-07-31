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

const removeFileAndFolderRequest = (data = {}) =>
  ajax({
    url: "/netdisk/removeFileAndFolder",
    method: "post",
    data,
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

const rename = (data) =>
  ajax({
    url: "/netdisk/reNameFolder",
    method: "post",
    data,
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
  removeFileAndFolderRequest,
  getPictureList,
  getDocList,
  getVideoList,
  addFolder,
  addFolder,
  rename,
  getNextFolderReq,
};

export default Ajax;
