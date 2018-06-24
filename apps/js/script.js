var Phongs = new Array();

loadDataPhongs = function() {
  Phongs = [];
  $.ajax({
    async: false,
    dataType: "xml",
    type: "GET",
    url: "http://localhost:3000/Danh_sach_phong",
    success: function(xml) {
      $(xml)
        .find("Room")
        .each(function() {
          var phong = {
            Ma_so: $(this)
              .find("Ma_so")
              .text(),
            Loai_phong: $(this)
              .find("Loai_phong")
              .text(),
            Tang: $(this)
              .find("Tang")
              .text(),
            Gia_thue: $(this)
              .find("Gia_thue")
              .text(),
            Tinh_trang: $(this)
              .find("Tinh_trang")
              .text(),
            Src: $(this)
              .find("src")
              .text()
          };
          Phongs.push(phong);
        });
    }
  });
};


onloadPage = () => {
  loadDataPhongs();
  load_Phongs();
};
load_Phongs = () => {
  //Xoa_Tat_ca_childNodes_Element(table_Phongs);
  Phongs.forEach(e => {
    var DS_Row = document.createElement("tr");

    var imgTag = document.createElement("td");
    var divimg = document.createElement("div");
    divimg.style = `background-image:url(${e.Src})`;
    divimg.className = "thumb";
    divimg.id = e.Ma_so;
    //divimg.addEventListener('click', loadPageDetail(maso),false)
    imgTag.appendChild(divimg);
    //imgTag.onclick=  `loadPageDetail(${e.Ma_so})`;

    var idTag = document.createElement("td");
    idTag.innerHTML = e.Ma_so;

    var typeTag = document.createElement("td");
    typeTag.innerHTML = e.Loai_phong;

    // var floorTag = document.createElement("td");
    // floorTag.innerHTML = e.Tang;

    // var priceTag = document.createElement("td");
    // priceTag.innerHTML =(parseInt(e.Gia_thue)).toLocaleString('vi', {style : 'currency', currency : 'VND'});

    var sttTag = document.createElement("td");
    var sttBtn = document.createElement("button");
    sttBtn.className = "btn btn-success";
    sttBtn.innerHTML = e.Tinh_trang;
    if (sttBtn.innerHTML === "Đã thuê") {
      sttBtn.className = "btn btn-danger";
    }
    sttTag.appendChild(sttBtn);

    DS_Row.appendChild(imgTag);
    DS_Row.appendChild(idTag);
    DS_Row.appendChild(typeTag);
    //DS_Row.appendChild(floorTag);
    // DS_Row.appendChild(priceTag);
    DS_Row.appendChild(sttTag);
    document.getElementsByTagName("tbody")[0].appendChild(DS_Row);

    // table_Phongs.appendChild(DS_Row);
  });
  return true;
};
function Xoa_Tat_ca_childNodes_Element(node_element) {
  var node_list = node_element.childNodes;
  for (var i = node_list.length - 1; i >= 0; i--) {
    node_element.removeChild(node_list[i]);
  }
}

$(document).ready(function($) {
  if (window.history && window.history.pushState) {
    window.history.pushState("forward", null, "./#forward");
    $(window).on("popstate", function() {
      window.location.assign("http://localhost:3002/");
    });
  }
});
