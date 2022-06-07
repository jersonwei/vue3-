/*
 * @Author: ZHENG
 * @Date: 2022-06-06 16:34:56
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-07 15:16:22
 * @FilePath: \work\src\views\learnAnalysis\testAnalysis\getOptions.ts
 * @Description:
 */

import { getChapterList, getCollegeLegistt, getMajorList, getUnitList } from "@/service";
import { CascaderOption } from "naive-ui";

/**
 * @author: ZHENG
 * @description: 获取院系下拉
 * @return {*}
 */
export async function getCollegeLegistOptions() {
  const { data: collegeList } = await getCollegeLegistt();
  const newcollegeList = collegeList.map((item: { id: number; collegeName: string }) => {
    return { value: item.id, label: item.collegeName, depth: 1, isLeaf: false };
  });
  return newcollegeList;
}

export async function getChildren(option: CascaderOption) {
  const param = {
    collegeId: option.value
  };
  const { data: result } = await getMajorList(param);
  const newList = result.map(item => {
    return { value: `${option.value}-${item.id}`, label: item.majorName, isLeaf: 1 };
  });
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    option.children = newList;
  }
}

// 获取章节数据
export async function getChapter(params) {
  const {data:result} = await getChapterList(params)
	const newList = result.map(item => {
    return { value: item.id, label: item.chapterName, depth: 1, isLeaf: false};
  });
	return newList
}

