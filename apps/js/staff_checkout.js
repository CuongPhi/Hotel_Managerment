var total= 0;
var idR_sl = -1;
var obj_sl;
danh_sach_phong_thue = function() {
    var  Phongs=[];  
      $.ajax({
        async: false,
        dataType: "xml",
            type: "GET",
            url: 'http://localhost:3000/get_danh_sach_phong_thue',
            success: function (xml) {
             $(xml).find('Room').each(function(){
                var phong= {
                    Ma_so : $(this).find('Ma_so').text(),
                    Loai_phong : $(this).find('Loai_phong').text()
                }
                 Phongs.push(phong); 
                })
            } 
        });
        //console.log(Phongs)
        return Phongs;
    }

loadCbbRooms=()=>{
    checkAuth();

        var cbb =document.getElementById('cbbRooms');
        var phongs= danh_sach_phong_thue();
        if(phongs.length == 0){
            $('#lbErr').text('Không có phòng nào được thuê');
            $('i').show();
            $('button[name=btnChoThue]').hide();
        }
        phongs.forEach(e=>{
            let tmp=document.createElement('option');
            tmp.text = e.Loai_phong + ' ' +e.Ma_so ;
            tmp.value =e.Ma_so ;
            
            cbb.add(tmp);
        });
}
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
    $('#dateIn').val(new Date().toDateInputValue());


$('select').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        //console.log(valueSelected)

        if(valueSelected!='-1'){
            idR_sl=valueSelected;
            var dt= JSON.stringify({
                'id':`${valueSelected}`,
                'date' : '123'
            });         
            $.ajax({
                async:false,
                type: "POST",
                data:  dt,  
                url: 'http://localhost:3000/getPhongThue',
                success: function (xml) {
                        var obj = JSON.parse(xml);
                        obj_sl=obj;
                        var gia= parseInt(obj.gia_p);
                        $('#price_room').val(gia.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
                        
                        $('#type_room').val(obj.loai_p);

                        $('#id_room').val(obj.ma_p);

                        $('#CMND_CUS').val(obj.cmnd);

                        $('#add_CUS').val(obj.address);

                        $('#dateIn').val(obj.datein);

                        $('#name_CUS').val(obj.name);

                        $('#num1').val(obj.so_kh);

                        $('#num2').val(obj.so_kh_ngoai);

                        var numOfDay=days_between( new Date(Date.now()), new Date(obj.datein));
                        $('#numofday').val(numOfDay);
                        obj_sl.numofday = numOfDay;
                        var don_gia=parseFloat(obj.gia_p);
                        var KH_ngoai= parseInt(obj.so_kh_ngoai);
                        if(KH_ngoai>0 && KH_ngoai!=null){
                            don_gia+= (parseFloat(obj.gia_p)*0.5)
                        }
                         if(obj.so_kh=='3'){
                            don_gia+=parseInt((parseFloat(obj.gia_p)*0.25));
                         }
                         obj_sl.don_gia_moi= don_gia.toString();
                        $('#phuthu').val(don_gia.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
                        $('#sale').val(0); 
                        var totalPrice = don_gia* parseInt(numOfDay);
                        obj_sl.total = totalPrice.toString();
                        $('#tong_tien').val(totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
                        $('#total').val(totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'}))
                        obj_sl.total_end=obj_sl.total
                        obj_sl.ghi_chu= $('#note').val()+"";

                    }
                });
        }else{

        }
    })

days_between=(date1,date2)=>{
        var oneDay = 24*60*60*1000; 
        return Math.round(Math.abs((date1.getTime() - date2.getTime())/(oneDay)));
}

totalPrice=()=>{
    var giam_gia= parseInt($('#sale').val());
    var c= parseInt(obj_sl.total-giam_gia)
    $('#total').val(c.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
    obj_sl.total_end = c.toString();
}


choTraPhong=()=>{
    var cookie = document.cookie;
    obj_sl.ghi_chu= $('#note').val()+"";
    obj_sl.name= $('#name_CUS').val()+"";
    obj_sl.address=$('#add_CUS').val() +"";
    obj_sl.cmnd=$('#CMND_CUS').val() +"";

    console.log(obj_sl)
    if(!obj_sl) {alert('Chọn phòng !'); return;}
    dataCookie = JSON.stringify({      
        'id': `${cookie}`,
        'name': `${obj_sl.name+""}`,
        'cmnd' : `${obj_sl.cmnd}`,
        'address' : `${obj_sl.address+""}`,
        'idroom' : `${obj_sl.ma_p}`,
        'dateIn': `${obj_sl.datein}`,
        'total_end' :`${obj_sl.total_end}`,
        'total':`${obj_sl.total}`,
        'so_kh_ngoai' : `${obj_sl.so_kh_ngoai}`,
        'so_kh' : `${obj_sl.so_kh}`,
        'numofday' :`${obj_sl.numofday}`,
        'ghi_chu':`${obj_sl.ghi_chu+""}`,
        'don_gia_moi':`${obj_sl.don_gia_moi}` 
    });
    $.ajax({
        assign:false,
        type: "POST",
        dataType: '',
        data : dataCookie,
        url: 'http://localhost:3001/choTraPhong',
        statusCode: {
            404: function() {
                window.location.assign('http://localhost:3002/login.html')
            },
            200: function(){
                    window.location.assign('http://localhost:3002/staff_checkout.html')
            }

          }
    })
}

dangXuat=()=>{
    $.ajax({
        assign:false,
        type: "POST",
        dataType: '',
        data :  JSON.stringify({
            'id' : `${document.cookie}`,
            'name' :`staff`
        }),
        url: 'http://localhost:3001/logout',
        statusCode: {
            404: function() {
                window.location.assign('http://localhost:3002/')
            },
            200: function(){
              window.location.assign('http://localhost:3002/')
            }

          }
    })  
  }

  checkAuth=()=>{
    var cookie = document.cookie;
    dataCookie = JSON.stringify({
        'id': `${cookie}`})
        $.ajax({
            assign:false,
            type: "POST",
            dataType: '',
            data : dataCookie,
            url: 'http://localhost:3001/nhanVien',
            statusCode: {
                404: function() {
                    window.location.assign('http://localhost:3002/login.html')
                },
                200: function(){
                    if(window.location.href != 'http://localhost:3002/staff_checkout.html')
                        window.location.assign('http://localhost:3002/staff_checkout.html')
                }
    
              }
        })

}