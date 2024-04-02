import { ObjectId } from 'mongodb';
import { mongo } from '../../utils/db';
import { CreateOwnerInput } from './owner.schema';

export async function createOwner(input: CreateOwnerInput) {
  try {
    const newOwner = {
      name: input.name,
    };

    const collection = mongo.db('scientia').collection('owners');
    await collection.insertOne(newOwner);

    return newOwner;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating owner');
  }
}

export async function getOwners() {
  try {
    const collection = mongo.db('scientia').collection('owners');

    return collection.find({}).toArray();
  } catch (error) {
    console.error(error);
    throw new Error('Error getting owners');
  }
}

export async function getOwnerById(id: string) {
  try {
    const collection = mongo.db('scientia').collection('owners');

    const _id = new ObjectId(id);
    const owner = await collection.findOne({ _id });

    return owner;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting owner');
  }
}
