/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 链接组件模板
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:07:44 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
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