<!--
 * @Author: your name
 * @Date: 2020-01-07 21:18:19
 * @LastEditTime : 2020-01-08 23:58:14
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\editor\_form\radio\radio.vue
 -->
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
