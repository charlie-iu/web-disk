import {Space} from 'antd';
import MyImage from './MyImage';
import folderPng from "../img/folder.png";
import txtPng from "../img/txt.png";
import docPng from "../img/docx.png";
import xlsPng from "../img/xlsx.png";
import pdfPng from "../img/pdf.png";
import pptPng from "../img/pptx.png";
import zipPng from "../img/zip.png";
import picPng from "../img/picture.png";
import filePng from "../img/file.png";
import videoPng from "../img/VIDEO.png";

export default function ShowFileName(props) {
    const { data } = props;
   
    const element = (src) => {
        return (
            <Space>
                <MyImage src={src} />
                {data.name}
            </Space>
        );
    };

    if (!data) {
        return;
    }

    if (data.sourceType === 'FOLDER') {
        return element(folderPng);
    }

    switch (data.fileType) {
        case 'txt':
            return element(txtPng);
        case 'doc':
        case 'docx':
            return element(docPng);
        case 'xls':
        case 'xlsx':
            return element(xlsPng);
        case 'pdf':
            return element(pdfPng);
        case 'ppt':
        case 'pptx':
            return element(pptPng);
        case 'zip':
            return element(zipPng);            
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
        case 'bmp':
            return element(picPng);          
        case 'wav':
        case 'mp3':
        case 'ram':
        case 'avi':
        case 'mov':
        case 'mpeg':
        case 'mpg':
        case 'mp4':
            return element(videoPng);
        default:
            return  element(filePng);           
    }
}
