
describe('Unit: chartHeaderCtrl', function() {
    var  $controller, $rootScope,  $scope;
    beforeEach(function () {
        module('chart');
    });

    beforeEach(inject(function (_$controller_,  _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope;

        chartHeaderCtrl = $controller('chartHeaderCtrl',{
            $scope:$scope
        });
    }));

    describe('chartHeaderCtrl - Initialisation', function () {
        it('should instantiate the controller properly', function () {
            expect(chartHeaderCtrl).not.toBeUndefined();
        });
    });

});



