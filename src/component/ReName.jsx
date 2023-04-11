import React, { useState } from 'react';
import { Popconfirm, Input, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ajax from '../common/Ajax';
import PropTypes from 'prop-types';

function ReName(props) {
    const { record, fetchData, page } = props;
    const [renameValue, setReNameValue] = useState('');

    const handleReName = (e) => {
        const { value } = e.target;
        setReNameValue(value);
    };

    const confirmReName = async () => {
        const payload = {
            id: record.id,
            newName: renameValue
        };
        try {
            const res = await ajax.post('/rename', payload);
            message.success(res.message);
            fetchData(page);
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <Popconfirm
                title={<Input value={renameValue} onChange={handleReName} />}
                icon={<EditOutlined style={{ fontSize: 18, paddingTop: 8 }} />}
                onConfirm={confirmReName.bind(null, record)}
                okText="确认"
                cancelText="取消"
            >
                <a href="#">重命名</a>
            </Popconfirm>
        </>
    )
};

ReName.propTypes = {
    record: PropTypes.object,
    page: PropTypes.number,
    fetchData: PropTypes.func
}

export default ReName;