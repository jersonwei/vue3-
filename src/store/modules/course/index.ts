import { defineStore } from 'pinia';

/*
 * @Author: ZHENG
 * @Date: 2022-05-14 13:15:23
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-21 10:27:55
 * @FilePath: \work\src\store\modules\course\index.ts
 * @Description:
 */
export const useCourseStore = defineStore('course-store', {
  state: () => ({
    option: [],
    practiveList: [],
    coutesInfoId: 0
  }),
  getters: {},
  actions: {
    setFiles(option) {
      this.option = option;
    },
    getFiles() {
      return this.option;
    },
    setPractiveList(practive) {
      this.practiveList.push(practive);
    },
    searchPractiveList(PractiveKey) {
      console.log(PractiveKey, this.practiveList);
      this.practiveList.forEach(x => {
        console.log(x);
      });
    },
    setCourseInfo(courseId) {
      this.coutesInfoId = parseInt(courseId, 10);
      console.log(this.coutesInfoId);
    },
    getCourseInfo() {
      return this.coutesInfoId;
    }
  }
});
