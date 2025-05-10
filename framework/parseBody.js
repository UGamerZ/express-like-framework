module.exports = (req, _) => {
    let body = "";
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => { if(body) req.body = JSON.parse(body); });
}