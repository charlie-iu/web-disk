import React, { useEffect, useReducer } from 'react';
import { Table, Space, Popconfirm, message, Button, Modal, Form, Input } from 'antd';
import { CloudDownloadOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import _ from 'lodash';
import { Ajax, Utils, C } from '../../common';
import { ShowFileName } from '../../component';
import Reducer from './Reducer';

export default function AllFileList(props) {
  const [state, dispatch] = useReducer(Reducer, {
    selectedRowKeys: [],
    dataSource: [],
    total: 0,
    pageSize: 10,
    currentPage: 1,
    modalAction: '',
    modalData: {},
    showModal: false,
    newFolderName: ''
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
  };

  const handleDelete = (data) => {
    const type = data.sourceType;
    const row = {
      fileIds: '',
      folderIds: '',
    }
    if (type === 'FOLDER') { // 文件夹
      row.folderIds = data.dataId;
      Ajax.recycleFileAndFolderRequest(row).then(res => {
        message.success('删除成功');
        initEntry();
      });
    } else {
      row.fileIds = data.dataId;
      Ajax.recycleFileAndFolderRequest(row).then(res => {
        message.success('删除成功');
        initEntry();
      });
    }
  };

  const handleMultipleDelete = () => {
    const row = {
      fileIds: state.selectedRowKeys.join(','),
      folderIds: state.selectedRowKeys.join(','),
    };
    Ajax.recycleFileAndFolderRequest(row).then(res => {
      message.success('删除成功', 1);
      dispatch({
        type: 'UPDATE_SELECTEDROWKEYS',
        payload: []
      });
      initEntry();
    }).catch(err => {
      message.error('删除失败');
      return;
    });
  };

  const handleShowModal = (modalAction = '', modalData = {}) => {
    dispatch({
      type: 'UPDATE_MODAL_ACTION',
      payload: modalAction
    });
    dispatch({
      type: 'UPDATE_MODAL_DATA',
      payload: modalData
    });
    dispatch({
      type: 'UPDATE_SHOW_MODAL',
      payload: true
    });
  };

  const handleOk = () => {
    dispatch({
      type: 'UPDATE_SHOW_MODAL',
      payload: false
    });
  };

  const handleCancel = () => {
    dispatch({
      type: 'UPDATE_SHOW_MODAL',
      payload: false
    });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_FORM_VALUE',
      payload: { name, value }
    });
  };

  const handleReName = () => {
    const modalData = state.modalData;
    const params = {
      folderId: modalData.dataId,
      folderName: state.newFolderName
    };
    if (params.folderName === '') {
      message.error('名称不能为空');
      return;
    }
    Ajax.reName(params).then(res => {
      message.success('重命名成功');
      initEntry();
      dispatch({
        type: 'UPDATE_SHOW_MODAL',
        payload: false
      })
    });
  };

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
    width: 200,
    render: (id, record) => {
      return (
        <Space>
          {record.sourceType !== 'FOLDER' && (
            <Popconfirm
              title="确认下载?"
              onConfirm={() => handleDownload(id)}
              okText="确认"
              cancelText="取消"
            >
              <a
                href='javascript: void 0;'
              >
                下载 <CloudDownloadOutlined />
              </a>
            </Popconfirm>
          )
          }
          {record.sourceType === 'FOLDER' && (
            <a
              href='javascript: void 0;'
              onClick={() => { handleShowModal(C.RE_NAME, record) }}
            >
              重命名 <EditOutlined />
            </a>
          )
          }
          {<Popconfirm
            title="确认删除?"
            onConfirm={() => handleDelete(record)}
            okText="确认"
            cancelText="取消"
          >
            <a
              href='javascript: void 0;'
            >
              删除 <DeleteOutlined />
            </a>
          </Popconfirm>
          }
        </Space>
      )
    }
  }
  ];

  const tableProps = {
    size: 'small',
    columns,
    rowSelection,
    pagination,
    dataSource: state.dataSource,
    columns,
    rowKey: 'dataId'
  };

  let modalSubItem = null;
  let modalProps = {
    visible: state.showModal,
    onOk: handleOk,
    onCancel: handleCancel
  };

  if (state.showModal) {
    switch (state.modalAction) {
      case C.RE_NAME:
        modalProps.title = '重命名';
        modalProps.onOk = handleReName
        modalSubItem = (
          <Form
            layout='vertical'
          >
            <Form.Item
              label='名称'
            >
              <Input
                size='small'
                placeholder='输入文件夹名称'
                name='newFolderName'
                value={state.newFolderName}
                onChange={(e) => handleChange(e)}
              />
            </Form.Item>
          </Form>
        )
    }
  }

  return (
    <>
      {state.selectedRowKeys.length === 0 ? (
        <Button
          size="small"
          disabled
          className='multiple-delete'
          shape='rounded'
        >
          批量删除 <DeleteOutlined />
        </Button>
      ) : (
        <Popconfirm
          title="确认批量删除所选文件?"
          okText="确认"
          cancelText="取消"
          onConfirm={handleMultipleDelete}
        >
          <Button
            type="danger"
            size="small"
            className='multiple-delete'
            shape='rounded'
          >
            批量删除 <DeleteOutlined />
          </Button>
        </Popconfirm>
      )

      }
      <Table {...tableProps} />
      <Modal {...modalProps} >
        {modalSubItem}
      </Modal>
    </>
  )
}
