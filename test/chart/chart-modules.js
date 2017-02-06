angular.module('chartData.httpService', []);
angular.module('chart',
    [
        'ng-fusioncharts',
        'chartData.readController',
        'chartData.readDirective',
        'chartData.footerDirective',
        'chartData.headerDirective',
        'chartData.headerController',
        'chartData.footerController',
        'chartData.httpService',
    ]).constant('SERVICECONFIGURATION', {
        baseURL : location.origin + '/'

    }).run(function($rootScope,SERVICECONFIGURATION,$http){
        $rootScope.config = SERVICECONFIGURATION;

    });


angular.element(document).ready(function () {

        angular.bootstrap($('#chart'), ['chart']);

});
