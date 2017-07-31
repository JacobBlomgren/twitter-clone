export default function checkAlreadyLoggedIn(req, res, next) {
  if (req.user)
    return res.status(401).json({ status: 'A user is already logged in' });
  return next();
}
