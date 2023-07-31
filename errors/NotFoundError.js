const responseCodes = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = responseCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
