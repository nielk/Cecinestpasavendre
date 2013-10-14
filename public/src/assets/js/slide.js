$(document).ready(function() {
    $('.slideButton, button[type=button], .slideButton-illus').click(function() {
	    var thisSlide = $(this).closest('ul.slide');
	    thisSlide.toggleClass('slided');
    });

    $('#picto9, #picto-min-9, #picto-min-landscape-9').click(function() {
    	var thisSlide = $(this).closest('#top').find('#section-00').children('ul.slide');
    	thisSlide.toggleClass('slided');
    });

    
});
