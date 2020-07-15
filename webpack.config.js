const path = require('path');
const webpack = require('webpack');

/**
 * PostCSS plugins
 */
const postCssCssNano = require('cssnano');
const postCssAutoprefixer = require('autoprefixer');
const postCssUrl = require('postcss-url');
const postCssPresetEnv = require('postcss-preset-env');
const postCssFlexBugsFixes = require('postcss-flexbugs-fixes');

/**
 * Webpack plugins
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

/**
 * Webpack server config
 */
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SERVER_HOST = 'localhost';
const SERVER_PORT = 3000;

/**
 * Webpack config variables
 */
const PATH_BASE = '/webpack/'
const PATH_ASSET = IS_PRODUCTION ? PATH_BASE : `http://${SERVER_HOST}:${SERVER_PORT}${PATH_BASE}`;
const PATH_SRC = path.resolve(__dirname, 'resources', 'webpack');
const PATH_BUILD = path.resolve(__dirname, 'public','webpack');
const PATH_PUBLIC = path.resolve(__dirname, 'public');

/**
 * Функция обработки файлов стилей
 *
 * @param {boolean} isLoadResources - флаг использования sass-resources-loader
 * @param {boolean} isSassSyntax - флаг использования синтаксиса sass
 * @returns {any[]}
 */
const styleLoader = (isLoadResources = true, isSassSyntax = true) => {
  const loaders = [
    {
      loader: ExtractCssChunks.loader,
      options: {
        hmr: !IS_PRODUCTION,
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: !IS_PRODUCTION,
      },
    }, {
      loader: 'postcss-loader',
      options: {
        sourceMap: !IS_PRODUCTION,
        plugins: ((() => {
          const plugins = [];
          plugins.push(
            postCssFlexBugsFixes(),
            postCssPresetEnv(),
            postCssUrl(),
            postCssAutoprefixer(),
          );
          if (IS_PRODUCTION) {
            plugins.push(
              postCssCssNano(),
            );
          }
          return plugins;
        })()),
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: !IS_PRODUCTION,
        indentedSyntax: isSassSyntax,
        includePaths: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(PATH_SRC),
        ],
      },
    },
  ];

  if (isLoadResources) {
    loaders.push({
      loader: 'sass-resources-loader',
      options: {
        sourceMap: !IS_PRODUCTION,
        resources: path.resolve(PATH_SRC, 'common', 'index.scss'),
      },
    });
  }

  return loaders;
};

/**
 * Config of Webpack
 */
const config = {
  mode: process.env.NODE_ENV,
  context: PATH_SRC,
  entry: {
    app: [path.resolve(PATH_SRC, 'index.js')],
  },
  output: {
    filename: 'js/[name].js?[hash]',
    path: PATH_BUILD,
    publicPath: PATH_ASSET,
    chunkFilename: 'js/[name].js?[hash]',
  },
  optimization: {
    // Пока не работает
    // minimizer: [
    //   new UglifyJsPlugin({
    //     cache: true,
    //     // parallel: true,
    //     sourceMap: !IS_PRODUCTION,
    //     uglifyOptions: {
    //       sourceMap: !IS_PRODUCTION,
    //       output: {
    //         comments: false,
    //       },
    //     },
    //   }),
    // ],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          name: 'vendors',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, 'babel.config.js'),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, 'babel.config.js'),
        },
        include: [
          /[\\/]node_modules[\\/]tiny-slider[\\/]/,
          /[\\/]node_modules[\\/]choices.js[\\/]/
        ]
      },
      {
        test: /\.vue\.js$/,
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, 'babel.config.js'),
        },
        include: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash:8].[ext]',
            },
          },
        ],
        exclude: [
          path.resolve(PATH_SRC, 'fonts'),
          path.resolve(PATH_SRC, 'images'),
          /inline/i,
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-inline-loader?classPrefix',
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeViewBox: false },
              ],
            },
          },
        ],
        include: [
          /inline/i,
        ],
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf|svg)(\?.*$|$)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name]-[hash:8].[ext]',
            },
          },
        ],
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(PATH_SRC, 'fonts'),
        ],
        exclude: [
          /inline/i,
        ],
      },
      {
        test: /\.sass$/,
        use: styleLoader(),
      },
      {
        test: /\.scss$/,
        use: styleLoader(true, false),
      },
      {
        test: /\.css$/,
        use: styleLoader(false, false),
      },
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'],
          },
          {
            use: ['pug-loader']
          }
        ]
      },
    ],
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'node_modules'),
      path.resolve(PATH_SRC),
    ],
    alias: {
      '~': path.resolve(__dirname, 'resources', 'webpack'),
      '@cabinet': path.resolve(__dirname, 'resources', 'webpack', 'pages', 'cabinet', 'app'),
    },
    extensions: ['*', '.js', '.es6', '.jsx', '.vue', '.css', '.scss', '.sass'],
  },

  devtool: IS_PRODUCTION ? 'none' : 'inline-cheap-source-map',

  stats: {
    // copied from `'minimal'`
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    // our additional options
    moduleTrace: true,
    errorDetails: true,
  },

  devServer: {
    stats: {
      // copied from `'minimal'`
      all: false,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      // our additional options
      moduleTrace: true,
      errorDetails: true,
    },
    clientLogLevel: 'error',
    host: SERVER_HOST,
    port: SERVER_PORT,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.resolve(PATH_SRC),
    // uncomment if you have error in console Invalid Host/Origin header
    // disableHostCheck: true,
  },

  plugins: [
    new ExtractCssChunks({
      filename: 'css/[name].css?[hash]',
      chunkFilename: 'css/[name].css?[hash]',
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
    }),
    new VueLoaderPlugin(),
  ],
};

config.plugins.push(
  new ManifestPlugin({
    fileName: path.resolve(PATH_PUBLIC, 'mix-manifest.json'),
    publicPath: PATH_ASSET,
    basePath: PATH_BASE,
    writeToFileEmit: true,
  }),
);


module.exports = config;
