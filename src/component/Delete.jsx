import React from 'react';
import { Popconfirm, message } from 'antd';
import ajax from '../common/Ajax';
import PropTypes from 'prop-types';


function Delete(props) {
    const { fetchData, page, record } = props;

    // 删除
    const handleDelete = () => {
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
    return (
        <>
            <Popconfirm
                title="确认删除？"
                onConfirm={handleDelete.bind(null, record)}
                okText="确认"
                cancelText="取消"
            >
                <a href="#">删除</a>
            </Popconfirm>
        </>
    )
}

Delete.propTypes = {
    record: PropTypes.object,
    page: PropTypes.number,
    fetchData: PropTypes.func
};

export default Delete;