
describe('Unit: chart.chartData', function() {

    var compile, mockBackend, rootScope;
    beforeEach(module('chartData.headerDirective'));
    beforeEach(module('chartData.headerController'));

    beforeEach(inject(function($compile,$httpBackend,$rootScope){
        compile = $compile;
        mockBackend = $httpBackend;
        rootScope = $rootScope;
        rootScope.config = {
            baseUrl : ''
        }
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
    it('retrive data for header in chart section', function () {

        var scope = rootScope.$new();


        var element = compile('<chart-header></chart-header>')(scope);

        //Create the mock backend server
        mockBackend.expectGET('section/header/chart-section-header-view.html').respond(
            '<header class="header-area">'
        );

        //Simulate scope life cycle and ensures the HTML is loaded
        scope.$digest();
        mockBackend.flush();
        //Assert that directive was replaced with correct content
        expect(element[0].outerHTML).toContain(
            '<chart-header class="ng-scope"><header class="header-area">'
        );

    });


});
