var myApp = angular.module('myApp',['ngResource', 'ngUpload']);
 
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
			
		   
		    
			$scope.chose = {};
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

