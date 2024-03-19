import { FastifyRequest } from 'fastify';
import { createCar, getCars } from './car.service';
import { CreateCarInput } from './car.schema';

export async function createCarHandler(
  request: FastifyRequest<{ Body: CreateCarInput }>,
) {
  const car = await createCar(request.body);

  return car;
}

export async function getCarsHandler() {
  const cars = await getCars();

  return cars;
}
