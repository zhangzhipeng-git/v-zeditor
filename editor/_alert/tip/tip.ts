
/*
 * @Author: your name
 * @Date: 2020-01-02 18:33:55
 * @LastEditTime : 2020-01-09 20:17:27
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\alert\tip\tip.ts
 */
import Vue, { ComponentOptions } from 'vue';
import Component from 'vue-class-component';

@Component
export default class TipComponent extends Vue {
    /** active - true 执行进入动画，false 执行离开动画 */
    active: boolean = false;
    text: string = '';
    enter: number = 0;
    leave: number = 0;
    duration: number = 0;
    animation: string = 'scale';
    static instance: TipComponent;
    constructor(options?: ComponentOptions<any>) {
        super();
    }
    /**
     * 关闭弹窗
     */
    close() {
        // 离开
        const t1 = setTimeout(() => {
            clearTimeout(t1);
            this.active = false;
        }, this.enter + this.duration);
        // 彻底移除
        const t2 = setTimeout(() => {
            clearTimeout(t2);
            document.body.removeChild(this.$el);
        }, this.enter + this.duration + this.leave);
    }

    /**
     * 打开
     * @param options 配置参数
     */
    open(options?: Options) {
        options = Object.assign({ enter: 200, leave: 200, duration: 1500, text: '', animation: 'scale' }, options);
        this.text = (<any>options).text;
        this.enter = (<any>options).enter;
        this.leave = (<any>options).leave;
        this.duration = (<any>options).duration;
        this.animation = (<any>options).animation;
        document.body.appendChild(this.$el);
        // 延时激活，防止进入动画不生效
        const t = setTimeout(() => { clearTimeout(t); this.active = true; });
        // 非手动关闭，在指定时间后关闭
        if (this.duration !== -1 && this.duration !== Infinity) { this.close(); }
    }
    /**
     * 创建弹出式tip
     * @param tip 提示字符
     * @param duration? 持续时间ms 默认2000ms
     */
    static showTip(options: Options) {
        options = options || <any>{};
        const instance = TipComponent.instance;
        if (instance) {
            instance.open(options);
            return instance;
        }
        const el = document.createElement('div');
        // 覆盖this的参数
        const tip = new TipComponent({ el });
        tip.open(options);
        return tip;
    }
}

interface Options {
    /* 提示文字 */
    text?: string;
    /**
     * 动画名称
     * - trans1 从下往上（进入） -> 从下到上（离开）
     * - trans2 从下到上（进入） -> 从下往上（离开）
     * - scale  放大（进入） -> 从下到上（离开）缩小
     */
    animation?: string;
    /** 停留时间 */
    duration?: number;
    /** 进入过渡时间 */
    enter?: number;
    /** 离开过渡时间 */
    leave?: number;
}