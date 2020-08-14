
/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\editor\_alert\tip\tip.ts
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: 插入表格组件模板
 * Last Modified: Friday August 14th 2020 10:50:54 pm
 * Modified By: zzp
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