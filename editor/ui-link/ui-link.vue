<!--
 * @Author: your name
 * @Date: 2020-01-05 14:03:31
 * @LastEditTime : 2020-01-07 19:14:06
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\editor\ui-link\ui-link.vue
 -->
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