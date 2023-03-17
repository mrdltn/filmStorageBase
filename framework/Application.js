const http = require('http');
const EventEmitter = require('events');

class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }
    listen(port, callback) {
        this.server.listen(port, callback);
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach(method => {
                const handler = endpoint[method];
                this.emitter.on(this._getRouteMask(path, method), (req, res) => {
                    handler(req, res);
                });
            });
        });
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = '';
            
            req.on('data', (chuck) => {
                body += chuck;
            });

            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach(middleware => {
                    middleware(req, res);
                });
                const emitted = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
                if (!emitted) {
                    res.end();
                }
            });
        });
    }

    _getRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }
}

module.exports = Application;