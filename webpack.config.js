var path               = require('path');
var webpack            = require('webpack');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin  = require("extract-text-webpack-plugin");
var UglifyJsPlugin     = webpack.optimize.UglifyJsPlugin;
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var config = {
    entry: {
        index: ['./src/pages/index/boot-loader.jsx'],
        common: ['react', 'react-dom'],
    },
    output: {
        path: path.resolve(__dirname, './dist/static/'),
        publicPath: '/static/',
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js',
        sourceMapFilename: '[file].[chunkhash].map'
    },
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, './utils'),
            '@component': path.resolve(__dirname, './src/components'),
        },
        modules: ["node_modules"],
        extensions: ['.web.js', '.js', '.es6', '.json', '.jsx']
    },
    cache: true,
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(es6|js|jsx)$/,
                exclude: /node_modules(?!\/webpack-dev-server)/,
                use: [{loader: 'babel-loader'}]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: "less-loader",
                            options: {
                                javascriptEnabled: true
                            }
                        },
                    ]
                })
            },
            {
                test: /\.less\.module$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        },
                        'less-loader'
                    ]
                })
            },
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', "manifest"],
            filename: `[name].js`,
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: "[name].min.[hash].css",
            disable: false,
            allChunks: true
        }),
        new CleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname)
        }),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            chunks: ["manifest", 'common', 'index'],
            filename: `index.html`,
            template:'./template.html'
        }),
        // new BundleAnalyzerPlugin(),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './html'),
        publicPath : '/static/',
        stats: { colors: true },
        historyApiFallback: true,
        disableHostCheck  : true,
        host   : '0.0.0.0',
        hot    : true,
        inline : true,
        port   : 8089,
    },
};

module.exports = config;

