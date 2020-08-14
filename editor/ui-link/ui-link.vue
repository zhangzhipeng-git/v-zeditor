
/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\editor\_alert\tip\tip.ts
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: 链接组件模板
 * Last Modified: Friday August 14th 2020 10:50:54 pm
 * Modified By: zzp
 * Copyright (c) 2020 ZXWORK
 */
<template>
  <div class="z-editor-link">
    <ul>
      <li>
        <label for="ui-link-title">标题</label>
        <input placeholder="可不填~" id="ui-link-title" type="text" v-model="title" />
      </li>
      <li>
        <label for="ui-link-rul">链接</label>
        <input placeholder="http://" id="ui-link-rul" type="text" v-model="url" />
      </li>
      <li>
        <label for="ui-link-content">内容</label>
        <input id="ui-link-content" type="text" v-model="content" />
      </li>
      <li>
        <label for="ui-link-checkbox">新窗口打开</label>
        <CheckBoxComponent :id="'ui-link-checkbox'" v-model="checked" />
      </li>
    </ul>
    <div class="wd-btn-group">
      <button @click="$parent.close">取消</button>
      <button @click="emitLinkHTML">确认</button>
    </div>
  </div>
</template>
<script lang="ts" src="./ui-link.ts"></script>