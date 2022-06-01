/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 15:48:59
 * @FilePath: \work\src\views\test\pointManager\columns.ts
 * @Description:
 */
import { h } from 'vue';
import { NSwitch } from 'naive-ui';
import { editStatusKnowledgePoint } from '@/service';

export const columns = [
  // {
  //   title: '序号',
  //   key: 'tableId',
  //   width: 100,
  //   render(row, index) {
  //     return h('h1', index + 1);
  //   }
  // },
  {
    title: '分类名称/知识点名称',
    key: 'categoryName',
    width: 200,
    render(row: { children: any; categoryName: any; levelType: any; pointName: any }, index) {
      if (row.levelType === 1) {
        return h('h1', `${row.categoryName}(${row.children?.length})`);
      }
      return h('h1', `${row.pointName}`);
    }
  },
  {
    title: '题目数量',
    key: 'count',
    width: 80
  },
  {
    title: '创建人',
    key: 'createName',
    width: 100
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 200
  },
  {
    title: '状态',
    key: 'status',
    width: 130,
    render(row: { status: number }) {
      if (row.levelType === 2) {
        return h(NSwitch, {
          value: row.status === 1,
          onUpdateValue: async value => {
            row.status = row.status === 1 ? 0 : 1;
            const params = {
              pointId: row.id,
              status: row.status
            };
            // // eslint-disable-next-line @typescript-eslint/no-use-before-define
            const result = await editStatusKnowledgePoint(params);
            if (!result.error) {
              window.$message?.success(`${params.status === 1 ? '启用' : '禁用'}操作成功`);
              return true;
            }
          }
        });
      }
    }
  }
];
