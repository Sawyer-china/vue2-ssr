const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')


// CSS 提取应该只用于生产环境
// 这样我们在开发过程中仍然可以热重载
const isProduction = process.env.NODE_ENV === 'production'


module.exports = {
    configureWebpack: () => {
        if (process.env.WEBPACK_TARGET === 'node') {
            return {
                entry: './src/entry-server.js',
                target: 'node',
                devtool: 'source-map',
                output: {
                    libraryTarget: 'commonjs2'
                },
                externals: nodeExternals({
                    allowlist: [/\.css$/]
                }),
                plugins: [
                    new VueSSRServerPlugin()
                ],
                optimization: { splitChunks: false }
            }
        } else {
            return {
                entry: './src/entry-client.js',
                plugins: [
                    new VueSSRClientPlugin()
                ],
            }
        }

    }, css: {
        extract: isProduction
    },
}