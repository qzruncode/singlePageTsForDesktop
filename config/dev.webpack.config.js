const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");

const publicPath = "/";
module.exports = {
    mode: "development", // development production none
    entry: {
        index: {
            import: ["/src/index.ts", "webpack-hot-middleware/client?path=/__yejiawei&timeout=10000&overlay=false&reload=true"],
            dependOn: 'shared' // 多入口重复导入代码的分割
        },
        common: {
            import: ["/src/common.ts", "webpack-hot-middleware/client?path=/__yejiawei&timeout=10000&overlay=false&reload=true"],
            dependOn: 'shared'
        },
        shared: 'lodash', // 指出那些在多入口中重复import代码需要共用，提取到shared.js中
    },
    optimization: {
        moduleIds: 'deterministic', // 替换自增的module.id，保证vendors.js的id更改，使用此配置 filename 的 contenthash 缓存功能才会生效
        runtimeChunk: 'single', // 单页面的多入口文件代码分割必须加此配置，将多入口的runtime文件放在一起
        // 在package.json文件中添加 "sideEffects": false 表示webpack可以移除所有 dead code
        /**
         * 必须将css文件排除，否则将会移除所有css文件
            "sideEffects": [
                "./src/some-side-effectful-file.js",
                "*.css"
            ]
         */
        usedExports: true, // 开启 tree shaking，移除dead code
        splitChunks: {
            chunks: 'all', // 分割所有通过import导入的模块和多入口文件模块
            cacheGroups: { // 将第三方库文件全部提取到vendors.js中
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        }
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: [ // 设置解析模块时要查找的路径
            "node_modules",
            path.resolve(__dirname, '../', 'src')
        ],
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].[contenthash].js", // 当内容发生改变 contenthash 就会变，必须将runtime代码提取出来才会生效
        publicPath: publicPath,
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            { test: /\.ts$/, enforce: 'pre', use: 'ts-loader', exclude: /node_modules/},
            { test: /\.txt$/, use: "raw-loader" },
            { test: /\.css$/i, use: ["style-loader", "css-loader"] },
            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
            { test: /\.(csv|tsv)$/i, use: ["csv-loader"] },
            { test: /\.xml$/i, use: ["xml-loader"] },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new CleanWebpackPlugin(), // 清空dist目录
        new webpack.HotModuleReplacementPlugin(), // 开启HMR，生产环境不能使用此配置，否则会产生没必要的文件名更新
        // new WebpackManifestPlugin(), // 生成原始文件和生成文件的映射清单
    ],
};
