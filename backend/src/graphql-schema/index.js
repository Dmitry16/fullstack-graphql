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
    title: {
      type: GraphQLString,
      resolve: data => data.Title
    },
    year: {
      type: GraphQLString,
      resolve: data => data.Year
    },
    imdbID: {
      type: GraphQLString,
      resolve: data => data.imdbID
    },
    type: {
      type: GraphQLString,
      resolve: data => data.Type
    },
    poster: {
      type: GraphQLString,
      resolve: data => data.Poster
    }
  })
});

const SearchType = new GraphQLObjectType({
  name: 'Search',
  description: 'Search data array',

  fields: () => ({
    movie: {
      type: new GraphQLList(MovieType),
      resolve: (data) => {
        // console.log('source:::', data.Search)
        return data.Search;
      }
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