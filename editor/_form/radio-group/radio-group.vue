/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 单选组组件模板
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:06:51 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
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
