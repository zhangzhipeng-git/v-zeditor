/*
 * Project: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr
 * File: d:\ZX_WORK\FRONTEND\vue\nuxt-ssr\core\modules\components\commons\editor\util\Cursor.ts
 * Created Date: Tuesday, August 4th 2020, 7:59:26 pm
 * Author: 张志鹏
 * Contact: 1029512956@qq.com
 * Description: 光标操作工具类
 * Last Modified: Tuesday August 4th 2020 7:59:53 pm
 * Modified By: 张志鹏
 * Copyright (c) 2020 ZXWORK
 */
/** 旧标准Range对象（只列出常用的一些属性和方法） */
interface TextRange {
    htmlText: string;
    text: string;
    pasteHTML(html: string): void;
    collapse(isEnd: boolean): void;
    move(type: 'charactor', offset: number): void;
    moveEnd(type: 'charactor', offset: number): void;
    moveStart(type: 'charactor', offset: number): void;
    moveToElementText(node: HTMLElement | Node): void;
    select(): void;
    parentElement(): HTMLElement;
}
/**
 * 选区和范围工具类
 */
export default class CursorUtil {

    /**
     * 获取选区
     * @param  {HTMLElement} elem? 要聚焦的元素，如果已聚焦可不传
     * @returns Selection | TextRange
     */
    static getSelection(elem?: HTMLElement): Selection | TextRange {
        let selection;
        if (elem && document.activeElement !== elem) elem.focus();
        if (window.getSelection) {
            selection = window.getSelection();
        } else if (document.getSelection) {
            selection = document.getSelection();
        } else {
            selection = (<any>document).selection.createRange();
        }
        return selection;
    }


    /**
     * 设置第一个范围
     * @param  {Range|TextRange} range 范围
     */
    static setFirstRange(range: Range | TextRange) {
        const selection = this.getSelection();
        // 新标准
        if ((<any>selection).addRange) {
            (<Selection>selection).removeAllRanges();
            (<Selection>selection).addRange(<Range>range);
            return;
        }
        // 旧标准
        (<TextRange>selection) = <TextRange>range;
    }

    /**
     * 获取范围
     * @param  {number} index 范围下标
     * @param  {HTMLElement} elem? 要聚焦的元素，如果已聚焦可不传
     * @returns Range | TextRange 
     */
    static getRange(index: number, elem?: HTMLElement): Range | TextRange {
        const selection = this.getSelection(elem);
        if ((<Selection>selection).getRangeAt && (<Selection>selection).rangeCount) { // 新标准
            return (<Selection>selection).getRangeAt(index);
        } else { // 旧标准
            return (<TextRange>selection);
        }
    }

    /**
     * 选中元素elem的内容
     * @param  {HTMLElement} elem
     */
    static selectSelectionElementChilds(elem: HTMLElement) {
        if (!elem) {
            console.log('selectSelectionElementChilds no elem');
            return;
        }
        const selection = this.getSelection();
        if ((<any>selection).selectAllChildren) {
            (<Selection>selection).selectAllChildren(elem);
            return;
        }
        (<TextRange>selection).moveToElementText(elem);
        (<TextRange>selection).select();
    }

    /**
     * 选中元素elem的内容
     * @param  {HTMLElement} elem
     * @param {number} index ? 默认0 range下标
     */
    static selectRangeElementChilds(elem: HTMLElement, index: number = 0) {
        if (!elem) {
            console.log('selectRangeElementChilds no elem');
            return;
        }
        const range = this.getRange(index);
        if ((<any>range).selectNodeContents) {
            (<Range>range).selectNodeContents(elem);
            return;
        }
        (<TextRange>range).moveToElementText(elem);
        (<TextRange>range).select();
    }

    /**
     * 将范围设置到元素并折叠
     * @param  {HTMLElement} elem 元素，该元素可以是不可聚焦的元素
     * @param {boolean} isStart 是否折叠到开头
     * @param {number} index ? 默认0 range下标
     */
    static setRangeToElement(elem: HTMLElement, isStart: boolean, index: number = 0) {
        this.selectRangeElementChilds(elem, index);
        const range = this.getRange(index);
        // 新标准
        if ((<any>range).selectNodeContents) {
            (<Range>range).collapse(isStart);
            return;
        }
        // 旧标准
        (<TextRange>range).collapse(!isStart);
        (<TextRange>range).select();
    }

