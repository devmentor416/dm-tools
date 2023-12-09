/**
 * How to run the sample program.
 * Open a terminal and type, "npm run dev"
 * Open a terminal and type, "npm run devwatch"
 * Open the browser to http://localhost:4000/
 *
 * Reference: https://www.apollographql.com/docs/apollo-server/getting-started.html
 * GraphQL:   https://graphql.github.io/learn/
 */
import { ApolloServer, gql } from 'apollo-server';

import { log } from '../utils/logger';

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String!
    author: String!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book!]!
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

log.info('Starting Apollo Server');

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  log.info(`🚀  Server ready at ${url}`);
  process.stdout.write(`🚀  Server ready at ${url}\n`);
});
