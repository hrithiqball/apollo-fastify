import { ObjectId } from 'mongodb';
import { mongo } from '../../utils/db';
import { CreateVehicleInput } from './vehicle.schema';

export async function createVehicle(data: CreateVehicleInput) {
  try {
    const newVehicle = {
      brand: data.brand,
      color: data.color,
      model: data.model,
      ownerId: data.ownerId,
    };

    const collection = mongo.db('scientia').collection('vehicles');
    await collection.insertOne(newVehicle);
    return newVehicle;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating vehicle');
  }
}

export async function getVehicles() {
  try {
    const collection = mongo.db('scientia').collection('vehicles');

    return collection.find({}).toArray();
  } catch (error) {
    console.error(error);
    throw new Error('Error getting vehicles');
  }
}

export async function deleteVehicle(_id: ObjectId) {
  try {
    const collection = mongo.db('scientia').collection('vehicles');
    await collection.deleteOne({ _id });

    return 'Vehicle deleted successfully!';
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting vehicle');
  }
}
