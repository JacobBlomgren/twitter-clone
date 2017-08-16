/**
 * An error-handling middleware function for malformed input,
 * that doesn't validate against the joi schema. Responds with a 400 error in that case.
 */
export default function(err, req, res, next) {
  if (err.isJoi) {
    return res.status(400).end();
  }
  return next(err);
}
