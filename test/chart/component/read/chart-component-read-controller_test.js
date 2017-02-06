
describe('Unit: chartReadCtrl', function() {
    var $rootScope, $controller, chartHttpClient,deferred,$scope, chartReadController, $interval, returnChartData, $q;
    beforeEach(function () {
        module('chart');
        module('chartData.httpService');
    });

    beforeEach(inject(function (_$controller_, _chartHttpClient_, _$rootScope_,_$interval_,_$q_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope;
        $interval= _$interval_;
        $q = _$q_;
        deferred = $q.defer();
        chartHttpClient = _chartHttpClient_;
        returnChartData = {
            "chart": {
                "caption": "Test Chart Modules",
                "subCaption": "Top 5 stores in last month by revenue"
            },
            "data":[{
                "label": "Bakersfield Central",
                "value": 880000
            },
                {
                    "label": "Garden Groove harbour",
                    "value": 730000
                },
                {
                    "label": "Los Angeles Topanga",
                    "value": 590000
                },
                {
                    "label": "Compton-Rancho Dom",
                    "value": 520000
                },
                {
                    "label": "Daly City Serramonte",
                    "value": 330000
                }]
        }
        chartReadController = $controller('chartReadCtrl',{
            $scope:$scope
        });
    }));

    describe('chartReadCtrl - Initialisation', function () {
        it('should instantiate the controller properly', function () {
            expect(chartReadController).not.toBeUndefined();
        });

    });
    describe('load chart data', function () {

        it('should  load the chart data properly', function () {
            chartReadController.myDataSource = null;
            deferred.resolve(returnChartData);
            spyOn(chartHttpClient, 'getData').and.returnValue(deferred.promise);
            chartReadController.loadChartData();
            $rootScope.$apply();
            expect(chartReadController.myDataSource).toEqual(returnChartData);
        });
        it('should populate chart data error when internal server error occurs', function () {
            chartReadController.timezones = null;
            errorReturnObject = {
                'code': 2002,
                'message':'server error',
                'errors':[{code:2002, message:'internal Server error'}]
            };
            deferred.reject(errorReturnObject);
            spyOn(chartHttpClient, 'getData').and.returnValue(deferred.promise);
            chartReadController.loadChartData();
            $rootScope.$apply();

            expect(chartReadController.error).toEqual(errorReturnObject);
        });

    });
    describe('Change chart data dynamically', function () {
        it('should  load the chart data properly', function () {

            chartReadController.myDataSource = returnChartData;
            var newData   = {
                "chart": {
                    "caption": "Test Chart Modules",
                    "subCaption": "Top 5 stores in last month by revenue"
                },
                "data":[{
                    "label": "Bakersfield Central",
                    "value": 880200
                },
                    {
                        "label": "Garden Groove harbour",
                        "value": 730200
                    },
                    {
                        "label": "Los Angeles Topanga",
                        "value": 590200
                    },
                    {
                        "label": "Compton-Rancho Dom",
                        "value": 520200
                    },
                    {
                        "label": "Daly City Serramonte",
                        "value": 330200
                    }]
            }
            chartReadController.changeDataDynamically();
            $interval.flush(2000);

            expect(chartReadController.myDataSource).toEqual(newData);
        });
    });
});



