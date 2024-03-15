import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt';

import productRoutes from './modules/product/product.route';
import userRoutes from './modules/user/user.route';
import { Schemas } from './utils/schema';
import appConfig from './config/appConfig';

export default function buildServer() {
  const server = Fastify();

  server.register(fastifyJwt, { secret: appConfig.SECRET });

  server.decorate(
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

  server.get('/healthcheck', async function () {
    return { status: 'OK' };
  });

  for (const schema of Schemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: 'api/users' });
  server.register(productRoutes, { prefix: 'api/products' });

  return server;
}
