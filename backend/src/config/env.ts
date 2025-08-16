export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/optimize',
  NODE_ENV: process.env.NODE_ENV || 'development'
};