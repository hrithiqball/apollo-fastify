import { z } from 'zod';

const userCore = {
  name: z.string({ required_error: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
};

export const createUserSchema = z.object({
  ...userCore,
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be string',
    })
    .min(6),
});

export const createUserResponseSchema = z.object({
  ...userCore,
  id: z.number(),
});

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
