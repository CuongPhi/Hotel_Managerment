var Phongs = [];
loadDataPhongs = function() {
  var http = new XMLHttpRequest();
  http.open("GET", "http://localhost:3000/Danh_sach_phong", false);
  http.send("");
  var dataRes = http.responseText;
  var data = new DOMParser().parseFromString(dataRes, "text/xml")
    .documentElement;
  console.log(data.getElementsByTagName("Room"));
  return data.getElementsByTagName("Room");
};
tao_danh_sach_phong = ds => {
 Phongs= new Array();
  for (let i = 0; i < ds.length; i++) {
    var phong = {
      Ma_so: ds[i].getElementsByTagName("Ma_so")[0].innerHTML,
      Loai_phong: ds[i].getElementsByTagName("Loai_phong")[0].innerHTML,
      Tang: ds[i].getElementsByTagName("Tang")[0].innerHTML,
      Gia_thue: ds[i].getElementsByTagName("Gia_thue")[0].innerHTML,
      Tinh_trang: ds[i].getElementsByTagName("Tinh_trang")[0].innerHTML
    };
    Phongs.push(phong);
  }
};

onloadPage = () => {
  tao_danh_sach_phong(loadDataPhongs());
  load_Phongs();
};

load_Phongs = () => {
//Xoa_Tat_ca_childNodes_Element(table_Phongs);
    Phongs.forEach(e => {
    var DS_Row = document.createElement("tr");

    var imgTag = document.createElement("td");
    var divimg = document.createElement('div');
    divimg.style = 'background-image:url(/Content/Images/Phong/11.jpg';
    divimg.className= 'thumb';
    divimg.onclick = '';
      imgTag.appendChild(divimg);  

    var idTag = document.createElement("td");
    idTag.innerHTML = e.Ma_so;

    var typeTag = document.createElement("td");
    typeTag.innerHTML = e.Loai_phong;

    var floorTag = document.createElement("td");
    floorTag.innerHTML = e.Tang;

    var priceTag = document.createElement("td");
    priceTag.innerHTML = e.Gia_thue;

    var sttTag = document.createElement("td");
    var sttBtn = document.createElement('button');
    sttBtn.className='btn btn-success';    
    sttBtn.innerHTML = e.Tinh_trang;
    if(sttBtn.innerHTML === 'Đã thuê'){
        sttBtn.className='btn btn-danger';    
    }    
    sttTag.appendChild(sttBtn);

    DS_Row.appendChild(imgTag);
    DS_Row.appendChild(idTag);
    DS_Row.appendChild(typeTag);
    DS_Row.appendChild(floorTag);
    DS_Row.appendChild(priceTag);
    DS_Row.appendChild(sttTag);
    document.getElementsByTagName('tbody')[0].appendChild(DS_Row)
   // table_Phongs.appendChild(DS_Row);
  });
};

function Xoa_Tat_ca_childNodes_Element(node_element){
    var node_list = node_element.childNodes
    for(var i = node_list.length - 1; i >= 0; i--){
        node_element.removeChild(node_list[i]);
    }
}