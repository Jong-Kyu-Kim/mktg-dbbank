const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    dbbank: './src/dbbank.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [
							'babel-plugin-smart-webpack-import'
						]
					}
        },
      },      
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          //'style-loader',
          // 'vue-style-loader',
          'css-loader',
          // {
          //   loader: 'css-loader',
          //   options: {
          //     modules: true
          //   }
          // },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import './src/scss/variables.scss';
                @import './src/scss/mixins.scss';
              `
            }
          }
        ]
      },
      {
        test: [/\.svg$/, /\.png$/],
        use: {
          loader: 'url-loader',
          // options: {
          //   name: '[name].[ext]?[hash]',
          //   publicPath: './dist/',
          //   limit: 10000 // 10kb
          // }
        }
      }            
    ]
  },
  resolve: {
    extensions: ['.vue', '.js', '.scss'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      scss: path.resolve(__dirname, 'src/scss/'),
      svg: path.join(__dirname, 'src/svg/')
    },
  },

  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },    
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    }
  },  
  
	// output: {
	// 	publicPath: '/dist'
  // },
	output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[chunkhash].js'
	},  
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
			template: './src/dbbank.html',
			filename: 'dbbank.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[chunkhash].css'
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'windows.jQuery': 'jquery',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new CleanWebpackPlugin()
    //new webpack.HotModuleReplacementPlugin(),
  ]  
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  if (argv.mode === 'production') {    
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

    config.plugins.push(
      //new BundleAnalyzerPlugin(),      
    );
  }  
  
  return config;
}