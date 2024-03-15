import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
});

const createUserSchema = z
  .object({
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .min(6),
  })
  .merge(userCore);

const createUserResponseSchema = z
  .object({
    id: z.number(),
  })
  .merge(userCore);

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
});
