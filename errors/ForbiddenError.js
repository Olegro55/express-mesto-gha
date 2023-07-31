const responseCodes = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = responseCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
