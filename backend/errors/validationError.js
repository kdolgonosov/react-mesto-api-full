class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = message || 'Некорректные данные';
  }
}

module.exports = ValidationError;
