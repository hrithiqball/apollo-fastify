import buildServer from './server';
import appConfig from './config/appConfig';

const server = buildServer();

async function main() {
  try {
    await server.listen({ port: appConfig.PORT, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:${appConfig.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
