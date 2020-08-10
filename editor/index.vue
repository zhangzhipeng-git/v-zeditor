/*
 * Filename: d:\frontend\vue\nuxt-ssr\components\commons\editor\editor.vue
 * Path: d:\frontend\vue\nuxt-ssr
 * Created Date: Sunday, December 29th 2019, 4:54:29 pm
 * Author: zzp-dog
 * 富文本编辑器
 * Copyright (c) 2019 Your Company
 */
<template>
  <div :class="theme">
    <div class="z-editor" ref="editor" @click="hideSwitchPannel($event)">
      <!-- 编辑条开始 -->
      <div class="wd-editor-bar fn-clearfix" ref="header">
        <!-- 事件执行富文本命令[失焦时，命令执行无效，所以要阻止失焦，或者在事件执行前聚焦] -->
        <!-- 备注!!!! -->
        <!-- mousedown事件在自身聚焦之前[即其他元素失焦聚焦之前]执行 -->
        <!-- 下面使用mousedown事件是因为可以使用e.preventDefault()阻止默认事件[聚焦]，阻止编辑面板失焦 -->
        <!-- 当然不用上述方法的话，如果只会点击到a标签！！！，也可以将事件绑定在a标签上，因为点击a标签不会失去焦点哦 -->
        <!-- 而针对必定要失焦的情况（如点击了编辑器之外的元素[除了a标签元素]），则采用记住光标，再设置上次记住的光标的方式来做到伪失焦。 -->
        <!-- 字体 -->
        <div ref="fontName" class="wd-edit-link-box fontName" @mousedown="setFontName($event)">
          <a data-tip="字体" class="wd-edit-link" href="javascript:void 0">
            <span :style="{'font-family': fontFamily.value}">{{fontFamily.key}}</span>
            <i class="z-editor-icomoon icon-caret-down"></i>
          </a>
          <ul v-show="switchFontFamilyPannel" class="wd-font-name-list">
            <li v-for="(ff, i) in fontFamilys" :key="i">
              <a
                href="javascript:void 0"
                :data-index="i"
                :style="{'font-family': ff.value}"
              >{{ff.key}}</a>
            </li>
          </ul>
        </div>
        <!-- 字号 -->
        <div ref="fontSize" class="wd-edit-link-box fontSize" @mousedown="setFontSize($event)">
          <a data-tip="字号" class="wd-edit-link" href="javascript:void 0">
            <span>{{fontSize.key}}</span>
            <i class="z-editor-icomoon icon-caret-down"></i>
          </a>
          <ul v-show="switchFontSizePannel" class="wd-font-size-list">
            <li v-for="(fs, i) in fontSizes" :key="i">
              <!-- 注意这里style的fontSize绑定的是x-small，small这种值 -->
              <a href="javascript:void 0" :data-index="i" :style="{'font-size': fs.key}">{{fs.key}}</a>
            </li>
          </ul>
        </div>
        <!-- 文本格式 -->
        <div
          ref="formatBlock"
          class="wd-edit-link-box formatBlock"
          @mousedown="setFormatBlock($event)"
        >
          <a data-tip="文本格式" class="wd-edit-link" href="javascript:void 0">
            <span>{{formatBlock}}</span>
            <i class="z-editor-icomoon icon-caret-down"></i>
          </a>
          <ul v-show="switchFormatBlockPannel" class="wd-format-block-list">
            <li v-for="(fb, i) in formatBlocks" :key="i">
              <a href="javascript:void 0" :data-index="i" v-html="fb.value"></a>
            </li>
          </ul>
        </div>
        <!-- 文本色 -->
        <div ref="foreColor" class="wd-edit-link-box foreColor" @mousedown="setForeColor($event)">
          <a data-tip="字色" class="wd-edit-link" href="javascript:void 0">
            <i class="z-editor-icomoon icon-font-color" :style="{'border-bottom-color': foreColor}"></i>
            <i class="z-editor-icomoon icon-caret-down"></i>
          </a>
          <div class="wd-color-list" v-show="switchForeColorPannel">
            <ul>
              <li class="wd-tr" v-for="(color, i) in colors" :key="i">
                <ul>
                  <li class="wd-td" v-for="(e, j) in color" :key="j">
                    <a
                      href="javascript:void 0"
                      :data-dim1="i"
                      :data-dim2="j"
                      :style="{'background-color': e}"
                    ></a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!-- 高亮色 -->
        <div ref="backColor" class="wd-edit-link-box backColor" @mousedown="setBackColor($event)">
          <a data-tip="高亮" class="wd-edit-link" href="javascript:void 0">
            <i class="z-editor-icomoon icon-pencil" :style="{'border-bottom-color': backColor}"></i>
            <i class="z-editor-icomoon icon-caret-down"></i>
          </a>
          <div class="wd-color-list" v-show="switchBackColorPannel">
            <ul>
              <li class="wd-tr" v-for="(color, i) in colors" :key="i">
                <ul>
                  <li class="wd-td" v-for="(e, j) in color" :key="j">
                    <a
                      href="javascript:void 0"
                      :data-dim1="i"
                      :data-dim2="j"
                      :style="{'background-color': e}"
                    ></a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <!-- 是否加粗 -->
        <div class="wd-edit-link-box bold" @mousedown="switchBold($event)">
          <a data-tip="加粗" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-bold"></i>
          </a>
        </div>
        <!-- 是否斜体 -->
        <div class="wd-edit-link-box italic" @mousedown="switchItalic($event)">
          <a data-tip="斜体" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-italic"></i>
          </a>
        </div>
        <!-- 是否下划线 -->
        <div class="wd-edit-link-box underline" @mousedown="switchUnderline($event)">
          <a data-tip="下划线" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-underline"></i>
          </a>
        </div>
        <!-- 删除线 -->
        <div class="wd-edit-link-box strikeThrough" @mousedown="switchStrikeThrough($event)">
          <a data-tip="删除线" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-strikethrough"></i>
          </a>
        </div>
        <!-- 上标 - 不可关 -->
        <div class="wd-edit-link-box superscript" @mousedown="superscript($event)">
          <a data-tip="上标" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-superscript"></i>
          </a>
        </div>
        <!-- 下标 - 不可关-->
        <div class="wd-edit-link-box subscript" @mousedown="subscript($event)">
          <a data-tip="下标" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-subscript"></i>
          </a>
        </div>
        <!-- 居左 - 不可关-->
        <div class="wd-edit-link-box justifyLeft" @mousedown="setJustifyactive($event, 'Left')">
          <a
            :class="{'wd-edit-link-active': justifyActive === 'justifyLeft'}"
            data-tip="居左"
            class="wd-edit-link"
            href="javascript: void 0"
          >
            <i class="z-editor-icomoon icon-paragraph-left"></i>
          </a>
        </div>
        <!-- 居中 - 不可关-->
        <div class="wd-edit-link-box justifyCenter" @mousedown="setJustifyactive($event, 'Center')">
          <a
            :class="{'wd-edit-link-active': justifyActive === 'justifyCenter'}"
            data-tip="居中"
            class="wd-edit-link"
            href="javascript: void 0"
          >
            <i class="z-editor-icomoon icon-paragraph-center"></i>
          </a>
        </div>
        <!-- 居右 - 不可关-->
        <div class="wd-edit-link-box justifyRight" @mousedown="setJustifyactive($event, 'Right')">
          <a
            :class="{'wd-edit-link-active': justifyActive === 'justifyRight'}"
            data-tip="居右"
            class="wd-edit-link"
            href="javascript: void 0"
          >
            <i class="z-editor-icomoon icon-paragraph-right"></i>
          </a>
        </div>
        <!-- 左右对齐 - 不可关-->
        <div class="wd-edit-link-box justifyFull" @mousedown="setJustifyactive($event, 'Full')">
          <a
            :class="{'wd-edit-link-active': justifyActive === 'justifyFull'}"
            data-tip="左右对齐"
            class="wd-edit-link"
            href="javascript: void 0"
          >
            <i class="z-editor-icomoon icon-paragraph-justify"></i>
          </a>
        </div>
        <!-- 文本缩进 - 不可关-->
        <div class="wd-edit-link-box indent" @mousedown="indent($event)">
          <a data-tip="缩进" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-indent-increase"></i>
          </a>
        </div>
        <!-- 文本增进  - 不可关-->
        <div class="wd-edit-link-box outdent" @mousedown="outdent($event)">
          <a data-tip="减少缩进" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-indent-decrease"></i>
          </a>
        </div>
        <!-- 清除格式 -->
        <div class="wd-edit-link-box removeFormat" @mousedown="removeFormat($event)">
          <a data-tip="清除格式" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-clear-formatting"></i>
          </a>
        </div>
        <!-- 有序列表 -->
        <div class="wd-edit-link-box insertOrderedList" @mousedown="insertOrderedList($event)">
          <a data-tip="有序列表" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-list-numbered"></i>
          </a>
        </div>
        <!-- 无序列表 -->
        <div class="wd-edit-link-box insertUnorderedList" @mousedown="insertUnorderedList($event)">
          <a data-tip="无序列表" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-list2"></i>
          </a>
        </div>
        <!-- 表格 mdn无api，用insertHTML实现 -->
        <div class="wd-edit-link-box insertHTML" @mousedown="insertTable($event)">
          <a data-tip="表格" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-table"></i>
          </a>
        </div>
        <!-- 插入超链接，弹窗 -->
        <div class="wd-edit-link-box insertHTML" @mousedown="insertLink($event)">
          <a data-tip="链接" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-link"></i>
          </a>
        </div>
        <!-- 插入水平线hr -->
        <div
          class="wd-edit-link-box insertHorizontalRule"
          @mousedown="insertHorizontalRule($event)"
        >
          <a data-tip="水平线" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-page-break"></i>
          </a>
        </div>
        <!-- 插入文件 -->
        <div class="wd-edit-link-box insertHTML" @mousedown="insertFile($event)">
          <a data-tip="文件" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-upload-cloud"></i>
          </a>
        </div>
        <!-- 插入代码 -->
        <div ref="code" class="wd-edit-link-box insertHTML" @mousedown="insertCode($event)">
          <a data-tip="代码" class="wd-edit-link" href="javascript:void 0">
            <!-- <span>{{code}}</span> -->
            <!-- <i class="z-editor-icomoon icon-caret-down"></i> -->
            <i class="z-editor-icomoon icon-embed"></i>
          </a>
          <ul v-show="switchCodePannel" class="wd-code-list">
            <li v-for="(code, i) in codes" :key="i">
              <a href="javascript:void 0" :data-index="i">{{code}}</a>
            </li>
          </ul>
        </div>
        <!-- 换行 -->
        <div class="wd-edit-link-box insertBrOnReturn" @mousedown="insertBrOnReturn($event)">
          <a data-tip="换行(shift+enter)" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-arrow-down"></i>
          </a>
        </div>
        <!-- 粘贴 -->
        <div class="wd-edit-link-box paste" @mousedown="paste($event)">
          <a data-tip="粘贴" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-clipboard"></i>
          </a>
        </div>
        <!-- 复制 -->
        <div class="wd-edit-link-box copy" @mousedown="copy($event)">
          <a data-tip="复制" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-copy"></i>
          </a>
        </div>
        <!-- 剪切 -->
        <div class="wd-edit-link-box cut" @mousedown="cut($event)">
          <a data-tip="剪切" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-scissors-bold"></i>
          </a>
        </div>
        <!-- 选择全部 -->
        <div class="wd-edit-link-box selectAll" @mousedown="selectAll($event)">
          <a data-tip="选择全部" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-select_all"></i>
          </a>
        </div>
        <!-- 撤销 -->
        <div class="wd-edit-link-box undo" @mousedown="undo($event)">
          <a data-tip="撤销" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-undo"></i>
          </a>
        </div>
        <!-- 重做 -->
        <div class="wd-edit-link-box redo" @mousedown="redo($event)">
          <a data-tip="重做" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-redo"></i>
          </a>
        </div>
        <!-- 删除 -->
        <div class="wd-edit-link-box delete" @mousedown="deleteSelect($event)">
          <a data-tip="删除" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-eraser"></i>
          </a>
        </div>
        <!-- 全屏 -->
        <div class="wd-edit-link-box history" @mousedown="history($event)">
          <a data-tip="历史输入" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon icon-database"></i>
          </a>
        </div>
        <!-- 全屏 -->
        <div class="wd-edit-link-box full" @mousedown="SwitchScreen($event)">
          <a data-tip="全屏/取消全屏" class="wd-edit-link" href="javascript: void 0">
            <i class="z-editor-icomoon" :class="full?'icon-minimize':'icon-maximize'"></i>
          </a>
        </div>
      </div>
      <!-- 编辑条结束 -->
      <!-- 编辑体开始 -->
      <!-- input,selectionchange,click事件记录上次编辑的光标 -->
      <!-- mousedown事件在鼠标按下，判断是否要设置聚焦并设置上次光标和重设编辑样式 -->

      <div
        ref="pannel"
        v-html="vhtml$"
        @keydown="keydown"
        @click="clickPannel"
        @blur="isInEditStatus=false"
        @input="setRangeAndEmitValue"
        class="wd-deitor-content"
        contenteditable="true"
      ></div>
      <!-- 编辑体结束 -->
      <div class="wd-edit-footer fn-clearfix" ref="footer">
        <div class="wd-edit-footer-btn" v-if="hasBtn">
          <button @click="emitContent">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style lang="scss" src="./index.scss"></style>