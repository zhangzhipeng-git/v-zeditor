/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 链接组件脚本
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:07:37 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

import Vue from 'vue';
import Component from 'vue-class-component';
import CheckBoxComponent from '../_form/checkbox/checkbox.vue';
import TipComponent from '../_alert/tip/tip';
@Component({
    components: {
        CheckBoxComponent
    }
})
export default class UILinkComponent extends Vue {
    /** 是否在新窗口打开 */
    checked: boolean = false;
    /** 标题 */
    title: string = '';
    /** url */
    url: string = 'https://';
    /** 内容 */
    content: string = '';

    constructor() {
        super();
    }

    private mounted(): void {
    }

    /**
     * 发射form
     */
    emitLinkHTML() {
        if (!/^(\/\/|https?:)\/\/.+/.test(this.url)) {
            TipComponent.showTip({
                text: "链接地址不规范"
            });
            return;
        }
        if (!this.content) {
            TipComponent.showTip({
                text: "请填写内容"
            });
            return;
        }
        let html =
            '<a href="' +
            this.url +
            '" ' +
            (this.checked ? 'target="_blank"' : "") +
            (this.title ? "title=" + this.title : "") +
            ">" +
            this.content +
            "</a>";
        if((<any>this.$attrs.handler).recieveLinkHTML(html)) {
            (<any>this.$parent).close();
        }
    }

}