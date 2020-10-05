/*
 * Created Date: Saturday, August 8th 2020, 6:58:46 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 编辑器组件脚本
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:08:40 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

import Vue from 'vue';
import { Prop, Model, Ref, Watch } from 'vue-property-decorator';
import Component from 'vue-class-component';
import TipComponent from './_alert/tip/tip';            // 提示弹窗
import WindowComponent, { WindowOptions } from './_alert/window/window';   // 窗体弹窗
import UILink from './ui-link/ui-link.vue';             // 超链接UI组件
import UITable from './ui-table/ui-table.vue';          // 表格UI组件
import UIAnnex from './ui-annex/ui-annex.vue';          // 附件UI组件
import CommonUtil from './util/CommonUtil';                   // dom工具类
import CursorUtil from './util/CursorUtil';             // 光标工具类
/** 编辑器配置参数 */
interface Options {
    /** 编辑内容的最大字节数 */
    maxsize: number;
    /** 上传超时 ms */
    timeout: number;
    /** 上传图片的配置参数 */
    image: {
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

@Component
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
    fontFamilys = [{ key: 'arial', value: 'arial' }, { key: '微软雅黑', value: 'Microsoft Yahei' }, { key: '宋体', value: 'SimSun' }, { key: '黑体', value: 'SimHei' }, { key: '楷体', value: 'KaiTi' }, { key: '宋体', value: 'SimSun' }, { key: '新宋体', value: 'NSimSun' }, { key: '仿宋', value: 'FangSong' }, { key: '微软正黑体', value: 'Microsoft JhengHei' }, { key: '华文琥珀', value: 'STHupo' }, { key: '华文彩云', value: 'STCaiyun' }, { key: '幼圆', value: 'YouYuan' }, { key: '华文行楷', value: 'STXingkai' }];
    /** 文本格式 */
    formatBlocks = [{ key: 'p', value: `<p data-index='0'>p</p>` }, { key: 'h6', value: `<h6 data-index='1'>h6</h6>` }, { key: 'h5', value: `<h5 data-index='2'>h5</h5>` }, { key: 'h4', value: `<h4 data-index='3'>h4</h4>` }, { key: 'h3', value: `<h3 data-index='4'>h3</h3>` }, { key: 'h2', value: `<h2 data-index='5'>h2</h2>` }, { key: 'h1', value: `<h1 data-index='6'>h1</h1>` }];
    /** 颜色 */
    colors = [['#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646'], ['#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada'], ['#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5'], ['#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#92cddc', '#fac08f'], ['#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#31859b', '#e36c09'], ['#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#205867', '#974806'], ['#c00000', '#ff0000', '#ffc000', '#ffff00', '#92d050', '#00b050', '#00b0f0', '#0070c0', '#002060', '#7030a0']];
    /** 字体大小 */
    fontSizes = [{ key: 'x-small', value: '1', value$: 10 / 16 }, { key: 'small', value: '2', value$: 12 / 16 }, { key: 'medium', value: '3', value$: 16 / 16 }, { key: 'large', value: '4', value$: 18 / 16 }, { key: 'x-large', value: '5', value$: 24 / 16 }, { key: 'xx-large', value: '6', value$: 32 / 16 }, { key: 'xxx-large', value: '7', value$: 48 / 16 }];
    /** code */
    codes = ['Html', 'Css', 'Javascript', 'TypeScript', 'Sass', 'Java', 'Xml', 'Sql', 'Shell'];
    /** 选中的字样 */
    fontFamily: { key: string, value: string } = { key: '微软雅黑', value: 'Microsoft Yahei' };
    /** 选中的字号 */
    fontSize: any = { key: 'small', value: 2, value$: 12 / 16 }; // 默认.75rem;
    /** 文本格式 */
    formatBlock = 'p';
    /** 字体颜色 */
    foreColor = 'black';
    /** 高亮色 */
    backColor = 'white';
    /** 当前代码语言 */
    code = 'Javascript';
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
    /** 是否加粗 */
    isBold: boolean = false;
    /** 是否斜体 */
    isItalic: boolean = false;
    /** 是否下划线 */
    isUnderline: boolean = false;
    /** 是否删除线 */
    isStrikeThrough: boolean = false;
    /** 默认无上下标 */
    scriptActive: string = '';
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
        return Object.assign({ maxsize: 65535, timeout: 10000, image: { count: 5, base64: 60000 }, audio: { count: 1 }, video: { count: 1 } }, this.options);
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
        isBold: false,
        isItalic: false,
        isUnderline: false,
        isStrikeThrough: false,
        scriptActive: '',
        formatBlock: 'p',
        foreColor: '#000000',
        backColor: '#ffffff',
        justifyActive: 'justifyLeft',
        fontSize: { key: 'small', value: '2', value$: '' },
        fontFamily: { key: '微软雅黑', value: 'Microsoft Yahei' }
    }
    /** 是否再代码区, 默认false */
    inCode: boolean = false;

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
     * 设置字样
     * @param e 事件
     */
    setFontName(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const index = t.getAttribute('data-index');
        this.switchFontFamilyPannel = !this.switchFontFamilyPannel;
        if (index === null || index === undefined) return;
        this.fontFamily = this.fontFamilys[index * 1];
        this.cmd('fontName', false, this.fontFamily.value);
    }

