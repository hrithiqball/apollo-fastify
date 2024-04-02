import { redis } from '../../utils/db';
import { CreateEntryInput, EntryResponse } from './entry.schema';

export async function createEntry(data: CreateEntryInput) {
  try {
    const entry = {
      id: Math.random().toString(36).substr(2, 9),
      time: data.time,
      vehicleId: data.vehicleId,
    };

    await redis.set(`entry-${entry.id}`, JSON.stringify(entry));
    return entry;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating entry');
  }
}

export async function getEntry(id: string) {
  try {
    const entry: EntryResponse | null = await redis.get(`entry-${id}`);

    return entry;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting entry');
  }
}
