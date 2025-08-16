import app from './app';
import { env } from './config/env';
import { connectMongo } from './db/mongo';
import { logger } from './utils/logger';

async function bootstrap() {
  await connectMongo();
  app.listen(env.PORT, () => {
    logger.info(`🚀 Servidor escuchando en http://localhost:${env.PORT}`);
    logger.info(`📘 Swagger en       http://localhost:${env.PORT}/docs`);
  });
}

bootstrap();