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
        resolve: (source, args) => 'kuku'
      },
    })
  })
});