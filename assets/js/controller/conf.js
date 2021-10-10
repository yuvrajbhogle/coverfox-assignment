var app = angular.module("coverfox", []);

app.controller('indexCtrl', function($scope, $http, $window, $filter,$location, $timeout, $rootScope) {
		

    $scope.carDetails = {};
    $scope.showAll = false;
    $scope.pageN = 0;
    $scope.carDetails.fuelType = 0;

    $http.get('json/vehicle-make.json').then(function(response) {
        $scope.pageN = 1;
        $scope.vehicleMake = response.data;
        if($scope.vehicleMake.success)
        $scope.vehicleMake = $scope.vehicleMake.data;
     });


     $scope.getCarsForCompany = function(item){
        $scope.pageN = 2;
        $scope.carDetails.carBrand = item.name;
        $scope.showAll = false;
        $http.get('json/make/'+item.id+'.json').then(function(response) {
            $scope.vehicleMakeCars = response.data;
            if($scope.vehicleMakeCars.success)
            $scope.vehicleMakeCars = $scope.vehicleMakeCars.data;
            console.log('Cars',$scope.vehicleMakeCars);
         });
     }

     $scope.getFuelModelsForCars = function(data){
        $scope.pageN = 3;
        $scope.carDetails.car = data.name;
        $scope.carDetails.fuelType =0;

        if(data.desktop_image_path){
            $scope.carDetails.image = data.desktop_image_path;
        }else{
            $scope.carDetails.image = "https://assets.coverfox.com/static/img/car-product/car_img/car_verify.png";
        }
        $scope.showAll = false;
        $scope.variants = data.variants;
        $scope.fuelList = [...new Set($scope.variants.map(item => item.fuel_type))];
     }

     $scope.setFuelType = function(fuelT){
        $scope.carDetails.fuelType = fuelT;
     }

     $scope.setCarModel = function(item)
     {
        $scope.pageN = 4;
        $scope.carDetails.cc = item.cc;
        $scope.carDetails.model = item.name;
        $scope.carDetails.yearOfRegistration = 2001;
     }


     $scope.getPlans = function(){
        $http.get('json/availableList.json').then(function(response) {
            $scope.availableList = response.data;
            if($scope.availableList.success)
            $scope.availableList = $scope.availableList.data.premiums;
            $scope.availableList = [...new Map($scope.availableList.map(item => [item["insurerId"], item])).values()];
         });
     }

     $scope.getPlanDetails = function(item){
        $scope.planDetails = item;
        $scope.planDetails.BuyPrice = 0;
        console.log("$scope.planDetails",$scope.planDetails)
     }

     $scope.addToTotal = function(newVal)
     {
         console.log("$scope.planDetails.BuyPrice", $scope.planDetails.BuyPrice);
        $scope.planDetails.BuyPrice += newVal;
     }

});