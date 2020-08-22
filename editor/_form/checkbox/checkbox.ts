/*
 * Created Date: Wednesday, August 5th 2020, 11:37:19 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: 复选框组件脚本
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:06:19 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
 * Copyright (c) 2020 ZXWORK
 */

import Vue from "vue";
import Component from "vue-class-component";
import { Model, Prop, Emit } from "vue-property-decorator";

@Component({ data() { return { model: (<any>this)._model } } })
export default class CheckBoxComponent extends Vue {
    /** id */
    @Prop({ type: String, default: "" })
    id!: string;
    /** 是否禁用 */
    @Prop({ type: Boolean, default: false })
    disabled!: boolean;
    /** 双向绑定v */
    @Model("change") @Prop()
    _model!: Object[] | boolean;
    /** this._model */
    model!: Object[] | boolean;
    /** 默认不选中 */
    checked: boolean = false;
    /** 传入的attr value */  
    get value() {
        return this.$attrs.value;
    };


    constructor() {
        super();
    }

    mounted(): void {
        if (typeof this.model === "boolean") {
            // v-model传入布尔值
            this.checked = this.model;
        } else if (this.model instanceof Array) {
            // v-model传入数组
            if (!this.value) return;
            // 如果value在v-model中则默认选中
            if (this.model.indexOf(this.value) > -1) this.checked = true;
        }
    }

    /**
     * 发射
     * @param e 事件
     */
    @Emit("change")
    emitChange(e: any) {
        this.model = e.target.checked;
        const checked = e.target.checked;
        this.checked = checked;
        if (typeof this.model === 'boolean') {  // v-model传入的是布尔值
            return checked;
        }
        if (this.model instanceof Array) {      // v-model传入的是数组
            if (!this.value) return this.model;
            const i = this.model.indexOf(this.value);
            // 没选中时，v-model有value就剔除value
            if (!checked && i > -1) {
                this.model.splice(i, 1);
            }
            // 选中时，v-model中没有value就推入value
            if (checked && i < 0) {
                this.model.push(this.value);
            }
            return this.model;
        }
    }
}