    /**
     * 设置选区到某个元素，并折叠
     * @param  {HTMLElement} elem 元素，该元素可以是不可聚焦的元素
     * @param {boolean} isStart 是否折叠到开头
     */
    static setSelectionToElement(elem: HTMLElement, isStart: boolean) {
        this.selectSelectionElementChilds(elem);
        const selection = this.getSelection();
        // 新标准
        if (isStart && (<any>selection).collapseToStart) {
            (<Selection>selection).collapseToStart();
            return;
        }
        if (!isStart && (<any>selection).collapseToEnd) {
            (<Selection>selection).collapseToEnd();
            return;
        }
        // 旧标准
        (<TextRange>selection).collapse(!isStart);
        (<TextRange>selection).select();
    }

    /** 
     * 获取选区的选中的文本
     * @returns string 选区文本
     */
    static getSelectionText(): string {
        const selection = this.getSelection();
        return (<Selection>selection).toString() || (<TextRange>selection).text;
    }
    /**
     * 获取下标为index的范围文本
     * @param  {number=0} index ? 范围下标，旧标准就只有一个
     * @returns string
     */
    static getRangeText(index: number = 0): string {
        const range = this.getRange(index);
        return (<Range>range).toString() || (<TextRange>range).text;
    }

    /**
     * 设置range的起始和结束位置相对于各自的容器的偏移量
     * @param  {number} s 起始偏移
     * @param  {number} e 尾部偏移
     * @param  {number=0} index？默认0， 范围下标，旧标准就一个
     */
    static setRangeOffset(s: number, e: number, index: number = 0) {
        let range = this.getRange(index);
        if ((<any>range).setEnd) {
            range = <Range>range;
            range.setStart(range.startContainer, s);
            range.setEnd(range.endContainer, e);
            return;
        }
        range = <TextRange>range;
        // 重置TextRange到头部
        range.collapse(false);
        range.select();
        range.moveEnd('charactor', e);
        range.moveStart('charactor', e);
        range.select();
    }

    /**
     * 设置选区的起始和结束位置相对于各自的容器的偏移量
     * @param  {number} s 起始位置偏移量
     * @param  {number} e? 结束位置偏移量
     */
    static setSelectionOffset(s: number, e?: number) {
        if (e === void 0) {
            e = s;
        }
        let selection = this.getSelection();
        if ((<any>selection).setBaseAndExtent) {
            selection = <Selection>selection;
            if (!selection.anchorNode || !selection.focusNode) {
                return;
            }
            selection.setBaseAndExtent(selection.anchorNode, s, selection.focusNode, e);
            return;
        }
        selection = <TextRange>selection;
        // 重置TextRange到头部
        selection.collapse(false);
        selection.select();
        selection.moveEnd('charactor', e);
        selection.moveStart('charactor', e);
        selection.select();
    }
    /**
     * 获取range的起始，结束位置节点
     * @param  {number=0} index 可选，默认第一个，旧标准就1个
     * @returns {start: Node, end: Node}
     */
    static getRangeContainer(index: number = 0): { start: Node, end: Node } {
        let range = this.getRange(index);
        // 新标准
        if ((<any>range).startContainer) {
            range = <Range>range;
            return { start: range.startContainer, end: range.endContainer }
        }
        // 旧标准
        range = <TextRange>range;
        const parent = range.parentElement();
        return { start: parent, end: parent }
    }
    /**
     *  获取range的起始，结束位置节点
     * @returns  {start: Node | null, end: Node | null}
     */
    static getSelectionContainer(): { start: Node | null, end: Node | null } {
        let selection = this.getSelection();
        // 新标准
        if ((<any>selection).getRangeAt) {
            selection = <Selection>selection;
            if (!selection.anchorNode || selection.focusNode) {
                return { start: null, end: null };
            }
            return { start: selection.anchorNode, end: selection.focusNode }
        }
        // 旧标准
        selection = <TextRange>selection;
        const parent = selection.parentElement();
        return { start: parent, end: parent }
    }
}