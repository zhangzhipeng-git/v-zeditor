/*
 * Created Date: Saturday, August 8th 2020, 6:58:46 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 编辑器组件模板
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:08:46 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

<template>
  <div :class="theme">
    <div class="z-editor" ref="editor" @click="hideSwitchPannel($event)">
      <!-- 编辑条开始 -->
      <div class="wd-editor-bar fn-clearfix" ref="header">
        <!-- 事件执行富文本命令[失焦时，命令执行无效，所以要阻止失焦，或者在事件执行前聚焦] -->
        <!-- 备注!!!! -->
        <!-- mousedown事件在自身聚焦之前[即其他元素失焦聚焦之前]执行 -->
        <!-- 下面使用mousedown事件是因为可以使用e.preventDefault()阻止默认事件，阻止编辑面板失焦 -->
        <!-- 而针对必定要失焦的情况，则采用记住光标，再设置上次记住的光标的方式来做到伪失焦。 -->
        <!-- 字体 -->
        <div ref="fontName" class="wd-edit-link-box fontName" @mousedown="!inCode&&setFontName($event)">
          <a data-tip="字体" :class="{disabled: inCode}" class="wd-edit-link" href="javascript:void 0">
            <span :style="{'font-family': fontFamily.value}">{{fontFamily.key}}</span>
            <i class="iconmoon icon-caret-down"></i>
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
        <div ref="fontSize" class="wd-edit-link-box fontSize" @mousedown="!inCode&&setFontSize($event)">
          <a data-tip="字号" :class="{disabled: inCode}" class="wd-edit-link" href="javascript:void 0">
            <span>{{fontSize.key}}</span>
            <i class="iconmoon icon-caret-down"></i>
          </a>
          <ul v-show="switchFontSizePannel" class="wd-font-size-list">
            <li v-for="(fs, i) in fontSizes" :key="i">
              <a href="javascript:void 0" :data-index="i">{{fs.key}}</a>
            </li>
          </ul>
        </div>
        <!-- 文本格式 -->
        <div
          ref="formatBlock"
          class="wd-edit-link-box formatBlock"
          @mousedown="!inCode&&setFormatBlock($event)"
        >
          <a data-tip="文本格式" :class="{disabled: inCode}" class="wd-edit-link" href="javascript:void 0">
            <span>{{formatBlock}}</span>
            <i class="iconmoon icon-caret-down"></i>
          </a>
          <ul v-show="switchFormatBlockPannel" class="wd-format-block-list">
            <li v-for="(fb, i) in formatBlocks" :key="i">
              <a href="javascript:void 0" :data-index="i" v-html="fb.value"></a>
            </li>
          </ul>
        </div>
        <!-- 文本色 -->
        <div ref="foreColor" class="wd-edit-link-box foreColor" @mousedown="!inCode&&setForeColor($event)">
          <a data-tip="字色" :class="{disabled: inCode}" class="wd-edit-link" href="javascript:void 0">
            <i class="iconmoon icon-font-color" :style="{'border-bottom-color': foreColor}"></i>
            <i class="iconmoon icon-caret-down"></i>
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
        <div ref="backColor" class="wd-edit-link-box backColor" @mousedown="!inCode&&setBackColor($event)">
          <a data-tip="高亮" :class="{disabled: inCode}" class="wd-edit-link" href="javascript:void 0">
            <i class="iconmoon icon-pencil" :style="{'border-bottom-color': backColor}"></i>
            <i class="iconmoon icon-caret-down"></i>
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
        <div class="wd-edit-link-box bold" @mousedown="!inCode&&switchBold($event)">
          <a data-tip="加粗" :class="{'active': isBold,disabled:inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-bold"></i>
          </a>
        </div>
        <!-- 是否斜体 -->
        <div class="wd-edit-link-box italic" @mousedown="!inCode&&switchItalic($event)">
          <a data-tip="斜体" :class="{'active': isItalic,disabled:inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-italic"></i>
          </a>
        </div>
        <!-- 是否下划线 -->
        <div class="wd-edit-link-box underline" @mousedown="!inCode&&switchUnderline($event)">
          <a data-tip="下划线" :class="{'active': isUnderline,disabled:inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-underline"></i>
          </a>
        </div>
        <!-- 删除线 -->
        <div class="wd-edit-link-box strikeThrough" @mousedown="!inCode&&switchStrikeThrough($event)">
          <a data-tip="删除线" :class="{'active': isStrikeThrough,disabled:inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-strikethrough"></i>
          </a>
        </div>
        <!-- 上标 -->
        <div class="wd-edit-link-box superscript" @mousedown="!inCode&&setScript($event, 'superscript')">
          <a data-tip="上标" :class="{'active': scriptActive === 'superscript',disabled:inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-superscript"></i>
          </a>
        </div>
        <!-- 下标 -->
        <div class="wd-edit-link-box subscript" @mousedown="!inCode&&setScript($event, 'subscript')">
          <a data-tip="下标" :class="{'active': scriptActive === 'subscript',disabled:inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-subscript"></i>
          </a>
        </div>
        <!-- 居左 -->
        <div class="wd-edit-link-box justifyLeft" @mousedown="!inCode&&setJustifyactive($event, 'Left')">
          <a
            :class="{'active': justifyActive === 'justifyLeft',disabled:inCode}"
            data-tip="居左"
            class="wd-edit-link"
            href="javascript: void 0"
          >
            <i class="iconmoon icon-paragraph-left"></i>
          </a>
        </div>
        <!-- 居中 -->
        <div class="wd-edit-link-box justifyCenter" @mousedown="!inCode&&setJustifyactive($event, 'Center')">
          <a
            :class="{'active': justifyActive === 'justifyCenter',disabled:inCode}"
            data-tip="居中"
            class="wd-edit-link"
            href="javascript: void 0"
          >
            <i class="iconmoon icon-paragraph-center"></i>
          </a>
        </div>
        <!-- 居右 -->
        <div class="wd-edit-link-box justifyRight" @mousedown="!inCode&&setJustifyactive($event, 'Right')">
          <a
            :class="{'active': justifyActive === 'justifyRight',disabled:inCode}"
            data-tip="居右"
            class="wd-edit-link"
            href="javascript: void 0"
          >
            <i class="iconmoon icon-paragraph-right"></i>
          </a>
        </div>
        <!-- 左右对齐 -->
        <div class="wd-edit-link-box justifyFull" @mousedown="!inCode&&setJustifyactive($event, 'Full')">
          <a
            :class="{'active': justifyActive === 'justifyFull',disabled:inCode}"
            data-tip="左右对齐"
            class="wd-edit-link"
            href="javascript: void 0"
          >
            <i class="iconmoon icon-paragraph-justify"></i>
          </a>
        </div>
        <!-- 文本缩进 -->
        <div class="wd-edit-link-box indent" @mousedown="!inCode&&indent($event)">
          <a data-tip="缩进" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-indent-increase"></i>
          </a>
        </div>
        <!-- 文本增进  -->
        <div class="wd-edit-link-box outdent" @mousedown="!inCode&&outdent($event)">
          <a data-tip="减少缩进" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-indent-decrease"></i>
          </a>
        </div>
        <!-- 清除格式 -->
        <div class="wd-edit-link-box removeFormat" @mousedown="!inCode&&removeFormat($event)">
          <a data-tip="清除格式" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-clear-formatting"></i>
          </a>
        </div>
        <!-- 有序列表 -->
        <div class="wd-edit-link-box insertOrderedList" @mousedown="!inCode&&insertOrderedList($event)">
          <a data-tip="有序列表" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-list-numbered"></i>
          </a>
        </div>
        <!-- 无序列表 -->
        <div class="wd-edit-link-box insertUnorderedList" @mousedown="!inCode&&insertUnorderedList($event)">
          <a data-tip="无序列表" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-list2"></i>
          </a>
        </div>
        <!-- 表格 mdn无api，用insertHTML实现 -->
        <div class="wd-edit-link-box insertHTML" @mousedown="!inCode&&insertTable($event)">
          <a data-tip="表格" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-table"></i>
          </a>
        </div>
        <!-- 插入超链接，弹窗 -->
        <div class="wd-edit-link-box insertHTML" @mousedown="!inCode&&insertLink($event)">
          <a data-tip="链接" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-link"></i>
          </a>
        </div>
        <!-- 插入水平线hr -->
        <div
          class="wd-edit-link-box insertHorizontalRule"
          @mousedown="!inCode&&insertHorizontalRule($event)"
        >
          <a data-tip="水平线" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-page-break"></i>
          </a>
        </div>
        <!-- 插入文件 -->
        <div class="wd-edit-link-box insertHTML" @mousedown="!inCode&&insertFile($event)">
          <a data-tip="文件" :class="{disabled: inCode}" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-upload-cloud"></i>
          </a>
        </div>
        <!-- 插入代码 -->
        <div ref="code" class="wd-edit-link-box insertHTML" @mousedown="!inCode&&insertCode($event)">
          <a data-tip="代码" :class="{disabled: inCode}" class="wd-edit-link" href="javascript:void 0">
            <i class="iconmoon icon-embed"></i>
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
            <i class="iconmoon icon-arrow-down"></i>
          </a>
        </div>
        <!-- 粘贴 -->
        <div class="wd-edit-link-box paste" @mousedown="paste($event)">
          <a data-tip="粘贴" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-clipboard"></i>
          </a>
        </div>
        <!-- 复制 -->
        <div class="wd-edit-link-box copy" @mousedown="copy($event)">
          <a data-tip="复制" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-copy"></i>
          </a>
        </div>
        <!-- 剪切 -->
        <div class="wd-edit-link-box cut" @mousedown="cut($event)">
          <a data-tip="剪切" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-scissors-bold"></i>
          </a>
        </div>
        <!-- 选择全部 -->
        <div class="wd-edit-link-box selectAll" @mousedown="selectAll($event)">
          <a data-tip="选择全部" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-select_all"></i>
          </a>
        </div>
        <!-- 撤销 -->
        <div class="wd-edit-link-box undo" @mousedown="undo($event)">
          <a data-tip="撤销" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-undo"></i>
          </a>
        </div>
        <!-- 重做 -->
        <div class="wd-edit-link-box redo" @mousedown="redo($event)">
          <a data-tip="重做" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-redo"></i>
          </a>
        </div>
        <!-- 删除 -->
        <div class="wd-edit-link-box delete" @mousedown="deleteSelect($event)">
          <a data-tip="删除" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-eraser"></i>
          </a>
        </div>
        <!-- 全屏 -->
        <div class="wd-edit-link-box history" @mousedown="history($event)">
          <a data-tip="历史输入" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon icon-database"></i>
          </a>
        </div>
        <!-- 全屏 -->
        <div class="wd-edit-link-box full" @mousedown="SwitchScreen($event)">
          <a data-tip="全屏/取消全屏" class="wd-edit-link" href="javascript: void 0">
            <i class="iconmoon" :class="full?'icon-minimize':'icon-maximize'"></i>
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
        contenteditable="true"
        @click="pannelOnClick"
        @paste="pannelOnPaste"
        @keyup="keyup($event)"
        @keydown="keydown($event)"
        @blur="isInEditStatus=false"
        @input="setRangeAndEmitValue"
        class="wd-deitor-content"
      ></div>
      <!-- 编辑体结束 -->
      <div v-if="hasBtn" class="wd-edit-footer fn-clearfix" ref="footer">
        <div class="wd-edit-footer-btn">
          <button @click="emitContent">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./index.ts"></script>
<!-- 这里不用范围注入，既不加上特殊的属性，而是作为全局样式插入到头部标签 -->
<!-- 原因：其他的痰喘组件如插入链接组件、插入表格组件和插入文件组件的样式被提取到了index.scss
中，如果使用局部注入样式的方式，则这些组件的样式无法生效，因为组件并不会随宿主组件一起添加特殊属性，而引入的时候又不能使用/deep/，所以只能时全局的 -->
<style lang="scss" src="./index.scss"></style>