const httpClient = require('../api');
const axios = require('axios');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'a movie object',

  fields: () => ({
    Title: {
      type: GraphQLString,
      resolve: () => 'Title!'
    },
    Year: {
      type: GraphQLString,
      resolve: () => 'Year!'
    },
    Type: {
      type: GraphQLString,
      resolve: () => 'Type!'
    },
    Poster: {
      type: GraphQLString,
      resolve: () => 'Poster!'
    }
  })
});

const SearchType = new GraphQLObjectType({
  name: 'Search',
  description: 'Search data array',

  fields: () => ({
    movie: {
      type: new GraphQLList(MovieType),
      resolve: () => 'movies here!'
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'the entry point',

    fields: () => ({
      search: {
        type: SearchType,
        resolve: async () => {
          const data = await httpClient.fetchOmdbApi.getMovies(axios, 'rock', 1);
          console.log('dataaaaa:::', data); 
          return data;
        }
      }
    }),
  })
});