'user strict'
var fs = require('fs')
const xml2js = require('xml2js')
var path = __dirname + '/../dataHotel'
var contentType = {
    "Content-Type": "text/plain",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS"
  };
var Danh_sach_phong=[];

var get_Danh_sach_ten_phong_trong=()=>{
    Danh_sach_phong=[];
    fs.readdirSync(path + '/Rooms/').forEach(file => {
        var filePath = path + '/Rooms/' + file
        var data = fs.readFileSync(filePath, 'utf-8');
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
           // console.log(result.Phong.$.Tam_ngung)
           if(result.Phong.$.Tam_ngung === 'false' && result.Phong.$.Tinh_trang === 'Trống'){
               console.log(result)
                Danh_sach_phong.push({'Room' : {
                    Loai_phong:result.Phong.$.Loai_phong,
                    Ma_so: result.Phong.$.Ma_so, 
                    Gia_thue:result.Phong.$.Gia_thue
                } 
            });
           }
        });
    });
    var builder = new xml2js.Builder()
    var xml = builder.buildObject(Danh_sach_phong);
    console.log(xml)
    return xml
}
var get_Danh_sach_phong=()=>{
    Danh_sach_phong=[];
    fs.readdirSync(path + '/Rooms/').forEach(file => {
        var filePath = path + '/Rooms/' + file
        var data = fs.readFileSync(filePath, 'utf-8');
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
           if(result.Phong.$.Tam_ngung === 'false'){
                Danh_sach_phong.push({'Room' : result.Phong.$});
           }
        });
    });
    var builder = new xml2js.Builder()
    var xml = builder.buildObject(Danh_sach_phong);
   // console.log(xml)
    return xml
}
var get_Danh_sach_loai_phong=()=>{
    Danh_sach_loai_phong=[];
    fs.readdirSync(path + '/typeroom/').forEach(file => {
        var filePath = path + '/typeroom/' + file
        var data = fs.readFileSync(filePath, 'utf-8');
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            Danh_sach_phong.push({'Type' : result.Loai_phong.$})
        });
    });
    var builder = new xml2js.Builder()
    var xml = builder.buildObject(Danh_sach_phong);
   // console.log(xml)
    return xml
}
var get_Danh_sach_thuc_an=()=>{
    DS_thuc_an=[];
    fs.readdirSync(path + '/Services/').forEach(file => {
        var filePath = path + '/Services/' + file
        var data = fs.readFileSync(filePath, 'utf-8');
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
            DS_thuc_an.push({'Service' : result.Eating.$})
        });
    });
    var builder = new xml2js.Builder()
    var xml = builder.buildObject(DS_thuc_an);
   // console.log(xml)
    return xml;
}
checkIn= (obj, res)=>{
    var filePath = path + '/Rooms/' + obj.idroom +".xml";
    var dataFile= fs.readFileSync(filePath, 'utf-8');
    var parser =  new xml2js.Parser();
    parser.parseString(dataFile, (err,result)=>{


        var phieu_thue={
            '$':{
                Ten_KH : obj.name,
                CMND: obj.cmnd,
                ADDRESS: obj.address,
                So_KH: obj.num1,
                So_KH_Ngoai: obj.num2
            }
        }

        result.Phong.$.Tinh_trang ='Đã thuê';
        result.Phong.Danh_sach_thue_phong[0].Thue_phong.push(phieu_thue);
        //ghi
        var builder  = new xml2js.Builder();
        var xml= builder.buildObject(result);
        fs.writeFile(filePath, xml, err=>{
            if(err){
                throw(err);
            }
        });
    })


    res.writeHead(200,contentType)
    res.end();
}

module.exports = {
    checkIn:checkIn,
    get_Danh_sach_loai_phong:get_Danh_sach_loai_phong,
    get_Danh_sach_phong:get_Danh_sach_phong,
    get_Danh_sach_thuc_an:get_Danh_sach_thuc_an,
    get_Danh_sach_ten_phong_trong:get_Danh_sach_ten_phong_trong
}
