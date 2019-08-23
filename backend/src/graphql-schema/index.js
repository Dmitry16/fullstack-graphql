const httpClient = require('../api');
const axios = require('axios');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'the entry point',

    fields: () => ({
      greeting: {
        type: GraphQLString,
        resolve: async (source, args) => {
          const data = await httpClient.fetchOmdbApi.getMovies(axios, 'rock', 1);
          console.log('dataaaaa:::', data);
          return data;
        }
      }
    }),
  })
});