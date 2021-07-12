const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const express = require('express')
const server = express()

const path = require("path")

const LRU = require('lru-cache')

const template = require('fs').readFileSync('./src/index.template.html', 'utf-8');

const { createBundleRenderer } = require('vue-server-renderer')


const microCache = new LRU({
    max: 100,
    maxAge: 10000 // 重要提示：条目在 1 秒后过期。
})

const isCacheable = req => {
    // console.log(req)
    const cacheable = ['/', '/about']
    return cacheable.findIndex(item => item == req.url) 
}


const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template,
    clientManifest
})




//引入静态文件  否则运行报错

// server.use(express.static(path.resolve(__dirname, './dist')))

server.use('/js', express.static(path.resolve(__dirname, './dist/js')))
server.use('/img', express.static(path.resolve(__dirname, './dist/img')))
server.use('/css', express.static(path.resolve(__dirname, './dist/css')))


server.get('*', (req, res) => {
    const cacheable = isCacheable(req)
    // console.log(JSON.stringify(cacheable))
    if (cacheable != -1) {
        const hit = microCache.get(req.url)
        console.log('req.url' + req.url)
        console.log(hit + '')
        if (hit) {
            console.log(1111111111111111)
            console.log('使用缓存')
            return res.end(hit)
        }
    }

    const context = {
        title: 'ssr-demo',
        url: req.url
    }

    renderer.renderToString(context).then(html => {
        console.log('未使用缓存')
        res.end(html)
        console.log('cacheable' + cacheable)
        if (cacheable == -1) {
            console.log('cacheable' + cacheable)
            microCache.set(req.url, html)
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

server.listen(8081, () => {
    console.log('已监听 localhost:8081')
})