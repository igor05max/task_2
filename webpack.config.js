const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
    entry: {
        about: './src/pages/About.js',
        home: './src/pages/Home.js',
    main: {
        dependOn: ['about', 'home'],
        import: './src/index.js',
    },
    },    
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        open: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", {runtime: "automatic"}],
                        ],
                    },
                },
                resolve: {extensions: [".js", ".jsx"]},
            },
            {
                test: /\.css$/i,
                exclude: /(node_modules)/,
                use: ['style-loader','css-loader'],
            },
        ],
    },
    target: 'web',
    resolve: {
      fallback: {
        'crypto': require.resolve('crypto'),
      },
      alias: {
        'crypto-browserify': path.resolve(__dirname, 'src/crypto-fallback.js'),
        'react-is': path.resolve(__dirname, 'node_modules/react-is/cjs/react-is.production.min.js')
      },
    },
    optimization: {
        minimize: true,
        emitOnErrors: true,
        concatenateModules: true,
        moduleIds: "size",
        mergeDuplicateChunks: true,
        runtimeChunk: "single",
        splitChunks: {
          chunks: "async",
        },
    },
};

module.exports = config;
