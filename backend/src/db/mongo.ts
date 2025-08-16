import mongoose from 'mongoose';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export async function connectMongo() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('✅ MongoDB conectado');
  } catch (err) {
    logger.error('❌ Error al conectar a MongoDB', err);
    process.exit(1);
  }
}