const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  mode:"development",
  devtool: "cheap-module-source-map",
  entry: ["./src/index.js"],
  resolve: {
    extensions: ['.js','.jsx']
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test:/\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.jpg$|\.png/,
        use:{
          loader: "url-loader",
          options:{
            name:"[name]_[hash].[ext]",
            outputPath:"./images",
            limit:2048
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use:[
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "less-loader"},
          {loader: "postcss-loader", options: {}}
        ]
      }
    ]
  },
  plugins: [new htmlWebpackPlugin({template: "./src/index.html",title:"WebGL Test"}),new cleanWebpackPlugin(),new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase:"./dist",
    open:false,
    host:"127.0.0.1",
    port:"9000",
    hot:true
  }
};
