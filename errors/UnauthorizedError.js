const responseCodes = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = responseCodes.UNAUTHORIZED;
  }
}

module.exports = { UnauthorizedError };
