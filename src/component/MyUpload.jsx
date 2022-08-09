import { useContext } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import store from 'store';

function MyUpload(props) {
    const dispatch = useContext(props.myContext);
    const uploadProps = {
        name: 'file',
        action: `http://47.119.129.231:8082/netdisk/upload?folderId=${props.id}`,
        headers: {
            Authorization: store.get('net_disk_token'),
        },
        beforeUpload(file, fileList) {
            switch (props.fileType) {
                case 0:
                    // 所有文件类型都可上传
                    return true;
                default:
                    return Upload.LIST_IGNORE;
            }
        },
        onChange(info) {
            dispatch({
                type: 'UPDATE_PERCENT',
                payload: info.file.percent
            });
            switch (info.file.status) {
                case 'error':
                    message.error(`${info.file.name} 文件上传失败`);
                    return;
                case 'done':
                    if (info.file.response.code === 500) {
                        message.error(`${info.file.response.message}`);
                        return Upload.LIST_IGNORE;
                    }
                    message.success(`${info.file.name} 文件上传成功`);
                    props.initEntry();
                default:
                    return Upload.LIST_IGNORE;
            }
        },
    };

    return (
        <>
            <Upload {...uploadProps}>
                <Button
                    icon={<CloudUploadOutlined />}
                    size='small'
                    shape='rounded'
                    type='primary'
                >
                    上传
                </Button>
            </Upload>
        </>
    )
}

export default MyUpload;