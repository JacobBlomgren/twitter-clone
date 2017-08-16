import joi from 'joi';

/**
 * An id is defined as a strictly positive integer.
 * @constant {joi}
 */
export default joi.number().integer().min(1);
