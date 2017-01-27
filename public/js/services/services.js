whola.factory('getSalesDataServ', function($http){
	var data = {};
	return {
		getData: function() {
			return data;
		}
	}

});