
loadDataPhongs = function() {
  var LoaiPhong= [];
  $.ajax({
    async: false,
    dataType: "xml",
		type: "GET",
		url: 'http://localhost:3000/Danh_sach_loai_phong',
		success: function (xml) {  
         $(xml).find('Type').each(function(){
            var phong= {
              Ma_so : $(this).find('Ma_loai').text(),
              Ten: $(this).find('Ten').text(),
              Gia_thue: $(this).find('Gia_thue').text(),             
              Src: $(this).find('src').text()
           }
           LoaiPhong.push(phong);
        })
    }        
});
    return LoaiPhong;
};

onloadPage = () => {
     var types = loadDataPhongs();
     console.log(types);
    load_Phongs(types);
};

load_Phongs = (types) => {
//Xoa_Tat_ca_childNodes_Element(table_Phongs);
    types.forEach(e => {
    var DS_Row = document.createElement("tr");

    var imgTag = document.createElement("td");
    var divimg = document.createElement('div');
    divimg.style = `background-image:url(${e.Src})`;
    divimg.className= 'thumb';
    divimg.onclick = '';
    imgTag.appendChild(divimg);  

    var idTag = document.createElement("td");
    idTag.innerHTML = e.Ma_so;

    var typeTag = document.createElement("td");
    typeTag.innerHTML = e.Ten;

    var priceTag = document.createElement("td");
    priceTag.innerHTML = (parseInt(e.Gia_thue)).toLocaleString('vi', {style : 'currency', currency : 'VND'});

    DS_Row.appendChild(imgTag);
    DS_Row.appendChild(typeTag);
    DS_Row.appendChild(priceTag);

   // Xoa_Tat_ca_childNodes_Element(document.getElementsByTagName('tbody')[0]);
    document.getElementsByTagName('tbody')[0].appendChild(DS_Row)
  });
};

function Xoa_Tat_ca_childNodes_Element(node_element){
    var node_list = node_element.childNodes
    for(var i = node_list.length - 1; i >= 0; i--){
        node_element.removeChild(node_list[i]);
    }
}