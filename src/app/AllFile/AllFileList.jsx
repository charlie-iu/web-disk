import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'antd';
import ajax from '../../common/Ajax';
import UploadButton from '../../component/UploadButton';
// import CircularJSON from 'circular-json';

const PAGE_SIZE = 10; // 每页展示10条数据

const FileList = () => {
  const [data, setData] = useState([]); // 所有文件列表
  const [page, setPage] = useState(1); // 当前页码
  const [total, setTotal] = useState(0); // 总数据量

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 获取文件列表数据
  const fetchData = async (page) => {
    try {
      const res = await ajax.post('/getAllFiles', { page, limit: PAGE_SIZE });
      setTotal(res.total);
      setData(res.data);
    } catch (error) {
      throw new Error(error);
    }

  };

  // 处理页码改变事件
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // 下载
  // const handleDownload = async (fileName) => {
  //   try {
  //     const response = await ajax.post('/download', { fileName }, { responseType: 'blob' });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', fileName);
  //     document.body.appendChild(link);
  //     link.click();
  //     URL.revokeObjectURL(url); // 释放URL对象
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const handleDownload = (fileName) => {
  //   const downloadLink = `${window.location.origin}/api/download?fileName=${fileName}`;
  //   window.open(downloadLink, '__blank');
  // };
  const handleDownload = async (record) => {
    try {
      const api = window.location.origin + '/api';
      const url = `${api}/download?id=${record.id}&timestamp=${Date.now()}`;
      const response = await fetch(url, {
        method: 'GET',
        responseType: 'arraybuffer',
      });

      const arrayBuffer = await response.arrayBuffer();
      const blob = new Blob([arrayBuffer]);
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', record.name);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(downloadUrl); // 释放URL对象
    } catch (error) {
      console.error(error);
    }
  };



  const columns = [
    {
      title: '序号',
      width: '60px',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '上传时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => {
        return new Date(text).toLocaleString();
      },
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
      render: (text) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = text;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
          size /= 1024;
          unitIndex++;
        }
        return `${size.toFixed(2)} ${units[unitIndex]}`;
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'action',
      render: (text, record) => {
        return (
          <a href="#" onClick={() => { handleDownload(record) }}>
            下载
          </a>
        )
      }
    }
  ];

  return (
    <>
      <div style={{ marginTop: 8 }}>
        <UploadButton />
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        rowKey='id'
      />
      <Pagination
        style={{ marginTop: '16px', textAlign: 'right' }}
        current={page}
        total={total}
        pageSize={PAGE_SIZE}
        onChange={handlePageChange}
      />
    </>
  );
};

export default FileList;
