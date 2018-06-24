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
    console.log("Login");
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
            console.log('data receive', data);
            var objData = JSON.parse(data);
            res.writeHead(200, contentType);
            console.log('----> Cho thue phong ok!')
            res.end("OK"); 
           // session_storage_process.setField(fieldSessionID, objData.sessionID);
        });
    });

    post_req.write(obj);
    post_req.end();

    post_req.on('error', function(err){
        console.log(err);
    });
}





module.exports ={
    checkInRoom:checkInRoom
}