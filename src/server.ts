import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { ApolloServer, BaseContext } from '@apollo/server';
import fastifyJwt from '@fastify/jwt';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';

import productRoutes from './modules/product/product.route';
import userRoutes from './modules/user/user.route';
import { Schemas } from './utils/schema';
import appConfig from './config/appConfig';
import { typeDefs } from './graphql/typedef';
import { resolvers } from './graphql/resolvers';

export default function buildServer() {
  const fastify = Fastify();
  const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  });

  fastify.register(fastifyJwt, { secret: appConfig.SECRET });

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
  fastify.register(productRoutes, { prefix: 'api/products' });

  apollo.start().then(() => {
    fastify.register(fastifyApollo(apollo), { prefix: 'graphql' });
  });

  return fastify;
}
