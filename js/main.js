'use strict';

$(document).ready(function() {

	// 01. BROWSER AGENT FUNCTION
	//==================================================================================

	// 01.1 Check Chrome (Mobile / Tablet)
	//----------------------------------------------------------------------------------
	var isChromeMobile = function isChromeMobile() {
		if (device.tablet() || device.mobile()) {
			if (window.navigator.userAgent.indexOf("Chrome") > 0 || window.navigator.userAgent.indexOf("CriOS") > 0){
				return 1;
			}
		}
	}

	// 01.2 Check IOS
	//----------------------------------------------------------------------------------
	var isIOS = function isIOS() {
		if (window.navigator.userAgent.indexOf("iPhone") > 0 || window.navigator.userAgent.indexOf("iPad") > 0 || window.navigator.userAgent.indexOf("iPod") > 0){
			return 1;
		}
	}

	// 01.3 Check FIREFOX
	//----------------------------------------------------------------------------------
	var is_firefox = function is_firefox() {
		if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
			return 1;
		}
	}

	// 01.4 Check IE (< IE10)
	//----------------------------------------------------------------------------------
	var isIE = function isIE() {
 		if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident\/7\./)) {
   		 	return 1;
		}
	}

	// 01.5 Check IE11
	//----------------------------------------------------------------------------------
	var isIE11 = function isIE11() {
 		if (!!navigator.userAgent.match(/Trident\/7\./)) {
   		 	return 1;
		}
	}

	// 01.6 Check IE11 (Not Windows Phone)
	///----------------------------------------------------------------------------------
	var isIE11desktop = function isIE11desktop() {
 		if (!!navigator.userAgent.match(/Trident\/7\./) && window.navigator.userAgent.indexOf("Windows Phone") < 0) {
   		 	return 1;
		}
	}

	// 01.7 Check IE10
	//----------------------------------------------------------------------------------
	var isIE10 = function isIE10() {
 		if (window.navigator.userAgent.indexOf("MSIE 10.0") > 0) {
   		 	return 1;
		}
	}

	// 01.8 Check IE9
	//----------------------------------------------------------------------------------
	var isIE9 = function isIE9() {
 		if (window.navigator.userAgent.indexOf("MSIE 9.0") > 0) {
   		 	return 1;
		}
	}

	// 01.9 Check Safari/Chrome Mac
	//----------------------------------------------------------------------------------
	var isSafari = function isSafari() {
	 	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1) {
   		 	return 1;
		}
	}


	// 02. FULLSCREEN CLASS
	//==================================================================================
	var fullscreen = function(){
		var fheight = $(window).height();
		$('.fullscreen').css("height",fheight);
	}

	//Execute on load
	fullscreen();

	//Execute on window resize
	$(window).resize(function() {
		fullscreen();
	});

	// // 03. HIDDEN ALL ANIMATION CLASS
	// //==================================================================================
	// // Waypoint will animate it later (04.5 Waypoint Animate CSS)
	// if( !device.tablet() && !device.mobile() && !isIE9() ) {
	// 		$('.animation').css({
	// 			visibility: 'hidden'
	// 		});
	// }

	// 04. PACE PRELOADER
	//==================================================================================
	Pace.on('done', function () {
		$('#preloader').hide();
	});

	Pace.on('hide', function () {

		// 04.1 Gallery - Masonry
		//------------------------------------------------------------------------------
		var $gallery = $('#masonry-gallery');

		if (device.tablet() || device.mobile()) {
			$gallery.masonry({
				columnWidth: ".grid-sizer",
				itemSelector: ".masonry-col",
				gutter: ".gutter-sizer",
				transitionDuration: 0,
			});
		}
		else
		{
			$gallery.masonry({
				columnWidth: ".grid-sizer",
				itemSelector: ".masonry-col",
				gutter: ".gutter-sizer",
				transitionDuration: "1s",
			});
		}


		// 04.2 Nav Header Position (Mobile)
		//------------------------------------------------------------------------------
		if (device.tablet() || device.mobile()) {
			if ($("#nav-bar").hasClass("sticky-nav")) {
				$("#nav-header").css("position","relative");
			}
		}

		// 04.3 Waypoint Sticky Navbar
		//------------------------------------------------------------------------------
		if ($("#nav-bar").hasClass("sticky-nav")){

			// 04.3.1 Top Bar
			if ($("#nav-bar").hasClass("top-bar")){

	 			var nav_header_waypoint = $('#nav-header').waypoint(function(direction) {

					if (direction === 'down') {
						if( !device.tablet() && !device.mobile() ) {
							$("#nav-bar").addClass("stick-it animated fadeInDownBig");
						}
						else
						{
							$("#nav-bar").addClass("stick-it");
						}
					}
					else {
						$("#nav-bar").removeClass("stick-it animated fadeInDownBig");
					}

				}, {
  					offset:'-100%'
				});
			}

			// 04.3.2 Bottom Bar
			else if  ($("#nav-bar").hasClass("bottom-bar")){

				var waypoints = $('#nav-header').waypoint(function(direction) {

					if (direction === 'down') {
						if( !device.tablet() && !device.mobile() ) {
							$("#nav-bar").addClass("stick-it animated fadeInDownBig");
						}
						else
						{
							$("#nav-bar").addClass("stick-it");
						}
					}
					else if (direction === 'up') {
						$("#nav-bar").removeClass("stick-it animated fadeInDownBig");
					}

				}, {
  					offset:'-145px'
				});
			}

		}

		// 04.4 Waypoint Sticky Menu Icon (Sidebar Version)
		//------------------------------------------------------------------------------

		var sticky_menuicon_waypoint = $('#menu-icon').waypoint(function(direction) {
			if (direction === 'down') {
				$('#sticky-menuicon').show();
			}
			else {
				$('#sticky-menuicon').hide();
			}

		}, {
  			offset:'-100%'
		})


		// 04.5 Waypoint Animate CSS
		//------------------------------------------------------------------------------
		if( !device.tablet() && !device.mobile() && !isIE9() ) {
			$('.animation').each(function(){
        		var _this = this;
        		var animation_waypoint = new Waypoint({
            		element: _this,
            		handler: function (direction) {
						$(this.element).css({ visibility: 'visible' });
						$(this.element).addClass('animated');
            			},
            			offset: '90%'
        			});
        	});

		}

		// 04.6 Stellar Parallax
		//------------------------------------------------------------------------------
	 	if( !device.tablet() && !device.mobile() && !isIE9() && !isIE10() && !isSafari() ) {
			$(".image-divider").css("background-attachment","fixed");
		 	$(window).stellar({
			 	horizontalScrolling: false,
				responsive: true,
		 	});
	 	}

	}); // END of Pace on Hide


	// 05. PRELOADER HEART ANIMATION (IE10 / 11)
	//==================================================================================
	if (isIE10() || isIE11()){
		$(".heart-animation").css("letter-spacing","normal");
	}

	// 05. IMAGE DIVIDER (Mobile / Tablet)
	//==================================================================================
	/*if (device.tablet() || device.mobile() || isIE9() || isIE10() ||isSafari()) {
		$(".image-divider").addClass("mobile");
	}*/

	// 06. BIND TOUCH FOR PHOTO ITEM (Mobile / Tablet)
	//==================================================================================
	$('.photo-item').bind('touchstart touchend', function(e) {
	});

	// 07. COUNTDOWN
	//===================================================================================
	if ($('#clock').length > 0) {
		var theday = new Date(2017, 8, 22);
		$('#clock').countdown('2017/09/22')
			.on('update.countdown', function (event) {
				var format = '%H:%M:%S';
	  			if(event.offset.totalDays > 0) {
	    			format = '%-n day%!n, ' + format;
	  			}
	  			if(event.offset.months > 0) {
	    			format = '%-m month%!m, ' + format;
	  			}
	  			$(this).html(event.strftime(format));
			});
	}

	// $('#countdown').countdown({until: theday, format: 'DHMS'});
	// // $('#countdown').countdown($.countdown.regionalOptions['custom-label']);
	//
	// $('#date-countdown').countdown({until: theday, format: 'DHMS'});

	// 08. MOBILE MENU
	//==================================================================================
	$("#mobile-nav").click(function(e){
		e.preventDefault()
		$("#nav-menu").toggleClass("open");
	});

	// Hide Menu After Click It. Will be used on onepage version.
	$("#nav-menu li a").click(function(){
		 if ($(this).attr("href") !== "#") {
			 $("#nav-menu").removeClass("open");
		 }
	});

	// 09. DOUBLE TAP DROP DOWN MENU
	//==================================================================================
	// if ($(window).width() > 991){
	// 	$( '#nav-menu' ).doubleTapToGo();
	// }

	// 10. OWL CAROUSEL
	//==================================================================================

	// 10.1 OWL CAROUSEL - GIFT REGISTRY
	//------------------------------------------------------------------------------
	if ($("#gift-registry").length){
    	$("#gift-registry").owlCarousel({
			items : 3,
			autoPlay: 2000,
			stopOnHover: true,
			pagination: true,
		});

		if (device.tablet() || device.mobile()) {
			var owl_gift = $("#gift-registry").data('owlCarousel');
			owl_gift.stop()
		}
	}

	// 10.2 OWL CAROUSEL - MORE EVENTS (ONEPAGE)
	//------------------------------------------------------------------------------
	if ($("#events-carousel").length){
    	$("#events-carousel").owlCarousel({
			items : 2,
			itemsDesktopSmall: [979,2],
			autoPlay: 2000,
			stopOnHover: true,
			pagination: true,
			navigation:false,
		});

		if (device.tablet() || device.mobile()) {
			var owl_events = $("#events-carousel").data('owlCarousel');
			owl_events.stop()
		}
	}

	// 10.3 OWL CAROUSEL - REGISTRY LOGO (ONEPAGE)
	//------------------------------------------------------------------------------
	if ($("#registry-logo").length){
    	$("#registry-logo").owlCarousel({
			items : 3,
			autoPlay: 2000,
			stopOnHover: true,
			pagination: false,
			navigation: false,
		});

		if (device.tablet() || device.mobile()) {
			var owl_logo = $("#registry-logo").data('owlCarousel');
			owl_logo.stop()
		}
	}


	// 11. RSVP
	//==================================================================================
	// if ($("#rsvpform").length){
	// 	$("#rsvpform").ajaxrsvp();
	// }
	$('form#rsvpform input').on('keyup keypress', function (e) {
		var keyCode = e.keyCode || e.which;
  		if (keyCode === 13) { 
    		e.preventDefault();
    		return false;
  		}
	});

	$('form#rsvpform').on('submit', function (e) {
		e.preventDefault();

		$('div.form-group').removeClass('bg-danger');
		$('p.help-block').empty();

		var $footer = $('div#form-footer'),
			$messagep = $('p#form-message'),
			valid = true,
			error_message = '',
			footer_message = '',
			attending = $('select#attending').val();

		$footer.removeClass('bg-danger bg-success text-danger text-success');
		$messagep.empty();

		if ($('input#name').val().trim().length == 0) {
			error_message = "You have to <strong>at least</strong> tell us who you are.";
			footer_message += error_message + '<br>';
			$('div#form-group-name').addClass('bg-danger');
			$('div#form-group-name > p.help-block').html(error_message);

			valid = false;
		}
		if (!($('select#attending').val())) {
			error_message = "Are you coming or not?";
			footer_message += error_message;
			$('div#form-group-attending').addClass('bg-danger');
			$('div#form-group-attending > p.help-block').html(error_message);

			valid = false;
		}
		else {
			var $guests = $('input#num_guests');

			if (attending == "1") {
				// attending but didn't tell how many
				if ($guests.val().trim().length == 0 || isNaN($guests.val().trim())) {
					error_message = "If you're coming, we need to know how many there are in the group you're responding for.";
					footer_message += error_message;
					$('div#form-group-attending').addClass('bg-danger');
					$('div#form-group-num-guests > p.help-block').html(error_message);

					valid = false;
				}
				else if ($guests.val().trim() == "0") {
					error_message = "C'mon. You're not bringing zero people.";
					footer_message += error_message;
					$('div#form-group-attending').addClass('bg-danger');
					$('div#form-group-num-guests > p.help-block').html(error_message);
				}
				else if (parseInt($guests.val().trim()) < 0) {
					error_message = "Really... you're bringing <i>negative</i> people to the wedding?";
					footer_message += error_message;
					$('div#form-group-attending').addClass('bg-danger');
					$('div#form-group-num-guests > p.help-block').html(error_message);
				}
			}
			else {
				// not attending, clear song & num of guests
				$guests.val('');
				$('input#song_request').val('');
			}
		}

		if (valid) {
			var formdata = $(this).serialize();
			
			$.ajax({
				url: 'rsvp.php',
				type: 'post',
				data: formdata,
				success: function (data, status) {
					if (data == 'success') {
						$footer.addClass('bg-success text-success');
						if (attending == "1")
							$messagep.html("RSVP received. Thanks for coming! We'll see you in September!");
						else
							$messagep.html('RSVP received. Wish you could make it. <i class="fa fa-frown-o"></i>');
					}
				},
				error: function (data, status, errorThrown) {
					console.log('Error', data, status, errorThrown);
				}

			});
		}
		else {
			$footer.addClass('bg-danger text-danger');
			$messagep.html(footer_message);
		}
	});

	$('select#attending').on('change', function (e) {
		if ($(this).val() == "1") {
			$('div.attending-only').removeClass('hidden');
			$('div#form-group-attending').addClass('m-b-none');
		}
		else {
			$('div.attending-only').addClass('hidden');
			$('div#form-group-attending').removeClass('m-b-none');
		}
	});

	// 11.1 Custom Checkbox
	//----------------------------------------------------------------------------------
	$(".ajax-checkbox .custom-option-icon").click(function(){
		$(this).toggleClass( "active-icon" );
	});

	// 11.2 Custom Radio
	//----------------------------------------------------------------------------------
	$(".ajax-radio .custom-option-icon").click(function(){
		if (!($(this).parent().hasClass("radio"))){
			$(this).siblings().removeClass( "active-icon" );
			$(this).addClass( "active-icon" );
		}
		else{
			$(this).parent().siblings().children(".custom-option-icon").removeClass( "active-icon" );
			$(this).addClass( "active-icon" );
		}
	});

	// 12. SMOOTH SCROLL
	//=========================================================================
	$('a.smooth-scroll').smoothScroll({
		speed: 1000,
	});

	$('.nav-smooth-scroll a').smoothScroll({
		speed: 1000,
		offset: -80,
	});

	// // 13. MAGNIFIC POPUP
	// //==================================================================================
    //
	// // 13.1 Magnific Zoom
	// //----------------------------------------------------------------------------------
	// $('.magnific-zoom').magnificPopup({
 // 		type: 'image',
	// 	image: {
    // 		// options for image content type
    // 		titleSrc: 'title'
 // 		},
	// 	//fixedContentPos:true,
	// 	callbacks: {
    // 		open: function() {
    //   			// Will fire when this exact popup is opened
    // 		},
    // 		afterClose: function() {
    //   			// Will fire when popup is closed
    // 		}
 //  		},
	// });
    //
	// // 13.2 Magnific Zoom Gallery
	// //----------------------------------------------------------------------------------
	// $('.magnific-zoom-gallery').magnificPopup({
 // 		type: 'image',
	// 	image: {
    // 		// options for image content type
    // 		titleSrc: 'title'
 // 		},
	// 	gallery: {
    //      	 enabled:true
    //     },
	// 	//fixedContentPos:true,
	// 	callbacks: {
    // 		open: function() {
    //   			// Will fire when this exact popup is opened
    // 		},
    // 		afterClose: function() {
    //   			// Will fire when popup is closed
    // 		}
 //  		},
	// });
    //
	// // MAGNIFIC AJAX
	// //==================================================================================
	// $('.magnific-ajax').magnificPopup({
 //  		type: 'ajax',
	// 	ajax: {
	// 		settings: {cache:false}
	// 		// Ajax settings object that will extend default one - http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings
	// 		// For example:
	// 		// settings: {cache:false, async:false}
	// 	},
	// 	callbacks: {
    // 		open: function() {
    //   			// Will fire when this exact popup is opened
    // 		},
    // 		afterClose: function() {
    //   			// Will fire when popup is closed
    //
    // 		}
 //  		},
	// });

	// 14. DISALBE TRANSITION (Mobile / Tablet)
	//==================================================================================
	if( device.tablet() || device.mobile() ) {
		if (!isIE11desktop()){
			// de-icon
			$(".de-icon, .de-icon i").css("transition","none");

			// Photo-item
			$(".photo-item img.hover-animation").css("transition","none");
			$(".photo-item .layer.hover-animation").css("transition","none");
		 }
	 }
});
