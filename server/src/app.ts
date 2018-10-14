import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { resolver, schema } from './graphql';
import { logger } from './logger/index';

const PORT = process.env.PORT || 8080;
const app = express();

app.get('/status', (req, res) => {
  return res.json({ status: 200 });
});

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  rootValue: resolver,
  schema,
}));

app.listen(PORT, () => {
  logger.info(`
    homeless-household-server running on port ${PORT}
    graphiql running on /graphql
  `);
});
