import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import store from 'store';

const { Dragger } = Upload;
const token = store.get('web_disk_token');

const UploadFile = () => {

    const getBoundary = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let boundary = '';
        for (let i = 0; i < 32; i++) {
            boundary += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return boundary;
    }

    const props = {
        name: 'file',
        multiple: true,
        action: 'http://localhost:3000/api/upload',
        data: {
            path: 'D:\\uploads'
        },
        headers: {
            'Authorization': `${token}`,
        },
        showUploadList: false,
        onChange(info) {
            const { status } = info.file;
            switch (status) {
                case 'uploading':
                    break;
                case 'error':
                    message.error(`${info.file.name} 上传失败！.`);
                    return false;
                case 'done':
                    message.success(`${info.file.name} 上传成功！.`);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                    break;
                default:
                    break;
            }
        },
        accept: ".doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.7z,.txt,.jpg,.jpeg,.png,.gif",
        maxFileSize: 1024 * 1024 * 100, // 100MB
        beforeUpload(file) {
            const isLt100M = file.size / 1024 / 1024 < 100;
            if (!isLt100M) {
                message.error('文件大小超过100MB!');
                return false;
            }
            // 修改上传请求的headers属性，添加包含token的Authorization头部
            return true;
        },
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽上传</p>
            <p className="ant-upload-hint">
                支持单个或批量上传。 严禁上传公司数据或其他带文件
            </p>
        </Dragger>
    );
};

export default UploadFile;
