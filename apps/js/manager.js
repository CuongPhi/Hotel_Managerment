var idR_sl = -1;
var obj_sl;
checkAuth=()=>{
    var cookie = document.cookie;
    dataCookie = JSON.stringify({
        'id': `${cookie}`})
        $.ajax({
            assign:false,
            type: "POST",
            dataType: '',
            data : dataCookie,
            url: 'http://localhost:3001/quanLy',
            statusCode: {
                404: function() {
                    window.location.assign('http://localhost:3002/login.html')
                },
                200: function(){
                    if(window.location.href != 'http://localhost:3002/manager.html')
                        window.location.assign('http://localhost:3002/manager.html')
                }
    
              }
        })

}
checkAuth();

danh_sach_phong_thue = function() {
    var  Phongs=[];  
      $.ajax({
        async: false,
        dataType: "xml",
            type: "GET",
            url: 'http://localhost:3000/get_danh_danh_phong_quan_ly',
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


$('#cbbRooms').on('change', function (e) {
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
                        console.log(obj)
                        //var gia= parseInt(obj.gia_p);
                        $('#price').val(obj.gia_p);

                        var valOp = obj.loai_p == 'Phòng đơn' ? 'Phòng đơn' : (obj.loai_p == 'Phòng đôi' ? 'Phòng đôi': 'Phòng gia đình');
                        document.getElementById('type').value = valOp;

                        var valBlock = obj.tam_ngung == 'false' ? 'false' : 'true';
                        document.getElementById('tam_ngung').value = valBlock;

                        $('#id_room').val(obj.ma_p);

                        $('#floor').val(obj.tang); 
                        $('#doanh_thu').val(obj.doanh_thu.toLocaleString('vi', {style : 'currency', currency : 'VND'}));              

                    }
                });
        }else{

        }
    })

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

editRoom=()=>{
    var cookie = document.cookie;
    if(!obj_sl) {alert('Chọn phòng !'); return;}

    var price = $('#price').val()+"";
    var type = $('select[name=type_p]').val()+"";
    var block =$('select[name=block_p]').val()+""; ;
    var floor = $('#floor').val()+"";;
    dataCookie = JSON.stringify({      
        'id': `${cookie}`,
        'idroom' : `${obj_sl.ma_p}`,
        'type' : `${type}`,
        'block' : `${block}`,
        'floor' : `${floor}`,
        'price' : `${price}`,

    });

    $.ajax({
        assign:false,
        type: "POST",
        dataType: '',
        data : dataCookie,
        url: 'http://localhost:3001/capNhatPhong',
        statusCode: {
            404: function() {
                window.location.assign('http://localhost:3002/login.html')
            },
            200: function(){
              window.location.assign('http://localhost:3002/manager.html')
            }

          }
    })
}

