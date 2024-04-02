import { z } from 'zod';

const entryInput = {
  time: z.date(),
  vehicleId: z.string(),
};

const entryGenerated = {
  id: z.string(),
};

export const createEntrySchema = z.object({ ...entryInput });
export const entryResponseSchema = z.object({
  ...entryInput,
  ...entryGenerated,
});

export type CreateEntryInput = z.infer<typeof createEntrySchema>;
export type EntryResponse = z.infer<typeof entryResponseSchema>;
