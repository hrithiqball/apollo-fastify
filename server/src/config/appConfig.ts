import 'dotenv/config';

export default {
  PORT: Number(process.env.PORT) || process.exit(1),
  SECRET: process.env.SECRET || process.exit(1),
  MONGO_URI: process.env.MONGO_URI || process.exit(1),
};
