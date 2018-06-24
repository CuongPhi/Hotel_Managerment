
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

    $('select').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        //console.log(valueSelected)

        if(valueSelected!='-1'){
            $.ajax({
                async: false,
                type: "GET",
                data=  JSON.stringify({'id':`${valueSelected}`}),              
                url: 'http://localhost:3000/getPhongThue',
                success: function (xml) {
                        console.log(data);
                    }
                });
        }
    })