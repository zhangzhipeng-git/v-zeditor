/*
 * @Author: your name
 * @Date: 2020-01-05 14:03:22
 * @LastEditTime : 2020-01-07 19:14:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\editor\ui-link\ui-link.ts
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
            '<a style="text-decoration:underline;" href="' +
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