import { MongoClient, ServerApiVersion } from 'mongodb';
import { PrismaClient } from '@prisma/client';
import { Redis } from '@upstash/redis';
import appConfig from '../config/appConfig';

export const mongo = new MongoClient(appConfig.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const prisma = new PrismaClient();

export const redis = new Redis({
  url: appConfig.REDIS_URL,
  token: appConfig.REDIS_TOKEN,
});
