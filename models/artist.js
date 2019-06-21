class ArtistModel {
  constructor(db, modelName, ObjectID, validator, ValidationError, NotFoundError) {
    this.db = db.collection(modelName);
    this.ObjectID = ObjectID;
    this.validator = validator;
    this.ValidationError = ValidationError;
    this.NotFoundError = NotFoundError;
  }

  all() {
    return this.db.find().toArray();
  }

  async findById(id) {
    const errors = this.validator.checkId(id);
    if (errors.length) {
      throw new this.NotFoundError('Artist is not found');
    }
    const artist = await this.db.findOne({ _id: this.ObjectID(id) });
    if (!artist) {
      throw new this.NotFoundError('Artist is not found');
    }
    return artist;
  }

  async create(artist) {
    const errors = this.validator.checkFields(artist);
    if (errors.length) {
      throw new this.ValidationError(errors);
    }
    const { insertedId } = await this.db.insertOne(artist);
    return insertedId;
  }

  async update(id, artist) {
    const errors = [
      ...this.validator.checkId(id),
      ...this.validator.checkFields(artist),
    ];
    if (errors.length) {
      throw new this.ValidationError(errors);
    }
    const { matchedCount } = await this.db.updateOne(
      { _id: this.ObjectID(id) },
      { $set: artist },
    );
    if (!matchedCount) {
      throw new this.NotFoundError('Artist for updating is not found');
    }
  }

  async delete(id) {
    const errors = this.validator.checkId(id);
    if (errors.length) {
      throw new this.ValidationError(errors);
    }
    const { deletedCount } = await this.db.deleteOne({ _id: this.ObjectID(id) });
    if (!deletedCount) {
      throw new this.NotFoundError('Artist for deleting is not found');
    }
  }
}

module.exports = ArtistModel;
