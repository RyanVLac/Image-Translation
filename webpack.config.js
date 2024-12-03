const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    popup: './popup.js',
    content: './content.js',
    background: './background.js',
    offscreen: './offscreen.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', 
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/tesseract.js/dist/worker.min.js',
          to: 'tesseract/worker.min.js',
        },
        {
          from: 'node_modules/tesseract.js-core/tesseract-core.wasm.js',
          to: 'tesseract/tesseract-core.wasm.js',
        },
        {
          from: 'node_modules/tesseract.js-core/tesseract-core.wasm',
          to: 'tesseract/tesseract-core.wasm',
        },
        { from: 'popup.html', to: 'popup.html' },
        { from: 'offscreen.html', to: 'offscreen.html' },
        { from: 'background.js', to: 'background.js' },
        { from: 'manifest.json', to: 'manifest.json' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
    },
  },
  devtool: 'source-map',
};
