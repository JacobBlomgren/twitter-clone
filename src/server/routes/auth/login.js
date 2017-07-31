import passport from '../../auth/passport';

export const authenticate = passport.authenticate('local', {});

export function login(req, res) {
  res.status(200).json({ status: 'Success' });
}
