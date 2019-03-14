const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: "production",
  output: {
    chunkFilename: 'dist/[name].[chunkHash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['postcss-loader'],
      }
    ]
  }
});
