import express from 'express';
import path from 'path';
import 'express-async-errors';
import errorhandler from './errors/handler';

import './database/connection';

import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorhandler);

app.listen(3333);