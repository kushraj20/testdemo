
(function(){
    angular.module('chartData.footerDirective', [])

    /**
     * directive for the contact details information
     */
        .directive('chartFooter', function(){
            return{
                restrict: 'E',
                templateUrl: 'section/footer/chart-section-footer-view.html',
                controller:'chartFooterCtrl',
                controllerAs: 'footerCtrl'
            };
        });
})();
