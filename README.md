Mtl-js-webpack-template

English | [中文](README-zh.md)

A simple js Webpack template，build a front-end js app with Webpack.

## Development Environment

- Tool: Webstorm last versions
- step:
    - Import the project into Webstorm。
    - Webstorm "Settings" - "Tools" - "Operation when saving", check "Reorder code", "Run prettier" option "Reorder
      code", "Run prettier" option, you can automatically optimize the code style.

## Features

1.Very esay to use html+js+css build front-end Multi pages app.

2.Integrate commonly webpack loaders and plugins.

## Environment Support

Modern browser,like Chrome,Firefox,Edge last 2 versions.

## Usage

1. `git clone https://github.com/Srooter/Mtl-js-webpack-template.git` or download zip.

2. `yarn install`

3. `yarn start`

## Config

`.env` file

### `OUTPUT_PUBLIC_PATH`

- Description: output url path
- Type: `String`
- Default: ``
- Example：`http://www.xxx.com`

## Yarn Command

- `yarn start`: Start development environment.

- `yarn build`: Publish application.

- `yarn serve`: Test release application for Local http server.

- `yarn uncss`: Check css files unused styles and print to console.

- `yarn test`: Run unit test.

> `yarn uncss` Check src dir css files nused styles.

> `purgecss-webpack-plugin` Clean src (include vendor) dir css files unused styles.

## Reference

- [webpack](https://webpack.js.org/).

## License

The MIT License(http://opensource.org/licenses/MIT).
