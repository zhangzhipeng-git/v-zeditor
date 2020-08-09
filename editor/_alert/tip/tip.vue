<!--
 * @Author: your name
 * @Date: 2020-01-02 18:34:01
 * @LastEditTime : 2020-01-09 19:28:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\alert\tip\tip.vue
 -->
<template>
  <div id="z-editor-tip" class="z-editor-alert">
    <div class="wd-mask"></div>
    <!-- active - true 执行进入动画，false 执行离开动画 -->
    <p
      :style="{transition:  'all ' + (active?enter:leave)/1000 + 's'}"
      :class="[(animation === 'scale'?'wd-tip-for-scale':'wd-tip'),animation+'-enter', animation+ (active?'-active':'-leave')]"
    ><i v-if="duration < 0 || duration === Infinity" class="z-editor-icomoon icon-loader"></i>{{text}}</p>
  </div>
</template>
<script lang="ts" src="./tip.ts"></script>