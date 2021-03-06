import express from 'express';
import 'express-async-errors';
import 'airbnb-browser-shims';
import routes from './routes/routes';
import winston from './config/winston';

const app = express();

routes(app);

const port = process.env.PORT || 3000;
winston.info(`Server Running on port ${port}`);
const server = app.listen(port);
export default server;
