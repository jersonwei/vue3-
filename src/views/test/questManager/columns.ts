/*
 * @Author: ZHENG
 * @Date: 2022-04-30 15:51:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 16:41:43
 * @FilePath: \work\src\views\test\questManager\columns.ts
 * @Description:
 */
import { h,Slots, renderSlot } from 'vue';
import { NAvatar, NTag, NSwitch, useMessage, NPopover, NButton, NPopconfirm, NCard } from 'naive-ui';
import { editStatusPaperQuestion } from '@/service';
import { getServiceEnv } from '@/utils';
import { radioOption } from "@/enum";

const message = useMessage();
const result = getServiceEnv();
export const columns = [
  {
    title: '题目名称',
    key: 'questionName',
    width: 100,
		ellipsis:false,
    render(row:{questionTypeName:string}) {
			console.log(row)
			if(row.questionTypeName === '单选题' || row.questionTypeName === '多选题' || row.questionTypeName === '不定项选择题'){
				return h(
				NPopover,
				{
					placement:"right-end",
					trigger:"hover"
				},
			 {
				 trigger: () =>									//trigger插槽的内容
						h('div', {}, `${row.questionName.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, '')}`)
					 ,
				 default: () =>									//默认内容
						h(
						 NCard,
						 {
							 title:'题目信息',
							 size:'small'
						 },
							[h('span',	row.questionName.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, '')),
							JSON.parse(row.questionOption).map((item,index)=>{
								return h('p',	`${radioOption[index]}、${item.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, '')}`)
							}),
							h('p',`正确答案${row.questionAnswer}`)
							]

						 )
				}
			)
			}else
				if(row.questionTypeName === '填空题'){
					return h(
					NPopover,
					{
						placement:"right-end",
						trigger:"hover"
					},
				 {
					 trigger: () =>									//trigger插槽的内容
					 h('div', {}, `${row.questionName.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, '')}`),
					 default: () =>									//默认内容
							h(
							 NCard,
							 {
								 title:'题目信息',
								 size:'small'
							 },
								[h('span',	row.questionName.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, '')),
								JSON.parse(row.questionAnswer).map((item,index)=>{
									return h('p',	item.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, ''))
								}),
								// h('p',`正确答案${row.questionAnswer}`)
								]

							 )
					}
				)
				}	else{
				return h(
					NPopover,
					{
						placement:"right-end",
						trigger:"hover"
					},
				 {
					 trigger: () =>									//trigger插槽的内容
					 h('div', {}, `${row.questionName.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, '')}`),
					 default: () =>									//默认内容
							h(
							 NCard,
							 {
								 title:'题目信息',
								 size:'small'
							 },
								[h('span',	row.questionName.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, '')),
								h('p',	row.questionAnswer.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, ''))
								// JSON.parse(row.questionAnswer).map((item,index)=>{
								// 	return h('p',	item.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, ''))
								// }),
								// h('p',`正确答案${row.questionAnswer}`)
								]

							 )
					}
				)
			}
		}
  },
  {
    title: '题目类型',
    key: 'questionTypeName',
    width: 50
  },
  // {
  //   title: '所属题库',
  //   key: 'courseCategoryName',
  //   width: 100
  // },
  {
    title: '难易度',
    key: 'difficultLevelName',
    width: 50
  },
  {
    title: '知识点',
    key: 'courseCategoryName',
    width: 80,
    render(row: { listPointRelatedName: any[] }) {
      if (row.listPointRelatedName?.length) {
        const tags = row.listPointRelatedName?.join(',');
        return tags;
      }
      return [];
    }
  },
  {
    title: '被引用次数',
    key: 'quoteCount',
    width: 80
  },
  {
    title: '作答次数',
    key: 'answerCount',
    width: 80
  },
  {
    title: '状态',
    key: 'statusName',
    width: 80,
    render(row: { status: number }) {
      return h(NSwitch, {
        value: row.status === 1,
        onUpdateValue: value => {
          row.status = row.status === 1 ? 0 : 1;
          const params = {
            id: row.id,
            status: row.status
          };
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          updateQuest(params);
        }
      });
    }
  },
  // {
  //   title: '题目描述',
  //   key: 'note',
  //   width: 130
  // },
  {
    title: '创建人',
    key: 'createrName',
    width: 80
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 100
  }
];
/**
 * @author: ZHENG
 * @description: 上下架
 * @param {*} params
 * @return {*}
 */
const updateQuest = async params => {
  const courseResult = await editStatusPaperQuestion(params);
  console.log(courseResult, params.status);
  if (!courseResult.error) {
    window.$message?.success(`${params.status === 1 ? '启用' : '禁用'}操作成功`);
  }
};


