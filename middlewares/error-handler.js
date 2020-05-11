class ErrorHandler {
  constructor(ValidationError, NotFoundError) {
    this.ValidationError = ValidationError;
    this.NotFoundError = NotFoundError;
    this.process = this.process.bind(this);
  }

  process(err, req, res) {
    switch (err.constructor) {
      case this.ValidationError:
        res.status(err.code).json(err.message);
        break;
      case this.NotFoundError:
        res.status(err.code).json(err.message);
        break;
      default:
        // eslint-disable-next-line no-console
        console.error(err);
        res.sendStatus(500);
    }
  }
}

module.exports = ErrorHandler;
