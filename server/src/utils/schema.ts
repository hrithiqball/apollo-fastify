import {
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
} from '../modules/asset/asset.schema';
import {
  createUserResponseSchema,
  createUserSchema,
  loginResponseSchema,
  loginSchema,
} from '../modules/user/user.schema';
import {
  createVehicleSchema,
  vehicleResponseSchema,
  vehiclesResponseSchema,
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
  createVehicleSchema,
  vehicleResponseSchema,
  vehiclesResponseSchema,
});
