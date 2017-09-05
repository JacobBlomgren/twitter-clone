import joi from 'joi';

/**
 * A username is defined as an alphanumerical string of length 3-15 (inclusive).
 * @constant {joi}
 */
export default joi
  .string()
  .alphanum()
  .min(3)
  .max(15);
