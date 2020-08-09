<!--
 * @Author: your name
 * @Date: 2020-01-05 20:21:55
 * @LastEditTime : 2020-01-05 20:48:15
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\editor\ui-table\ui-table.vue
 -->
<template>
  <div class="z-editor-table">
    <ul>
      <li>
        <label for="ui-table-row">行数</label>
        <input id="ui-table-row" type="text" v-model="row" />
      </li>
      <li>
        <label for="ui-table-col">列数</label>
        <input id="ui-table-col" type="text" v-model="col" />
      </li>
    </ul>
    <div class="wd-btn-group">
      <button @click="$parent.close">取消</button>
      <button @click="emitTableHTML">确认</button>
    </div>
  </div>
</template>
<script lang="ts" src="./ui-table.ts"></script>