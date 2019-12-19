const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.join(__dirname),
    entry: {
        'app': './src/assets/js/app',
    },
    output: {
        path: path.join(__dirname, './src/assets/js'),
        publicPath: '/',
        filename: '[name].build.js'
    },
    watch: true,
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    mode: 'production'
};
