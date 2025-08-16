import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import routes from './routes';
import { notFound, errorHandler } from './middlewares/error.middleware';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// Swagger
try {
  const swaggerDoc = YAML.load('swagger.yaml');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
} catch (_) {
  // ignorar si no existe en dev
}

app.use('/', routes);
app.use(notFound);
app.use(errorHandler);

export default app;