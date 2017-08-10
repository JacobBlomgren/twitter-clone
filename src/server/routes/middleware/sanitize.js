import xssFilters from 'xss-filters';

/**
 * A higher-order function that returns a middleware function that sanitizes the specified
 * values of req.body, e.g. inputs = ['content'] will validate req.body.content.
 * @param {[string]} inputs - the inputs to sanitize
 * @returns {function} - a middleware function that sanitizes the specified values of req.body.
 */
export default function(inputs) {
  return function sanitize(res, req, next) {
    inputs.forEach(input => {
      res.body[input] = xssFilters.inHTMLData(res.body[input]);
    });
    return next();
  };
}
