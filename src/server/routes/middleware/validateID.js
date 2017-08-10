/**
 * A higher-order function that returns a middleware function that validates the specified
 * values of req.body as ids that must be strictly positive integers.
 * For instance, ids = ['user_id', 'tweet_id'] will validate req.body.user_id and req.body.tweet_id.
 * @param {[string]} ids - the ids to validate
 * @returns {function} - a middleware function that validates the specified values of req.body as ids
 */
export default function(ids) {
  return function validateID(req, res, next) {
    ids.forEach(id => {
      if (isNaN(parseInt(req.body[id], 10)) || req.body[id] <= 1) {
        res.status(400).json({
          error: `Incorrect format. ${id} must be a strictly positive integer.`,
        });
      }
    });
    return next();
  };
}
