
describe('Unit: chartFooterCtrl', function() {
    var  $controller, $rootScope,  $scope, chartFooterCtrl;
    beforeEach(function () {
        module('chart');
    });

    beforeEach(inject(function (_$controller_,  _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope;

        chartFooterCtrl = $controller('chartFooterCtrl',{
            $scope:$scope
        });
    }));

    describe('chartFooterCtrl - Initialisation', function () {
        it('should instantiate the controller properly', function () {
            expect(chartFooterCtrl).not.toBeUndefined();
        });
    });

});



