import Fastify from 'fastify';

import appConfig from './configs/app-config';

const server = Fastify();

server.get('/healthcheck', async function () {
  return { status: 'OK' };
});

async function main() {
  try {
    await server.listen({ port: appConfig.port, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${appConfig.port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
