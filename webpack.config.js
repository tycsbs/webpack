let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');
let extractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new extractTextPlugin('css/[name]-one.css');
let extractLESS = new extractTextPlugin('css/[name]-two.css');
let extractSCSS = new extractTextPlugin('css/[name]-three.css');


let webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-[chunkhash].js'
    },
    devServer: {
        // hot: true,
        port: 3000,
        inline: true
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude: /node_modules/,
            use: extractCSS.extract([
                // { loader: "style-loader" },
                { loader: "css-loader", options: { importLoaders: 1 } },
                { loader: "postcss-loader" }
            ])
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: extractLESS.extract([
                // { loader: "style-loader" },
                { loader: "css-loader", options: { importLoaders: 1 } },
                { loader: "postcss-loader" },
                { loader: "less-loader" }
            ])
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: extractSCSS.extract([
                // { loader: "style-loader" },
                { loader: "css-loader", options: { importLoaders: 1 } },
                { loader: "postcss-loader" },
                { loader: "sass-loader" }
            ])
        }, {
            test: /\.js$/,
            use: [{ loader: "babel-loader" }],
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif|svg)$/i,
            exclude: /node_modules/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    outputPath: 'assets/',
                    // useRelativePath: true
                }
            }, {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor-[hash].min.js',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new cleanWebpackPlugin(
            ['dist'], {
                verbose: false,
                dry: false,
                root: __dirname
            }
        ),
        extractCSS,
        extractLESS,
        extractSCSS
        //new extractTextPlugin('css/build.css')
    ]
}