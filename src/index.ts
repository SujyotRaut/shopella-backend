import { PrismaClient } from '@prisma/client';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import jwt from 'express-jwt';
import http from 'http';
import jwksRsa from 'jwks-rsa';
import { resolvers, typeDefs } from './graphql';

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.OAUTH_DOMAIN}/.well-known/jwks.json`,
  }),

  audience: process.env.OAUTH_AUDIENCE,
  issuer: `https://${process.env.OAUTH_DOMAIN}/`,
  algorithms: ['RS256'],
  credentialsRequired: false,
  resultProperty: 'locals.user',
});

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => {
      console.log(res.locals.user);
      return {
        prisma,
      } as Context;
    },
  });

  await server.start();

  // Apply middlewares
  server.applyMiddleware({ app });
  app.use(checkJwt);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer().catch((err) => console.log(err));
