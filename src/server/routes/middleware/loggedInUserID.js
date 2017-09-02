/**
 * Middleware that writes the userID to req.loggedInUserID if a user is logged in, or undefined otherwise.
 * To be used for routes that do not require log in.
 */
export default function(req, res, next) {
  req.loggedInUserID = req.user ? req.user.id : undefined;
  return next();
}
