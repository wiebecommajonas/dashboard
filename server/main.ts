import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import Mutation from './resolvers/Mutation';
import { getUserId } from './utils/auth';

const prisma = new PrismaClient();

const resolvers = {
  Mutation,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema/schema.graphql'), 'utf-8'),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    userId: req && req.headers.authorization
      ? getUserId(req)
      : null,
  }),
});

server
  .listen(5000)
  .then(({ url }) => console.log(`Server is running on ${url}`));