    /**
     * 设置字号
     */
    setFontSize(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const index = t.getAttribute('data-index');
        this.switchFontSizePannel = !this.switchFontSizePannel;
        if (index === null || index === undefined) return;
        const fontSize = this.fontSizes[index * 1];
        this.fontSize = fontSize;
        this.cmd('fontSize', false, fontSize.value);
    }

    /**
     * 设置文本格式
     * @param e 事件
     */
    setFormatBlock(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const index = t.getAttribute('data-index');
        this.switchFormatBlockPannel = !this.switchFormatBlockPannel;
        if (index === null || index === undefined) return;
        const formatBlock = this.formatBlocks[index * 1];
        this.formatBlock = formatBlock.key;
        this.cmd('formatBlock', false, '<' + this.formatBlock + '>');
    }

    /**
     * 设置前景色
     * @param e 事件
     */
    setForeColor(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const x = t.getAttribute('data-dim1');
        const y = t.getAttribute('data-dim2');
        this.switchForeColorPannel = !this.switchForeColorPannel;
        if (x === null || y == null) return;
        this.foreColor = this.colors[x][y];
        this.cmd('foreColor', false, this.foreColor);
    }

    /**
     * 设置背景色(高亮色)
     * @param e 事件
     */
    setBackColor(e: any) {
        this.ensureFocus(e);
        const t = e.target;
        const x = t.getAttribute('data-dim1');
        const y = t.getAttribute('data-dim2');
        this.switchBackColorPannel = !this.switchBackColorPannel;
        if (x === null || y == null) return;
        this.backColor = this.colors[x][y];
        this.cmd('backColor', false, this.backColor);
    }

    /**
     * 设置代码语言
     * @param e 事件
     */
    insertCode(e: any) {
        this.ensureFocus(e);
        this.switchCodePannel = !this.switchCodePannel;
        const index = e.target.getAttribute('data-index');
        if (index === null) return;
        this.code = this.codes[index];
        const code = this.code.toLowerCase();
        const id = (Math.random() + '').slice(2, 8);
        const html = `<pre style="white-space:pre;" title="代码区"><code class="${code}"><p id="${id}"><br/></p></code></pre><p><br/></p>`;
        this.cmd('insertHTML', false, html);
        // 插入html后，将光标移至代码区的p标签中
        CursorUtil.setSelectionToElement(<any>(CommonUtil.id(id)), true);
        this.setRange(); // 手动记录一下光标位置
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
        this.cmd('bold', false, '');
        this.isBold = !this.isBold;
    }

    /**
     * 设置斜体
     */
    switchItalic(e: any) {
        this.ensureFocus(e);
        this.cmd('italic', false, '');
        this.isItalic = !this.isItalic;
    }

    /**
     * 设置下划线
     */
    switchUnderline(e: any) {
        this.ensureFocus(e);
        this.cmd('underline', false, '');
        this.isUnderline = !this.isUnderline;
    }

    /**
     * 设置删除线
     */
    switchStrikeThrough(e: any) {
        this.ensureFocus(e);
        this.cmd('strikeThrough', false, '');
        this.isStrikeThrough = !this.isStrikeThrough;
    }

    /**
     * 设置/取消上/下标
     */
    setScript(e: Event, cmd: 'superscript' | 'subscript') {
        this.ensureFocus(e);
        if (this.scriptActive === cmd) {
            this.cmd(cmd, false, '');
            this.scriptActive = '';
            return;
        }
        this.scriptActive = cmd;
        this.cmd(cmd, false, '');
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
        this.cmd('indent', false, '');
    }

    /**
     * 减少缩进
     */
    outdent(e: any) {
        this.ensureFocus(e);
        this.cmd('outdent', false, '');
    }

