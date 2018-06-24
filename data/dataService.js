'use strict'

var app = require('http')
var url = require('url')
var query = require('querystring')

var port = 3000



app.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    var content_type = {'Content-Type': 'text/xml',              
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
   }
    switch(req.method) {
        case 'GET':
            var getMethod = require('./services/getMethod.js')

            switch(req.url){
               case '/get_danh_sach_phong_thue': {
                    res.writeHeader(200, content_type);
                    var data = getMethod.get_danh_sach_phong_thue();
                    res.end(data)
                break
               }
               break;
                case '/Danh_sach_phong':
                    res.writeHeader(200, content_type);
                    var data = getMethod.get_Danh_sach_phong()
                    res.end(data)
                    break

                case '/Danh_sach_loai_phong':
                    res.writeHeader(200, content_type);
                    var data = getMethod.get_Danh_sach_loai_phong()
                    res.end(data)
                    break

                case '/Danh_sach_thuc_an':
                    res.writeHeader(200, content_type);
                    var data = getMethod.get_Danh_sach_thuc_an()
                    res.end(data)
                    break
                case '/get_Danh_sach_ten_phong_trong':
                    res.writeHeader(200, content_type);
                    var data = getMethod.get_Danh_sach_ten_phong_trong()
                    res.end(data)
                    break
                 case '/getPhongThue':
                    res.writeHeader(200, content_type);
                    console.log(req.url);
                    var data = getMethod.getPhongThue(req.url)
                    res.end(data)
                    break
                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }

            console.log('--> Done');
            break
        case 'POST':
            var getMethod = require('./services/getMethod.js')

            switch(req.url){
              
                case '/checkIn':
                    
                    let body = [];
                    req.on('data', (chunk) => {
                        body.push(chunk)
                    }).on('end', () => {
                      
                     var objCheckIn = JSON.parse(body);
                     //console.log(objCheckIn);

                     getMethod.checkIn(objCheckIn,res);
                                        

                    })
                    break

                default:
                    res.writeHeader(404, {'Content-Type': 'text/plain'})
                    res.end("Request was not support!!!")
                    break
            }
            break
        case 'PUT':
            break
        case 'DELETE':
            break
    }
}).listen(port, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('dataService is starting at port ' + port)
})
