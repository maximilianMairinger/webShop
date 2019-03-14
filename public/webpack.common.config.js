module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'dist/main.bundle.js',
    chunkFilename: 'dist/[name].js',
    path: __dirname
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
        }
      ]
    },
};
