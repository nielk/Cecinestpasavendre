var target = document.getElementById('spinner');
new Spinner({color:'#fff', lines: 12}).spin(target);

var myApp = angular.module('myApp',['ngResource', 'ngUpload']);

myApp.factory('Chose', function($resource) {
	return $resource('/chose');
});

function myCtrl($scope, Chose) {
	$scope.number = ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix'];
	$scope.num01 = Math.floor((Math.random()*10)+1);
	$scope.num02 = Math.floor((Math.random()*10)+1);
	$scope.result = $scope.num01 + $scope.num02;
	$scope.answer = 0;
	$scope.fileValid = 0;
	$scope.chose = {};

	$scope.fileChanged = function() {
		$scope.fileValid = 1;
	};

	$scope.isFileChanged = function() {
		return $scope.fileValid === 1;
	};

	// if captcha is correct return true
	$scope.ok = function() {
		return $scope.answer == $scope.result ? true : false;
	};

	// verify if all fields are correct
	$scope.valideForm = function() {
		// if($scope.ok() && $scope.chose_form.$valid && $scope.isFileChanged()) {
		if($scope.ok() && $scope.chose_form.$valid) {
			return false;
		}
		else {
			return true;
		}
	};

	$scope.choseForm = function() {
		var newChose = new Chose($scope.chose);
		newChose.$save();
	};

	$scope.results = function(content, completed) {
		if (completed && content.length > 0) {
			$scope.showLoader = false; // hide loading spinner
			alert('Votre objet a bien été reçu ! \nVous recevrez un email lorsqu\'il sera validé.\nMerci de votre participation !');	
			$scope.response = content;    
			$scope.chose = {};
			location.reload();
		} else {
		}
	};
}

function listCtrl($scope, Chose) {
	$scope.choses = Chose.query();
};/* Menu animation */
$(document).ready(function() {
	$('#form-container').toggle();

	$('#button-form-toggle').click(function() {
		$('#form-container').slideToggle('slow');
		$('html, body').animate({scrollTop:0}, '500', 'swing');
	});

	var header = $('.nav-header'),
		ended = false,
		offset = 50;

	var switchHeaderClass = function() {
		var currentOffset = getCurrentOffSet();
		if(currentOffset >= offset){
			header.addClass('nav-header-shrink');
		}
		else {
			header.removeClass('nav-header-shrink');
		}
		ended = false;
	};

	var getCurrentOffSet = function() {
		return window.pageYOffset|| document.documentElement.scrollTop;
	};

	window.addEventListener('scroll',function(evt){
		if(!ended){
			ended=true;
			setTimeout(switchHeaderClass, 250);
		}
	},false);
});;$(document).ready(function (){

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

	scrollAnimation('#picto-min-9, #picto-min-landscape-9, #picto9','#propos');

	scrollAnimation('#scroll-top, #logo', '#top');
});;$(document).ready(function(){
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
});;(function(doc, script) {
  var js, 
      fjs = doc.getElementsByTagName(script)[0],
      frag = doc.createDocumentFragment(),
      add = function(url, id) {
          if (doc.getElementById(id)) {return;}
          js = doc.createElement(script);
          js.src = url;
          id && (js.id = id);
          frag.appendChild( js );
      };
      
    // Facebook SDK
    add('//connect.facebook.net/en_US/all.js#xfbml=1', 'facebook-jssdk');
    // Twitter SDK
    add('//platform.twitter.com/widgets.js');

    fjs.parentNode.insertBefore(frag, fjs);
}(document, 'script'));