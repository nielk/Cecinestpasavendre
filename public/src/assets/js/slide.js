// $(document).ready(function() {
// 	// $('.slideButton, button[type=button], .slideButton-illus').click(function() {
// 	// 	var thisSlide = $(this).closest('ul.slide');
// 	// 	thisSlide.toggleClass('slided');
// 	// });

// 	// $('#picto9, #picto-min-9, #picto-min-landscape-9').click(function() {
// 	// 	var thisSlide = $(this).closest('#top').find('#section-00').children('ul.slide');
// 	// 	thisSlide.toggleClass('slided');
// 	// });

	
// });


$(document).ready(function(){
  var $slides	= $(".slide");
  
  TweenLite.set($slides.filter(":odd"), {left:"100%"});	
    
  // $(".slide:nth-child(odd)").on("click", function() {
  //   var thisSlide = $(this).closest('.slide');
  //   TweenLite.to(thisSlide, 1, {left:"-100%"});
  //   TweenLite.to(thisSlide.next(), 1, {left:"0px"});
  // });
  
  // $(".slide:nth-child(even)").on("click", function() {
  //   var thisSlide = $(this).closest('.slide');
  //   TweenLite.to(thisSlide, 1, {left:"100%"});
  //   TweenLite.to(thisSlide.prev(), 1, {left:"0px"});
  // });

$(".slideButton-illus, .slideButton").on("click", function() {
    var thisSlide = $(this).parent().parent().parent('.slide');
    thisSlide.next().addClass('slide-show');
    console.log(thisSlide);
    TweenLite.to(thisSlide, 1, {left:"-100%"});
    TweenLite.to(thisSlide.next(), 1, {left:"0px"});
  });

  $("#picto9, .qui, #picto-min-9, #picto-min-landscape-9").on("click", function() {
    var thisSlide = $(this).closest('#top').find('#section-00').find('.slide');
    thisSlide.next().addClass('slide-show');
    console.log(thisSlide);
    TweenLite.to(thisSlide, 1, {left:"-100%"});
    TweenLite.to(thisSlide.next(), 1, {left:"0px"});
  });
  
  $(".slide-button-2").on("click", function() {
    var thisSlide = $(this).parent().parent().parent('.slide');
    TweenLite.to(thisSlide, 1, {left:"100%"});
    TweenLite.to(thisSlide.prev(), 1, {left:"0px"});
  });

  $("button[type=button]").on("click", function() {
    var thisSlide = $(this).parent().parent().parent().parent('.slide');
    TweenLite.to(thisSlide, 1, {left:"100%"});
    TweenLite.to(thisSlide.prev(), 1, {left:"0px"});
  });
});