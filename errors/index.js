const { ForbiddenError } = require('./ForbiddenError');
const { NotFoundError } = require('./NotFoundError');
const { UnauthorizedError } = require('./UnauthorizedError');
const { BadRequestError } = require('./BadRequestError');

module.exports = {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
};
