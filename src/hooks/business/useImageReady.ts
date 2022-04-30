/*
 * @Author: ZHENG
 * @Date: 2022-04-30 10:18:55
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-30 10:18:56
 * @FilePath: \admin\src\hooks\business\useImageReady.ts
 * @Description:
 */
/*
 * @Author: ZHENG
 * @Date: 2022-04-28 10:27:36
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-28 10:47:48
 * @FilePath: \index\src\hooks\business\useImageReady.ts
 * @Description:
 */
import { ref, onMounted } from 'vue';
/**
 * @author: ZHENG
 * @description: 判断图片是否加载完成
 * @param { pics 接受数组，图片地址}
 * @return {*}
 */
export default function useImageReady(pics: Array<string>): any {
  const picsAll = pics.map(imgUrl => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // 提取图片地址
      img.src = imgUrl
        .replace('src=', '')
        .replace('amp;', '')
        .replace(/^['|"](.*)['|"]$/, '$1');
      img.onload = () => resolve(imgUrl);
      img.onerror = () => reject(new Error(`${imgUrl}load error`));
    });
  });
  return Promise.all(picsAll)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
