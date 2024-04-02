import { FastifyRequest } from 'fastify';
import { createEntry, getEntry } from './entry.service';
import { CreateEntryInput } from './entry.schema';

export async function createEntryHandler(
  request: FastifyRequest<{ Body: CreateEntryInput }>,
) {
  try {
    return await createEntry(request.body);
  } catch (error) {
    console.error(error);
    throw new Error('Error creating entry');
  }
}

export async function getEntryHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
) {
  try {
    return await getEntry(request.params.id);
  } catch (error) {
    console.error(error);
    throw new Error('Error getting entry');
  }
}
