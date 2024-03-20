import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { ApolloServer, BaseContext } from '@apollo/server';
import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { resolvers, typeDefs } from './graphql';

import vehicleRoutes from './modules/vehicle/vehicle.route';
import assetRoutes from './modules/asset/asset.route';
import entryRoutes from './modules/entry/entry.route';
import userRoutes from './modules/user/user.route';
import appConfig from './config/appConfig';
import { Schemas } from './utils/schema';
import { mongo } from './utils/db';

export default function buildServer() {
  const fastify = Fastify();
  const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  });

  mongo
    .connect()
    .then(() => {
      mongo.db('admin').command({ ping: 1 });
      console.log('Connected to the mongo database!');
    })
    .catch(error => console.error(error));

  fastify.register(fastifyJwt, { secret: appConfig.SECRET });
  fastify.register(cors, {
    origin: true,
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        console.error(error);
        return reply.send(error);
      }
    },
  );

  fastify.get('/healthcheck', async function () {
    return { status: 'OK' };
  });

  for (const schema of Schemas) {
    fastify.addSchema(schema);
  }

  fastify.register(userRoutes, { prefix: 'api/users' });
  fastify.register(assetRoutes, { prefix: 'api/assets' });
  fastify.register(vehicleRoutes, { prefix: 'api/vehicles' });
  fastify.register(entryRoutes, { prefix: 'api/entries' });

  apollo.start().then(() => {
    fastify.register(fastifyApollo(apollo), { prefix: 'graphql' });
  });

  return fastify;
}
