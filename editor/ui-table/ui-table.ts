/*
 * @Author: your name
 * @Date: 2020-01-05 20:21:46
 * @LastEditTime: 2020-03-13 22:27:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-ssr\components\commons\editor\ui-table\ui-table.ts
 */
import Vue from 'vue';
import Component from 'vue-class-component';
import TipComponent from '../_alert/tip/tip';

@Component
export default class UITableComponent extends Vue {
    /** 行数 */
    row: string = '2';
    /** 列数 */
    col: string = '2';
    constructor() {
        super();
    }

    emitTableHTML() {
        const reg = /[1-9]{1,2}/;
        if (!reg.test(this.row)) {
            TipComponent.showTip({
                text: "行数不合要求~"
            });
            return;
        }
        if (!reg.test(this.col)) {
            TipComponent.showTip({
                text: "列数不合要求~"
            });
            return;
        }
        let html = '<div><table style="width:100%"><tbody>';
        const r = Number(this.row);
        const c = Number(this.col);
        for (let i = 0; i < r; i++) {
            let tr = "<tr>";
            for (let j = 0; j < c; j++) {
                tr += "<td>" /* + input */ + "</td>";
            }
            html += tr + "</tr>";
        }
        html += "</tbody></table></div><p><br/></p>";
        if((<any>this.$attrs.handler).recieveTableHTML(html)) {
            (<any>this.$parent).close();
        }
    }
}