const http = require("http");
const events = require("events");

module.exports = class Application {
    constructor() {
        this.eventEmitter = new events();
        this.server = this._createServer();
        this.middlewares = [];
    }

    addRouter(router) {
        Object.keys(router.urlendpoints).forEach(path => {
            const endpoint = router.urlendpoints[path];
            Object.keys(endpoint).forEach(method => {
                this.eventEmitter.on(this._getRoute(path, method), (request, response) => {
                    const handler = endpoint[method];
                    handler(request, response);
                });
            });
        });
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    listen(PORT) {
        this.server.listen(PORT, () => console.log(`listening on port ${PORT}`));
    }

    _createServer() {
        return http.createServer((req, res) => {
            this.middlewares.forEach(middleware => middleware(req, res));

            req
                .on('data', () => {})
                .on('end', () => {
                    let emit;
                    if(req.pathname)
                         emit = this.eventEmitter.emit(this._getRoute(req.pathname, req.method), req, res);
                    else emit = this.eventEmitter.emit(this._getRoute(req.url, req.method), req, res);
                    if(!emit) res.end('404 ERR');
                });
        })
    }

    _getRoute(url, method) {
        return `${url}:${method}`;
    }
}