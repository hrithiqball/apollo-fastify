import 'dotenv/config';

if (!process.env.PORT) {
  console.error('Missing PORT environment variable');
  process.exit(1);
}

if (!process.env.SECRET) {
  console.error('Missing SECRET environment variable');
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error('Missing MONGO_URI environment variable');
  process.exit(1);
}

if (!process.env.REDIS_URL) {
  console.error('Missing REDIS_URL environment variable');
  process.exit(1);
}

if (!process.env.REDIS_TOKEN) {
  console.error('Missing REDIS_TOKEN environment variable');
  process.exit(1);
}

export default {
  PORT: Number(process.env.PORT),
  SECRET: process.env.SECRET,
  MONGO_URI: process.env.MONGO_URI,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_TOKEN: process.env.REDIS_TOKEN,
};
