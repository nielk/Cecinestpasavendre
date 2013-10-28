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
}