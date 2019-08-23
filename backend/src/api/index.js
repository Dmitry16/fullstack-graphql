const { baseUrl, omdbAccessToken } = require('../config');
const ApiClient = require('./ApiClient');
const mandatory = require('../utils/validationHelper');

const FetchOmdbAPI  = require('./customAPI');

function apiFactory( 
    baseURL = mandatory('baseURL'),
    omdbAccessToken = mandatory('omdbAccessToken')
){
    const api = new ApiClient( baseURL, omdbAccessToken );

    return {
        fetchOmdbApi: new FetchOmdbAPI({ apiClient: api }),
    };
}

module.exports = apiFactory(baseUrl, omdbAccessToken);