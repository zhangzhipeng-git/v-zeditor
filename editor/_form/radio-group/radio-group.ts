/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 单选组组件脚本
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:06:42 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Model, Emit, Watch } from 'vue-property-decorator';

@Component({data(){return {vmodel: (<any>this).model}}})
export default class RadioGroupComponent extends Vue {
    /** v-model */
    @Prop()
    @Model('change')
    model: any;
    /** radio配置数组 */
    @Prop({type: Array, default: () => []})
    radioGroup!: Radio[];
    /** 当前点击的radio的下标  */
    activeIndex: number = -1;
    /** 获取id前缀 */
    get idPrefix() {
        return 'zx'+ (<any>this)._uid;
    }
    constructor() {
        super()
    }
    mounted() {
        for(let i = 0, len = this.radioGroup.length; i < len; i++) {
            if (this.radioGroup[i].value === this.model)
            this.activeIndex = i;
        }
    }
    /**
     * 发射chagne事件
     * @param v radio的value
     */
    @Emit('change')
    emitChange(v: any) {
        return v;
    }
    /**
     * 当前点击的radio激活
     * @param i 当前点击的radio的下标
     */
    getActiveIndex(i: number): void {
        this.activeIndex = i;
    }
}
/** 单个radio的配置 */
export interface Radio {
    /** value */
    value: any;
    /** disabled */
    disabled?: boolean;
    /** 描述 */
    text?: string;
}