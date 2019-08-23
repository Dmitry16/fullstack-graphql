const httpClient = require('../src/api');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

chai.should();
chai.use(sinonChai);

afterEach(() => {
    sinon.restore();
});

//external api call mock
let isFakeAxiosCalled = false;
const fakeApiResponse = { data: [{foo: 'bar'}] };
const fakeAxios = {
    get: () => {
        isFakeAxiosCalled = true;
        return Promise.resolve(fakeApiResponse);
    },
    then: () => { 
        return Promise.resolve(fakeApiResponse.data) 
    }
}
const req = {query: {keyword: 'str'}};
const fakeParameters = [ fakeAxios, req.query.keyword, 0 ];
// cache mocks
const cacheMock = {
    set: sinon.spy(),
    get: sinon.spy(),
}
const cacheStub = {
    get: sinon.stub().onCall(req.query.keyword).returns(fakeApiResponse)		
};

describe('GET request to "/api/search" endpoint', function() {
    it('parse search parameters from the req object', function(){
        expect(req.query).to.not.be.empty;
    });

    describe('cache', function(){
        it('get method to be called with the request query keyword', function(){
            cacheMock.get(req.query.keyword);
            expect(cacheMock.get.should.have.been.calledWith(req.query.keyword));
        });

        it('set method to be called with query keyword and response data', function(){
            cacheMock.set(req.query.keyword, fakeApiResponse);
            expect(cacheMock.set.should.have.been.calledWith(req.query.keyword, fakeApiResponse));
        });
        it('get method to be called before the set method', function(){
            const spy1 = cacheMock.get;
            const spy2 = cacheMock.set;

            cacheMock.get(req.query.keyword);
            cacheMock.set(req.query.keyword, fakeApiResponse);

            expect(spy1.should.have.been.calledBefore(spy2));
        });
    });

    describe('httpClient', function() {      
        it('calls to OMDb Api with search parameters', function() {
            httpClient.fetchOmdbApi.getMovies(...fakeParameters);
            expect(isFakeAxiosCalled).to.equal(true)
        });

        it('gets response from OMDb Api', function() {
            httpClient.fetchOmdbApi.getMovies(...fakeParameters).then((data) => {
                expect(data).to.not.be.empty
            });
        });

        it('getMovies method returns a promise', function() {
            expect(httpClient.fetchOmdbApi.getMovies(...fakeParameters))
            .to.be.a('promise');
        });

        it('gets data from OMDb Api', function() {
            httpClient.fetchOmdbApi.getMovies(...fakeParameters).then((data) => {
                expect(data).to.not.be.empty
            });
        });

        it('the data is an "array"', function() {
            httpClient.fetchOmdbApi.getMovies(...fakeParameters).then((data) => {
                expect(data).to.be.an('array')
            });
        });

        it('getMovies method throw an error when parameters are missing', function() {
            try {
                httpClient.fetchOmdbApi.getMovies()
                .then((data) => {})
            } catch(err) { expect(err).to.be.an('Error') }
        });
    });
});
