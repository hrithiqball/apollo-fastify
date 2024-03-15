import Fastify from 'fastify';

import appConfig from './configs/app-config';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

const server = Fastify();

server.get('/healthcheck', async function () {
  return { status: 'OK' };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  server.register(userRoutes, { prefix: 'api/users' });

  try {
    await server.listen({ port: appConfig.port, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${appConfig.port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
