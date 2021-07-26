import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import responseTime from 'response-time';
import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import swaggerUi from 'swagger-ui-express';
import users from './users';
import adminUsers from './adminUsers';
import loans from './loans';
import swaggerSpec from '../config/swagger';
import winston from '../config/winston';
import error from '../middleware/error';

export default (app) => {
  const limiter = new RateLimit({
    store: new RedisStore({
      prefix: 'rl:',
    }),
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, // limit each IP to 50 requests per windowMs
  });
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(responseTime());
  app.use(limiter);
  app.use(morgan('combined', { stream: winston.stream }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/users', adminUsers);
  app.use('/api/v1/loans', loans);
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api/v1$', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'Welcome to Quick Credit API',
      version: '1.0.0',
      author: 'Okwuidegbe Emmanuel',
      email: 'okwuidegbeemmauel@gmail.com',
      about: 'Quick Credit API is an online lending platform API that provides short term soft loans to individuals.',
    });
  });
  app.use((req, res) => res.status(404).json({
    status: 404,
    message: 'Hello, page not found. Try connecting using an api testing application like POSTMAN',
  }));
  app.use(error);
};
