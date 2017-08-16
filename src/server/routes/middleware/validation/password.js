import joi from 'joi';

/**
 * A password is defined as an arbitrary string of minimum length 8.
 */
export default joi.string().min(8);
