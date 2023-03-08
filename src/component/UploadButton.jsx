import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import store from 'store';

const UploadButton = ({ onChange }) => {
    const props = {
        name: 'file',
        action: '/api/upload',
        headers: {
            authorization: store.get('web_disk_token'),
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                console.log(`${info.file.name} file uploaded successfully`);
                onChange && onChange(info.file.response);
                message.success('上传成功！');
                window.location.reload();

            } else if (info.file.status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Upload {...props}>
            <Button
                type="primary"
                icon={<UploadOutlined
                />}>
                上传文件
            </Button>
        </Upload>
    );
};

export default UploadButton;
