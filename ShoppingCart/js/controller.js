

// the storeController contains two objects:
// - store: contains the product list
// - cart: the shopping cart object
function storeController($scope, $routeParams, DataService, $http) {
  $scope.newItem={};
    // get store and cart from service
    // $scope.store = DataService.store;
    // $scope.menu = DataService.menu;
    $scope.cart = DataService.cart;
    // window.cart = DataService.cart;
    $http.get('http://localhost:8441/items')
      .success(function(data){
        console.log(data);
        $scope.store=data;
      });


    // use routing to pick the selected product
    if ($routeParams.productSku !== null) {
        // $scope.product = $scope.store.getProduct($routeParams.productSku);
    }

    $scope.addItem = function(){
      $http.post('http://localhost:8441/item', $scope.newItem)
        .success(function(data){
          console.log(data);
        })
        .error(function(data){
          console.log(data);
        });
    };

}
