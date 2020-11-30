const iCrushLoaderPlugin = require('icrush-loader-plug');

module.exports = {
    entry: ['./src/entry.js'],
    output: {
        path: __dirname,
        filename: 'dist/debug-phone.min.js'
    },
    module: {
        rules: [{
            test: /\.iCrush$/,
            loader: ['icrush-loader'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ['./icrush-style-loader/index.js', 'css-loader', 'postcss-loader']
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|jpeg|gif|bmp)$/,
            loader: [{
                loader: "url-loader",
                options: {
                    name: "build/[name].[ext]",
                    context: "src/asset",
                    limit: 500000000
                }
            }]
        }]
    },
    plugins: [
        new iCrushLoaderPlugin()
    ]
};
