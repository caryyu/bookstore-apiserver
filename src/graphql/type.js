const graphql = require('graphql');

const GraphQLBookType = new graphql.GraphQLObjectType({
  name: 'Book',
  fields: {
    id: {type: graphql.GraphQLID},
    title: {type: graphql.GraphQLString},
    author: {type: graphql.GraphQLString},
    price: {type: graphql.GraphQLFloat}
  },
});

const GraphQLInputBookType = new graphql.GraphQLInputObjectType({
  name: 'InputBook',
  fields: {
    title: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    author: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
    price: {type: new graphql.GraphQLNonNull(graphql.GraphQLFloat)}
  },
});

module.exports = {
  GraphQLBookType,
  GraphQLInputBookType
};
