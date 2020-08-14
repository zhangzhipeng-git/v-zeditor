
/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\editor\_alert\tip\tip.ts
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: 复选框组件模板
 * Last Modified: Friday August 14th 2020 10:50:54 pm
 * Modified By: zzp
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
