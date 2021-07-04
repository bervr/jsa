const path = require('path');
const fs = require('fs')
const HtmlWebpackPlagin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');





module.exports = {
    context: path.resolve(__dirname, './'),
    entry: {
        main: ["@babel/polyfill", "./src/public/index.js"]
    },
    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: "/",
        filename: "js/[name].js",
    },
    target: 'web',
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(?:ico|png|jpg|jpeg|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]

    },
    plugins: [
        new HtmlWebpackPlagin({
            template: 'src/public/index.html',
            filename: 'index.html',
            excludeChunks: ['server']
        }),
        new HtmlWebpackPlagin({
            template: 'src/public/contact.html',
            filename: 'contact.html',
            excludeChunks: ['server']
        }),

        // наверное можно как-то все файлы пакетно перебирать и добавлять в них все что надо но я туплю
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
                    }// в правилах модулей была долгая война  в попытке выгрузить  
                    //нормально картинки при сборке с помощью лоадеров (там с svg в статике не получается),
                    // но в итоге так
                ]
            }),

    ]
};