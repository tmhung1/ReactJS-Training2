const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//vendor caching
/* const devserver = {
    port : 4000,
    open : true
}; */

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: ['bootstrap', 'react', 'react-dom', 'redux' , 'jquery' , 'random-string' , 'react-redux']
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: '/node_modules/'
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            },
            {
                loader: 'file-loader',
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$|\.ico$/
            }
        ]
    },
    plugins: [
        //install jquery
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        //auto create teamplate html base on index.html and add on dist/vendor.js + dist/bundle.js
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    //optimize performance : splitChunks 
    optimization: {
        runtimeChunk: {
            name : 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
}