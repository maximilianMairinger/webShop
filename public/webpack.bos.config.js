const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: "production",
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['postcss-loader'],
      }
    ]
  }
});
