import { PrismaClient } from '@prisma/client';
import { MongoClient, ServerApiVersion } from 'mongodb';
import appConfig from '../config/appConfig';

export const mongo = new MongoClient(appConfig.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const prisma = new PrismaClient();
