const router = require('express').Router();
const axios = require('axios');
const httpClient = require('../api');
const graphqlHTTP = require('express-graphql')

const schema = require('../graphql-schema');

router.get('/', graphqlHTTP( async (req) => {

  const data = await httpClient.fetchOmdbApi.getMovies(axios, 'rock', 1);

  console.log('zzzzzzzz', data);
  
  return {
    schema: schema,
    graphiql: true
  }
}));

module.exports = router;