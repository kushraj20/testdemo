
describe('Unit: chart.readDirs', function() {

    var compile, mockBackend, rootScope;

    beforeEach(module('chartData.readDirective'));
    beforeEach(module('chartData.readController'));

    beforeEach(module('chartData.httpService'));

    beforeEach(inject(function($compile,$httpBackend,$rootScope){
        compile = $compile;
        mockBackend = $httpBackend;
        rootScope = $rootScope;
        rootScope.config = {
          baseurl : ''
        };
    }));
    /**
     * make sure no expectations were missed in your tests.
     * e.g. expectGET or expectPOST)
     */
    afterEach(function() {
        mockBackend.verifyNoOutstandingExpectation();
        mockBackend.verifyNoOutstandingRequest();
    });

    /**
     * Test Cases
     */
    it('retrive data for chart details in main section', function () {

        var scope = rootScope.$new();

        var element = compile('<chart-read></chart-read>')(scope);
        mockBackend.expectGET('component/read/chart-component-read.html').respond(
            '<div class="main">'
        );


        scope.$digest();
        mockBackend.flush();

        expect(element[0].outerHTML).toContain(
            '<chart-read class="ng-scope"><div class="main">'
        );

    });


});
