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

var get_Danh_sach_phong_quan_ly=()=>{
    Danh_sach_phong=[];
    fs.readdirSync(path + '/Rooms/').forEach(file => {
        var filePath = path + '/Rooms/' + file
        var data = fs.readFileSync(filePath, 'utf-8');
        var parser = new xml2js.Parser()
        parser.parseString(data, function (err, result) {
           
                Danh_sach_phong.push({'Room' : {
                   Ma_so : result.Phong.$.Ma_so,
                   Loai_phong : result.Phong.$.Loai_phong,

                }});
        });
    });
    var builder = new xml2js.Builder()
    var xml = builder.buildObject(Danh_sach_phong);
   // console.log(xml)
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
    console.log('data Sevice ---> thue phong ' + obj.idroom + " ok !")

}
checkOut=(obj, res)=>{
    console.log(obj)
      var filePath = path + '/Rooms/' + obj.idroom +".xml";
    var dataFile= fs.readFileSync(filePath, 'utf-8');
    var parser =  new xml2js.Parser();
    parser.parseString(dataFile, (err,result)=>{    
        if(err =>{
            res.writeHead(404);
            return;
        })     

    
        var phieu_thue={
            '$':{
                Ten_KH : obj.name,
                CMND: obj.cmnd,
                ADDRESS: obj.address,
                So_KH: obj.so_kh,
                So_KH_Ngoai: obj.so_kh_ngoai,
                Ngay_bat_dau : obj.dateIn,
                Ghi_chu : obj.ghi_chu,
                So_Ngay_Thue : obj.numofday,
                Don_Gia_Moi: obj.don_gia_moi,
                Thanh_Tien : obj.total_end
            }
        }
        var p = result.Phong;
         p.$.Tinh_trang ='Trống';
        var c= p.Danh_sach_thue_phong[0].Thue_phong;
        c.pop();
        c.push(phieu_thue);

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
    console.log('data Sevice ---> tra phong ' + obj.idroom + " ok !")
}
getPhongThue=(obj,res)=>{
    //console.log(obj)
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
         var doanh_thu = 0;
         for(let i=0;i<c.length;i++){  
             if(c[i].$.Thanh_Tien!=null)
                  doanh_thu+= (parseInt(c[i].$.Thanh_Tien));
         }
         var obj_Return = {
                'ma_p': p.$.Ma_so,
                'loai_p' : p.$.Loai_phong,
                'gia_p':p.$.Gia_thue,
                'name' : phieu_thue_.Ten_KH,
                'cmnd' : phieu_thue_.CMND,
                'address' : phieu_thue_.ADDRESS,
                'so_kh': phieu_thue_.So_KH,
                'so_kh_ngoai':phieu_thue_.So_KH_Ngoai,
                'datein': phieu_thue_.Ngay_bat_dau,
                'tang' : p.$.Tang,
                'tam_ngung' : p.$.Tam_ngung,
                'doanh_thu' : doanh_thu

         } 
         console.log(obj_Return)      
         res.writeHead(200,contentType)
         res.end(JSON.stringify(obj_Return));
    })
}

editRoom= (obj, res)=>{
    var filePath = path + '/Rooms/' + obj.idroom +".xml";
    var dataFile= fs.readFileSync(filePath, 'utf-8');
    var parser =  new xml2js.Parser();
    parser.parseString(dataFile, (err,result)=>{
        console.log(obj);
        console.log(result)

        result.Phong.$.Loai_phong = obj.type;
        result.Phong.$.Tang = obj.floor;
        result.Phong.$.Tam_ngung = obj.block;
        result.Phong.$.Gia_thue = obj.price;        
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
    console.log('data Sevice ---> thue phong ' + obj.idroom + " ok !")

}
module.exports = {
    getPhongThue:getPhongThue,
    checkIn:checkIn, checkOut:checkOut,
    get_Danh_sach_loai_phong:get_Danh_sach_loai_phong,
    get_Danh_sach_phong:get_Danh_sach_phong,
    get_Danh_sach_thuc_an:get_Danh_sach_thuc_an,
    get_Danh_sach_ten_phong_trong:get_Danh_sach_ten_phong_trong,
    get_danh_sach_phong_thue:get_danh_sach_phong_thue,
    get_Danh_sach_phong_quan_ly:get_Danh_sach_phong_quan_ly,
    editRoom:editRoom
}
