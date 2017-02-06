
(function(){
    angular.module('chartData.headerDirective', [])

    /**
     * directive for the contact details information
     */
        .directive('chartHeader', function(){
            return{
                restrict: 'E',
                templateUrl: 'section/header/chart-section-header-view.html',
                controller:'chartHeaderCtrl',
                controllerAs: 'headerCtrl'
            };
        });
})();
