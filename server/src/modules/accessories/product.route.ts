import { FastifyInstance } from 'fastify';
import {
  createProductHandler,
  getProductsHandler,
} from '../asset/asset.controller';
import { $ref } from '../../utils/schema';

export default async function productRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: [server.authenticate],
      schema: {
        body: $ref('createProductSchema'),
        response: {
          201: $ref('productResponseSchema'),
        },
      },
    },
    createProductHandler,
  );

  server.get(
    '/',
    {
      schema: {
        response: {
          200: $ref('productsResponseSchema'),
        },
      },
    },
    getProductsHandler,
  );
}