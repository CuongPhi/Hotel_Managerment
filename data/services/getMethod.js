'user strict'
var fs = require('fs')
const xml2js = require('xml2js')
var path = __dirname + '/../dataHotel'

var Danh_sach_phong=[];


var get_Danh_sach_phong=()=>{
    Danh_sach_phong=[];
    fs.readdirSync(path + '/Rooms/').forEach(file => {
        var filePath = path + '/Rooms/' + file
        var data = fs.readFileSync(filePath, 'utf-8');
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            Danh_sach_phong.push({'Room' : result.Phong.$})
        });
    });
    var builder = new xml2js.Builder()
    var xml = builder.buildObject(Danh_sach_phong);
    console.log(xml)
    return xml
}
module.exports = {
    get_Danh_sach_phong:get_Danh_sach_phong
}