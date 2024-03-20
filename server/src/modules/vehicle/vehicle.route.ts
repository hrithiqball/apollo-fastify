import { FastifyInstance } from 'fastify';
import { createVehicleHandler, getVehiclesHandler } from './vehicle.controller';
import { $ref } from '../../utils/schema';

export default async function vehicleRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createVehicleSchema'),
        response: {
          201: $ref('vehicleResponseSchema'),
        },
      },
    },
    createVehicleHandler,
  );

  server.get(
    '/',
    {
      schema: {},
    },
    getVehiclesHandler,
  );
}
