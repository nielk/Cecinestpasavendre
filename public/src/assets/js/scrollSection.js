$(document).ready(function (){

	var scrollAnimation = function(picto, section) {
		$(picto).click(function (){
			if($(window).width()>1024) {
			$('body,html').animate({
				scrollTop: $(section).offset().top - $('html').height() * 0.1
			}, 1000);
		} else {
			$('body,html').animate({
				scrollTop: $(section).offset().top
			}, 1000);
		}
		});
	};

	for(var i=1; i<9; i++) {
		scrollAnimation('#picto'+i, '#section-0'+i);
	}

	for(i=1; i<9; i++) {
		scrollAnimation('#picto-min-'+i, '#section-0'+i);
	}

	for(i=1; i<9; i++) {
		scrollAnimation('#picto-min-landscape-'+i, '#section-0'+i);
	}

	scrollAnimation('#logo, #picto-min-9, #picto-min-landscape-9, #picto9','#propos');

	scrollAnimation('#scroll-top', '.container');
});