/*
 * Project: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr
 * File: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr\core\modules\components\commons\editor\editor.ts
 * Created Date: Saturday, February 22nd 2020, 8:16:01 pm
 * Author: 张志鹏
 * Contact: 1029512956@qq.com
 * Description: 富文本编辑器
 * Last Modified: Sunday August 2nd 2020 5:49:29 pm
 * Modified By: 张志鹏
 * Copyright (c) 2020 ZXWORK
 */

import Vue from "vue";
import { Prop, Model, Ref, Watch } from "vue-property-decorator";
import Component from "vue-class-component";
import TipComponent from "./_alert/tip/tip";            // 提示弹窗
import WindowComponent, { WindowOptions } from "./_alert/window/window";   // 窗体弹窗
import UILink from "./ui-link/ui-link.vue";             // 超链接UI组件
import UITable from "./ui-table/ui-table.vue";          // 表格UI组件
import UIAnnex from "./ui-annex/ui-annex.vue";          // 附件UI组件
import DomUtil from "./util/DomUtil";                   // dom工具类
import CursorUtil from './util/CursorUtil';             // 光标工具类
/** 编辑器配置参数 */
interface Options {
    /** 编辑内容的最大字节数 */
    maxsize: number;
    /** 上传超时 ms */
    timeout: number;
    /** 上传图片的配置参数 */
    audio: {
        /** 上传的最大图片数量 */
        count: number;
        /** 小于指定字节数会进行base64编码 */
        base64: number;
    };
    /** 上传视频的配置参数 */
    video: {
        /** 上传的最大视频数量 */
        count: number;
    };
    /** 上传音频的配置参数 */
    music: {
        /** 上传的最大音频数量 */
        count: number;
    };
}

