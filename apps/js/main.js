;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#gtco-offcanvas, .js-gtco-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	$('.js-gtco-nav-toggle').addClass('gtco-nav-white');

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};

	var formTab = function() {

		$('.tab-menu a').on('click', function(event){
			var $this = $(this),
				data = $this.data('tab');

			$('.tab-menu li').removeClass('active');
			$this.closest('li').addClass('active')

			$('.tab .tab-content-inner').removeClass('active');
			$this.closest('.tab').find('.tab-content-inner[data-content="'+data+'"]').addClass('active');

			event.preventDefault();

		});

	};

	var offcanvasMenu = function() {

		$('#page').prepend('<div id="gtco-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-gtco-nav-toggle gtco-nav-toggle gtco-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#gtco-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#gtco-offcanvas').append(clone2);

		$('#gtco-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#gtco-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-gtco-nav-toggle').removeClass('active');
				
	    	}
		});
	};
	var isDetail=true;
	var addEventClickAllImg=function(event){
		  $('body').on('click', '.thumb', function(){
			try{
				var id = $(this).context.id;
			}
			catch{}
			if(!isDetail)
			{Phongs.forEach(e=>{
				// 	if(e.Ma_so === id){
				// 		$.ajax({
				// 			url: `${e.Src}`,
				// 			type: "GET",
				// 			success: function (data) {
				// 				$("#slider").html(data);
				// 			}
				// 		});
					
				// 	}
				// })
				// 
				return;
			}	
			isDetail=false;		
			var container = document.getElementById('par_container');		
			var node_list = container.childNodes;
    		for(var i = node_list.length - 1; i >= 0; i--){
				container.removeChild(node_list[i]);
				}
			console.log('func bot')
	
			var flag = false;
			//----add new page
			var divImg =  document.createElement('div');
			divImg.className = 'main_container';
			Phongs.forEach(e=>{
				if(e.Ma_so === id){
					var img =document.createElement('div');
					img.style = `margin-left:50px;width:500px; display:inline-block; height:375px; background-image:url(${e.Src})`;
					img.className ='thumb';
					img.id = e.Ma_so;
					divImg.appendChild(img);	
					
					

					var divDetail = document.createElement('div');
					divDetail.style =`margin-right:50px;float:right; display:inline-block; width:500px; height:375px; border:solid 1px`;
										
					// var divlb = document.createElement('lable')
					// divlb.innerHTML = "Mã số: ";
					// var divId = document.createElement('lable')
					// divId.innerHTML = e.Ma_so;
					
					// var divGia = document.createElement('lable')
					// divGia.innerHTML = "Giá thuê: ";					
					// var divPrice = document.createElement('lable')
					// divPrice.innerHTML = e.Gia_thue;
					
					// var br = document.createElement('br');
					// divDetail.appendChild(divlb);
					// divDetail.appendChild(divId);
					
					// divDetail.appendChild(br);
						
					// divDetail.appendChild(divGia);
					// divDetail.appendChild(divPrice);
					
					divDetail.innerHTML = `
						<lable style='text-align:center; display:block ; font-size:30px!important; color: red'>${e.Loai_phong}</lable>
						<br/>
						<lable style='margin-left:50px ;font-weight:bold; font-size:20px'> Mã số phòng: </lable>
						<lable> ${e.Ma_so} </lable>
						<br/>
						<lable style='margin-left:50px ;font-weight:bold; font-size:20px'> Tầng: </lable>
						<lable> ${e.Tang} </lable>
						<br/>
					
						<lable style='margin-left:50px ;font-weight:bold; font-size:20px'> Giá thuê: </lable>
						<lable> ${e.Gia_thue} </lable>
						<br/>
						<lable style='margin-left:50px ;font-weight:bold; font-size:20px'> Tình trạng: </lable>

						<button id='btnTinhTrang' class='btn btn-success'> ${e.Tinh_trang} </button>
						
					`
					divImg.appendChild(divDetail)
					
					if(e.Tinh_trang == 'Đã thuê')
						flag=true
				}
			})

			container.appendChild(divImg);
			if(flag)
				document.getElementById('btnTinhTrang').className = 'btn btn-danger';
		  })
	  }
	var burgerMenu = function() {

		$('body').on('click', '.js-gtco-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;

		// $('.gtco-section').waypoint( function( direction ) {


			$('.animate-box').waypoint( function( direction ) {

				if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
					
					i++;

					$(this.element).addClass('item-animate');
					setTimeout(function(){

						$('body .animate-box.item-animate').each(function(k){
							var el = $(this);
							setTimeout( function () {
								var effect = el.data('animate-effect');
								if ( effect === 'fadeIn') {
									el.addClass('fadeIn animated-fast');
								} else if ( effect === 'fadeInLeft') {
									el.addClass('fadeInLeft animated-fast');
								} else if ( effect === 'fadeInRight') {
									el.addClass('fadeInRight animated-fast');
								} else {
									el.addClass('fadeInUp animated-fast');
								}

								el.removeClass('item-animate');
							},  k * 200, 'easeInOutExpo' );
						});
						
					}, 100);
					
				}

			} , { offset: '85%' } );
		// }, { offset: '90%'} );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var owlCarousel = function(){
		
		var owl = $('.owl-carousel-carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
	     	responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    	}
		});


		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	]
		});


		

	};

	

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".gtco-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#gtco-counter').length > 0 ) {
			$('#gtco-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};


	var dateTimeForm = function() {
		// $('#date-start').datepicker();
		$('#datestart').datetimepicker({
         format: 'DD/MM/YYYY'
        });
        $('#dateend').datetimepicker({
            format: 'DD/MM/YYYY'
        });
        //$('#ngay_vao').datetimepicker({
        //    format: 'DD/MM/YYYY'
        //});
        //$('#ngay_ra').datetimepicker({
        //    format: 'DD/MM/YYYY'
        //});
		$('#time').datetimepicker({
			format: 'LT'	
		});

		
	};

	var parallax = function() {

		if ( !isMobile.any() ) {
			$(window).stellar({
				horizontalScrolling: false,
				hideDistantElements: false, 
				responsive: true

			});
		}
	};


	
	$(function(){
		//mobileMenuOutsideClick();
		formTab();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		owlCarousel();
		goToTop();
		loaderPage();
		counterWayPoint();
		dateTimeForm();
		parallax();
		addEventClickAllImg();
	});


}());


