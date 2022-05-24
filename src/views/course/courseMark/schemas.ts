/*
 * @Author: ZHENG
 * @Date: 2022-05-12 17:48:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 19:32:47
 * @FilePath: \work\src\views\course\courseMark\schemas.ts
 * @Description:
 */

// import { getCollegeLegistt, getcourseCategoryList } from '@/service';

// const getList = async () => {
//   const { data: result } = await getcourseCategoryList();
//   const newList = result.map(item => {
//     return { value: item.id, label: item.categoryName };
//   });
//   schemas[1].componentProps.options = newList;
//   const { data: collegeList } = await getCollegeLegistt();
//   console.log(collegeList);
//   const newcollegeList = collegeList.map(item => {
//     return { value: item.id, label: item.collegeName, depth: 1, isLeaf: false };
//   });
//   schemas[2].componentProps.options = newcollegeList;
// };
// getList();

export const schemas = [
  {
    field: 'courseName',
    // component: 'NSelect',
    label: '课程'
    // componentProps: {
    //   placeholder: '请选择课程名称',
    //   options: [
    //     {
    //       label: '课程A',
    //       value: 1
    //     },
    //     {
    //       label: '课程B',
    //       value: 2
    //     },
    //     {
    //       label: '课程C',
    //       value: 3
    //     }
    //   ]
    // }
  }
  // {
  //   field: 'status',
  //   component: 'NSelect',
  //   label: '班级',
  //   componentProps: {
  //     placeholder: '请选择班级',
  //     options: [
  //       {
  //         label: '班级A',
  //         value: 1
  //       },
  //       {
  //         label: '班级B',
  //         value: 2
  //       },
  //       {
  //         label: '班级C',
  //         value: 3
  //       }
  //     ]
  //   }
  // }
];
