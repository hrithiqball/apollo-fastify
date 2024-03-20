import { ObjectId } from 'mongodb';
import {
  VehicleSchema,
  CreateVehicleInput,
} from '../modules/vehicle/vehicle.schema';
import {
  createVehicle,
  deleteVehicle,
  getVehicles,
} from '../modules/vehicle/vehicle.service';
import { CreateOwnerInput } from '../modules/owner/owner.schema';
import {
  createOwner,
  getOwnerById,
  getOwners,
} from '../modules/owner/owner.service';

export const resolvers = {
  Query: {
    vehicles: () => getVehicles(),
    owners: () => getOwners(),
  },
  Mutation: {
    createVehicle: (_: unknown, { input }: { input: CreateVehicleInput }) =>
      createVehicle(input),
    deleteVehicle: (_: unknown, { _id }: { _id: ObjectId }) =>
      deleteVehicle(_id),
    addOwner: (_: unknown, { input }: { input: CreateOwnerInput }) =>
      createOwner(input),
  },
  Vehicle: {
    owner: async (parent: VehicleSchema) => {
      if (!parent.ownerId) return null;
      return await getOwnerById(parent.ownerId);
    },
  },
};
export const typeDefs = /* GraphQL */ `
  type Vehicle {
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

  input VehicleInput {
    brand: String
    color: String
    model: String
    ownerId: String
  }

  input OwnerInput {
    name: String
  }

  type Query {
    vehicles: [Vehicle]
    owners: [Owner]
  }

  type Mutation {
    createVehicle(input: VehicleInput): Vehicle!
    deleteVehicle(_id: ID!): String!
    addOwner(input: OwnerInput): Owner!
  }
`;
