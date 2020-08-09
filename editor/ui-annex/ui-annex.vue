/*
 * Project: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr
 * File: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr\core\modules\components\commons\editor\ui-annex\ui-annex.ts
 * Created Date: Saturday, February 22nd 2020, 8:16:01 pm
 * Author: 张志鹏
 * Contact: 1029512956@qq.com
 * Description: 上传文件弹出层
 * Last Modified: Sunday August 2nd 2020 7:17:07 pm
 * Modified By: 张志鹏
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
