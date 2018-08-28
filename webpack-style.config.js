const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: './src/assets/css/common.css',
    output: {
        path: __dirname + "/static/assets/css",
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 100000,
                            name: '[name].[ext]',
                            useRelativePath: true,
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('common.css')
    ]
}
