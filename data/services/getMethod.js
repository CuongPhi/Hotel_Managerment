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
               //console.log(result)
                Danh_sach_phong.push({'Room' : result.Phong.$});            
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
var get_danh_sach_phong_thue=()=>{
    Danh_sach_phong=[];
    fs.readdirSync(path + '/Rooms/').forEach(file => {
        var filePath = path + '/Rooms/' + file
        var data = fs.readFileSync(filePath, 'utf-8');
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
           if(result.Phong.$.Tam_ngung === 'false' && result.Phong.$.Tinh_trang === 'Đã thuê'){
                Danh_sach_phong.push({'Room' : result.Phong.$});
           }
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
                So_KH_Ngoai: obj.num2,
                Ngay_bat_dau : obj.dateIn
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
            else{
               // res.end('');
            }
        });
    })


    res.writeHead(200,contentType)
    res.end();
}
getPhongThue=(obj,res)=>{
    console.log(obj)
    var filePath = path + '/Rooms/' + obj.id +".xml";
    var dataFile= fs.readFileSync(filePath, 'utf-8');
    var parser =  new xml2js.Parser();
    parser.parseString(dataFile, (err,result)=>{    
        if(err =>{
            res.writeHead(404);
            return;
        })
        var p=result.Phong;
        var c= p.Danh_sach_thue_phong[0].Thue_phong;
        //console.log(c[c.length-1]);   
       // console.log(p)
         var phieu_thue_=  c[c.length-1].$;
         var obj_Return = {
                'ma_p': p.$.Ma_so,
                'loai_p' : p.$.Loai_phong,
                'gia_p':p.$.Gia_thue,
                'name' : phieu_thue_.Ten_KH,
                'cmnd' : phieu_thue_.CMND,
                'address' : phieu_thue_.ADDRESS,
                'so_kh': phieu_thue_.So_KH,
                'so_kh_ngoai':phieu_thue_.So_KH_Ngoai,
                'datein': phieu_thue_.Ngay_bat_dau
         }       
         res.writeHead(200,contentType)
         res.end(JSON.stringify(obj_Return));
    })

    
}
module.exports = {
    getPhongThue:getPhongThue,
    checkIn:checkIn,
    get_Danh_sach_loai_phong:get_Danh_sach_loai_phong,
    get_Danh_sach_phong:get_Danh_sach_phong,
    get_Danh_sach_thuc_an:get_Danh_sach_thuc_an,
    get_Danh_sach_ten_phong_trong:get_Danh_sach_ten_phong_trong,
    get_danh_sach_phong_thue:get_danh_sach_phong_thue
}
