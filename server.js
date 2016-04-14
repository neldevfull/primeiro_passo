/***
    Server JS
*/

var basePath = __dirname;
var http     = require("http");
var fs       = require("fs");
var path     = require("path");
var port     = 3000;
var network  = "0.0.0.0";

// Create server
http.createServer(function(req, res) {
    var stream = fs.createReadStream(path.join(basePath, req.url));
    stream.on('error', function() {
        res.writeHead(404);
        res.end();
    });
    stream.pipe(res);
}).listen(port, network);

// Output messages
console.log("*** Server JS ***");
console.log("The server is running on port " + port);