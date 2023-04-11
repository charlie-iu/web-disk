import React, { useState, useEffect, useCallback } from 'react';
import { Table, Pagination, Space } from 'antd';
import ajax from '../../common/Ajax';
import { UploadFile, Download, ReName, Delete } from '../../component/';

const PAGE_SIZE = 10; // 每页展示10条数据

const FileList = (props) => {
    const [data, setData] = useState([]); // 所有文件列表
    const [page, setPage] = useState(1); // 当前页码
    const [total, setTotal] = useState(0); // 总数据量

    useEffect(() => {
        fetchData(page);
    }, [page]);

    // 获取文件列表数据
    const fetchData = useCallback(async (page) => {
        try {
            const res = await ajax.post(props.url, { page, limit: PAGE_SIZE });
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
                        <ReName page={page} fetchData={fetchData} record={record} />
                        <Download record={record} />
                        <Delete page={page} fetchData={fetchData} record={record} />
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
