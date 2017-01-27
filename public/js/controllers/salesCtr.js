whola.controller('salesCtr', function($scope, $compile, $http, $filter) {
	
	$scope.newProduct = {};
	$scope.products = {};
	$scope.categories = {};
	$scope.selected = false;	
	
	var date = new Date();
	var date2 = date.setDate(date.getDate() + 1);
	var newDate = $filter('date')(new Date(), 'dd-MM-yy');
	var newDate2 = $filter('date')(date2, 'dd-MM-yy');
	
	$scope.dateStart = newDate;
	$scope.dateEnd = newDate2;
	
	/*PRODUCTS*/
	$scope.getRandomSpan = function(){
		var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < 10; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));
		
		return text;
	}
	
	$scope.addProduct = function(){
		var compiledeHTML = $compile("<div add-Product></div>")($scope);
		$('#addProduct').append(compiledeHTML);
	}
	
	$scope.productDetail = function(){
		
	}
	
	// Obtenemos todos los productos de la base de datos
	$http.get('/api/product', {params: {tipo: 'brand', orden: 1}}).then(function(data) {
		console.log(data);
		$scope.products = data.data;
	})
	.catch(function(data) {
		console.log('Error: ' + data);
	});
	
	// Función para registrar a un producto
	$scope.registerProduct = function() {
		$http.post('/api/product', $scope.newProduct).then(function(data) {
				$scope.newProduct = {}; // Borramos los datos del formulario
				$scope.products = data.data;
			})
		.catch(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para editar los datos de una persona
	$scope.updateProducts = function(newProduct) {
		$http.put('/api/product/' + $scope.newProduct._id, $scope.newProduct)
		.then(function(data) {
				$scope.newProduct = {}; // Borramos los datos del formulario
				$scope.products = data.data;
				$scope.selected = false;
			})
		.catch(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función que borra un objeto persona conocido su id
	$scope.removeProducts = function(newProduct) {
		$http.delete('/api/product/' + $scope.newProduct._id)
		.then(function(data) {
			$scope.newProduct = {};
			$scope.products = data.data;
			$scope.selected = false;
		})
		.catch(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para coger el objeto seleccionado en la tabla
	$scope.selectProduct = function(product) {
		console.log(product.idCategory.name);
		$scope.newProduct = product;
		$scope.selected = true;
		
		var compiledeHTML = $compile("<div product-Detail></div>")($scope);
		$('#productDetail').html('');
		$('#productDetail').append(compiledeHTML);
	};
	

	/* END PRODUCTS */
	
	
	/* CATEGORIES */
	
	// Obtenemos todos las categorías de la base de datos
	$http.get('/api/category', {params: {tipo: 'name', orden: 1}}).then(function(data) {
		$scope.categories = data.data;
	})
	.catch(function(data) {
		console.log('Error: ' + data);
	});
	
	// Función para registrar una categoria
	$scope.registerCategory = function() {
		$http.post('/api/category', $scope.newCategory).then(function(data) {
				$scope.newCategory = {}; // Borramos los datos del formulario
				$scope.categories = data.data;
			})
		.catch(function(data) {
			console.log('Error: ' + data);
		});
	};
	
	// Función para editar los datos de una categoría
	$scope.updateCategory = function(newCategory) {
		$http.put('/api/category/' + $scope.newCategory._id, $scope.newCategory)
		.then(function(data) {
				$scope.newCategory = {}; // Borramos los datos del formulario
				$scope.categories = data.data;
				$scope.selected = false;
			})
		.catch(function(data) {
			console.log('Error: ' + data);
		});
	};
	
	// Función que borra un objeto persona conocido su id
	$scope.removeCategory = function(newCategory) {
		$http.delete('/api/category/' + $scope.newCategory._id)
		.then(function(data) {
			$scope.newCategory = {};
			$scope.categories = data.data;
			$scope.selected = false;
		})
		.catch(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para coger el objeto seleccionado en la tabla
	$scope.selectCategory = function(category) {
		$scope.newCategory = category;
		$scope.selected = true;
	};
	
	$scope.selectCategoryItem = function(newProduct) {
		console.log(newProduct);
		for(category in $scope.categories) {
			if(this.newProduct.idCategory_id == $scope.categories[category]._id) {
				console.log('in');
			}
		}
	}
	/* END CATEGORIES */
	
	/* CHARTS */
    var chart1 = {};
    chart1.type = "ColumnChart";
    chart1.cssStyle = "height:250px; width:100%; margin:30px 0px 20px 0px";
    chart1.data = {"cols": [
        {id: "month", label: "Month", type: "string"},
        {id: "sales", label: "Sales", type: "number"}
        //{id: "desktop-id", label: "Desktop", type: "number"},
        //{id: "server-id", label: "Server", type: "number"},
        //{id: "cost-id", label: "Shipping", type: "number"}
    ], "rows": [
        {c: [
            {v: "January"},
            {v: 19, f: "42 items"}
            //{v: 12, f: "Ony 12 items"},
            //{v: 7, f: "7 servers"},
            //{v: 4}
        ]},
        {c: [
            {v: "February"},
            {v: 13},
            //{v: 1, f: "1 unit (Out of stock this month)"}
            //{v: 12},
            //{v: 2}
        ]},
        {c: [
            {v: "March"},
            {v: 24},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]},
        {c: [
            {v: "April"},
            {v: 34},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]},
        {c: [
            {v: "May"},
            {v: 32},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]},
        {c: [
            {v: "June"},
            {v: 24},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]},
        {c: [
            {v: "July"},
            {v: 54},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]},
        {c: [
            {v: "September"},
            {v: 24},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]},
        {c: [
            {v: "October"},
            {v: 14},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]},
        {c: [
            {v: "November"},
            {v: 44},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]},
        {c: [
            {v: "December"},
            {v: 64},
            //{v: 0},
            //{v: 11},
            //{v: 6}

        ]}
    ]};

    chart1.options = {
        title: "Sales per month",
        isStacked: "true",
		chartArea: { width: '96%' },
		legend: { position: "none" },
        displayExactValues: true,
        vAxis: {
            "gridlines": {count: 5}
        },
        hAxis: {
            title: Date,
			textStyle: {
				fontSize: 10
			}
        },
		colors: ['#34b6e4']
    };

    chart1.formatters = {};

    $scope.salesChart = chart1;
	
});