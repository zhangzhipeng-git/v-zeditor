/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 弹窗组件模板
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:05:52 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

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
            <!-- isScale true-false-不显示放大缩小,_isScale同isScale兼容方式2 -->
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