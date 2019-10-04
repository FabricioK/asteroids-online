const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HTMLInlineCSSWebpackPlugin(),    
    new NodemonPlugin(),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader?name=/public/icons/[name].[ext]",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  }
};