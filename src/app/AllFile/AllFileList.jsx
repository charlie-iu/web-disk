import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Table, Pagination, Space, Popconfirm, message, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ajax from '../../common/Ajax';
import { UploadFile, Download } from '../../component/';

const PAGE_SIZE = 10; // 每页展示10条数据

const FileList = () => {
  const [data, setData] = useState([]); // 所有文件列表
  const [page, setPage] = useState(1); // 当前页码
  const [total, setTotal] = useState(0); // 总数据量
  const [renameValue, setReNameValue] = useState(''); // 重命名
  // const [focus, setFocus] = useState(false);
  // const inputRef = useRef(null);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // useEffect(() => {
  //   if (focus) {
  //     inputRef.current?.focus();
  //   }
  // }, [focus]);


  // 获取文件列表数据
  const fetchData = useCallback(async (page) => {
    try {
      const res = await ajax.post('/getAllFiles', { page, limit: PAGE_SIZE });
      setTotal(res.total);
      setData(res.data);
    } catch (error) {
      throw new Error(error);
    }

  }, [page]);

  // 处理页码改变事件
  const handlePageChange = (newPage) => {
    setPage(newPage);
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

  // 重命名
  const handleReName = (e) => {
    const { value } = e.target;
    setReNameValue(value);
  };

  const confirmReName = async (record) => {
    const payload = {
      id: record.id,
      newName: renameValue
    };
    try {
      const res = await ajax.post('/rename', payload);
      message.success(res.message);
      fetchData();
    } catch (error) {
      throw error;
    }
  };

  // const cancelReName = () => {
  //   setFocus(false);
  // };

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
              title={
                <Input
                  value={renameValue}
                  onChange={handleReName}
                // ref={inputRef}
                />
              }
              icon={<EditOutlined style={{ fontSize: 18, paddingTop: 8 }} />}
              onConfirm={confirmReName.bind(null, record)}
              // onCancel={cancelReName}
              okText="确认"
              cancelText="取消"
            // onOpenChange={(o) => {
            //   if (o) {
            //     setFocus(true);
            //   }
            // }}
            >
              <a href="#"
              // onClick={() => { setFocus(true) }}
              >
                重命名
              </a>
            </Popconfirm>
            <Download record={record} />
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
        <UploadFile fetchData={fetchData} />
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
