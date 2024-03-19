import { z } from 'zod';

const carInput = {
  brand: z.string(),
  color: z.string(),
  model: z.string(),
};

export const createCarSchema = z.object({ ...carInput });
export const carResponseSchema = z.object({
  acknowledged: z.boolean(),
  insertedId: z.string(),
});
export const carsResponseSchema = z.array(carResponseSchema);
export type CreateCarInput = z.infer<typeof createCarSchema>;
