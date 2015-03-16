newsApp = angular.module('newsApp', ['ngRoute', 'ngSanitize']);

var newsModel = [];

newsApp.factory('newsFactory', ['$http','$sce', function($http, $sce) {

    var urlBase = '/nieuws.json';
    var newsFactory = {};

    return {
        updateNews: function(callback){
            $http.get(urlBase)
                .success(function(data, status, headers, config) {

                    for(var i = 0; data.entries.length>i; i++){
                        console.log('ok');
                        var title = data.entries[i].title.toLowerCase();
                        var slug = title.replace(new RegExp('[^0-9a-zA-Z ]+', 'g'), '').replace(new RegExp('\ ', 'g'), '-');
                        
                        console.log($sce)

                        slug = $sce.trustAsHtml(slug);
                        var content = data.entries[i].content;

                        newsModel.push({
                            title: title,
                            slug: slug,
                            content: content
                        });

                        callback();

                    }
                 
              });
        }
    }

}]);

newsApp.controller('NewsController', ['$scope', '$http','$sce', 'newsFactory', function($scope,$http,$sce, newsFactory) {

    newsFactory.updateNews(function(){
        $scope.nieuws = newsModel; 
    });


}]);

newsApp.controller('NewsSingleController', ['$scope', '$http','$routeParams', 'newsFactory', function($scope,$http, $routeParams, newsFactory) {

    newsFactory.updateNews(function(){
         for(var i =0; newsModel.length>i; i++){
            if(newsModel[i].slug == $routeParams.slug)
                    $scope.nieuws = newsModel[i];
            }
    });

}]);

newsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/nieuws-archief.html',
            controller: 'NewsController'
        }).
        when('/nieuws/:slug', {
            templateUrl: 'views/single.html',
            controller: 'NewsSingleController'
        })
        .otherwise({
            redirectTo: '/'
        });
  }]);