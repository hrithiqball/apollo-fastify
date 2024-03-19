import { mongo } from '../../../utils/db';
import { CreateCarInput } from './car.schema';

export async function createCar(data: CreateCarInput) {
  try {
    const newCar = {
      brand: data.brand,
      model: data.model,
      color: data.color,
    };

    const collection = mongo.db('scientia').collection('cars');
    return collection.insertOne(newCar);
  } catch (error) {
    console.error(error);
    throw new Error('Error creating car');
  }
}

export async function getCars() {
  const collection = mongo.db('scientia').collection('cars');

  return collection.find({}).toArray();
}
