
(function(){
    angular.module('chartData.readDirective', [])

    /**
     * directive for the contact details information
     */
        .directive('chartRead', function(){
            return{
                restrict: 'E',
                templateUrl: 'component/read/chart-component-read.html',
                controller:'chartReadCtrl',
                controllerAs: 'readCtrl'
            };
        });
})();

