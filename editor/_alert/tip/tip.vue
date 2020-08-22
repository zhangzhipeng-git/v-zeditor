
/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: toast组件模板
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:05:23 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

<template>
  <div id="z-editor-tip" class="z-editor-alert">
    <div class="wd-mask"></div>
    <!-- active - true 执行进入动画，false 执行离开动画 -->
    <p
      :style="{transition:  'all ' + (ready?enter:leave)/1000 + 's'}"
      :class="[(animation === 'scale'?'wd-tip-for-scale':'wd-tip'),animation+'-enter', animation+ (active?'-active':'-leave')]"
    ><i v-if="duration < 0 || duration === Infinity" class="z-editor-icomoon icon-loader"></i>{{text}}</p>
  </div>
</template>
<script lang="ts" src="./tip.ts"></script>