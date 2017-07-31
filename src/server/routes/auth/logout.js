export function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });
  return next();
}

export function logout(req, res) {
  req.logout();
  res.status(200).json({ status: 'Success' });
}
