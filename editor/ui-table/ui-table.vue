/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 插入表格组件模板
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:08:08 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

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