const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

exports.devServer = ({ host, port }) => ({
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        host,
        port,
        overlay: {
            errors: true,
            warnings: false,
        },
    },
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include,
                exclude,
                enforce: 'pre',

                use: 'eslint-loader',
                options,
            },
        ],
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,
                loaders: ['style-loader', 'css-loader'],
            },
        ],
    },
});

exports.extractCSS = ({ include, exclude, use }) => {
    // Output extracted CSS to a file
    const plugin = new ExtractTextPlugin({
        filename: '[name].[contenthash:8].css',
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,
                    use: plugin.extract({
                        use,
                        fallback: 'style-loader',
                    }),
                },
            ],
        },
        plugins: [plugin],
    };
};

exports.loadResources = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg|mp3|ico)$/,
                include,
                exclude,

                use: {
                    loader: 'file-loader',
                    options,
                },
            },
        ],
    },
});

exports.loadJavaScript = ({ include, exclude }) => ({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include,
                exclude,

                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
        ],
    },
});

exports.extractBundles = (bundles) => ({
    plugins: bundles.map((bundle) => (
        new webpack.optimize.CommonsChunkPlugin(bundle)
    )),
});

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
});


exports.clean = (path) => ({
    plugins: [
        new CleanWebpackPlugin([path]),
    ],
});

exports.minifyJavaScript = () => ({
    plugins: [
        new UglifyPlugin({
            test: /\.jsx?$/,
        }),
    ],
});

exports.page = ({ template }) => ({
    plugins: [
        new HtmlWebpackPlugin({ template }),
    ],
});
