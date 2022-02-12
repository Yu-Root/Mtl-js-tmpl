const path = require('path')
const fs = require('fs')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-style-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// 参考：https://github.com/motdotla/dotenv/
// Reference：https://github.com/motdotla/dotenv/
// 读取环境变量配置文件
require('dotenv').config()
const NODE_ENV = process.env.NODE_ENV !== 'production'
const OUTPUT_PUBLIC_PATH = process.env.OUTPUT_PUBLIC_PATH
// 打包路径。
const distPath = path.resolve(__dirname, 'dist')
// 读取动态读取views目录中html文件。
const pages = fs.readdirSync(path.resolve(__dirname, 'src/pages')).filter((fileName) => fileName.endsWith('.html'))

module.exports = {
  // 参考：https://webpack.js.org/configuration/entry-context/
  // Reference：https://webpack.js.org/configuration/entry-context/
  entry: {
    common: ['./src/js/common/common.js'],
    index: ['babel-polyfill', './src/js/pages/index.js'],
  },
  // 参考：https://webpack.js.org/configuration/output/
  // Reference：https://webpack.js.org/configuration/output/
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].bundle.[hash].js',
    path: distPath,
    publicPath: OUTPUT_PUBLIC_PATH ? OUTPUT_PUBLIC_PATH : '/',
    pathinfo: false,
    clean: true,
  },
  optimization: {
    // 参考：https://webpack.docschina.org/plugins/split-chunks-plugin/
    // Reference：https://webpack.docschina.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  // 参考：https://webpack.js.org/configuration/externals/
  // Reference：https://webpack.js.org/configuration/externals/
  externals: {
    // jquery: 'jQuery',
  },
  plugins: [
    // 参考：https://webpack.js.org/plugins/provide-plugin/
    // Reference：https://webpack.js.org/plugins/provide-plugin/
    new webpack.ProvidePlugin({
      // $: "jquery",
      // jQuery: "jquery",
    }),
    // 参考：https://webpack.js.org/plugins/html-webpack-plugin/
    // Reference：https://webpack.js.org/plugins/provide-plugin/
    // 动态读取views目录中html文件，创建多页应用。
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            'X-UA-Compatible': {
              'http-equiv': 'X-UA-Compatible',
              content: 'ie=edge',
            },
          },
          template: './src/pages/' + page,
          filename: page,
          chunks: ['common', page.replace('.html', '')],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
          inject: true,
        }),
    ),
    // 参考：https://github.com/FullHuman/purgecss-webpack-plugin/
    // Reference：https://github.com/FullHuman/purgecss-webpack-plugin/
    new PurgecssPlugin({
      paths: glob.sync(path.join(__dirname, 'src') + '/**/*', { nodir: true }),
      whitelist: ['html', 'body'],
      whitelistPatterns: ['html', 'body'],
      whitelistPatternsChildren: ['html', 'body'],
    }),
    // 参考：https://webpack.js.org/plugins/mini-css-extract-plugin/
    // Reference：https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: 'style/[name].[hash].style',
      chunkFilename: 'style/[id].[hash].style',
    }),
    // 参考：https://webpack.js.org/plugins/copy-webpack-plugin/
    // Reference：https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyPlugin({
      patterns: [{ from: 'src/favicon.ico', to: distPath }],
    }),
  ],
  // 参考：https://webpack.js.org/configuration/module/
  // Reference：https://webpack.js.org/configuration/module/
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: [
          // 参考：https://webpack.js.org/loaders/html-loader/
          // Reference：https://webpack.js.org/loaders/html-loader/
          {
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                    filter: () => false,
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 参考：https://webpack.js.org/loaders/thread-loader/
          // Reference：https://webpack.js.org/loaders/thread-loader/
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 50,
              workerNodeArgs: ['--max-old-space-size=1024'],
              poolRespawn: false,
              poolTimeout: 2000,
              poolParallelJobs: 50,
              name: 'my-pool',
            },
          },
          // 参考：https://webpack.js.org/loaders/babel-loader/
          // Reference：https://webpack.js.org/loaders/babel-loader/
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 参考：https://webpack.js.org/loaders/style-loader/
          // Reference：https://webpack.js.org/loaders/style-loader/
          NODE_ENV ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 参考：https://webpack.js.org/loaders/css-loader/
          // Reference：https://webpack.js.org/loaders/css-loader/
          {
            loader: 'style-loader',
            options: {
              sourceMap: NODE_ENV,
              importLoaders: 1,
            },
          },
          // 参考：https://webpack.js.org/loaders/postcss-loader/
          // Reference：https://webpack.js.org/loaders/postcss-loader/
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: (loader) => {
                  let postcssPgn = [
                    require('postcss-import')({ root: loader.resourcePath }),
                    require('postcss-preset-env')(),
                  ]
                  NODE_ENV && postcssPgn.push(require('cssnano')())
                  return postcssPgn
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          // 参考：https://webpack.js.org/loaders/url-loader/
          // Reference：https://webpack.js.org/loaders/url-loader/
          {
            loader: 'url-loader',
            options: {
              limit: 20480,
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader'],
      },
    ],
  },
}
