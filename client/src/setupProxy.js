const { createProxyMiddleware } = require('http-proxy-middleware'); 

module.exports = function(app) {
    app.use('/login', createProxyMiddleware({
        target: 'http://localhost:8221',
        changeOrigin: true
    }))
}