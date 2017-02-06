
describe('Unit: contact.readDirs', function() {

    var compile, mockBackend, rootScope;
    beforeEach(module('chartData.footerDirective'));
    beforeEach(module('chartData.footerController'));

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
    it('retrive data for footer in chart section', function () {

        var scope = rootScope.$new();


        var element = compile('<chart-footer></chart-footer>')(scope);

        //Create the mock backend server
        mockBackend.expectGET('section/footer/chart-section-footer-view.html').respond(
            '<footer class="footer-area">'
        );

        //Simulate scope life cycle and ensures the HTML is loaded
        scope.$digest();
        mockBackend.flush();
        //Assert that directive was replaced with correct content
        expect(element[0].outerHTML).toContain(
            '<chart-footer class="ng-scope"><footer class="footer-area">'
        );

    });


});
