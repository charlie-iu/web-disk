import React, { useEffect, useReducer } from 'react';
import { Table, Space, Popconfirm, Button } from 'antd';
import { CloudDownloadOutlined } from "@ant-design/icons";
import _ from 'lodash';
import { Ajax, Utils } from '../../common';
import { ShowFileName, DownLoad } from '../../component';
import Reducer from './Reducer';

export default function AllFileList(props) {
  const [state, dispatch] = useReducer(Reducer, {
    selectedRowKeys: [],
    dataSource: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
  });

  const initEntry = () => {
    const data = {
      pageSize: state.pageSize,
      currentPage: state.currentPage,
      folderId: 0,
      type: 0,
      deleted: 0
    }
    Ajax.getFoldersAndFilesRequest(data).then(res => {
      dispatch({
        type: 'UPDATE_DATA_SOURCE',
        payload: res.list,
      });
      dispatch({
        type: 'UPDATE_TOTAL',
        payload: res.total,
      });
    });
  }


  useEffect(() => {
    initEntry();

  }, [state.pageSize, state.currentPage])

  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: selectedRowKeys => {
      dispatch({
        type: 'UPDATE_SELECTEDROWKEYS',
        payload: selectedRowKeys,
      });
    }
  };

  const onShowSizeChange = (currentPage, pageSize) => {
    dispatch({
      type: 'UPDATE_CURRENT_PAGE',
      payload: currentPage,
    });
    dispatch({
      type: 'UPDATE_PAGE_SIZE',
      payload: pageSize,
    });
  };
  const pagination = {
    size: 'small',
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: state.pageSize,
    total: state.total,
    currentPage: state.currentPage,
    onChange: current => {
      dispatch({
        type: 'UPDATE_CURRENT_PAGE',
        payload: current
      });
      initEntry();
    },
    onShowSizeChange
  };
  const handleDownload = (id) => {
    window.open(`http://47.119.129.231:8082/netdisk/download?fileId=${id}`);
  }
  const columns = [{
    title: '序号',
    width: 60,
    align: 'center',
    render: (v, record, index) => index + 1 + (state.currentPage - 1) * state.pageSize
  }, {
    title: '文件名',
    dataIndex: 'name',
    render: (text, record) => <ShowFileName data={record} />
  }, {
    title: '修改时间',
    dataIndex: 'updateTime',
    render: text => Utils.getTimeFromStr(text)
  }, {
    title: '大小',
    dataIndex: 'size',
    render: text => Utils.getFileSize(text)
  }, {
    title: '操作',
    dataIndex: 'dataId',
    render: (id, record) => {
      return (
        <Space>
          <Popconfirm
            title="确认下载?"
            onConfirm={() => handleDownload(id)}
            okText="确认"
            cancelText="取消"
          >
            <a
              href='javascript: void 0;'
            >
              <CloudDownloadOutlined />下载
            </a>
          </Popconfirm>
          
        </Space>
      )
    }
  }
  ]
  const tableProps = {
    columns,
    rowSelection,
    pagination,
    dataSource: state.dataSource,
    columns,
    rowKey: 'dataId'
  };

  return (
    <>
      <Table {...tableProps} />
    </>
  )
}
