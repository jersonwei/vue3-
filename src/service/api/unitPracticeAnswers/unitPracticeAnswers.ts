/*
 * @Author: ZHENG
 * @Date: 2022-05-18 14:02:27
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-21 20:04:10
 * @FilePath: \work\src\service\api\unitPracticeAnswers\unitPracticeAnswers.ts
 * @Description:
 */
import axios from 'axios';
import { getToken, paramsToQuery } from '@/utils';
import { request } from '../../request';

export function getStuList(params) {
  const query = paramsToQuery(params);
  const res = request.get(`/unitpracticeanswers/getStuList${query}`);
  return res;
}

export function updateUnitPracticeAnswers(params) {
  const res = request.put(`/unitpracticeanswers/update`, params);
  return res;
}

export function unitpracticeanswersExport(id, params) {
  const query = paramsToQuery(params);
  const res = `http://192.168.3.234:8081/unitpracticeanswers/exportUnit/${id}${query}`;
  return res;
}

export function download(url, name) {
  console.log(url);
  return axios({
    url,
    method: 'get',
    responseType: 'arraybuffer',
    headers: {
      Authorization: getToken()
    }
    // params
  }).then(res => {
    const link = document.createElement('a');
    const blob = new Blob([res.data], { type: 'application/octet-stream,charset=UTF-8' });
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob);
    const temp = res.headers['content-disposition'];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(temp);
    // if (matches != null && matches[1]) {

    // }
    const filename = matches[1].replace(/['"]/g, '');
    link.download = filename; // 下载后文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// export function download(url, fileName) {
//   // 下载导出的文件
//   const xmlResquest = new XMLHttpRequest();
//   xmlResquest.open('GET', url, true);
//   xmlResquest.setRequestHeader('Content-type', 'application/json');
//   const elink = document.createElement('a'); // 组装a标签
//   xmlResquest.responseType = 'blob';
//   // eslint-disable-next-line func-names
//   xmlResquest.onload = function () {
//     const content = new Uint8Array(xmlResquest.response).buffer;

//     const aLink = document.createElement('a');

//     const blob = new Blob([content], {
//       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // 文件类型
//     });

//     const evt = new Event('click');

//     aLink.download = 'xxx.xls';

//     aLink.href = URL.createObjectURL(blob);

//     aLink.click();

//     URL.revokeObjectURL(blob);

//     // console.log(content, typeof content);
//     // elink.download = fileName; // +".xlsx";
//     // const blob = new Blob([content]);
//     // elink.href = URL.createObjectURL(blob);
//     // elink.click();
//   };
//   xmlResquest.send();
// }
