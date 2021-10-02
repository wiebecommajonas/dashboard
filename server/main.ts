import { ApolloServer } from 'apollo-server';
/* import fs from 'fs';
import path from 'path'; */
import { buildSchema } from 'type-graphql';
import SettingsResolver from './resolvers/SettingsResolver';
import InfoResolver from './resolvers/InfoResolver';
import UserResolver from './resolvers/UserResolver';
import { getUserId } from './utils/auth/auth';
import { PrismaClient } from '.prisma/client';
import { authChecker } from './utils/auth/AuthChecker';

const prisma = new PrismaClient();

buildSchema({
  resolvers: [InfoResolver, UserResolver, SettingsResolver],
  authChecker,
}).then((schema) => new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req,
    prisma,
    userId: req && req.headers.authorization
      ? getUserId(req)
      : null,
  }),
}))
  .then((server) => server.listen(5000))
  .then(({ url }) => console.log(`Server is running on ${url}`))
  .catch((error) => console.error(error));
