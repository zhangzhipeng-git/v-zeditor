
/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\editor\_alert\tip\tip.ts
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: toast组件脚本
 * Last Modified: Friday August 14th 2020 10:50:54 pm
 * Modified By: zzp
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