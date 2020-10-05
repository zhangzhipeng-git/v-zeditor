/*
 * Created Date: Thursday, August 13th 2020, 9:37:54 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 通用工具类
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:08:17 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

export default class CommonUtil {
    /**
     * 根据元素id找元素
     * @param id 元素id
     */
    static id(id: string) {
        return document.getElementById(id);
    }

    /**
     * 判断是否ie
     */
    static isIE() {
        return !!((<any>window).ActiveXObject || "ActiveXObject" in window);
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
     * rgb颜色串转以#开头的16进制颜色串
     * @param str rgb颜色串
     */
    static rgbToHex(str: string) {
        if (!str) { return ''; }
        if (str.charAt(0) === '#') { return str; }
        if (str.indexOf('rgb(') < 0) { return ''; }
        str = str.slice(4, -1);
        const arr = str.split(',');
        let str$ = '#';
        arr.forEach((num: string) => {
            let dimStr = Number(num).toString(16);
            dimStr = dimStr.length < 2 ? '0' + dimStr : dimStr;
            str$ += dimStr;
        });
        return str$;
    }

    /**
     * 将多维数组变为一维数组
     * @param arr 多维数组
     * @param box 容器
     */
    static flat(arr: Array<any>, box?: Array<any>) {
        if (!box) box = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            const e = arr[i];
            if (e instanceof Array) {
                this.flat(e, box);
                continue;
            }
            box.push(e);
        }
        return box;
    }
}