# ZEditor（Vue 版）

## Description

一款简单、小清新的编辑器

[在线演示](https://zhangzhipeng-git.github.io/v-zeditor/test/dist/index.html)  
[github](https://github.com/zhangzhipeng-git/v-zeditor)

## UI

![image](截图0.jpg)

![image](截图1.jpg)

## Install

```shell
npm install @bigbigbird/zeditor -S
```

## Quick Start

dist 目录是 js 和 css 捆绑在一起的  
part 目录是 js 和 css 分离的

```typescript
import Vue from 'vue';
import ZEditor from '@bigbigbird/zeditor';

Vue.component(ZEditor.name, ZEditor);
// or
@Component({
  components: {
    'z-editor': ZEditor,
  },
})
export default class NameComponent extends Vue {
  //...
}
```

```typescript
/** props-start */

// 默认没有提交按钮
hasBtn: boolean = false;

// 主题(r-粉红色，g-护眼绿，b-天空蓝，p-紫色)，默认没有主题
// 也可以在其父元素或祖先元素上添加类'r'|'g'|'b'|'p'
theme: 'r'|'g'|'b'|'p' = '';

// 参数配置，默认为下面这个
options: object = {
  // 编辑内容的最大字节数
  maxsize: 65535,
  image: {
    // 上传的最大图片或插入图片外链数量
    count: 5,
    // 小于指定字节数会进行base64编码
    base64: 60000
  },
  audio: {
    // 单次上传音频或插入音频外链的最大数量
    count: 1,
    // 小于指定字节数会进行base64编码
    base64: 0
  },
  video: {
    /** 单次上传视频或插入视频外链的最大数量 */
    count: 1,
    /** 小于指定字节数会进行base64编码 */
    base64: 0
  }
};

/** props-end */

/** events-start */

// 输入事件 @input="input($event)"
input(innerHTML: string) {
  //...
}

// 前提hasBtn传入true
// 点击提交按钮事件 @recieveContent="recieveContent($event)"
recieveContent(obj: {
  innerHTML: string,
  innerText: string,
  media: {
    image: { type: 'url'|'base64', src: string},
    audio: { type: 'url'|'base64', src: string},
    video: { type: 'url'|'base64', src: string},
  }
}) {
  console.log(obj);
}

// 文件上传事件 @uploadFile="uploadFile($event)"
uploadFile(obj: {
  type: 'image' | 'audio' | 'video', file: any, callback: (v: string | boolean, t?: number) => void
}) {
  const callback = obj.callback;
  // 关闭弹窗
  // 上传成功
  const src = 'http://www.example.com';
  callback(src);
  // 上传失败
  // callback(false);
  // 上传超时
  // const t = 3000; // 超时时间（单位ms）
  // callback(false, t);
}

/** events-end */
```

```html
<template>
  <z-editor
    v-model="innerHTML"
    :options="options"
    :hasBtn="false"
    :theme="g"
    @input="input($event)"
    @recieveContent="recieveContent($event)"
    @uploadFile="uploadFile($event)" />
</template>
```

## Problem

使用 v-model 时，如果需要重新传入 innerHTML，请设置一次 innerHTML 的值为''(空字符串)，因为内部需要记住选区的位置，所以当编辑区有值的时候，并不会重新输入并响应(但是会将输入值发射出去)，重新输入会导致之前的选区丢失。

```typescript
setInnerHTML(innerHTML: string) {
  this.innerHTML = '';
  this.$nextTick(() => {
    this.innerHTML = innerHTML;
  });
}
```

## Browser Support

PC 端标准浏览器和 IE9+.

## Security

在前端可以使用 xss 对 html 进行无害化处理  
在后端可以使用 jsoup 对 html 进行无害化处理

## Concat

QQ 交流群：486273737  
Name: 木懵の狗纸  
个人 QQ: 1029512956  
Email: 1029512956@qq.com
