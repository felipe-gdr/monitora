const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: ['react', 'react-dom', 'react-router', 'reactfire', 'firebase', 'lodash', 'moment']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: "chunk-[name]-[chunkhash].js"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
            presets: ['react']
        }
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
        {
        test: /\.(jpg|png|svg|mp3|ico)$/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[hash].[ext]',
        },
        },    
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};
