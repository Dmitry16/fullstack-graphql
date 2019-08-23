const mandatory = require('../utils/validationHelper');

const Base = require('./Base');

class OmdbFetchAPI extends Base {

    getMovies(
      client = mandatory('client'),
      query = mandatory('query'),
      pageNum = mandatory('pageNum')
    ){
        return this.apiClient.get(client, query, pageNum);
    }
}

module.exports = OmdbFetchAPI;