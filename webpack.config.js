const config = {
  entry: [
    './index.js',
  ],
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    fs: 'empty'
  }
};

module.exports = config;