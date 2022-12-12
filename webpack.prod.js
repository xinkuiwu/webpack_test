// config
'use strict';

const path = require('path');
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const setMPA = () => {
    const entry = {};
    const HtmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))

    Object.keys(entryFiles).map((index)=> {
        const entryFile = entryFiles[index];

        const match = entryFile.match(/src\/(.*)\/index\.js/)
        const pageName = match && match[1]
        entry[pageName] = entryFile
        HtmlWebpackPlugins.push( new HtmlWebpackPlugin({
            template: path.join(__dirname, `src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: [pageName],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),)
    })

    
    return {
        entry,
        HtmlWebpackPlugins
    }
}

const {entry, HtmlWebpackPlugins} = setMPA()

module.exports = {
    entry:entry,
    output: {
        path:path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'none',
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
        new CleanWebpackPlugin()
    ].concat(HtmlWebpackPlugins),
    // source map
    devtool: 'inline-source-map'

}