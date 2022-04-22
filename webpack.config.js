const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      './src/app.jsx'
    ]
  },
  module: {
    rules: [
      {
        test: (m) => { return /\.(js|jsx)$/.test(m) },
        exclude: (m) => { return /node_modules/.test(m) },
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: (m) => { return /\.css$/.test(m) },
        exclude: (m) => { return /node_modules/.test(m) },
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: (m) => { return /\.(png|jp(e*)g|svg)$/.test(m) },
        exclude: (m) => { return /node_modules/.test(m) },
        use: [{
          loader: 'url-loader',
          options: { 
            limit: 8000,
            name: 'images/[hash]-[name].[ext]'
          } 
        }]
      }
    ]
  },
  plugins: [

//    new HtmlWebpackPlugin({
//      title: 'Output Management',
//    })

  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  devServer: {
  contentBase: './dist',
  historyApiFallback: true,
  writeToDisk: true
  // no publicPath
}
};
