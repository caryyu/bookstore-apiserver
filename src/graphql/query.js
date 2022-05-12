const graphql = require('graphql');
const type = require('./type');

module.exports = (container) => new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    getBooks: {
      type: new graphql.GraphQLList(type.GraphQLBookType),
      resolve: async (_) => await container.cradle.bookController.getBooks(),
    }
  }
});