@Component({name: 'z-editor'})
export default class EditorComponent extends Vue {
    /** v-model */
    @Model('input')
    @Prop({ type: String, default: '<p>请输入内容~</p>' }) vhtml!: string;
    /** 是否有按钮 */
    @Prop({ type: Boolean, default: false }) hasBtn!: boolean;
    /** 配置参数，应该从后台查配置参数 ！！！*/
    @Prop({ type: Object, default: () => { } }) options!: Options;
    /** 主题色 - 少女粉 基佬紫 天空蓝 护眼绿（针对按钮背景色，代码区背景和a标签）默认无 */
    @Prop({ type: String, default: '' }) theme!: '.r' | '.p' | '.b' | '.g';
    /** 编辑面板 */
    @Ref('pannel') pannel!: HTMLElement | any;
    /** 字体样式 */
    fontFamilys = [{ key: "arial", value: "arial" }, { key: "微软雅黑", value: "Microsoft Yahei" }, { key: "宋体", value: "SimSun" }, { key: "黑体", value: "SimHei" }, { key: "楷体", value: "KaiTi" }, { key: "宋体", value: "SimSun" }, { key: "新宋体", value: "NSimSun" }, { key: "仿宋", value: "FangSong" }, { key: "微软正黑体", value: "Microsoft JhengHei" }, { key: "华文琥珀", value: "STHupo" }, { key: "华文彩云", value: "STCaiyun" }, { key: "幼圆", value: "YouYuan" }, { key: "华文行楷", value: "STXingkai" }];
    /** 文本格式 */
    formatBlocks = [{ key: "p", value: '<p data-index="0">p</p>' }, { key: "h6", value: '<h6 data-index="1">h6</h6>' }, { key: "h5", value: '<h5 data-index="2">h5</h5>' }, { key: "h4", value: '<h4 data-index="3">h4</h4>' }, { key: "h3", value: '<h3 data-index="4">h3</h3>' }, { key: "h2", value: '<h2 data-index="5">h2</h2>' }, { key: "h1", value: '<h1 data-index="6">h1</h1>' }];
    /** 颜色 */
    colors = [["#ffffff", "#000000", "#eeece1", "#1f497d", "#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#4bacc6", "#f79646"], ["#f2f2f2", "#7f7f7f", "#ddd9c3", "#c6d9f0", "#dbe5f1", "#f2dcdb", "#ebf1dd", "#e5e0ec", "#dbeef3", "#fdeada"], ["#d8d8d8", "#595959", "#c4bd97", "#8db3e2", "#b8cce4", "#e5b9b7", "#d7e3bc", "#ccc1d9", "#b7dde8", "#fbd5b5"], ["#bfbfbf", "#3f3f3f", "#938953", "#548dd4", "#95b3d7", "#d99694", "#c3d69b", "#b2a2c7", "#92cddc", "#fac08f"], ["#a5a5a5", "#262626", "#494429", "#17365d", "#366092", "#953734", "#76923c", "#5f497a", "#31859b", "#e36c09"], ["#7f7f7f", "#0c0c0c", "#1d1b10", "#0f243e", "#244061", "#632423", "#4f6128", "#3f3151", "#205867", "#974806"], ["#c00000", "#ff0000", "#ffc000", "#ffff00", "#92d050", "#00b050", "#00b0f0", "#0070c0", "#002060", "#7030a0"]];
    /** 字体大小 */
    fontSizes = [{ key: "xx-small", value: "1" }, { key: "x-small", value: "2" }, { key: "small", value: "3" }, { key: "medium", value: "4" }, { key: "large", value: "5" }, { key: "x-large", value: "6" }, { key: "xx-large", value: "7" }];
    /** code */
    codes = ['Html', 'Css', 'Js', 'TypeScript', 'Sass', 'Java', 'Xml', 'Sql', 'Shell'];
    /** 选中的字样 */
    fontFamily: any = { key: "微软雅黑", value: "Microsoft Yahei" };
    /** 选中的字号 */
    fontSize: any = { key: "small", value: 3 }; // 默认1rem;
    /** 文本格式 */
    formatBlock = "p";
    /** 字体颜色 */
    foreColor = "black";
    /** 高亮色 */
    backColor = "white";
    /** 当前代码语言 */
    code = 'Js';
    /** 是否打开字样面板 */
    switchFontFamilyPannel: boolean = false;
    /** 是否打开字号面板 */
    switchFontSizePannel: boolean = false;
    /** 是否打开文本格式面板 */
    switchFormatBlockPannel: boolean = false;
    /** 是否打开字体颜色面板 */
    switchForeColorPannel: boolean = false;
    /** 是否打开背景色面板 */
    switchBackColorPannel: boolean = false;
    /** 是否打开代码语言面板 */
    switchCodePannel: boolean = false;
    /** 默认左对齐 */
    justifyActive = 'justifyLeft';
    /** 是否处于编辑状态中 */
    isInEditStatus: boolean = false;
    /** 记住的range */
    range: any;
    /** 是否全屏, 默认false */
    full: boolean = false;
    /** 父元素 */
    parent!: HTMLElement;
    /** 合并参数 */
    get options$() {
        return Object.assign({ maxsize: 65535, image: { count: 5, base64: 60000 }, audio: { count: 1 }, video: { count: 1 } }, this.options);
    }
    /** 当输入值有值的时候，取消vhtml$的重新赋值，避免重新赋值导致光标丢失！！！ */
    /** 如果确实要重新输入绑定，请设置一次vhtml为空！！！ */
    vhtml$: string = '';
    /** 是否对vhtml$的重新赋值,默认true */
    reset: boolean = true;
    @Watch('vhtml')
    watchVHTML(nv: string, ov: string) {
        if (nv && this.reset) { // 重新输入绑定
            this.reset = false;
            this.vhtml$ = this.vhtml;
            return;
        }
        if (!nv) { // 标记需要重新输入绑定
            this.reset = true;
            this.vhtml$ = '';
        };
    }
    /** 默认格式 */
    static FORMAT = {
        formatBlock: 'p',
        foreColor: 'black',
        backColor: 'white',
        justifyActive: 'justifyLeft',
        fontSize: { key: "small", value: "3" },
        fontFamily: { key: "微软雅黑", value: "Microsoft Yahei" }
    }

    constructor() {
        super();
    }

    beforeMount() {
        this.initFormatData();
    }

    mounted() {
        this.parent = (<any>this.$refs.editor).parentNode;
    }

    /** 
     * 初始化默认格式 
     */
    initFormatData() {
        Object.assign(this, EditorComponent.FORMAT);
    }

    /**
     * 如果面板不聚焦则使面板聚焦
     */
    pannelFocus() {
        if (document.activeElement !== this.pannel) {
            this.pannel.focus();
        }
    }

    /**
     * 确保编辑面板聚焦，设置编辑面板上次光标为当前光标
     * @param e
     */
    recoverRange() {
        if (!this.pannel) return;
        // 确保编辑面板先是聚焦的
        if (document.activeElement !== this.pannel) {
            this.pannel.focus();
        }
        if (this.range) { // 存在上次光标，则设置上次光标
            CursorUtil.setFirstRange(this.range);
            return;
        };
        CursorUtil.setSelectionToElement(this.pannel, false);
    }

