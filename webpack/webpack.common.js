const webpack = require('webpack');

module.exports = {
  entry: {
    main: './client/index.js'
  }, 

  resolve: {
    extensions: [ '', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  //helps separate dependencies out of bundles if you have multiple entry points 
  // plugins: [
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: ['main']
  //   })
  // ],


  // this may have been deprecated and so may not be necessary anymore, or we find an alternative devtool
  devtool: 'source-map'

}