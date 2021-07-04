const path = require('path');
const HtmlWebpackPlagin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: ["@babel/polyfill", "./src/public/index.js"]
    },
    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: "/",
        filename: "js/[name].js"
    },
    target: 'web',
    devtool: "source-map",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: "html-loader",
            //             options: {
            //                 minimize: true
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(?:ico|png|jpg|jpeg|gif)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            publicPath: '/images/',
                            outputPath: 'images',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.(?:svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlagin({
            template: 'src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlagin({
            template: 'src/public/contact.html',
            filename: 'contact.html',
            excludeChunks: ['server']
        }),
        new CopyPlugin(
            {
                patterns: [
                    {
                        from: path.resolve(__dirname, './src/public/static'),
                        to: path.resolve(__dirname, 'dist/public/static/[name][ext]')
                    },
                    {
                        from: path.resolve(__dirname, './src/public/images'),
                        to: path.resolve(__dirname, 'dist/public/images/[name][ext]')
                    }
                ]
            }),]
};