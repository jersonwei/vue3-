/*
 * @Author: ZHENG
 * @Date: 2022-05-02 21:15:27
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-02 21:15:28
 * @FilePath: \e-class-admin\src\utils\Props\propTypes.ts
 * @Description:
 */
import { CSSProperties, VNodeChild } from 'vue';
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types';

export type VueNode = VNodeChild | JSX.Element;

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
}) as PropTypes;

propTypes.extend([
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: undefined
  }
]);
export { propTypes };
