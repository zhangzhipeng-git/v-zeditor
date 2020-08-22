/*
 * Created Date: Friday, August 14th 2020, 10:10:49 pm
 * Author: 木懵の狗纸
 * ---------------------------------------------------
 * Description: （生产）分开打包，js和css独立
 * ---------------------------------------------------
 * Last Modified: Saturday August 22nd 2020 7:58:02 pm
 * Modified By: 木懵の狗纸
 * Contact: 1029512956@qq.com
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
        path: path.resolve(__dirname, 'part'),
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
                    MiniCssExtractPlugin.loader, // 抽离css
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
        new MiniCssExtractPlugin({
            filename: '[name].min.css', // 同步
            // chunkFilename: '[id].css', // 异步
        }),
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