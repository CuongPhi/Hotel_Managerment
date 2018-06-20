
loadServices = function() {
    var Services= [];
    $.ajax({
      async: false,
      dataType: "xml",
          type: "GET",
          url: 'http://localhost:3000/Danh_sach_thuc_an',
          success: function (xml) {  
           $(xml).find('Service').each(function(){
              var phong= {
                Don_vi : $(this).find('Don_vi').text(),
                Ten: $(this).find('Ten').text(),
                Gia: $(this).find('Gia').text(),             
                Src: $(this).find('src').text()
             }
             Services.push(phong);
          })
          }
          
      });
      return Services;
  };

  
  onloadPage = () => {
       var services = loadServices();
      buildServices(services);
  };
  
  buildServices = (types) => {
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
      idTag.innerHTML = e.Ten;
  
      var typeTag = document.createElement("td");
      typeTag.innerHTML = e.Don_vi;
  
      var priceTag = document.createElement("td");
      priceTag.innerHTML = (parseInt(e.Gia)).toLocaleString('vi', {style : 'currency', currency : 'VND'});

      DS_Row.appendChild(imgTag);
      DS_Row.appendChild(idTag);
      DS_Row.appendChild(typeTag);
      DS_Row.appendChild(priceTag);
  
      //Xoa_Tat_ca_childNodes_Element(document.getElementsByTagName('tbody')[0]);
      document.getElementsByTagName('tbody')[0].appendChild(DS_Row)
    });
  };
  
  function Xoa_Tat_ca_childNodes_Element(node_element){
      var node_list = node_element.childNodes
      for(var i = node_list.length - 1; i >= 0; i--){
          node_element.removeChild(node_list[i]);
      }
  }