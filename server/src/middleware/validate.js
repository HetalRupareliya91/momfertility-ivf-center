const { HttpError } = require('./errorHandler');

// rules: { field: [checkFn(value, body), 'error message'] }
module.exports = function validate(rules) {
  return (req, res, next) => {
    const body = req.body || {};
    const errors = {};
    for (const [field, [check, message]] of Object.entries(rules)) {
      if (!check(body[field], body)) errors[field] = message;
    }
    if (Object.keys(errors).length) {
      return next(new HttpError(422, 'Please correct the highlighted fields.', errors));
    }
    next();
  };
};
