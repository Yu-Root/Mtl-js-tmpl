Mtl-js-webpack-template

中文 | [English](README.md)

一个简单的 JavaScript webpack 模板，用于创建一个基于 webpack 的 JavaScript 前端应用。

## 开发环境

- 工具: Webstorm 最新版本
- 步骤:
    - 将项目导入Webstorm中。
    - Webstorm "设置" - "工具" - "保存时的操作"，勾选“重新排序代码”，“运行prettier”选项 “重新排序代码”，“运行prettier”选项，即可实现代码风格自动优化。

## 特征

1. 非常简单的使用 html+js+css 开发多页前端应用。
2. 集成了常用的 webpack 加载器与插件。

## 环境支持

现代浏览器，Chrome,Firefox,Edge的最新两个版本。

## 使用

1. `git clone https://github.com/Srooter/mtl-js-webpack-template.git` 或者下载zip。

2. `yarn install`

3. `yarn start`

## 配置

`.env` 文件

### `OUTPUT_PUBLIC_PATH`

- 描述: 输出url路径
- 类型: `String`
- 默认: ``
- 例子：`http://www.xxx.com`

## yarn命令

- `yarn start`: 启用开发环境。

- `yarn build`: 发布应用。

- `yarn uncss`: 检查css文件未使用的样式并打印在控制台。

- `yarn test`: 运行单元测试。

> `yarn uncss` 检查src目录的css文件未使用的样式。

> `purgecss-webpack-plugin` 清除src（包括第三方库）目录的css文件未使用的样式。

## 参考

- [webpack](https://webpack.js.org/).

## License

The MIT License(http://opensource.org/licenses/MIT).
