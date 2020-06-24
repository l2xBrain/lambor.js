const path = require('path');
const {babelClientOpts, babelServerOpts} = require('./babel-config');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
import BuildManifestPlugin from '../webpack/plugins/build-manifest-plugin';
import PagesManifestPlugin from '../webpack/plugins/pages-manifest-plugin';
const { REACT_LOADABLE_MANIFEST } = require('../lib/constants');

export default async function getBaseWebpackConfig(
    dir,
    {
        config,
        target = 'server',
        entrypoints
    }
) {
    const distDir = path.join(dir, config.distDir)
    const outputPath = path.join(distDir, target === 'server' ? 'server' : '')
    const plugins = [];
    if (target === 'server') {
        plugins.push(new PagesManifestPlugin())
        plugins.push(new CopyPlugin({
            patterns: [
                {from: path.join(__dirname, '../server/pages'), to: outputPath}
            ]
        }))
    } else {
        plugins.push(new CleanWebpackPlugin())
        plugins.push(new BuildManifestPlugin())
    }
    
    return {
        entry: {
            ...entrypoints
        },
        target: target === 'server' ? 'node' : 'web',
        output: {
            path: outputPath,
            filename: '[name]',
            libraryTarget: 'commonjs2',
            publicPath: '/dist/'
        },
        resolve: {
            // alias: getAlias(),
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
        mode: 'development',
        externals: {
        },
        module: {
            rules: [{
                    test: /\.jsx?$/,
                    exclude: [/node_modules/],
                    use: [
                        // 'thread-loader',
                        {
                            loader: 'babel-loader',
                            options: target === 'server' ? babelServerOpts : babelClientOpts
                        },
                    ]
                }, {
                    test: /\.(png|jpg|gif|ico)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }, {
                    test: /\.(woff|eot|ttf|woff2|svg)(\?.*)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
        },
        plugins: [
            ...plugins,
            // target === 'server' &&
            //     new ReactLoadablePlugin({
            //         filename: REACT_LOADABLE_MANIFEST,
            //     }),
        ],
        // optimization: {
        //     splitChunks: {
        //         maxAsyncRequests: 1,
        //         cacheGroups: {
        //             vendor: {
        //                 test: /node_modules(?!(\/(@ant-design|antd)))/,
        //                 chunks: "all",
        //                 name: "vendor",
        //                 priority: 10,
        //                 enforce: true,
        //             },
        //             ant: {
        //                 test: /node_modules\/(@ant-design|antd)/,
        //                 chunks: "all",
        //                 name: "ant",
        //                 priority: 12,
        //                 enforce: true
        //             }
        //         }
        //     },
        // },
    }
}