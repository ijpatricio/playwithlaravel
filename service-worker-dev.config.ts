import path from 'path';
import webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.mjs$/,
                exclude: /node_modules/,
                use: {loader: "babel-loader"}
            },
        ]
    },
    entry: {'service-worker': './resources/service-worker/cgi-worker.mjs'},
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'cgi-worker.js',
    },
    target: ['webworker', 'es2020'],

    devtool: 'source-map'
};

export default config;
