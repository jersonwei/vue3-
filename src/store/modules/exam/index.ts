/*
 * @Author: ZHENG
 * @Date: 2022-06-01 16:09:08
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 16:16:56
 * @FilePath: \work\src\store\modules\exam\index.ts
 * @Description:
 */
import { defineStore } from 'pinia';

export const useExamStore = defineStore('exam-store', {
  state: () => ({
    paperList: []
  }),
  // 开启持久化
  persist: {
    enabled: true, // 启用
    strategies: [
      // storage 可选localStorage或sessionStorage
      // paths 给指定数据持久化
      { key: 'paperList', storage: localStorage, paths: ['token', 'paperList'] }
    ]
  },
  getters: {},
  actions: {
    setPaper(option) {
      this.paperList = option;
    },
    getPaper() {
      return this.paperList;
    }
  }
});
