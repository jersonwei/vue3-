/*
 * @Author: ZHENG
 * @Date: 2022-05-30 10:32:01
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 10:39:25
 * @FilePath: \work\src\views\question\dataBaseProblemsList\Type.ts
 * @Description:
 */
export interface questionBankType {
  count: number;
  listQuestionBank: ListQuestionBank[];
}

interface ListQuestionBank {
  id: string;
  bankName: string;
  bankDescribe?: string;
  bankType: string;
  courseId: string;
  status: number;
  creater: string;
  createTime: string;
  note?: string;
  courseName: string;
  questionCount: string;
  categoryName: string;
  categoryParent: string;
}
