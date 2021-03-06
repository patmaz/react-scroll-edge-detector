var path = require('path');
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'cover 99.5%' }], '@babel/preset-typescript'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
  externals: {
    react: 'commonjs react',
  },
};
