class ArtistValidator {
  constructor(ObjectID) {
    this.ObjectID = ObjectID;
  }

  checkId(id) {
    const errors = [];
    if (!id) {
      errors.push('Id is required');
      return errors;
    }

    const isValid = this.ObjectID.isValid(id);
    if (!isValid) {
      errors.push('Id is not valid');
    }
    return errors;
  }

  // eslint-disable-next-line class-methods-use-this
  checkFields(data) {
    const errors = [];
    if (data.name === undefined) {
      errors.push('name is required');
    } else if (!(typeof data.name === 'string' && data.name.length > 0)) {
      errors.push('name must be not emprty string');
    }
    return errors;
  }
}

module.exports = ArtistValidator;
