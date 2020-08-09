/*
 * Project: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr
 * File: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr\core\modules\components\commons\editor\util\DomUtil.ts
 * Created Date: Sunday, August 2nd 2020, 6:40:26 pm
 * Author: 张志鹏
 * Contact: 1029512956@qq.com
 * Description: dom操作工具类
 * Last Modified: Tuesday August 4th 2020 8:02:37 pm
 * Modified By: 张志鹏
 * Copyright (c) 2020 ZXWORK
 */
/** dom工具类 */
export default class DomUtil {

    /**
     * 根据id找元素
     * @param id id
     */
    static id(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    /** 
     * 获取n的父节点
     * @param  {any} n 节点
     */
    static getPreNode(n: HTMLElement) {
        let pre = n.previousSibling;
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
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
    * 找目标元素的的某个标签的urls和base64的url
    * @param target 元素
    * @param tag 标签
    */
    static getUrlsByTag(target: HTMLElement, tag: string): {type: 'url'|'base64', src: string}[] {
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
}