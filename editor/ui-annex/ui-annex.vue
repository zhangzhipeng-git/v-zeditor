/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\editor\_alert\tip\tip.ts
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: 插入文件组件模板
 * Last Modified: Friday August 14th 2020 10:50:54 pm
 * Modified By: zzp
 * Copyright (c) 2020 ZXWORK
 */
<template>
  <div class="z-editor-annex">
    <ul>
      <li>
        <button class="wd-upload-local" @click="selectFile">
          本地上传{{typeName}} +
        </button>
        <input v-if="rebuild" ref="file" class="wd-edit-file" type="file" />
      </li>
      <li>
        <label>类型</label>
        <RadioGroupComponent
          v-model="type"
          :radioGroup="radioGroup"
          class="wd-radio-group-type"
        />
      </li>
      <li>
        <label for="wd-annex-width">宽度</label>
        <input id="wd-annex-width" type="text" v-model="width" />
      </li>
      <li>
        <label for="wd-annex-height">高度</label>
        <input id="wd-annex-height" type="text" v-model="height" />
      </li>
      <li>
        <label for="wd-annex-link">外链</label>
        <input
          placeholder="https://"
          id="wd-annex-link"
          type="text"
          v-model="url"
        />
      </li>
      <li>
        <button @click="insertOutLink" class="wd-use-link-confirm">插入外链</button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" src="./ui-annex.ts"></script>
