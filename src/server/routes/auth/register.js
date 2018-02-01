import joi from 'joi';
import { celebrate } from 'celebrate';

import registerUser from '../../auth/registerUser';
import passport from '../../auth/passport';
import username from '../middleware/validation/username';
import password from '../middleware/validation/password';
import { create } from '../../elasticsearch/update';

export async function register(req, res, next) {
  try {
    const userID = await registerUser(req.body.username, req.body.password);
    create({ userID, username: req.body.username });
    passport.authenticate('local', (err, user) => {
      if (err || !user)
        res
          .status(500)
          .json({ error: 'Authentication fail after registration' });
      if (user) {
        req.login(user, err2 => {
          if (err2)
            res
              .status(500)
              .json({ error: 'Authentication fail after registration' });
          res.status(201).json({ status: 'Success', user_id: req.user.id });
        });
      }
    })(req, res, next);
  } catch (err) {
    res.status(500).end();
  }
}

export const validate = celebrate({
  body: joi.object().keys({
    username: username.required(),
    password: password.required(),
  }),
});
