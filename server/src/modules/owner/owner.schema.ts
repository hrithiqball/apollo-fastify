import { z } from 'zod';

const ownerInput = {
  name: z.string(),
};

export const createOwnerSchema = z.object({ ...ownerInput });
export const ownerResponseSchema = z.object({
  acknowledged: z.boolean(),
  insertedId: z.string(),
});
export const ownersResponseSchema = z.array(ownerResponseSchema);
export type CreateOwnerInput = z.infer<typeof createOwnerSchema>;
