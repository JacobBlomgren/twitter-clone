import joi from 'joi';

/**
 * An id is defined as a strictly positive integer represented as a string since it might be larger
 * than what javascript can handle.
 * @constant {joi}
 */
export default joi.string().regex(/^[1-9][0-9]*$/);
