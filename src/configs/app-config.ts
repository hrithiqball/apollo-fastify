export default {
  host: process.env.HOST || '',
  port: Number(process.env.PORT || 8080),
  database: {
    connection: process.env.DB_CONNECTION,
  },
};
