import { NProgress } from "naive-ui";
import { h } from "vue";

/*
 * @Author: ZHENG
 * @Date: 2022-06-06 10:41:27
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 18:19:52
 * @FilePath: \work\src\views\learnAnalysis\questAnalysis\personalTest\columns.ts
 * @Description:
 */
export const columns = [
  {
    title: '章节/课时名称',
    key: 'label',
    width: 100,
		render(row: { label: string; shortId: number; type: number }, index){
			console.log(row)
			if(row.type === 0) {
				return h("span", `第${index+1}章节 ${row.label}`)
			}else{
				return h("span", `第${index + 1}课时 ${row.label}`)
			}
		}
  },

  {
    title: '提交时间',
    key: 'createTime',
    width: 50,
		render(row: { type:number;createTime: string }, index){
			if(row.type === 0) {
				return h("p", ``)
			}else{
				if(row.createTime){
					return h("p", `${row.createTime}`)
				}

			}
		}
  },
  {
    title: '完成进度',
    key: 'percentage',
    width: 50,
		ellipsis:false,
		render(row:{type:number;percentage:number}){
			if(row.type === 0){
				return h('div',[
				h(NProgress,{
					type:"line",
					percentage:parseInt(row.percentage * 100,10)
			}
				)]);
			}

		}
  },
  {
    title: '成绩',
    key: 'fraction',
    width: 80
  }
];
