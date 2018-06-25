var app = require("http");
const timeout = 10000;

var post_options = {
    host: 'localhost',
    port: '3000',
    method: 'POST'
}
var contentType = {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
  };
function checkInRoom(obj, res){
       // console.log("Login");
    //var sessionID = session_storage_process.getField(fieldSessionID);

    var headers = {'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(obj)};

    post_options["path"] = "/checkIn";
    post_options["timeout"] = timeout;
    post_options["headers"] = headers;

    var post_req = app.request(post_options, function(responseServer) {
        responseServer.setEncoding('utf8');

        var data = '';
        responseServer.on('data', function (chunk) {
            data += chunk;
        });

        responseServer.on('end', function(){            
                res.writeHead(200, contentType);
                res.end(); 
                console.log('----> Cho thue phong ok!')
            });
    });

    post_req.write(obj);
    post_req.end();

    post_req.on('error', function(err){
        res.writeHead(404);
        res.end();
        console.log(err);
    });
}
function checkOutRoom(obj, res){
    console.log("BUS ----> go to check out");
    //var sessionID = session_storage_process.getField(fieldSessionID);


    var headers = {'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(obj)};

    post_options["path"] = "/checkOut";
    post_options["timeout"] = timeout;
    post_options["headers"] = headers;

    var post_req = app.request(post_options, function(responseServer) {
        responseServer.setEncoding('utf8');

        var data = '';
        responseServer.on('data', function (chunk) {
            data += chunk;
        });

        responseServer.on('end', function(){            
                res.writeHead(200, contentType);
                res.end(); 
                console.log('----> Checkout  phong ok!')
            });
    });

    post_req.write(obj);
    post_req.end();

    post_req.on('error', function(err){
        res.writeHead(404);
        res.end();
        console.log(err);
    });    
}


module.exports ={
    checkInRoom:checkInRoom,
    checkOutRoom:checkOutRoom
}