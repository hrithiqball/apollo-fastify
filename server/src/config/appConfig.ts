import 'dotenv/config';

export default {
  PORT: Number(process.env.PORT) || process.exit(1),
  SECRET: process.env.SECRET || process.exit(1),
  MONGO_URI: process.env.MONGO_URI || process.exit(1),
  REDIS_URL: process.env.REDIS_URL || process.exit(1),
  REDIS_TOKEN: process.env.REDIS_TOKEN || process.exit(1),
};
