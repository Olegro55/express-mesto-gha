const responseCodes = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = responseCodes.BAD_REQUEST;
  }
}

module.exports = { BadRequestError };
