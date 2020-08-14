/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\editor\_alert\tip\tip.ts
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: 通用工具类
 * Last Modified: Friday August 14th 2020 10:50:54 pm
 * Modified By: zzp
 * Copyright (c) 2020 ZXWORK
 */

/** 通用工具类 */
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
}