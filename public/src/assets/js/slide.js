$(document).ready(function(){
  var $slides	= $('.slide');
  
  TweenLite.set($slides.filter(':odd'), {left:'100%'});	

  $('.slideButton').on('click', function() {
    var thisSlide = $(this).parent().parent().parent('.slide');
    thisSlide.next().addClass('slide-show');
    TweenLite.to(thisSlide, 1, {left:'-100%'});
    TweenLite.to(thisSlide.next(), 1, {left:'0px'});
  });

  $('.slideButton-illus').on('click', function() {
    var thisSlide = $(this).parent().parent().parent('.slide');
    thisSlide.next().addClass('slide-show');
    TweenLite.to(thisSlide, 1, {left:'-100%'});
    TweenLite.to(thisSlide.next(), 1, {left:'0px'});
  });

  $('#picto9, .qui, #picto-min-9, #picto-min-landscape-9').on('click', function() {
    var thisSlide = $(this).closest('#top').find('#section-00').find('.slide');
    thisSlide.next().addClass('slide-show');
    TweenLite.to(thisSlide, 1, {left:'-100%'});
    TweenLite.to(thisSlide.next(), 1, {left:'0px'});
  });
  
  $('.slide-button-2').on('click', function() {
    var thisSlide = $(this).parent().parent().parent('.slide');
    TweenLite.to(thisSlide, 1, {left:'100%'});
    TweenLite.to(thisSlide.prev(), 1, {left:'0px'});
  });

  $('button[type=button]').on('click', function() {
    var thisSlide = $(this).parent().parent().parent().parent('.slide');
    TweenLite.to(thisSlide, 1, {left:'100%'});
    TweenLite.to(thisSlide.prev(), 1, {left:'0px'});
    // pause the video
    var video = $(this).prev().find('video')[0];
    if (video) video.pause();
  });
});