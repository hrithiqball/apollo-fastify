import { FastifyInstance } from 'fastify';
import { createEntryHandler, getEntryHandler } from './entry.controller';

export default async function entryRoutes(server: FastifyInstance) {
  server.post('/', createEntryHandler);

  server.get('/:id', getEntryHandler);
}
