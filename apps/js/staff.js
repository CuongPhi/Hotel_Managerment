
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

              }
             Phongs.push(phong); 
            })
        } 
	});
    return Phongs;
};

loadCbbRooms=()=>{
    var cbb =document.getElementById('cbbRooms');
    var phongs= danh_sach_ten_phong_trong();
    phongs.forEach(e=>{
        var tmp=document.createElement('option');
        tmp.innerText = e.Ma_so;
        cbb.appendChild(tmp);
    });
}
