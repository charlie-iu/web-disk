import React from "react";
import {
  FolderOpenOutlined,
  FileImageOutlined,
  FileOutlined,
  VideoCameraOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import AllFileList from "./AllFile";
import DocList from "./Doc";
import PictureList from "./Picture";
import Media from "./Media";
import RecycleBinList from "./RecycleBin/RecycleBinList";
const navList = [
  {
    icon: <FolderOpenOutlined />,
    key: 1,
    title: "所有文件",
    path: "/all",
    component: <AllFileList />
  },
  {
    icon: <FileImageOutlined />,
    key: 2,
    title: "图片",
    path: "/pic",
    component: <PictureList/>
  },
  {
    icon: <FileOutlined />,
    key: 3,
    title: "文档",
    path: "/doc",
    component: <DocList/>
  },
  {
    icon: <VideoCameraOutlined />,
    key: 4,
    title: "音视频",
    path: "/Media",
    component: <Media />
  },
  {
    icon: <DeleteOutlined />,
    key: 5,
    title: "回收站",
    path: "/recycle",
    component: <RecycleBinList/>
  }
];

export { navList };
