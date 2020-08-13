/*
 * Project: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr
 * File: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr\core\modules\components\commons\editor\util\DomUtil.ts
 * Created Date: Sunday, August 2nd 2020, 6:40:26 pm
 * Author: 张志鹏
 * Contact: 1029512956@qq.com
 * Description: 通用工具类
 * Last Modified: Tuesday August 4th 2020 8:02:37 pm
 * Modified By: 张志鹏
 * Copyright (c) 2020 ZXWORK
 */
/** dom工具类 */
export default class CommonUtil {

    /**
     * 判断是否ie
     */
    static isIE() {
        return !!((<any>window).ActiveXObject || "ActiveXObject" in window);
    }

    /**
     * 根据id找元素
     * @param id id
     */
    static id(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    /**
     * 找元素的所有子节点
     * @param p 父元素
     */
    static getAllChilds(p: HTMLElement, arr: HTMLElement[] = []): HTMLElement[] {
        arr.push(p);
        if (!p.children || !p.children.length) return arr;
        Array.prototype.forEach.call(p.children, (child: HTMLElement) => {
            arr = this.getAllChilds(child, arr);
        });
        return arr;
    }

    /**
     * 判断p是否包含c
     * @param p 元素
     * @param c 元素
     */
    static contains(p: HTMLElement, c: HTMLElement): boolean {
        if (p.contains) { // firefox不支持
            return p.contains(c);
        }
        // 找p的所有子节点
        const childs = this.getAllChilds(p);
        for (let i = 0, len = childs.length; i < len; i++) {
            if (childs[i] === c) return true;
        }
        if (p === c) return true;
        return false;
    }

    /**
     * 从低层次往高层次找第index个父节点，没有则返回null
     * @param  {HTMLElement} el 目标元素
     * @param  {number=1} index 第index个父元素
     */
    static parent(el: HTMLElement, index: number = 1) {
        let count = index + 1;
        while (el && --count) {
            el = (<any>el.parentNode);
        }
        return el;
    }

    /**
     * 防抖
     * @param  {Function} f 回调
     * @param  {number=300} t? 防抖时延 默认300ms
     */
    static debounce(f: Function, t: number = 300) {
        const o = <any>this.debounce;
        clearTimeout(o.timer);
        o.timer = setTimeout(() => {
            f();
        }, t)
    }
}