    /**
     * 插入有序列表
     */
    insertOrderedList(e: any) {
        this.ensureFocus(e);
        this.cmd('insertOrderedList', false, '');
    }

    /**
     * 插入无序列表
     */
    insertUnorderedList(e: any) {
        this.ensureFocus(e);
        this.cmd('insertUnorderedList', false, '');
    }

    /**
     * 插入表格调起插入表格UI
     */
    insertTable(e: any) {
        this.alert({ title: '插入表格', animation: 'scale', content: UITable, handler: this, theme: this.theme });
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
        this.alert({ title: '插入链接', animation: 'scale', content: UILink, handler: this, theme: this.theme });
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
        this.alert({ title: '插入文件', animation: 'scale', content: UIAnnex, handler: this, theme: this.theme });
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
    /**
     * 发射选择文件事件
     * @param  {'image'|'audio'|'video'} type 文件类型
     * @param  {any} file 文件
     * @param  {Function} parser 传入src获取html
     * @param  {Function} close  关闭弹窗和遮罩
     */
    emitUploadFile(type: 'image' | 'audio' | 'video', file: any, parser: Function, close: Function) {
        this.$emit('uploadFile', {
            type, file, callback: (src: string | boolean, t?: number) => {
                if (!!src) {
                    this.recieveFileLinkHTML(parser(src));
                }
                close(!!src, t);
            }
        });
    }

    /**
     * 插入hr
     */
    insertHorizontalRule(e: any) {
        this.ensureFocus(e);
        this.cmd('insertHorizontalRule', false, '');
    }

    /**
     * 粘贴
     */
    paste(e: any) {
        this.ensureFocus(e);
        this.cmd('paste', false, '');
    }

    /**
     * 剪切
     */
    cut(e: any) {
        this.ensureFocus(e);
        this.cmd('cut', false, '');
    }

    /**
     * 复制
     */
    copy(e: any) {
        this.ensureFocus(e);
        this.cmd('copy', false, '');
    }

    /**
     * 选中所有
     */
    selectAll(e: any) {
        this.ensureFocus(e);
        this.cmd('selectAll', false, '');
    }

    /**
     * 重做
     */
    redo(e: any) {
        this.ensureFocus(e);
        this.cmd('redo', false, '');
    }

    /**
     * 撤销
     */
    undo(e: any) {
        this.ensureFocus(e);
        this.cmd('undo', false, '');
    }

    /**
     * 删除选中
     */
    deleteSelect(e: any) {
        this.ensureFocus(e);
        this.cmd('delete', false, '');
    }

    /**
     * 获取历史输入
     */
    history() {
        this.vhtml$ = window.localStorage.getItem('editor_input') || '';
        this.autoActive();
    }

    /**
     * 清除格式，不阻止失焦，重新聚焦时会设置历史格式
     */
    removeFormat() {
        this.cmd('removeFormat', false);
        this.initFormatData();
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
     * 监听按键弹起事件
     * @param e 按键弹起事件
     */
    keyup(e: Event | any) {
        this.setRange();
        if (this.isRangeInCode()) { return; }
        e = e || window.event;
        const key = e.keyCode || e.which || e.charCode;
        // 监听home,end和上下左右按键，或后退键或删除键或enter键，设置激活文字格式
        if ((key >= 35 && key <= 40) || key === 8 || key === 46 || key === 13) {
            this.autoActive();
            return;
        }
    }

    /**
     * 点击面板
     */
    pannelOnClick() {
        this.initEdit();
        this.setRange();
        this.autoActive();
    }

    /**
     * 在编辑面板中粘贴（若在代码区内粘贴则清除格式！！！）
     */
    pannelOnPaste(e: any) {
        setTimeout(() => { this.autoActive(); });
        if (!this.isRangeInCode()) { return; }
        let obj = <any>CommonUtil.isIE() ? window : e;
        if (!obj.clipboardData) return;
        const text = obj.clipboardData.getData('text');
        const df = document.createDocumentFragment();
        df.appendChild(document.createTextNode(text));
        CursorUtil.insertNode(df);
        e.preventDefault();
        e.returnValue = false;
        this.setRangeAndEmitValue(0);
    }

    /**
     * 输入时记住光变位置 && input事件发射value && 记住输入
     * @param  arg0
     */
    setRangeAndEmitValue(arg0: number | Event) {
        if (typeof arg0 !== 'number') {
            arg0 = 300;
        }
        this.setRange();
        this.debounce(() => {
            const innerHTML = this.pannel.innerHTML;
            if (this.vhtml$ === innerHTML) return;
            // 有内容时才保存到本地
            const len = (this.pannel.innerText || this.pannel.textContent).length;
            if (len > 1) {
                window.localStorage.setItem('editor_input', innerHTML);
            }
            // 发射innerHTML
            this.$emit('input', innerHTML);
        }, arg0);
    }

    /**
     * 点击保存按钮发射编辑内容（如果有保存按钮）
     */
    emitContent() {
        let size = 0;
        const editPannel = <any>this.pannel;
        // 检测编辑内容大小
        let innerHTML: string = editPannel.innerHTML;
        for (let i = 0, len = innerHTML.length; i < len; i++) {
            const c = innerHTML.charCodeAt(i);
            if (c > 0 && c < 255) {
                size++;
            } else {
                size += 2;
            }
        }
        if (size > this.options$.maxsize) {
            this.toast('编辑内容超出大小~');
            innerHTML = innerHTML.substr(0, this.options$.maxsize);
        }
        const image = this.getUrlsByTag(this.pannel, 'img');
        const audio = this.getUrlsByTag(this.pannel, 'audio');
        const video = this.getUrlsByTag(this.pannel, 'video');
        const obj = {
            innerHTML,
            innerTEXT: editPannel.innerText || editPannel.textContent,
            urls: { image, audio, video }
        };
        this.$emit('recieveContent', obj);
    }

    /**
     * 隐藏各类下拉框
     * @param e 事件
     */
    hideSwitchPannel(e: any) {
        e = e || window.event;
        const target = e.target || e.srcElement;
        if (this.switchFontFamilyPannel && !CommonUtil.contains(<HTMLElement>this.$refs.fontName, target)) {
            this.switchFontFamilyPannel = false;
            return;
        }
        if (this.switchFontSizePannel && !CommonUtil.contains(<HTMLElement>this.$refs.fontSize, target)) {
            this.switchFontSizePannel = false;
            return;
        }
        if (this.switchForeColorPannel && !CommonUtil.contains(<HTMLElement>this.$refs.foreColor, target)) {
            this.switchForeColorPannel = false;
            return;
        }
        if (this.switchBackColorPannel && !CommonUtil.contains(<HTMLElement>this.$refs.backColor, target)) {
            this.switchBackColorPannel = false;
            return;
        }
        if (this.switchFormatBlockPannel && !CommonUtil.contains(<HTMLElement>this.$refs.formatBlock, target)) {
            this.switchFormatBlockPannel = false;
            return;
        }
        if (this.switchCodePannel && !CommonUtil.contains(<HTMLElement>this.$refs.code, target)) {
            this.switchCodePannel = false;
            return;
        }
    }

    /** 
     * 初始化默认格式 
     */
    private initFormatData() {
        Object.assign(this, EditorComponent.FORMAT);
    }

    /**
     * 如果面板不聚焦则使面板聚焦
     */
    private pannelFocus() {
        if (document.activeElement !== this.pannel) {
            this.pannel.focus();
        }
    }

    /**
     * 确保编辑面板聚焦，设置编辑面板上次光标为当前光标
     * @param e
     */
    private recoverRange() {
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
    private startEdit(recover: boolean = true) {
        // 恢复上次光标（点击编辑面板不需要恢复上次光标，点击编辑条需要恢复上次光标）
        if (recover) {
            this.recoverRange();
        }
        this.initEdit();
    }

    /**
     * 阻止默认事件防止失焦，确保编辑面板聚焦，设置历史光标和格式
     * @param e {Event} 事件对象
     */
    private ensureFocus(e: any) {
        // 阻止失焦
        e = e || window.event;
        e.preventDefault();
        // 编辑初始化
        this.startEdit();
    }

    /**
     * 编辑初始化
     */
    private initEdit() {
        // 在编辑状态不再次进行初始化
        if (this.isInEditStatus) {
            return;
        }
        // 标记面板处于编辑状态
        if (!this.isInEditStatus) {
            this.isInEditStatus = true;
        }
        // 在代码区不设置默认格式
        if (this.isRangeInCode()) {
            return;
        }
        // 如果光标周围有内容则不设置默认格式
        const el = CursorUtil.getRangeCommonParent();
        if (el.nodeType === 3) {
            return;
        }
        // 如果没有内容，则格式化默认格式
        if (!this.pannel.children || !this.pannel.children.length) {
            this.cmd('formatBlock', false, this.formatBlock);
            this.cmd('fontName', false, this.fontFamily.value);
            this.cmd('fontSize', false, this.fontSize.value);
        }
    }

    /**
     * input,click,selectionchange事件记录编辑面板光标位置
     */
    private setRange() {
        if (this.isRangeInCode()) {
            this.inCode = true;
        } else {
            this.inCode = false;
        }
        this.range = CursorUtil.getRange(0, this.pannel);
    }

    /**
     * 查询是否支持命令
     * @param cmd 命令
     */
    private isSupport(cmd: string): boolean {
        return document.queryCommandSupported(cmd);
    }

    /**
     * 兼容insertHTML命令
     * @param html html
     */
    private insertHTML(html: string) {
        const range = <Range>CursorUtil.getRange(0);
        range.deleteContents();
        const df = document.createDocumentFragment();
        let name = 'div';
        if (html.indexOf('<a>') > -1) { name = 'span'; }
        const el = document.createElement(name);
        el.innerHTML = html;
        df.appendChild(el);
        range.insertNode(df);
        return true;
    }

    /**
     * 执行封装的编辑命令
     * @param k 命令名称
     * @param ui 打开ui弹窗
     * @param v 设置命令值
     * @returns {boolean} true-设置成功，false-设置失败
     */
    private cmd(k: string, ui: boolean, v?: any) {
        if (!this.isSupport(k)) {
            if ('insertHTML' === k) { return this.insertHTML(v); }
            this.toast('系统不支持该命令~');
            return false;
        }
        const r = document.execCommand(k, ui, v || "");
        // 执行完以下命令后，非代码区内需要自动检测文字格式（样式）
        const blackList = 'redo,undo,delete,insertHTML,insertHorizontalRule,insertUnorderedList,insertOrderedList';
        if (r && blackList.indexOf(k) > -1 && !this.isRangeInCode()) {
            this.autoActive();
        }
        return r;
    }

    /**
     * 自动检测文字格式激活样式（加粗，斜体，下划线，删除线，上标，下标......）
     */
    private autoActive() {
        let p = <HTMLElement>(CursorUtil.getRangeCommonParent());
        if (!p) { return; }
        // 如果选取对象的节点是文本节点，则将p变为其父节点
        if (p.nodeName === '#text') { p = <HTMLElement>p.parentNode; }
        // 段落格式
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.cmd('formatBlock', false, 'p');
                this.formatBlock = EditorComponent.FORMAT.formatBlock;
                return true;
            }
            const formatBlock = e.nodeName;
            const formatBlock$ = this.formatBlocks.find((fb: any) => {
                return fb.key.toUpperCase() === formatBlock;
            });
            if (formatBlock$) {
                this.formatBlock = formatBlock$.key;
                return true;
            }
        });
        // 字样
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.fontFamily = EditorComponent.FORMAT.fontFamily;
                return true;
            }
            const fontFamily = e.getAttribute('face');
            if (!fontFamily) { return; }
            const fontFamily$ = this.fontFamilys.find((ff: any) => {
                return ff.value.toLowerCase() === fontFamily.toLowerCase();
            });
            if (fontFamily$) {
                this.fontFamily = fontFamily$;
                return true;
            }
        });
        // 字号
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.fontSize = EditorComponent.FORMAT.fontSize;
                return true;
            }
            const fontSize = e.getAttribute('size');
            if (!fontSize) { return; }
            const fontSize$ = this.fontSizes.find((fs: any) => {
                return fs.value === fontSize;
            });
            if (fontSize$) {
                this.fontSize = fontSize$;
                return true;
            }
        });
        // 前景色
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.foreColor = EditorComponent.FORMAT.foreColor;
                return true;
            }
            const foreColor = CommonUtil.rgbToHex(e.getAttribute('color') || '');
            const foreColor$ = CommonUtil.flat(this.colors).find((cr: any) => {
                return cr.toLowerCase() === foreColor.toLowerCase();
            });
            if (foreColor$) {
                this.foreColor = foreColor$;
                return true;
            }
        });
        // 背景色
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.backColor = EditorComponent.FORMAT.backColor;
                return true;
            }
            const backColor = CommonUtil.rgbToHex(e.style.backgroundColor || '');
            const backColor$ = CommonUtil.flat(this.colors).find((cr: any) => {
                return cr.toLowerCase() === backColor.toLowerCase();
            });
            if (backColor$) {
                this.backColor = backColor$;
                return true;
            }
        });
        // 加粗
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.isBold = EditorComponent.FORMAT.isBold;
                return true;
            }
            if (e.nodeName === 'STRONG' || e.nodeName === 'B') {
                return this.isBold = true;
            }
        });
        // 斜体
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.isItalic = EditorComponent.FORMAT.isItalic;
                return true;
            }
            if (e.nodeName === 'EM' || e.nodeName === 'I') {
                return this.isItalic = true;
            }
        });
        // 下划线
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.isUnderline = EditorComponent.FORMAT.isUnderline;
                return true;
            }
            if (e.nodeName === 'U') {
                return this.isUnderline = true;
            }
        });
        // 删除线
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.isStrikeThrough = EditorComponent.FORMAT.isStrikeThrough;
                return true;
            }
            if (e.nodeName === 'STRIKE') {
                return this.isStrikeThrough = true;
            }
        });
        // 上标，下标
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.scriptActive = EditorComponent.FORMAT.scriptActive;
                return true;
            }
            if (e.nodeName === 'SUP') {
                return this.scriptActive = 'superscript';
            }
            if (e.nodeName === 'SUB') {
                return this.scriptActive = 'subscript';
            }
        });
        // 对齐方式
        this.grandChildTograndParent(p, (e: HTMLElement) => {
            if (e === this.pannel) {
                this.justifyActive = EditorComponent.FORMAT.justifyActive;
                return true;
            }
            const textAlign = e.getAttribute('align') || e.style.textAlign;
            if (textAlign === 'left') {
                return this.justifyActive = 'justifyLeft';
            } else if (textAlign === 'center') {
                return this.justifyActive = 'justifyCenter';
            } else if (textAlign === 'right') {
                return this.justifyActive = 'justifyRight';
            } else if (textAlign === 'justify') {
                return this.justifyActive = 'justifyFull';
            }
        });
    }

    /**
     * 从最深层节点到最外层节点执行回调
     * @param start 最深层节点
     * @param end 最外层节点
     * @param fn 回调 直到回调返回true时才会终止回调的执行
     */
    private grandChildTograndParent(start: any, fn: any) {
        let o = start;
        while (!!o) {
            if (fn(o)) { return; }
            o = o.parentNode;
        }
    }

    /**
    * 找目标元素的的某个标签的urls和base64的url
    * @param target 元素
    * @param tag 标签
    */
    private getUrlsByTag(target: HTMLElement, tag: string): { type: 'url' | 'base64', src: string }[] {
        const arr = <any>[];
        const tags = target.getElementsByTagName(tag.toUpperCase());
        Array.prototype.forEach.call(tags, elem => {
            const item = <any>{};
            const src = elem.src;
            if (src.indexOf('data:image/png;base64,') === -1) {
                item.type = 'url';
            } else {
                item.type = 'base64';
            }
            item.src = src;
            arr.push(item);
        })
        return arr;
    }

    /**
     * 判断范围Range是否和代码区有交集
     * @returns {boolean} true - 有交集，false - 无交集
     */
    private isRangeInCode(): boolean {
        this.pannelFocus();
        let parent = <any>CursorUtil.getRangeCommonParent();
        if (!parent) return false;
        // 如果是文本节点则找其父元素
        if (parent.nodeType === 3) parent = parent.parentNode;
        return (() => { // 被包含
            let parent$ = parent;
            while (parent$ = parent$.parentNode) {
                if (parent$.tagName === 'CODE') {
                    return true;
                }
                if (parent$ === this.pannel) {
                    return false;
                }
            }
            return false;
        })() || (() => { // 包含
            const nodes = parent.querySelectorAll('code');
            return nodes && nodes.length;
        })();
    }

    /**
     * toast提示
     * @param  {string} text? toast提示 默认为‘设置无效~’
     * @param  {number} duration? 停留时间
     */
    private toast(text: string = '设置无效~', obj?: { duration: number, enter: number, leave: number }) {
        return TipComponent.showTip({ text, ...obj });
    }

    /**
     * 弹窗
     * @param obj 
     */
    private alert(obj: WindowOptions) {
        return WindowComponent.showWindow(obj);
    }

    /**
     * 防抖
     * @param  {Function} f 回调
     * @param  {number=300} t? 防抖时延 默认300ms
     */
    private debounce(f: Function, t: number = 300) {
        const o = <any>this.debounce;
        clearTimeout(o.timer);
        o.timer = setTimeout(() => {
            f();
        }, t)
    }
}
