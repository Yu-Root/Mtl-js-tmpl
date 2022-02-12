const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  // 参考：https://webpack.js.org/configuration/devtool/
  // Reference：https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',
  // 参考：https://webpack.js.org/configuration/dev-server/
  // Reference：https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    // 参考：https://webpack.js.org/plugins/hot-module-replacement-plugin/
    // Reference：https://webpack.js.org/plugins/hot-module-replacement-plugin/
    new webpack.HotModuleReplacementPlugin(),
  ],
})
