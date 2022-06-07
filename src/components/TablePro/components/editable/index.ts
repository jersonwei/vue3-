/* eslint-disable no-param-reassign */
/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:42:23
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-07 10:24:38
 * @FilePath: \work\src\components\TablePro\components\editable\index.ts
 * @Description:
 */
import { h, Ref } from 'vue';
import type { BasicColumn } from '@/components/TablePro/types/table';
import EditableCell from './EditableCell.vue';

export function renderEditCell(column: BasicColumn) {
  return (record, index) => {
    // eslint-disable-next-line no-underscore-dangle
    const _key = column.key;
    // eslint-disable-next-line no-underscore-dangle
    const value = record[_key];
    record.onEdit = async (edit: boolean, submit = false) => {
      if (!submit) {
        record.editable = edit;
      }

      if (!edit && submit) {
        const res = await record.onSubmitEdit?.();
        if (res) {
          record.editable = false;
          return true;
        }
        return false;
      }
      // cancel
      if (!edit && !submit) {
        record.onCancelEdit?.();
      }
      return true;
    };
    return h(EditableCell, {
      value,
      record,
      column,
      index
    });
  };
}

export type EditRecordRow<T = Recordable> = Partial<
  {
    onEdit: (editable: boolean, submit?: boolean) => Promise<boolean>;
    editable: boolean;
    onCancel: Fn;
    onSubmit: Fn;
    submitCbs: Fn[];
    cancelCbs: Fn[];
    validCbs: Fn[];
    editValueRefs: Recordable<Ref>;
  } & T
>;
