import joi from 'joi';
import celebrate from 'celebrate';

import passport from '../../auth/passport';
import username from '../middleware/validation/username';
import password from '../middleware/validation/password';

export const authenticate = passport.authenticate('local', {});

export function login(req, res) {
  res.status(200).json({ status: 'Success' });
}

export const validate = celebrate({
  body: joi.object().keys({
    username: username.required(),
    password: password.required(),
  }),
});
