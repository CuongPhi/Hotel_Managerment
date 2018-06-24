
danh_sach_ten_phong_trong = function() {
var  Phongs=[];  
  $.ajax({
    async: false,
    dataType: "xml",
		type: "GET",
		url: 'http://localhost:3000/get_Danh_sach_ten_phong_trong',
		success: function (xml) {
         $(xml).find('Room').each(function(){
            var phong= {
                Ma_so : $(this).find('Ma_so').text(),
                Gia_thue : $(this).find('Gia_thue').text(),
                Loai_phong : $(this).find('Loai_phong').text()
            }
             Phongs.push(phong); 
            })
        } 
    });
    //console.log(Phongs)
    return Phongs;
};

loadCbbRooms=()=>{
    var cbb =document.getElementById('cbbRooms');
    var phongs= danh_sach_ten_phong_trong();
    if(phongs.length == 0){
        $('#lbErr').text('Hết phòng');
        $('i').show();
        $('button[name=btnChoThue]').hide();
    }
    phongs.forEach(e=>{
        let tmp=document.createElement('option');
        tmp.text = e.Loai_phong + ' ' +e.Ma_so + ' - '+ (parseInt(e.Gia_thue)).toLocaleString('vi', {style : 'currency', currency : 'VND'});
        tmp.value =e.Ma_so ;
        
        cbb.add(tmp);
    });
}

choThuePhong=()=>{
    var cookie = document.cookie;
    var nameCus = $('#name_CUS').val()+"";
    var CMNDCus = $('#CMND_CUS').val()+"";
    var addCus = $('#add_CUS').val()+"";
    var numofCus = $('select[name=sl1]').val()+"";
    var numofCusFor = $('select[name=sl2]').val()+"";
    var idRoom = $('select[name=cbbRooms]').val() + "";
    var dateIn = $('#dateIn').val()+"";
  
    if(CMNDCus ==""){
        $('#lbErr').text('Hãy nhập CMND chính xác');
        $('i').show();
        console.log('CMND lỗi');
        return;
    }
    dataCookie = JSON.stringify({
        'id': `${cookie}`,
        'name': `${nameCus}`,
        'cmnd' : `${CMNDCus}`,
        'address' : `${addCus}`,
        'num1' : `${numofCus}`,
        'num2' : `${numofCusFor}`,
        'idroom' : `${idRoom}`,
        'dateIn': `${dateIn}`
    });
    $.ajax({
        assign:false,
        type: "POST",
        dataType: '',
        data : dataCookie,
        url: 'http://localhost:3001/choThuePhong',
        statusCode: {
            404: function() {
                window.location.assign('http://localhost:3002/login.html')
            },
            200: function(){
              window.location.assign('http://localhost:3002/Staff.html')
            }

          }
    })
}

clearAll=()=>{
    $('#name_CUS').val('');
    $('#CMND_CUS').val('');
    $('#add_CUS').val('');
    $('#name_CUS').val('');
    $('i').hide();
}