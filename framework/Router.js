module.exports = class Router {
    constructor(){
        this.urlendpoints = {}
    }

    request(method, path, handler) {
        if(!this.urlendpoints[path]) this.urlendpoints[path] = {}
        const currEndpoint = this.urlendpoints[path];

        if(currEndpoint[method]) {
            throw new Error(`Method ${method} at path ${path} already exists`);
        }

        currEndpoint[method] = handler;
    }

    get(path, handler) {
        this.request("GET", path, handler);
    }

    post(path, handler) {
        this.request("POST", path, handler);
    }

    delete(path, handler) {
        this.request("DELETE", path, handler);
    }
}