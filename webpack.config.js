let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let cleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname,'./src/js/main.js'),
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name]-[chunkhash].js'
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: __dirname + './node_modules/',
                include: __dirname + './src/'
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: 'index.html',
            filename:'index.html'
        }),
        new cleanWebpackPlugin(
            ['dist/js'],
            {
                verbose: false,
                dry: false,
                root: __dirname
            }
        )
    ]
}