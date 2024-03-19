import { ObjectId } from 'mongodb';
import { mongo } from '../../../utils/db';
import { CreateCarInput } from './car.schema';

export async function createCar(data: CreateCarInput) {
  try {
    const newCar = {
      brand: data.brand,
      color: data.color,
      model: data.model,
      ownerId: data.ownerId,
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

export async function deleteCar(_id: ObjectId) {
  const collection = mongo.db('scientia').collection('cars');
  await collection.deleteOne({ _id });
  return 'Car deleted successfully!';
}
