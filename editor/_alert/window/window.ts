/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 弹窗组件脚本
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:05:46 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';
import {Ref} from 'vue-property-decorator';
/**
 * window组件（弹出层的一种）
 *
 * 可以通过调用静态方法showWindow弹出该组件，
 */
@Component
export default class WindowComponent extends Vue {
    /** 是否进入停留状态 */
    active: boolean = false;
    /** 缩小状态 */
    min = true;
    /** 弹出层引用 */
    @Ref('window') window: any;

    [key: string]: any;

    constructor(options: ComponentOptions<any> | any) {
        super();
    }

    /**
     * 放大缩小
     * @param e 点击事件
     */
    switchSize(e: any) {
        if (this.min) { // 当前状态为缩小，点击放大
            this.window.style.cssText = 'height:100%;width:100%;top:0;left:0;';
            this.min = false;
            const maximize = this.callback.maximize;
            maximize && maximize();
        } else { // 当前状态为放大，点击缩小
            this.window.style.cssText = this.window._minStyle;
            this.min = true;
            const minimize = this.callback.minimize;
            minimize && minimize();
        }
    }

    /**
     * 点击关闭弹窗
     * @param e 事件
     */
    close(e: any) {
        // 设置关闭时的渐变
        // 将行内top样式消除（优先级最高会覆盖css文件中的top样式），使css中离开时的top样式生效，否则css类trans1和trans2的离开渐变不生效
        this.window.style.cssText = this.window.style.cssText.replace(/top:(.*)?;/,'');
        this.window.style.transition = 'all ' + this.leave / 1000 + 's';
        this.active = false;
        (<any>this.$refs.mask).style.display = 'none';
        // 移除
        setTimeout(() => {
            document.body.removeChild(this.$el);
            this.$destroy();
            const close = this.callback.close;
            close && close(e);

        }, this.leave)
    }

    /**
     * 打开弹窗
     */
    open() {
        (<any>this.$refs.mask).style.display = 'block';
        document.body.appendChild(this.$el);
        // 左右居中，top用css控制
        const w = this.window.offsetWidth;
        const h = this.window.offsetHeight;
        // 当前窗口大小，this.window.parentNode => position:fixed;height:100%;width:100%
        const ww = this.window.parentNode.offsetWidth;
        // 初始定位
        const leftStyle = 'left:' + ((ww - w) / 2) + 'px;';
        this.window.style.cssText += leftStyle;
        // 记录最小化时的样式
        this.window._minStyle = leftStyle + 'width:' + (w + 1) + 'px;height:' + (h + 1) + 'px;';
        // 设置打开时的渐变
        this.window.style.transition = 'all ' + this.enter / 1000 + 's';
        // 进入激活状态，添加静止时类
        setTimeout(() => this.active = true);
        // 取消渐变，否则移动会有渐变
        setTimeout(() => {
            this.window.style.transition = 'none';
        }, this.enter)
    }
    /**
     * 阻止拖拽
     * @param e 拖拽事件
     */
    tragstart(e: any) {
        e.stopPropagation();
        e.preventDefault();
        e.returnValue = false;
    }
    /**
     * 开始移动
     * @param e 事件
     */
    start(e: any) {
        // 全屏状态不可移动
        if (!this.min) return;
        // 移动参数传入false，不可移动
        if (!this.isMove) return;
        const point = {
            x: e.pageX || e.clientX,
            y: e.pageY || e.clientY
        }
        const dis = {
            x: this.window.offsetLeft - point.x,
            y: this.window.offsetTop - point.y
        }
        this.window._dis = dis;
        // 浏览器窗体
        window.onmouseup = this.end;
        window.onmousemove = this.move;
    }
    /**
     * 移动
     * @param e 事件
     */
    move(e: any) {
        const point = {
            x: e.pageX || e.clientX,
            y: e.pageY || e.clientY
        };
        let top = point.y + this.window._dis.y;
        let left = point.x + this.window._dis.x;
        // 当前窗口大小，this.window.parentNode => position:fixed;height:100%;width:100%
        let maxx = this.window.parentNode.clientWidth - this.window.offsetWidth;
        let maxy = this.window.parentNode.clientHeight - this.window.offsetHeight;
        if(maxx<0)maxx=0;
        if(maxy<0)maxy=0;
        // 判断是否越界
        if (top <= 0) { // y方向
            top = 0;
        } else if (top >= maxy) {
            top = maxy;
        }
        if (left <= 0) { // x方向
            left = 0;
        } else if (left >= maxx) {
            left = maxx-1; //消除误差，防止右拉过度导致宽度变小
        }
        this.window.style.top = top + 'px';
        this.window.style.left = left + 'px';
    }
    /**
     * 停止移动
     * @param e 事件
     */
    end(e: any) {
        window.onmouseup = null;
        window.onmousemove = null;
    }
    /**
     * 弹出pop式弹窗
     * @param options 配置参数
     * @return WindowComponent
     */
    static showWindow(options?: WindowOptions): WindowComponent {
        options = options || <any>{};
        // 默认参数
        const o: any = {
            title: '弹窗',
            animation: 'trans1',
            enter: 200,
            leave: 200,
            isScale: false,
            isMove:true,
            content: '什么也木有~',
            callback: {},
            theme: ''
        }
        Object.assign(o, options);
        const el = document.createElement('div');
        const $options: any = { el, data: o };
        // “投影”内容，默认传入字符串-'什么也没有~'
        const content = o.content;
        if (typeof content === 'function') { // 如果传入组件类
            $options.data.handler = o.handler || {}; // 宿主组件引用
            $options.components = { child: content }; // 组件
        }
        const window = new WindowComponent($options);
        // 进入
        window.open();
        return window;
    }
}

export interface WindowOptions {
    /** 弹窗标题 */
    title?: string;
    /**
     * 动画名称
     * - trans1 从下往上（进入） -> 从下到上（离开）
     * - trans2 从下到上（进入） -> 从下往上（离开）
     * - scale  放大（进入） -> 从下到上（离开）缩小
     */
    animation?: string;
    /** 进入过渡时间 */
    enter?: number;
    /** 离开过渡时间 */
    leave?: number;
    /** 回调 */
    callback?: WindowCallback;
    /** html | 子组件 被ts-loader编译后的 */
    content?: string | Function;
    /** 窗体是否可放大缩小 */
    isScale?: boolean;
    /** 是否可移动 */
    isMove?:boolean;
    /**
     * vue实例句柄 , content组件可通过$attrs.handler拿到这个句柄
     */
    handler?: Vue;
    /** 主题 r g b p*/
    theme?: string;
}

/** 回调 */
export interface WindowCallback {
    /** 关闭回调 */
    close?: Function;
    /** 最小化回调 */
    minimize?: Function;
    /** 最大化回调 */
    maximize?: Function;
}
