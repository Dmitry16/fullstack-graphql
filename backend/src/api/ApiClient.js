class ApiClient {
    constructor (baseURL, omdbAccessToken) {
      this.baseURL = baseURL;
      this.apiKey = omdbAccessToken;
    }
    
    get(client, query, pageNum) {
  
      return this.request({ client, query, pageNum });
    }

    async request({ client, query, pageNum }) {
      const conParams = {
        responseType: 'json',
        baseURL: this.baseURL,
      };
      const input = `?apikey=${this.apiKey}&s=${query}&page=${pageNum}`; 
      
      return (await client.get(input, conParams)).data;
    }
  };
  
  module.exports = ApiClient;