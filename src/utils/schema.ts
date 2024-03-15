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
import { buildJsonSchemas } from 'fastify-zod';

export const { schemas: Schemas, $ref } = buildJsonSchemas({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});
