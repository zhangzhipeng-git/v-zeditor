<!--
 * @Author: your name
 * @Date: 2020-01-04 13:50:20
 * @LastEditTime : 2020-01-05 20:00:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\alert\window\window.vue
 -->
<template>
  <div id="z-editor-window" class="z-editor-alert" :class="theme">
    <div class="wd-mask" ref="mask"></div>
    <div class="wd-content">
      <div
        ref="window"
        class="wd-window"
        :class="[animation+'-enter', animation+(active?'-active':'-leave')]"
      >
        <!-- 窗口工具条 -->
        <div class="wd-window-tool" @mousedown="start" @tragstart="tragstart">
          <h3>{{title}}</h3>
          <p>
            <!-- isScale true-显示放大缩小，flase-不显示放大缩小,_isScale同isScale兼容方式2 -->
            <i
              v-if="isScale"
              @click="switchSize"
              class="z-editor-icomoon"
              :class="min?'icon-maximize': 'icon-minimize'"
            ></i>
            <i @click="close" class="z-editor-icomoon icon-x-square"></i>
          </p>
        </div>
        <!-- 窗口面板 -->
        <div class="wd-window-pannel">
          <!-- v-html -->
          <div v-if="typeof content === 'string'" v-html="content"></div>
          <!-- 动态组件 handler:vue实例 -->
          <component v-else :handler="handler" :is="'child'"></component>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./window.ts"></script>