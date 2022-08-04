import moment from 'moment';
import 'moment/locale/zh-cn';
import {C} from '../../common';
//文件大小转化
function getFileSize(text) {
    if(!text) return '--';
    text = Number(text);
    let res = '';
    if (text >= 1024) {
        res = text % 1024 === 0 ? text % 1024 + ' KB' : Math.trunc(text % 1024) + ' KB'
    } else if (text >= 1024 * 1024) {
        res = text % (1024 * 1024) === 0 ? text % (1024 * 1024) + ' MB' : Math.trunc(text % (1024 * 1024)) + ' MB'
    } else if (text >= 1024 * 1024 * 1024) {
        res = text % (1024 * 1024 * 1024) === 0 ? text % (1024 * 1024 * 1024) + ' KB' : Math.trunc(text % (1024 * 1024 * 1024)) + ' KB'
    } else {
        res = text + ' B'
    }
    return res;
}

// 时间格式化
function getTimeFromStr(str) {
    switch (typeof str){
        case "string":
            return str ? moment(str).format(C.G_TIME_FORMAT) : null;
        case "object":
            return moment(str);
        default:
            return ""
    }
}

const Utils = {
    getFileSize,
    getTimeFromStr
};
export default Utils;