/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 插入文件组件脚本
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:07:13 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */


import Vue from "vue";
import Component from "vue-class-component";
import { Radio } from "../_form/radio-group/radio-group";
import RadioGroupComponent from "../_form/radio-group/radio-group.vue";
import TipComponent from "../_alert/tip/tip"; // 提示弹窗
import { Watch } from "vue-property-decorator";
@Component({
    components: {
        RadioGroupComponent
    }
})
export default class UIAnnexComponent extends Vue {
    url: string = "https://";
    width: string = "100%";
    height: string = "auto";
    type: 'image' | 'audio' | 'video' = "image";
    /** 获取类型对应的名称 */
    typeName: string = '图片';
    /** 重渲染input file */
    rebuild: boolean = true;
    radioGroup: Radio[] = [{ value: "image", text: "图片" }, { value: "audio", text: "音频" }, { value: "video", text: "视频" }];
    /** 图片类型 */
    static IMAGEARR = ["image/gif", "image/jpeg", "image/jpg", "image/png", "image/svg"];
    static AUDIOARR = ["audio/mp3", "audio/ogg", "audio/wav"];
    static VIDEOARR = ["video/mp4", "video/ogg", "video/webm"];
    constructor() {
        super();
    }
    /**
     * 观测type变化
     * @param nv type的新值
     * @param ov type的旧值
     */
    @Watch('type')
    watchType(nv: any, ov: any) {
        if (nv === 'audio') {
            this.width = '300px';
            this.height = '30px';
            this.typeName = '音频';
        } else if (nv === 'video') {
            this.width = '400px';
            this.height = '200px';
            this.typeName = '视频';
        } else if (nv === 'image') {
            this.typeName = '图片';
        }
    }

    /**
     * 点击本地上传
     */
    selectFile() {
        // 需要先设置宽度和高度
        const num = /^[1-9]\d{1,3}(px|rem|em|vw|vh|%)?|auto|inherit|unset$/i;
        if (!num.test(this.width + "") || !num.test(this.height + "")) {
            TipComponent.showTip({
                text: `上传${this.typeName}前请填写合适的高度和宽度~`
            });
            return;
        }
        const file: any = this.$refs.file;
        const arr = {
            image: UIAnnexComponent.IMAGEARR,
            audio: UIAnnexComponent.AUDIOARR,
            video: UIAnnexComponent.VIDEOARR,
        }[this.type];
        file.accept = arr.join(",");
        if ('onchange' in file) {
            file.onchange = this.fileChange;
        } else {
            file.onpropertychange = this.fileChange;
        }
        file.click();
    }

    /**
     * 选择文件
     */
    fileChange() {
        const files = (<any>this.$refs.file).files;
        const file = files[0];
        if (!files.length) return;
        this.rebuild = false;
        setTimeout(() => {this.rebuild = true});
        // 编辑器实例
        const handler: any = this.$attrs.handler;
        // 获取编辑器banner配置参数
        const option = handler.options$[this.type] || {};
        // 标签
        const tag = { 'image': 'IMG', 'audio': 'AUDIO', 'video': 'VIDEO' }[this.type];
        // 判断文件是否超过数量
        if (handler.$refs.pannel.getElementsByTagName(tag).length >= (option.count || 1)) {
            TipComponent.showTip({
                text: `${this.typeName}已超出最大数量`
            });
            return;
        }
        // 判断文件是否需转成base64
        const base64size = option.base64 || 0;
        if (base64size && file.size <= base64size) {
            // 转成base64
            const fr = new FileReader();
            fr.readAsDataURL(file);
            fr.onload = (event: any) => {
                if (handler.recieveLocalFileHTML(this.getFileHTML(event.target.result))) {
                    (<any>this.$parent).close();
                }
            };
        } else {
            // 交给外部进行处理
            const tip: TipComponent = TipComponent.showTip({
                text: "上传中~",
                duration: -1
            });
            handler.emitUploadFile && handler.emitUploadFile(this.type, file, this.getFileHTML, (isSuccess: boolean, t?: number) => {
                if (isSuccess) { // 上传成功
                    tip.close();
                    (<any>this.$parent).close();
                    return;
                }
                if (!t) { // 上传失败
                    tip.close();
                    (<any>this.$parent).close();
                    tip.open({text: '上传失败~'});
                    return;
                }
                // 上传超时
                const timer = setTimeout(() => {
                    clearTimeout(timer);
                    tip.close();
                    (<any>this.$parent).close();
                    tip.open({text: '上传超时~'});
                }, t);
            });
        }
    }
    /**
     * 插入外链
     */
    insertOutLink() {
        const hasperc = /^[1-9]\d{1,3}(px|rem|em|vw|vh|%)?$/i;
        if (!hasperc.test(this.width)) {
            TipComponent.showTip({
                text: "请填写合适的宽度~"
            });
            return;
        }
        if (!hasperc.test(this.height)) {
            TipComponent.showTip({
                text: '请填写合适的高度~'
            });
            return;
        }
        if (!/^(\/\/|https?:)\/\/.+/.test(this.url)) {
            TipComponent.showTip({
                text: "链接地址不规范"
            });
            return;
        }
        const html = this.getFileHTML(this.url);
        if ((<any>this.$attrs.handler).recieveFileLinkHTML(html))
            (<any>this.$parent).close();
    }

    /**
     * 传入src并根据类型获取文件html
     * @param  {string} src
     */
    getFileHTML = (src: string) => {
        let html = '';
        switch (this.type) {
            case "image":
                html = this.getImageHTML(src);
                break;
            case "audio":
                html = this.getAudioHTML(src);
                break;
            case "video":
                html = this.getVideoHTML(src);
                break;
        }
        return html;
    }

    /**
     * 获取插入图片的HTML
     * @param src url或base64
     */
    getImageHTML(src: string) {
        return (
            '<p>' +
            '<img src="' +
            src +
            '" style="height:' +
            this.height +
            ';width:' +
            this.width +
            ';object-fit:cover;" />' +
            "</p><p><br/></p>"
        );
    }
    /**
     * 获取插入音频的HTML
     * @param src url
     */
    getAudioHTML(src: string) {
        const arr = UIAnnexComponent.AUDIOARR;
        let html = '<p><audio controls style="display:inline-block;height:' + this.height + ';width:' + this.width + ';">'
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Audio标签。';
        html += '</audio>&#8205;&zwj;</p><p><br/></p>';
        return html;
    }

    /**
    * 获取插入视频的HTML
    * @param src url
    */
    getVideoHTML(src: string) {
        const arr = UIAnnexComponent.VIDEOARR;
        let html = '<p><video controls style="display:inline-block;height:' + this.height + ';width:' + this.width + ';">'
        for (let i = 0, len = arr.length; i < len; i++) {
            html += '<source src="' + src + '" type="' + arr[i] + '">';
        }
        html += '您的浏览器不支持Video标签。';
        html += '</video>&#8205;&zwj;</p><p><br/></p>';
        return html;
    }
}
