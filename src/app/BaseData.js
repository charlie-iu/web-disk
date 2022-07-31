import React from "react";
import {
  FolderOpenOutlined,
  FileImageOutlined,
  FileOutlined,
  VideoCameraOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import AllFileList from "./AllFile/AllFileList";
import DocList from "./Doc/DocList";
import PictureList from "./Picture/PictureList";
import VideoList from "./Video/VideoList.jsx";
import RecycleBinList from "./RecycleBin/RecycleBinList";
const navList = [
  {
    icon: <FolderOpenOutlined />,
    key: 1,
    title: "所有文件",
    path: "allFiles",
    component: <AllFileList />
  },
  {
    icon: <FileImageOutlined />,
    key: 2,
    title: "图片",
    path: "pic",
    component: <PictureList/>
  },
  {
    icon: <FileOutlined />,
    key: 3,
    title: "文档",
    path: "doc",
    component: <DocList/>
  },
  {
    icon: <VideoCameraOutlined />,
    key: 4,
    title: "视频",
    path: "video",
    component: <VideoList/>
  },
  {
    icon: <DeleteOutlined />,
    key: 5,
    title: "回收站",
    path: "recycle",
    component: <RecycleBinList/>
  }
];

export { navList };
