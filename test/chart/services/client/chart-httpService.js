
(function(){
    angular.module('chartData.httpService', [])

        .factory('chartHttpClient', ['$http','$q', function($http,$q){
            return {
                path: null,
                setPath: function(path){
                    this.path = path;
                },
                getData: function(){

                    var deferred = $q.defer();

                    $http.get(this.path).then(function(response)
                        {
                            deferred.resolve(response.data);

                        },
                        function(result)
                        {


                            deferred.reject(result.data);
                        });

                    return deferred.promise;
                }
            };
        }]);
})();
