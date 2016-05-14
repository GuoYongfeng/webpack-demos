
var webpack = require('webpack');

// console.log(webpack);
//
// webpack.optimize
// webpack.DefinePlugin()
//

function rewriteUrl(replacePath) {
  return function (req, opt) {
    var queryIndex = req.url.indexOf('?');
    var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";

    req.url = req.path.replace(opt.path, replacePath) + query;
    console.log("rewriting ", req.originalUrl, req.url);
  };
}

// 引用这个plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel'
        },
        {
          test: /\.css/,
          loader: 'style!css'
        }
      ]
    },
    resolve: {
      extension: ['', '.js', '.jsx', '.css'],
      alias: { }
    },
    devtool: 'cheap-module-source-map',
    devServer: {
      progress: true,
      contentBase: 'public',
      stats: { colors: true},
      publicPath: '/static/',
      proxy: [
          {
            path: /^\/api\/(.*)/,
            target: "http://localhost:8080/",
            rewrite: rewriteUrl('/$1\.json'),
            changeOrigin: true
          }
      ]
    },
    plugins: [
          new HtmlWebpackPlugin({
            title: 'zhufeng-react',
            template: './src/index.html'
          })
    ]

}