    /**
     * 1.聚焦面板并获取上次光标位置,设置当前历史编辑样式
     * 2.点击编辑条的命令或者编辑面板后，将视为编辑状态
     * @param  {boolean=true} recover? 是否需要恢复上次光标
     */
    startEdit(recover: boolean = true) {
        // 恢复上次光标（点击编辑面板不需要恢复上次光标，点击编辑条需要恢复上次光标）
        if (recover) {
            this.recoverRange();
        }
        // 面板处于编辑状态中
        if (this.isInEditStatus) {
            return;
        }
        this.setHistoryFormat();
        // 标记面板处于编辑状态之中
        this.isInEditStatus = true
    }

    /**
     * 阻止默认事件防止失焦，确保编辑面板聚焦，设置历史光标和格式
     * @param e {Event} 事件对象
     */
    ensureFocus(e: any) {
        // 阻止失焦
        e = e || window.event;
        e.preventDefault();
        // 编辑初始化
        this.startEdit();
    }

    /**
     * 设置历史格式
     */
    setHistoryFormat() {
        // 在代码区不设置文本格式
        if (this.isRangeInCode()) return;
        // 设置历史格式
        this.cmd('formatBlock', false, this.formatBlock);
        //如果编辑器内没有文本标签，文字对齐命令不能第一个执行，
        // 否则会将光标设到下一个文本标签内
        this.cmd(this.justifyActive, false);
        this.cmd("fontName", false, this.fontFamily.value);
        this.cmd("fontSize", false, this.fontSize.value);
        this.cmd("foreColor", false, this.foreColor);
        this.cmd("backColor", false, this.backColor);
    }

    /**
     * 设置字样
     * @param e 事件
     */
    setFontName(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const index = t.getAttribute("data-index");
        this.switchFontFamilyPannel = !this.switchFontFamilyPannel;
        if (index === null || index === undefined) return;
        this.fontFamily = this.fontFamilys[index * 1];
        this.cmd("fontName", false, this.fontFamily.value);
    }

    /**
     * 设置字号
     */
    setFontSize(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const index = t.getAttribute("data-index");
        this.switchFontSizePannel = !this.switchFontSizePannel;
        if (index === null || index === undefined) return;
        const fontSize = this.fontSizes[index * 1];
        this.fontSize = fontSize;
        this.cmd("fontSize", false, fontSize.value);
    }

    /**
     * 设置文本格式
     * @param e 事件
     */
    setFormatBlock(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const index = t.getAttribute("data-index");
        this.switchFormatBlockPannel = !this.switchFormatBlockPannel;
        if (index === null || index === undefined) return;
        const formatBlock = this.formatBlocks[index * 1];
        this.formatBlock = formatBlock.key;
        this.cmd("formatBlock", false, "<" + this.formatBlock + ">");
    }

    /**
     * 设置前景色
     * @param e 事件
     */
    setForeColor(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const x = t.getAttribute("data-dim1");
        const y = t.getAttribute("data-dim2");
        this.switchForeColorPannel = !this.switchForeColorPannel;
        if (x === null || y == null) return;
        this.foreColor = this.colors[x][y];
        this.cmd("foreColor", false, this.foreColor);
    }

    /**
     * 设置背景色(高亮色)
     * @param e 事件
     */
    setBackColor(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const x = t.getAttribute("data-dim1");
        const y = t.getAttribute("data-dim2");
        this.switchBackColorPannel = !this.switchBackColorPannel;
        if (x === null || y == null) return;
        this.backColor = this.colors[x][y];
        this.cmd("backColor", false, this.backColor);
    }

    /**
     * 设置代码语言
     * @param e 事件
     */
    insertCode(e: any) {
        this.ensureFocus(e);
        if (this.isRangeInCode()) {
            this.toast('代码区无法插入代码区~');
            return;
        }
        this.switchCodePannel = !this.switchCodePannel;
        const index = e.target.getAttribute('data-index');
        if (index === null) return;
        this.code = this.codes[index];
        const id = new Date().getTime() + '';
        const code = this.code.toLowerCase();
        let html = `<p><pre title="代码区" class="code ${code}"><code class="${code}"><p id="${id}"><br/></p></code></pre></p><p><br/></p>`;
        this.removeFormat(e);
        this.cmd('insertHTML', false, html);
        // 插入html后，将光标移至代码区的p标签中
        CursorUtil.setRangeToElement(<any>DomUtil.id(id), true);
        this.setRange(); // 手动记住光标
    }

