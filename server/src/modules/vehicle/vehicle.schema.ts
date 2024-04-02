import { ObjectId } from 'mongodb';
import { z } from 'zod';

const vehicleInput = {
  brand: z.string(),
  color: z.string(),
  model: z.string(),
  ownerId: z.string(),
};

export const createVehicleSchema = z.object({ ...vehicleInput });
export const vehicleResponseSchema = z.object({
  ...vehicleInput,
  _id: z.instanceof(ObjectId),
});
export const vehiclesResponseSchema = z.array(vehicleResponseSchema);
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type VehicleSchema = z.infer<typeof vehicleResponseSchema>;
