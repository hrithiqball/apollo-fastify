import {
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
} from '../modules/asset/product.schema';
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
} from '../modules/vehicle/vehicle.schema';
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
