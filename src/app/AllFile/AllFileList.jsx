import React, { useState, useEffect } from 'react';
import { Table, Pagination, Space, Popconfirm, message } from 'antd';
import ajax from '../../common/Ajax';
import UploadButton from '../../component/UploadButton';
import axios from 'axios';

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
  const handleDownload = async (record) => {
    axios({
      url: `http://localhost:3000/api/download/${record.id}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', record.name); // 由于Content-Disposition已设置文件名，此处设置的文件名不重要
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  // 删除
  const handleDelete = (record) => {
    const id = record.id;
    if (id) {
      try {
        ajax.post('/delete', { id }).then(() => {
          fetchData(page).then((res) => {
            message.success('删除成功');
          });
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  const columns = [
    {
      title: '序号',
      width: '60px',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1
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
          <Space>
            <Popconfirm
              title="确认下载？"
              onConfirm={handleDownload.bind(null, record)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#"> 下载</a>
            </Popconfirm>

            <Popconfirm
              title="确认删除？"
              onConfirm={handleDelete.bind(null, record)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>

          </Space>
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
