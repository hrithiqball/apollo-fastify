import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';

import appConfig from './configs/app-config';
import userRoutes from './modules/user/user.route';
import productRoutes from './modules/product/product.route';
import { Schemas } from './utils/schema';

export const server = Fastify();

server.register(fjwt, { secret: 'supersecret' });

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

async function main() {
  for (const schema of Schemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: 'api/users' });
  server.register(productRoutes, { prefix: 'api/products' });

  try {
    await server.listen({ port: appConfig.port, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${appConfig.port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
