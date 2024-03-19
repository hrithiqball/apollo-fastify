import { FastifyInstance } from 'fastify';
import { createCarHandler, getCarsHandler } from './car.controller';
import { $ref } from '../../../utils/schema';

export default async function carRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createCarSchema'),
        response: {
          201: $ref('carResponseSchema'),
        },
      },
    },
    createCarHandler,
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('carsResponseSchema'),
        },
      },
    },
    getCarsHandler,
  );
}
