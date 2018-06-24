var total= 0;
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
                        console.log(obj)
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

                        var don_gia=parseFloat(obj.gia_p);
                        var KH_ngoai= parseInt(obj.so_kh_ngoai);
                        if(KH_ngoai>0 && KH_ngoai!=null){
                            don_gia+= (parseFloat(obj.gia_p)*0.5)
                        }
                         if(obj.so_kh=='3'){
                            don_gia+=parseInt((parseFloat(obj.gia_p)*0.25));
                         }
                         
                        $('#phuthu').val(don_gia.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
                        $('#sale').val(0); 
                        var totalPrice = don_gia* parseInt(numOfDay);
                        total = totalPrice;
                        $('#tong_tien').val(totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'}));
                        $('#total').val(total.toLocaleString('vi', {style : 'currency', currency : 'VND'}))
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
   
    $('#total').val(parseInt(total-giam_gia).toLocaleString('vi', {style : 'currency', currency : 'VND'}));
}