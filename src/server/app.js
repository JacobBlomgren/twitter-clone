// Needed to enable dotenv with es6 modules
// https://github.com/motdotla/dotenv/issues/133
/* eslint-disable import/first */

import './env';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';

import { APP_NAME, STATIC_PATH } from '../shared/config';
import renderApp from './render-app';
import routes from './routes';

const app = express();

app.use(helmet());

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send(renderApp(APP_NAME));
});

export default app;
