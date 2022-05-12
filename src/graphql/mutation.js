const graphql = require('graphql');
const type = require('./type');

module.exports = (container) => new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createBook: {
      type: type.GraphQLBookType,
      args: {
        input: {type: type.GraphQLInputBookType},
      },
      resolve: async (_, args) => await container.cradle.bookController.createBook(args),
    },
    updateBook: {
      type: type.GraphQLBookType,
      args: {
        id: {type: graphql.GraphQLID},
        input: {type: type.GraphQLInputBookType},
      },
      resolve: async (_, args) => await container.cradle.bookController.updateBook(args),
    },
    deleteBook: {
      type: graphql.GraphQLBoolean,
      args: {
        id: {type: graphql.GraphQLID},
      },
      resolve: async (_, args) => await container.cradle.bookController.deleteBook(args),
    }
  }
});

