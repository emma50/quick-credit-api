import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import users from './users';
import adminUsers from './adminUsers';
import loans from './loans';
import swaggerSpec from '../config/swagger';
import winston from '../config/winston';

export default (app) => {
  app.use(cors());
  app.use(morgan('combined', { stream: winston.stream }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/api/v1/auth', users);
  app.use('/api/v1/users', adminUsers);
  app.use('/api/v1/loans', loans);
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
