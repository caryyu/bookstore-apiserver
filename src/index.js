const ddtracer = require('dd-trace').init();
ddtracer.use('graphql', {
  depth: 0, 
  hooks: {
    validate: (span) => span.setTag('manual.drop', true),
    parse: (span) => span.setTag('manual.drop', true),
  },
});
ddtracer.use('koa', {enabled: false, blocklist: ['/'], middleware: false});
ddtracer.use('fs', {enabled: false});

const awilix = require('awilix');
const Koa = require('koa');
const Router = require('@koa/router');
const graphql = require('graphql');
const {graphqlHTTP} = require('koa-graphql');
const {query, mutation} = require('./graphql');
const {BookController} = require('./controller')
const knex = require('knex');
const knexfile = require('./knexfile');


// IoC Container Init
const container = awilix.createContainer();
container.register({
  knex: awilix.asFunction(() => knex(knexfile[process.env.APP_ENV])).singleton(),
  bookController: awilix.asClass(BookController).singleton().singleton(),
});

// Web Server
const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Okay';
});

router.all('/graphql', graphqlHTTP({
  schema: new graphql.GraphQLSchema({query: query(container), mutation: mutation(container)}),
  graphiql: true,
}));

app.use(router.routes());
console.log('Web Server listens on :5000');
app.listen(5000);

