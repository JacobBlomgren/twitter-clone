import registerUser from '../../auth/registerUser';
import passport from '../../auth/passport';

export default async function(req, res, next) {
  try {
    await registerUser(req.body.username, req.body.password);
    passport.authenticate('local', (err, user) => {
      if (user) {
        res.status(200).json({ status: 'Success' });
      }
    })(req, res, next);
  } catch (err) {
    res.status(409).json({ status: 'Username already exists' });
  }
}
