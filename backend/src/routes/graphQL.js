const router = require('express').Router();
const axios = require('axios');
const httpClient = require('../api');
const graphqlHTTP = require('express-graphql')

const schema = require('../graphql-schema');

router.get('/', graphqlHTTP(
  {
    schema: schema,
    graphiql: true
  }
));

module.exports = router;