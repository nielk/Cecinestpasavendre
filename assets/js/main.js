;var myApp = angular.module('myApp',['ngResource', 'ngUpload']);
 
myApp.factory('data', function(){
return {author: '',
email: '',
title: '',
content: ''}
});



myApp.directive('validFile',function(){
  return {
    require:'ngModel',
    link:function(scope,el,attrs,ngModel){
      //change event is fired when file is selected
      el.bind('change',function(){
        scope.$apply(function(){
          ngModel.$setViewValue(el.val());
          ngModel.$render();
        });
      });
    }
  }
});

myApp.factory('chose', function($resource){
    return $resource('/chose');
});

function myCtrl($scope, data, $resource){
	$scope.number = ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix'];
	$scope.num01 = Math.floor((Math.random()*10)+1);
	$scope.num02 = Math.floor((Math.random()*10)+1);
	$scope.result = $scope.num01 + $scope.num02;
	$scope.answer = 0;
	$scope.fileValid = 0;
	$scope.chose = {};

	$scope.fileChanged = function() {
		$scope.fileValid = 1;
	}

	$scope.isFileChanged = function() {
		if($scope.fileValid == 1) {
			return true;
		} else {
			return false;
		}
	}

	// if captcha is correct return true
	$scope.ok = function() {
		return $scope.answer == $scope.result ? true : false;
	}

	// verify if all fields are correct
	$scope.valideForm = function(){
		if($scope.ok() && $scope.chose_form.$valid && $scope.isFileChanged()){
		return false;
	} else {
		return true;
	}
	}

	$scope.choseForm = function() {
		var Chose = $resource('/chose');
		var newChose = new Chose($scope.chose);
		newChose.$save();

	}

	$scope.results = function(content, completed){
		if (completed && content.length > 0) {
			console.log(content);
			$scope.response = content;
			$scope.response.style = {
		        color: $scope.response.color,
		        "font-weight": "bold"
		    };
		    alert(response);
		    location.reload();
			$scope.chose.author = '';
			$scope.chose.email = '';
			$scope.chose.title = '';
			$scope.chose.content = '';
			$scope.chose.image = '';
		} else {

		}
	}

}

function listCtrl($scope, $resource, chose) {
	$scope.choses = chose.query();


	// var moreChoses = function() {
	// 	$scope.numberItem = 10;
	// }
	// scroll bottom event to display more choses
	// $(document).ready(function (){
	// 	    function loadMore() {
	// 	      console.log("More loaded");
		      
	// 	    }
	// 	    function bindScroll(){
	// 	      if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
	// 	        $(window).unbind('scroll');
	// 	        loadMore();
	// 	      }
	// 	    }
	// 	    $(window).scroll(bindScroll);
	// });

}

;/* Menu animation */
$(document).ready(function() {
  $("#form-container").toggle();

  $("#button-form-toggle").click(function(){
    $("#form-container").slideToggle('slow');
    $("html, body").animate({scrollTop:0}, '500', 'swing', function() { 
});
  });

  var header = $('.nav-header'),
      ended = false,
      offset = 50;

  var switchHeaderClass = function(){
      var currentOffset = getCurrentOffSet();
      if(currentOffset >= offset){
        header.addClass('nav-header-shrink');
      }
      else {
        header.removeClass('nav-header-shrink');
      }
      ended=false;
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

});;
$(document).ready(function (){

    // alert($(window).width());

    var scrollAnimation = function(picto, section) {
        $(picto).click(function (){
            if($(window).width()>1024) {
            $('body,html').animate({
                scrollTop: $(section).offset().top - $('html').height() * .1
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

    for(var i=1; i<9; i++) {
        scrollAnimation('#picto-min-'+i, '#section-0'+i);
    }

    for(var i=1; i<9; i++) {
        scrollAnimation('#picto-min-landscape-'+i, '#section-0'+i);
    }
    
    scrollAnimation('#logo, #picto-min-9, #picto-min-landscape-9, #picto9','#propos');

    scrollAnimation('#scroll-top', '.container');
});;$(document).ready(function() {
    $('.slideButton, button[type=button], .slideButton-illus').click(function() {
	    var thisSlide = $(this).closest('ul.slide');
	    thisSlide.toggleClass('slided');
    });

    $('#picto9, #picto-min-9, #picto-min-landscape-9').click(function() {
    	var thisSlide = $(this).closest('#top').find('#section-00').children('ul.slide');
    	thisSlide.toggleClass('slided');
    });

    
});
;var videoEvent = function(id){
	videojs(id).ready(function(){
		var myPlayer = this;

		var myFunc = function(){
			var myPlayer = this;

			// Do something when the event is fired
			$('#container-nav').toggleClass('fullscreen-ie');
			$('#scroll-top').toggleClass('fullscreen-ie');
		};

		var stopBuffering = function(){
			videojs(id).pause();
		};

		myPlayer.on("fullscreenchange", myFunc);

		var btn = document.getElementById(id).parentNode.getElementsByTagName('button')[0];

		btn.onclick = function() {
	    		stopBuffering();
    		};
	});
}



for(var i = 1; i <= 8; i++) {
	videoEvent("video-player-0"+i);
}