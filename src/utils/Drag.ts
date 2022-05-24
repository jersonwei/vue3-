// /*
//  * @Author: ZHENG
//  * @Date: 2022-05-05 09:15:36
//  * @LastEditors: ZHENG
//  * @LastEditTime: 2022-05-18 09:42:30
//  * @FilePath: \work\src\utils\Drag.ts
//  * @Description:
//  */
// // 获取相关CSS属性
// // eslint-disable-next-line func-names
// const getCss = function (o: Element, key: string) {
//   return o.currentStyle ? o.currentStyle[key] : document.defaultView?.getComputedStyle(o, null)[key];
// };

// const params = {
//   left: 0,
//   top: 0,
//   currentX: 0,
//   currentY: 0,
//   flag: false
// };

// // eslint-disable-next-line func-names
// const startDrag = function (
//   bar: { onmousedown: (event: any) => void; onselectstart: () => boolean },
//   target: Element,
//   callback?: (arg0: number, arg1: number) => void
// ) {
//   const screenWidth = document.body.clientWidth; // body当前宽度
//   const screenHeight = document.documentElement.clientHeight; // 可见区域高度

//   const dragDomW = target.offsetWidth; // 对话框宽度
//   const dragDomH = target.offsetHeight; // 对话框高度

//   const minDomLeft = target.offsetLeft;
//   const minDomTop = target.offsetTop;

//   const maxDragDomLeft = screenWidth - minDomLeft - dragDomW;
//   const maxDragDomTop = screenHeight - minDomTop - dragDomH;

//   if (getCss(target, 'left') !== 'auto') {
//     params.left = getCss(target, 'left');
//   }
//   if (getCss(target, 'top') !== 'auto') {
//     params.top = getCss(target, 'top');
//   }

//   // o是移动对象
//   // eslint-disable-next-line func-names
//   // eslint-disable-next-line no-param-reassign
//   // eslint-disable-next-line func-names
//   bar.onmousedown = function (event: Event | undefined) {
//     params.flag = true;
//     if (!event) {
//       event = window.event;
//       // 防止IE文字选中
//       bar.onselectstart = function () {
//         return false;
//       };
//     }
//     const e = event;
//     params.currentX = e.clientX;
//     params.currentY = e.clientY;
//   };
//   // eslint-disable-next-line func-names
//   document.onmouseup = function () {
//     params.flag = false;
//     if (getCss(target, 'left') !== 'auto') {
//       params.left = getCss(target, 'left');
//     }
//     if (getCss(target, 'top') !== 'auto') {
//       params.top = getCss(target, 'top');
//     }
//   };
//   // eslint-disable-next-line consistent-return
//   document.onmousemove = function (event) {
//     const e: any = event || window.event;
//     if (params.flag) {
//       const nowX = e.clientX;
//       const nowY = e.clientY;
//       const disX = nowX - params.currentX;
//       const disY = nowY - params.currentY;

//       // eslint-disable-next-line radix
//       let left = parseInt(params.left) + disX;
//       // eslint-disable-next-line radix
//       let top = parseInt(params.top) + disY;

//       // 拖出屏幕边缘
//       if (-left > minDomLeft) {
//         left = -minDomLeft;
//       } else if (left > maxDragDomLeft) {
//         left = maxDragDomLeft;
//       }

//       if (-top > minDomTop) {
//         top = -minDomTop;
//       } else if (top > maxDragDomTop) {
//         top = maxDragDomTop;
//       }

//       // eslint-disable-next-line no-param-reassign
//       target?.style?.left = `${left}px`;
//       // eslint-disable-next-line no-param-reassign
//       target?.style?.top = `${top}px`;

//       if (typeof callback === 'function') {
//         // eslint-disable-next-line radix
//         callback((parseInt(params.left) || 0) + disX, (parseInt(params.top) || 0) + disY);
//       }

//       if (event.preventDefault) {
//         event.preventDefault();
//       }
//       return false;
//     }
//   };
// };

// export default startDrag;
