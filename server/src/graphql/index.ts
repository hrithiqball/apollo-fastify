import { ObjectId } from 'mongodb';
import { CreateCarInput } from '../modules/mongo/car/car.schema';
import {
  createCar,
  deleteCar,
  getCars,
} from '../modules/mongo/car/car.service';

export const resolvers = {
  Query: {
    cars: () => getCars(),
  },
  Mutation: {
    addCar: (_: unknown, { input }: { input: CreateCarInput }) =>
      createCar(input),
    deleteCar: (_: unknown, { _id }: { _id: ObjectId }) => deleteCar(_id),
  },
};

export const typeDefs = `#graphql
  type Car {
    brand: String
    color: String
    model: String
  }

  input CarInput {
    brand: String
    color: String
    model: String
  }

  type Query {
    cars: [Car]
  }

  type Mutation {
    addCar(input: CarInput): Car!
    deleteCar(_id: ID!): String!
  }
`;
