const responseCodes = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = responseCodes.CONFLICT;
  }
}

module.exports = { ConflictError };
