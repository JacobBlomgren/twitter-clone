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
import 'babel-polyfill';

import { STATIC_PATH } from '../shared/config';
import renderApp from './renderApp';
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
    name: 'sessionId',
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // two days
      maxAge: 1000 * 60 * 60 * 24 * 2,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.get('/', renderApp);

export default app;
