
/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 复选框组件模板
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:06:28 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

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
