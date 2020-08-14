/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\webpack.config.pro.js
 * Created Date: Wednesday, August 5th 2020, 11:36:18 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: （生产）合并打包，js和css在一起 
 * Last Modified: Friday August 14th 2020 10:44:06 pm
 * Modified By: zzp
 * Copyright (c) 2020 ZXWORK
 */

const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        index: './editor/index.vue',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        library: 'ZEditor',   // 模块的名字
        libraryTarget: 'umd', // 通用模块定义规范，兼容root commonjs， amd
        umdNamedDefine: true  // 对umd中的amd模块进行命名，否则使用匿名的define
    },
    resolve: {
        extensions: ['.vue', '.ts', '.js']
    },
    externals: {
        'vue': 'commonjs vue',
        'vue-class-component': 'commonjs vue-class-component',
        'vue-property-decorator': 'commonjs vue-property-decorator'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 头部插入style标签样式
                    // MiniCssExtractPlugin.loader,  // 抽离css 
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.ts$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 清理目录
        new VueLoaderPlugin(), // vue-loader 1.5后都需要这个插件
        // new MiniCssExtractPlugin({
        // filename: '[name].css', // 同步
        // chunkFilename: '[id].css', // 异步
        // }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin({
            cache: true, // 是否缓存
            parallel: true, // 是否并行打包
            sourceMap: false,
            terserOptions: {
                compress: {
                    pure_funcs: ["console.log"]
                }
            }
        })],
    },
};