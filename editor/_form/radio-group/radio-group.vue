
/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\editor\_alert\tip\tip.ts
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: 单选组组件模板
 * Last Modified: Friday August 14th 2020 10:50:54 pm
 * Modified By: zzp
 * Copyright (c) 2020 ZXWORK
 */
<template>
  <span>
    <label :for="idPrefix+i" class="z-editor-radio" v-for="(v, i) in radioGroup" :key="i">
      <input
        type="radio"
        class="input-radio"
        :id="idPrefix+i"
        :value="v.value"
        :disabled="v.disabled"
        v-model="vmodel"
        @click="getActiveIndex(i)"
        @change="emitChange(v.value)"
      />
      <i
        :class="[
          'z-editor-icomoon',
          v.disabled ? 'wd-radio-disabled' : '',
          i === activeIndex ? 'icon-check-circle-thin' : 'icon-circle-thin'
        ]"
      ></i>
      <span>{{ v.text }}</span>
    </label>
  </span>
</template>
<script lang="ts" src="./radio-group.ts"></script>
