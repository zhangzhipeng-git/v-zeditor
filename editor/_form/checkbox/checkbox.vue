<!--
 * @Author: your name
 * @Date: 2020-01-05 14:27:31
 * @LastEditTime : 2020-01-07 23:39:17
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\form\checkbox\checkbox.vue
 -->
<template>
  <label class="z-editor-checkbox">
    <input
      type="checkbox"
      :id="id"
      :checked="checked"
      :disabled="disabled"
      v-on:change="emitChange($event)"
    />
    <i
      :class="[
        'z-editor-icomoon',
        disabled ? 'wd-checkbox-disabled' : '',
        checked ? 'icon-check-square' : 'icon-square-o'
      ]"
    ></i>
  </label>
</template>
<script lang="ts" src="./checkbox.ts"></script>
