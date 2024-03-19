import {
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
} from '../modules/product/product.schema';
import {
  createUserResponseSchema,
  createUserSchema,
  loginResponseSchema,
  loginSchema,
} from '../modules/user/user.schema';
import {
  createCarSchema,
  carResponseSchema,
  carsResponseSchema,
} from '../modules/mongo/car/car.schema';
import { buildJsonSchemas } from 'fastify-zod';

export const { schemas: Schemas, $ref } = buildJsonSchemas({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
  createCarSchema,
  carResponseSchema,
  carsResponseSchema,
});
