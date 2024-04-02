import { FastifyRequest } from 'fastify';
import { createVehicle, getVehicles } from './vehicle.service';
import { CreateVehicleInput } from './vehicle.schema';

export async function createVehicleHandler(
  request: FastifyRequest<{ Body: CreateVehicleInput }>,
) {
  try {
    return await createVehicle(request.body);
  } catch (error) {
    console.error(error);
    throw new Error('Error creating vehicle');
  }
}

export async function getVehiclesHandler() {
  try {
    return await getVehicles();
  } catch (error) {
    console.error(error);
    throw new Error('Error getting vehicles');
  }
}
