
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
    console.log(Phongs)
    return Phongs;
};

loadCbbRooms=()=>{
    var cbb =document.getElementById('cbbRooms');
    var phongs= danh_sach_ten_phong_trong();
    phongs.forEach(e=>{
        let tmp=document.createElement('option');
        tmp.text = e.Loai_phong + ' ' +e.Ma_so + ' - '+ (parseInt(e.Gia_thue)).toLocaleString('vi', {style : 'currency', currency : 'VND'});
        tmp.value =e.Loai_phong ;
        
        cbb.add(tmp);
    });
}
