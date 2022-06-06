<!--
 * @Author: ZHENG
 * @Date: 2022-06-06 08:53:26
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-06 09:06:04
 * @FilePath: \work\src\views\learnAnalysis\examAnalysis\personalTest\index.vue
 * @Description:
-->
<template>
  <div class="h-full">
    <n-card class="h-full shadow-sm rounded-16px">
      <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12">
        <n-gi span="2">
          {{ 123 }}
          <!-- <n-card :bordered="false" class="b-1" size="small">
            <div class="w-full menu">
              <n-space vertical>
                <n-cascader
                  v-model:value="propsFrom.bankType"
                  clearable
                  placeholder="请选择题库分类"
                  :options="bankTypeOptions"
                  :check-strategy="'child'"
                  :show-path="true"
                  remote
                  :on-load="handleLoad"
                />
                <n-input
                  v-model:value="propsFrom.bankName"
                  placeholder="输入题库名称搜索"
                >
                  <template #suffix>
                    <n-icon size="18" class="cursor-pointer">
                      <SearchOutlined />
                    </n-icon>
                  </template>
                </n-input>
                <n-button-group style="width: 100%"
                  ><n-button style="width: 50%" @click="refresh">重置</n-button>
                  <n-button style="width: 50%" @click="searchBank">搜索</n-button>
                </n-button-group>
              </n-space>

              <div class="py-3 menu-list">
                <template v-if="loading">
                  <div class="flex items-center justify-center py-4">
                    <n-spin size="medium" style="height: 500px; overflow: hidden" />
                  </div>
                </template>
                <template v-else>
                  <n-tree
                    :show-irrelevant-nodes="false"
                    :default-selected-keys="defaultSelectKeys"
                    block-line
                    :virtual-scroll="true"
                    key-field="id"
                    label-field="label"
                    :data="treeData"
                    :node-props="nodeProps"
                    style="
                      height: 500px;
                      overflow: hidden;
                      font-size: 18px;
                      line-height: 35px;
                    "
                  />
                </template>
              </div>
            </div>
            <template #action>
              <n-button
                style="width: 100%"
                ghost
                icon-placement="right"
                @click="addDataBaseModal"
              >
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <PlusOutlined />
                    </n-icon>
                  </div>
                </template>
                添加题库
              </n-button>
            </template>
          </n-card> -->
        </n-gi>
        <n-gi span="10">
          {{ 123 }}
          <!-- <n-card :bordered="false">
            <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
              <template #courseCategorySlot="{ model, field }">
                <n-select
                  v-model:value="model[field]"
                  placeholder="请选择类别"
                  :options="questionTypeoptions"
                />
              </template>
              <template #difficultySlot="{ model, field }">
                <n-select
                  v-model:value="model[field]"
                  placeholder="请选择难易度"
                  :options="difficultyoptions"
                />
              </template>
              <template #majorIdSlot="{ model, field }">
                <n-cascader
                  v-model:value="model[field]"
                  placeholder="请选择专业"
                  :options="cascaderOptions"
                  :check-strategy="'all'"
                  :show-path="true"
                  remote
                  :on-load="handleLoad"
                />
              </template>
            </FormPro>
            <TablePro
              ref="actionRef"
              :columns="columns"
              :request="loadDataTable"
              :row-key="(row) => row.id"
              :action-column="actionColumn"
              key-field="id"
              label-field="label"
              :scroll-x="1200"
            >
              <template #tableTitle>
                <n-space>
                  <n-button type="primary" @click="addTable">
                    <template #icon>
                      <n-icon>
                        <PlusOutlined />
                      </n-icon>
                    </template>
                    新建题目
                  </n-button>
                </n-space>
              </template>
            </TablePro>
            <delModal
              ref="delModalRef"
              :del-data="delData"
              :del-text="delText"
              @reload-table="reloadTable"
            ></delModal>
          </n-card> -->
        </n-gi>
      </n-grid>
      <!-- <addDataBase ref="addDataBaseModalRef" @reload-table="searchBank"></addDataBase>
      <questInfo ref="questInfoRef"></questInfo> -->
    </n-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
