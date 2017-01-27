

whola.controller('clientsCtr', function($scope, $compile, $http, $filter) {
	
	$scope.clientInfo = {};
	
	// Función para registrar una categoria
	$scope.getClientInfo = function() {
		$http.get('/users/getClientInfo').then(function(data) {
				console.log(data.data[0]);
				$scope.clientInfo = data.data[0];
			})
		.catch(function(data) {
			console.log('Error: ' + data);
		});
	};
	
	$scope.getClientActivity = function() {
		$http.get('/users/getClientActivity').then(function(data) {
				console.log(data.data[0]);
				$scope.clientInfo = data.data[0];
			})
		.catch(function(data) {
			console.log('Error: ' + data);
		});
	};
	
	$scope.showPurchaseInfo = function($event) {
		var element = $event.path[3];
		if($(element).hasClass('active')){
			$(element).removeClass('active');
		} else {
			$(element).addClass('active');
		}
	} 
	
	$scope.updateClient = function() {
		
		var crsfToken = $('.crsfToken').val();
		
		var data = $.param({});
		var config = { headers : {'X-CSRF-Token': crsfToken} };
		
		$http.put('/users/saveUser/' + $scope.clientInfo._id, $scope.clientInfo, config).then(function(data) {
			console.log(data.data);
			$scope.clientInfo = {}; // Borramos los datos del formulario
			$scope.clientInfo = data.data;
			$scope.selected = false;
		}).catch(function(data) {
			console.log('Error: ' + data);
		});
	};
	
	$scope.clientInfo = $scope.getClientInfo();
});
