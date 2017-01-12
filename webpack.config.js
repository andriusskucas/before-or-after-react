var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var resolveNpmPath = function (componentPath) {
    return path.resolve(path.join(__dirname, 'node_modules', componentPath));
};

var aliases = {
    'jquery': resolveNpmPath('jquery/dist/jquery')
};

module.exports = {
    context: path.resolve(__dirname, 'app/Resources/public'),
    resolve: {
        root: [
            __dirname,
            path.resolve(__dirname, 'app/Resources/public'),
        ],
        modulesDirectories: [
            path.join('app', 'Resources', 'public'),
            'node_modules'
        ],
        alias: aliases
    },

    entry: ['./bundle'],

    output: {
        path: path.resolve(__dirname, 'web/assets'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css') },
            { test: /\.s[a,c]ss/, loader: ExtractTextPlugin.extract('style-loader', 'css!sass') },
            { test: /\.js$/, loader: 'babel', include: path.resolve(__dirname, 'app/Resources/public') },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.(png|jpg)$/, loader: 'file-loader?name=img/[name].[ext]' },
        ]
    },

    sassLoader: {
        includePaths: [path.resolve(__dirname, 'node_modules')]
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 300
    }
};
