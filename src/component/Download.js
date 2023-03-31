import axios from 'axios';
import { Popconfirm } from 'antd';

const Download = (props) => {
    const handleDownload = async () => {
        axios({
            url: `http://localhost:3000/api/download/${props.record.id}`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', props.record.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    return (
        <>
            <Popconfirm
                title="确认下载？"
                onConfirm={handleDownload}
                okText="确认"
                cancelText="取消"
            >
                <a href="#"> 下载</a>
            </Popconfirm>
        </>
    )
}

export default Download;