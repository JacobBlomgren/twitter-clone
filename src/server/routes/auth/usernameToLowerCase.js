/**
 * Transforms the username property of req's body parameter to lowercase.
 */
export default function(req, res, next) {
  if (req.body.username) req.body.username = req.body.username.toLowerCase();
  next();
}
