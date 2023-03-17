function parseJson(req, res) {
    res.send = function(data) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(data));
    }
}


module.exports = parseJson;