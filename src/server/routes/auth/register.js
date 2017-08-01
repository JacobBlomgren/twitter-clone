import registerUser from '../../auth/registerUser';
import passport from '../../auth/passport';

export default async function(req, res, next) {
  try {
    await registerUser(req.body.username, req.body.password);
    passport.authenticate('local', (err, user) => {
      if (err || !user)
        res
          .status(500)
          .json({ status: 'Authentication fail after registration' });
      if (user) {
        req.login(user, err2 => {
          if (err2)
            res
              .status(500)
              .json({ status: 'Authentication fail after registration' });
          res.status(200).json({ status: 'Success' });
        });
      }
    })(req, res, next);
  } catch (err) {
    res.status(500).json({ status: 'Error' });
  }
}
