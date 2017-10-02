const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
};

const commonConfig = {
    entry: {
        app: './src/index.js',
        vendor: ['react', 'react-dom', 'react-router', 'reactfire', 'firebase', 'lodash', 'moment'],
    },
    output: {
        path: PATHS.dist,
        filename: '[name].[chunkhash].js',
        chunkFilename: 'chunk-[name]-[chunkhash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                include: PATHS.src,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/,
            },
            {
                test: /\.(jpg|png|svg|mp3|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new CleanWebpackPlugin([PATHS.dist]),
    ],
};

module.exports = (env) => {
    const config = env === 'production' ?
        commonConfig :
        commonConfig;

    // return merge([commonConfig, config].concat(pages));
    return config;
};