    /**
     * 行内换行（shift+enter）
     * @param e 事件
     */
    insertBrOnReturn(e: any) {
        this.ensureFocus(e);
        if (!this.isSupport('insertBrOnReturn')) {
            this.cmd('insertHTML', false, '<br><br>');
            return;
        }
        this.cmd('insertBrOnReturn', false);
    }

    /**
     * 设置粗体
     */
    switchBold(e: any) {
        this.ensureFocus(e);
        this.cmd("bold", false, "");
    }

    /**
     * 设置斜体
     */
    switchItalic(e: any) {
        this.ensureFocus(e);
        this.cmd("italic", false, "");
    }

    /**
     * 设置下划线
     */
    switchUnderline(e: any) {
        this.ensureFocus(e);
        this.cmd("underline", false, "");
    }

    /**
     * 设置删除线
     */
    switchStrikeThrough(e: any) {
        this.ensureFocus(e);
        this.cmd("strikeThrough", false, "");
    }

    /**
     * 设置/取消上标
     */
    superscript(e: Event) {
        this.ensureFocus(e);
        this.cmd("superscript", false, "");
    }

    /**
     * 设置/取消下标
     */
    subscript(e: Event) {
        this.ensureFocus(e);
        this.cmd("subscript", false, "");
    }

    /**
     * 设置文字对齐方向
     * @param  {Event} e 事件
     * @param  {'Left'|'Right'|'Center'|'Full'} str
     */
    setJustifyactive(e: Event, str: 'Left' | 'Right' | 'Center' | 'Full') {
        this.ensureFocus(e);
        this.justifyActive = 'justify' + str;
        this.cmd(this.justifyActive, false);
    }

    /**
     * 缩进
     */
    indent(e: any) {
        this.ensureFocus(e);
        this.cmd("indent", false, "");
    }

    /**
     * 减少缩进
     */
    outdent(e: any) {
        this.ensureFocus(e);
        this.cmd("outdent", false, "");
    }

    /**
     * 插入有序列表
     */
    insertOrderedList(e: any) {
        this.ensureFocus(e);
        this.cmd("insertOrderedList", false, "");
    }

    /**
     * 插入无序列表
     */
    insertUnorderedList(e: any) {
        this.ensureFocus(e);
        this.cmd("insertUnorderedList", false, "");
    }

