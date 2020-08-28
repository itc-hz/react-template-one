const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const apiMocker = require('mocker-api');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
let NODE_ENV = process.env.NODE_ENV;

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: ['react-hot-loader/patch', './src/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '',
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.json', '.mjs', '.js', '.jsx'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '@': path.resolve(__dirname, 'src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [path.resolve(__dirname, 'src')],
                options: {}
            },
            {
                test: /\.(tsx|ts)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|pdf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 0,
                        name: 'font/[name].[ext]'
                    }
                }]
            }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 9002
        }),
      new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css',
            ignoreOrder: false,
        }),
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    optimization: {
        minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
        splitChunks: {
            chunks: 'initial',
            automaticNameDelimiter: '.',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `manifest.${entrypoint.name}`
        }
    },
    devServer: {
        hot: true,
        compress: true,
        historyApiFallback: {
            index: '/dist/index.html'
        },
        port: 9001,
        host: '0.0.0.0',
        stats: {colors: true},
        before(app) {
            apiMocker(app, path.resolve('./mocker/index.js'));
        },
        proxy: {
            '/meetingcloud': {
                target: 'http://0.0.0.0:8080/',
                // target: 'http://192.168.2.2:8888/',
                // target: 'http://localhost:8080/',
                changeOrigin: true,
                secure: false
            }
        },
        disableHostCheck: true
    }
};
