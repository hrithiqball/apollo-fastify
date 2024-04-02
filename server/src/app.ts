import appConfig from './config/appConfig';
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import pino from 'pino';
import { ApolloServer, BaseContext } from '@apollo/server';
import { resolvers, typeDefs } from './graphql';
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyHelmet from '@fastify/helmet';
import { schemas } from './utils/schema';
import userRoutes from './modules/user/user.route';
import productRoutes from './modules/product/product.route';
import vehicleRoutes from './modules/vehicle/vehicle.route';
import entryRoutes from './modules/entry/entry.route';
import { mongo } from './utils/db';
import fastifyWebsocket from '@fastify/websocket';
import websocketRoutes from './websocket/route';

startServer();

async function startServer() {
  try {
    const server = fastify({ logger: pino({ level: 'info' }) });
    const apollo = new ApolloServer<BaseContext>({
      typeDefs,
      resolvers,
      plugins: [fastifyApolloDrainPlugin(server)],
    });

    await apollo.start();
    await mongo.connect();

    server.register(fastifyApollo(apollo), { prefix: '/graphql' });
    server.register(fastifyJwt, { secret: appConfig.SECRET });
    server.register(fastifyCors, { origin: true });
    server.register(fastifyWebsocket);
    server.register(fastifyFormbody);
    server.register(fastifyHelmet);

    server.decorate(
      'authenticate',
      async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify();
        } catch (error) {
          return reply.send({ error });
        }
      },
    );

    server.get('/healthcheck', async function () {
      return { status: 'OK' };
    });

    for (const schema of schemas) {
      server.addSchema(schema);
    }

    server.register(userRoutes, { prefix: '/api/user' });
    server.register(productRoutes, { prefix: '/api/product' });
    server.register(vehicleRoutes, { prefix: '/api/vehicle' });
    server.register(entryRoutes, { prefix: '/api/entry' });

    server.register(websocketRoutes, { prefix: '/abc' });

    server.setErrorHandler(error => {
      server.log.error(error);
    });

    await server.listen({ port: appConfig.PORT, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${appConfig.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

process.on('unhandledRejection', error => {
  console.error(error);
  process.exit(1);
});
