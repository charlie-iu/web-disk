import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'antd';
import axios from 'axios';
import UploadButton from '../../component/UploadButton';

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
      const response = await axios.post('/api/getAllFiles', { page, limit: PAGE_SIZE });
      setData(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  // 处理页码改变事件
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    {
      title: '序号',
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
  ];

  return (
    <>
      <div style={{ marginTop: 8 }}>
        <UploadButton />
      </div>
      <Table dataSource={data} columns={columns} pagination={false} />
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
