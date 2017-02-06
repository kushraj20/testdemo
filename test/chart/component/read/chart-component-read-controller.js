
(function() {
    angular.module('chartData.readController', [])


        .controller('chartReadCtrl', [ '$rootScope','$scope','chartHttpClient','$interval',
            function ($rootScope,$scope,chartHttpClient, $interval) {

                var self;
                self = this;

                self.myDataSource = [];
                self.error = null;
                self.changeDataDynamically = function() {
                    $interval(function() {

                         angular.forEach(self.myDataSource.data,function(v){
                             v.value = v.value + 100;
                         });

                    },2000)
                }
                self.loadChartData= function(timeZoneData){

                    var getPath= "/test/chart/chartdata.json";
                    chartHttpClient.setPath(getPath);
                    chartHttpClient.getData().then(function(response){
                        self.myDataSource =response;
                    }, function(result){
                        self.error = result;
                    });
                };
                self.changeDataDynamically();




            }]);
})();