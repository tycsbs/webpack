let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');
let extractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new extractTextPlugin('css/[name]-one.css');
let extractLESS = new extractTextPlugin('css/[name]-two.css');

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-[chunkhash].js'
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
            test: /\.js$/,
            use: [{ loader: "babel-loader" }],
            exclude: /node_modules/
        }]
    },
    plugins: [
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
        extractLESS
        //new extractTextPlugin('css/build.css')
    ]
}