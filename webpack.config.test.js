/*
 * Project: d:\ZX_WORK\MY_NPM\ZEditor
 * File: d:\ZX_WORK\MY_NPM\ZEditor\webpack.config.dev.js
 * Created Date: Friday, August 14th 2020, 9:29:00 pm
 * Author: zzp
 * Contact: 1029512956@qq.com
 * Description: 开发环境
 * Last Modified: Friday August 14th 2020 10:43:51 pm
 * Modified By: zzp
 * Copyright (c) 2020 ZXWORK
 */

const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        main: './test/main.ts',
    },
    output: {
        path: path.resolve(__dirname, 'test/dist'),
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.vue', '.ts', '.js']
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
                    'style-loader', 
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
        new HtmlWebpackPlugin({
            template: './test/index.html',  // 指定index.html模板位置
            filename: 'index.html'  ,       // 指定打包后文件名
            chunks: ['main']
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin({
            cache: true, // 是否缓存
            parallel: true, // 是否并行打包
            sourceMap: false,
            extractComments: false,
            terserOptions: {
                compress: {
                    pure_funcs: ["console.log"]
                }
            }
        })],
    },
};