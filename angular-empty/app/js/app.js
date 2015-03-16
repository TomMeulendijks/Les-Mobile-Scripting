// Notes
// http://www.techumber.com/2012/09/how-to-get-feedburner-jsonp-format.html
// http://stackoverflow.com/questions/14665856/how-do-i-update-one-controller-with-data-from-another-controller-with-a-service/14667066#14667066
// http://stackoverflow.com/questions/11276520/can-angular-js-auto-update-a-view-if-a-persistent-model-server-database-is-cha

var NewsApp = angular.module('NewsApp', ['ngRoute']);
	
NewsApp.controller('NewsController', ['$scope', '$http', function($scope, $http) {

    $http.get('nieuws.json')
       .then(function(res){
            console.log(res.data);
          $scope.nieuws = res.data.responseData.feed.entries;                
        });

}]);

    
NewsApp.controller('NewsControllerCultuur', ['$scope', '$http', function($scope, $http) {
    
     $http.get('nieuws.json')
       .then(function(res){
            var entries =res.data.responseData.feed.entries;
            var EL = entries.length;
            $scope.nieuws = [];
            for(var i = 0; EL>i; i++){

                if(inArray('cultuur', entries[i].categories))
                                        $scope.nieuws.push(entries[i]);                
            }
        });
}]);

NewsApp.controller('NewsControllerPersberichten', ['$scope', '$http', function($scope, $http) {

   $http.get('nieuws.json')
       .then(function(res){
            var entries =res.data.responseData.feed.entries;
            var EL = entries.length;
            $scope.nieuws = [];
            for(var i = 0; EL>i; i++){

                if(inArray('Persberichten', entries[i].categories))
                                        $scope.nieuws.push(entries[i]);                
            }
        });

}]);



NewsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    	when('/', {
    		templateUrl: 'views/nieuws-archief.html',
        	controller: 'NewsController'
    	}).
    	when('/cultuur/', {
    		templateUrl: 'views/nieuws-archief.html',
        	controller: 'NewsControllerCultuur'
    	})
        .when('/persberichten/', {
            templateUrl: 'views/nieuws-archief.html',
            controller: 'NewsControllerPersberichten'
        })
        .when('/nieuws/:newsSlug', {
    		templateUrl: 'views/single.html',
        	controller: 'NewsControllerDetail'
    	})  
		.otherwise({
			redirectTo: '/'
		});
  }]);

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}