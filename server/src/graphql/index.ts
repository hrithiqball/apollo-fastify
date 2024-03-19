import { ObjectId } from 'mongodb';
import { CarSchema, CreateCarInput } from '../modules/mongo/car/car.schema';
import {
  createCar,
  deleteCar,
  getCars,
} from '../modules/mongo/car/car.service';
import { CreateOwnerInput } from '../modules/mongo/owner/owner.schema';
import {
  createOwner,
  getOwnerById,
  getOwners,
} from '../modules/mongo/owner/owner.service';

export const resolvers = {
  Query: {
    cars: () => getCars(),
    owners: () => getOwners(),
  },
  Mutation: {
    addCar: (_: unknown, { input }: { input: CreateCarInput }) =>
      createCar(input),
    deleteCar: (_: unknown, { _id }: { _id: ObjectId }) => deleteCar(_id),
    addOwner: (_: unknown, { input }: { input: CreateOwnerInput }) =>
      createOwner(input),
  },
  Car: {
    owner: async (parent: CarSchema) => {
      if (!parent.ownerId) return null;
      return await getOwnerById(parent.ownerId);
    },
  },
};

export const typeDefs = `#graphql
  type Car {
    _id: ID
    brand: String
    color: String
    model: String
    ownerId: String
    owner: Owner
  }

  type Owner {
    _id: ID
    name: String
  }

  input CarInput {
    brand: String
    color: String
    model: String
    ownerId: String
  }

  input OwnerInput {
    name: String
  }

  type Query {
    cars: [Car]
    owners: [Owner]
  }

  type Mutation {
    addCar(input: CarInput): Car!
    deleteCar(_id: ID!): String!
    addOwner(input: OwnerInput): Owner!
  }
`;
