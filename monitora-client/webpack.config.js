const path = require('path');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
};

const commonConfig = merge([
    {
        entry: {
            app: PATHS.app,
        },
        output: {
            path: PATHS.dist,
            filename: '[name].[chunkhash].js',
            chunkFilename: 'chunk-[name]-[chunkhash].js',
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
    },
    parts.lintJavaScript({include: PATHS.app, exclude: /node_modules/}),
    parts.loadJavaScript({include: PATHS.app, exclude: /node_modules/}),
    parts.page({template: 'public/index.html'}),
]);

const productionConfig = merge([
    parts.clean(PATHS.dist),
    parts.loadResources({
        options: {
            limit: 15000,
            name: '[name].[hash:8].[ext]',
        },
    }),
    parts.extractCSS({
        use: ['css-loader'],
    }),
    parts.extractBundles([
        {
            name: 'vendor',
            minChunks: ({ resource }) => (
                resource &&
                resource.indexOf('node_modules') >= 0 &&
                resource.match(/\.jsx?$/)
            ),
        },
        {
            name: 'manifest',
            minChunks: Infinity,
        },
    ]),
    parts.generateSourceMaps({type: 'source-map'}),
    parts.minifyJavaScript(),
]);

const developmentConfig = merge([
    parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadCSS(),
    parts.loadResources(),
    parts.generateSourceMaps({type: 'cheap-module-eval-source-map'}),
]);

module.exports = (env) => {
    const config = env === 'production' ?
        productionConfig :
        developmentConfig;

    return merge([commonConfig, config]);
};
