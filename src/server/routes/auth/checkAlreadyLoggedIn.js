export default function checkAlreadyLoggedIn(req, res, next) {
  if (req.user)
    return res.status(401).json({ status: 'You are already logged in' });
  return next();
}
