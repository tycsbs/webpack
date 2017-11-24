let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');
let extractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: path.resolve(__dirname + 'node_modules'),
            include: path.resolve(__dirname + 'src')
        }, {
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader'
            }),
            exclude: path.resolve(__dirname + 'node_modules')
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
        new extractTextPlugin('css/[name].css')
    ]
}