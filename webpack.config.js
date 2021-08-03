const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    fallback: { 
      "util": require.resolve("util/"),
    },
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'main',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new ZipPlugin({
      filename: 'lambda.zip',
    }),
  ],
  stats: {
    warnings: false
  },
};
