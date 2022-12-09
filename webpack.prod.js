// config
'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry:{
        index:'./src/index.js',
        search: './src/search.js'
    },
    output: {
        path:path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    module:{
        rules:[
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]

            },
            {
                test: /.less$/,
                use: [                     
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: [
                                        'last 2 version', '>1%','ios 7'
                                    ]
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                // use: 'file-loader'
                use: [
                    {
                        // loader:'url-loader',
                        loader:'file-loader',
                        options:{
                            // limit:10240
                            // 图片后缀
                            name: '[name]_[hash:8].[ext]'

                        }
                        
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                // use: 'file-loader'
                use: [
                    {
                        loader:'file-loader',
                        options:{
                            // 文字指纹
                            name: '[name]_[hash:8][ext]'

                        }
                        
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: '[name]_[contenthash:8].css'
            }
        ),
        new OptimizeCSSAssetsPlugin(
            {
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano')
            }
        ),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'),
            filename: 'search.html',
            chunks: ['search'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new CleanWebpackPlugin()
    ]
}