var app = require("http");
var url = require("url");
var query = require("querystring");
var login = require("./services/loginServices.js");
var port = 3001;
var session = [];
var qs = require("querystring");

app
  .createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    switch (req.method) {
      case "POST":
        switch (req.url) {
          case "/login":
            {
              var jsonString = "";
              req.on("data", function(data) {
                jsonString += data;
              });

              req.on("end", function() {
                var account = JSON.parse(jsonString);
                var data = "";
                contentType = {
                  "Content-Type": "text/plain",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
                };
                stt = 200;
                var typeAccount =login.isExistAccount(account.userName, account.passWord);
                if (typeAccount!=null) {
                    var ss = login.getSession(0, 10);
                    login.addToSession(ss);
                    var link = "";
                    if(typeAccount === "Manager") {
                        link = "http://localhost:3002/manager.html"
                    }else if(typeAccount === "Staff"){
                        link = "http://localhost:3002/staff.html"   
                    }
                    data = JSON.stringify({
                        "link": link,
                        "key": `${ss}`
                    });               
                } else {
                    sst = 404;
                    console.log("fail to login");
                    data = "fail"
                  }
                

                res.writeHead(stt, contentType);
                res.end(data);
                console.log("--> length of session : " + login.getLenght());
              });
            }
            break;

          default:
            break;
        }

        break;
      case "GET":
        break;
    }
  })
  .listen(port, err => {
    if (err != null) console.log("==> Error: " + err);
    else console.log("busService is starting at port " + port);
  });
