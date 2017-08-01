export default function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not logged in' });
  return next();
}
