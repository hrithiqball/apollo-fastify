import { ObjectId } from 'mongodb';
import { z } from 'zod';

const carInput = {
  brand: z.string(),
  color: z.string(),
  model: z.string(),
  ownerId: z.string(),
};

export const createCarSchema = z.object({ ...carInput });
export const carResponseSchema = z.object({
  ...carInput,
  _id: z.instanceof(ObjectId),
});
export const carsResponseSchema = z.array(carResponseSchema);
export type CreateCarInput = z.infer<typeof createCarSchema>;
export type CarSchema = z.infer<typeof carResponseSchema>;
