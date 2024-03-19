import { CreateCarInput } from '../modules/mongo/car/car.schema';
import { createCar, getCars } from '../modules/mongo/car/car.service';

export const resolvers = {
  Query: {
    cars: () => getCars(),
  },
  Mutation: {
    addCar: (_: unknown, { input }: { input: CreateCarInput }) =>
      createCar(input),
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
  }
`;
