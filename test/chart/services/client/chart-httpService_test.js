
describe('Unit: chart-httpService_test.js', function() {

    var client,httpBackend, $q, $rootScope;

    beforeEach(function(){
        module('chartData.httpService');

        inject(function($httpBackend, _chartHttpClient_,_$q_,_$rootScope_) {
            client = _chartHttpClient_;
            $q = _$q_;
            httpBackend = $httpBackend;
            $rootScope = _$rootScope_;
        });
    });
    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    /**
     * Test Cases
     */
    describe('HttpClient.setPath() - Setting Configurations', function() {
        it('should set the client path value to the value passed in', function () {
            var tempPath = 'test path';
            client.setPath(tempPath);
            expect(client.path).toMatch(tempPath);
        });
    });

    describe('HttpClient.getData() - ', function() {
        it('should return a 404 error message, when a client is searched for and does not exist', function (){

            client.setPath('path/chart');

            var returnObject = ({
                data: ({
                    status: 404, error: 'Not Found'
                })
            });

            httpBackend.expectGET('path/chart').respond(404, returnObject);


            var returnedPromise = client.getData();

            var result = '';
            returnedPromise.then(function(response) {
                result = response;
            }, function(response){
                result = response;
            });

            httpBackend.flush();

            expect(result.data).toEqual(returnObject.data);
        });

        it('should return the correct ATM ID, when a client is searched for', function (){

            var returnData = { 'primary ID':'chart'};

            client.setPath('path/chart');


            httpBackend.expectGET('path/chart').respond(returnData);


            var returnedPromise = client.getData();


            var result = '';
            returnedPromise.then(function(response) {
                result = response;
            });


            httpBackend.flush();


            expect(result).toEqual(returnData);
        });

        it('should return the correct request details, using the set config headers passed in', function (){
            var returnData = { 'primary ID':'chart'};

            client.setPath('path/chart');

            var config = {
                authorization:'test'
            };


            httpBackend.expectGET('path/chart').respond(returnData);

            var returnedPromise = client.getData(config);

            var result = '';
            returnedPromise.then(function(response) {
                result = response;
            });
            httpBackend.flush();

            expect(result).toEqual(returnData);
        });
    });







});