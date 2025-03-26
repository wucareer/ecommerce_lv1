const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'eshopUser.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'EshopUser',
            type: 'umd',
            export: 'default'
        }
    },
    module: {
        rules: [
        
            {
                test:/\.less$/i,
                use:[
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }

        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "eshopUser.css"
        })
    ]
}