    /**
     * 插入表格调起插入表格UI
     */
    insertTable(e: any) {
        if (this.isRangeInCode()) {
            this.toast('代码区无法插入表格~');
            return;
        }
        this.alert({ title: "插入表格", animation: "scale", content: UITable, handler: this , theme: this.theme});
    }
    /**
     * 点击表格UI弹窗确认时回调
     * @param html 插入的html
     */
    recieveTableHTML(html: string) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }

    /**
     * 插入超链接调起插入超链接UI
     * @param e 事件
     */
    insertLink(e: any) {
        if (this.isRangeInCode()) {
            this.toast('代码区无法插入链接~');
            return;
        }
        this.alert({ title: "插入链接", animation: "scale", content: UILink, handler: this , theme: this.theme});
    }
    /**
     * 点击超链接UI弹窗确认时回调
     * @param html 插入的html
     */
    recieveLinkHTML(html: string) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }

    /**
     * 插入图片调起插入图片UI
     * @param e 事件
     */
    insertFile(e: any) {
        if (this.isRangeInCode()) {
            this.toast('代码区无法插入文件~');
            return;
        }
        this.alert({ title: "插入文件", animation: "scale", content: UIAnnex, handler: this , theme: this.theme});
    }
    /**
     * 点击上传文件UI弹窗上传本地文件时嵌入base64时回调
     * @param html 插入的html
     */
    recieveLocalFileHTML(html: string) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /**
     * 点击上传文件UI弹窗“插入外链”时回调
     * @param html 插入的html
     */
    recieveFileLinkHTML(html: string) {
        this.startEdit();
        this.cmd('insertHTML', false, html);
        return true;
    }
    /** 发射选择文件事件 */
    emitUploadFile(type: 'image' | 'audio' | 'video', file: any, close: Function) {
        this.$emit('uploadFile', {
            type, file, callback: (html: string, isSuccess: boolean, t?: number) => {
                this.recieveFileLinkHTML(html);
                close(isSuccess, t);
            }
        });
    }

    /**
     * 插入hr
     */
    insertHorizontalRule(e: any) {
        this.ensureFocus(e);
        this.cmd("insertHorizontalRule", false, "");
    }

    /**
     * 粘贴
     */
    paste(e: any) {
        this.ensureFocus(e);
        this.cmd("paste", false, "");
    }

    /**
     * 剪切
     */
    cut(e: any) {
        this.ensureFocus(e);
        this.cmd("cut", false, "");
    }

    /**
     * 复制
     */
    copy(e: any) {
        this.ensureFocus(e);
        this.cmd("copy", false, "");
    }

    /**
     * 选中所有
     */
    selectAll(e: any) {
        this.ensureFocus(e);
        this.cmd("selectAll", false, "");
    }

    /**
     * 重做
     */
    redo(e: any) {
        this.ensureFocus(e);
        this.cmd("redo", false, "");
    }

    /**
     * 撤销
     */
    undo(e: any) {
        this.ensureFocus(e);
        this.cmd("undo", false, "");
    }

    /**
     * 删除选中
     */
    deleteSelect(e: any) {
        this.ensureFocus(e);
        this.cmd("delete", false, "");
    }

    /**
     * 获取历史输入
     */
    history() {
        this.vhtml$ = window.localStorage.getItem('editor_input') || '';
    }

    /**
     * 清除格式
     */
    removeFormat(e: any) {
        this.ensureFocus(e);
        // 选中文字清除格式
        this.cmd("removeFormat", false);
        this.initFormatData();
        this.setHistoryFormat();
    }

    /**
     * 隐藏各类下拉框
     * @param e 事件
     */
    hideSwitchPannel(e: any) {
        e = e || window.event;
        const target = e.target || e.srcElement;
        if (this.switchFontFamilyPannel && !DomUtil.contains(<HTMLElement>this.$refs.fontName, target)) {
            this.switchFontFamilyPannel = false;
            return;
        }
        if (this.switchFontSizePannel && !DomUtil.contains(<HTMLElement>this.$refs.fontSize, target)) {
            this.switchFontSizePannel = false;
            return;
        }
        if (this.switchForeColorPannel && !DomUtil.contains(<HTMLElement>this.$refs.foreColor, target)) {
            this.switchForeColorPannel = false;
            return;
        }
        if (this.switchBackColorPannel && !DomUtil.contains(<HTMLElement>this.$refs.backColor, target)) {
            this.switchBackColorPannel = false;
            return;
        }
        if (this.switchFormatBlockPannel && !DomUtil.contains(<HTMLElement>this.$refs.formatBlock, target)) {
            this.switchFormatBlockPannel = false;
            return;
        }
        if (this.switchCodePannel && !DomUtil.contains(<HTMLElement>this.$refs.code, target)) {
            this.switchCodePannel = false;
            return;
        }
    }

    /**
     * 全屏或取消全屏
     */
    SwitchScreen() {
        const editor: any = this.$refs.editor;
        const header: any = this.$refs.header;
        const pannel: any = this.$refs.pannel;
        const footer: any = this.$refs.footer;
        this.full = !this.full;
        if (this.full) { // 全屏
            editor.style.cssText = 'position:fixed;z-index:99999;top:0;left:0;transform:none;width:100%;height:100%;';
            pannel.style.cssText = `max-height:unset;height:${window.innerHeight - header.offsetHeight - footer.offsetHeight}px;`;
            document.body.appendChild(editor);
        } else {        // 还原
            editor.style.cssText = '';
            pannel.style.cssText = '';
            this.parent.appendChild(editor);
        }
    }

    /**
     * 执行封装的编辑命令
     * @param k 命令名称
     * @param ui 打开ui弹窗
     * @param v 设置命令值
     * @returns {boolean} true-设置成功，false-设置失败
     */
    cmd(k: string, ui: boolean, v?: any) {
        if (!this.isSupport(k)) {
            this.toast('系统不支持该命令~');
            return false;
        }
        const whiteList = 'insertHTML,paste,cut,copy,delete,selectAll,removeFormat,redo,undo,insertBrOnReturn';
        if (whiteList.indexOf(k) < 0 && this.isRangeInCode()) {
            this.toast('代码区内无法执行该命令~');
            return false;
        }
        const r = document.execCommand(k, ui, v || "");
        return r;
    }

    /**
     * 查询是否支持命令
     * @param cmd 命令
     */
    isSupport(cmd: string): boolean {
        return document.queryCommandSupported(cmd);
    }

    /**
     * 发射编辑内容
     */
    emitContent() {
        const editPannel = <any>this.pannel;
        // 检测编辑内容大小
        let innerHTML = this.getInnerHTML(editPannel.innerHTML);
        const image = DomUtil.getUrlsByTag(this.pannel, 'img');
        const audio = DomUtil.getUrlsByTag(this.pannel, 'audio');
        const video = DomUtil.getUrlsByTag(this.pannel, 'video');
        const obj = {
            innerHTML,
            innerTEXT: editPannel.innerText || editPannel.textContent,
            urls: { image, audio, video }
        };
        this.$emit('recieveContent', obj);
    }

    /**
     * 判断光标是否在代码区内
     * @returns {boolean} true - 在代码区内，false - 不在代码区内
     */
    isRangeInCode(): boolean {
        this.pannelFocus();
        const container = <any>CursorUtil.getRangeContainer();
        if (!container.end && !container.start) return false;
        if (!container.end.parentNode && !container.start.parentNode) return false;
        return container.end.parentNode.tagName === 'CODE' || container.start.parentNode.tagName === 'CODE' || container.end.parentNode.parentNode.tagName === 'CODE' || container.start.parentNode.parentNode.tagName === 'CODE';
    }

    /**
     * 输入时记住光变位置 && input事件发射value && 记住输入
     */
    setRangeAndEmitValue() {
        // 记住选区
        this.setRange();
        this.debounce(() => {
            let innerHTML = this.pannel.innerHTML;
            if (this.vhtml$ === innerHTML) return;
            // 有内容时才保存到本地
            const len = (this.pannel.innerText || this.pannel.textContent).length;
            if (len > 1) {
                window.localStorage.setItem('editor_input', innerHTML);
            }
            innerHTML = this.getInnerHTML(innerHTML);
            this.$emit('input', innerHTML);
        });
    }

    /**
     * 监听按键事件
     * @param e 按键事件
     */
    keydown(e: Event | any) {
        e = e || window.event;
        const key = e.keyCode || e.which || e.charCode;
        if (key != 9) {
            return;
        }
        // 按下tab键，增加缩进2个空格
        const tab = new Array(5).join('&nbsp;');
        this.cmd('insertHTML', false, tab)
        e.preventDefault();
        return;
    }

    /**
     * 点击面板
     */
    clickPannel() {
        // 如果有内容则不设置历史格式
        if (!this.pannel.innerText && !this.pannel.textContent){
            this.setHistoryFormat();
        }
        // 如果未聚焦则标记聚焦
        if (!this.isInEditStatus) {
            this.isInEditStatus = true;
        }
        this.setRange();
    }

    /**
     * input,click,selectionchange事件记录编辑面板光标位置
     */
    setRange() {
        this.range = CursorUtil.getRange(0, this.pannel);
    }

    /**
     * toast提示
     * @param  {string} text? toast提示 默认为‘设置无效~’
     */
    toast(text: string = '设置无效~') {
        TipComponent.showTip({ text });
    }

    /**
     * 弹窗
     * @param obj 
     */
    alert(obj: WindowOptions) {
        WindowComponent.showWindow(obj);
    }

    /**
     * 获取符合长度的innerHTML
     * @param  {string} innerHTML
     */
    private getInnerHTML(innerHTML: string) {
        let size = 0;
        for (let i = 0, len = innerHTML.length; i < len; i++) {
            const c = innerHTML.charCodeAt(i);
            if (c > 0 && c < 128) {
                size++;
            } else {
                size += 2;
            }
        }
        if (size > this.options$.maxsize) {
            this.toast('编辑内容超出大小~');
            innerHTML = innerHTML.substr(0, this.options$.maxsize);
        }
        return innerHTML;
    }

    /**
     * 防抖
     * @param  {Function} f 回调
     * @param  {number=3000} t 防抖时延
     */
    private debounce(f: Function, t: number = 3000) {
        const o = <any>this.debounce;
        clearTimeout(o.timer);
        o.timer = setTimeout(() => {
            f();
        }, t)
    }
}
