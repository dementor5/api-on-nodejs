class ArtistController {
  constructor(model) {
    this.model = model;
    this.all = this.all.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async all(req, res, next) {
    let artists;
    try {
      artists = await this.model.all();
    } catch (e) {
      next(e);
      return;
    }
    res.send(artists);
  }

  async findById(req, res, next) {
    let artist;
    try {
      artist = await this.model.findById(req.params.id);
    } catch (e) {
      next(e);
      return;
    }
    res.send(artist);
  }

  async create(req, res, next) {
    const artist = {
      name: req.body.name,
    };
    let insertedId;
    try {
      insertedId = await this.model.create(artist);
    } catch (e) {
      next(e);
      return;
    }
    const location = `${req.baseUrl}/${insertedId}`;
    res.location(location).sendStatus(201);
  }

  async update(req, res, next) {
    const artist = {
      name: req.body.name,
    };
    try {
      await this.model.update(req.params.id, artist);
    } catch (e) {
      next(e);
      return;
    }
    res.sendStatus(204);
  }

  async delete(req, res, next) {
    try {
      await this.model.delete(req.params.id);
    } catch (e) {
      next(e);
      return;
    }
    res.sendStatus(204);
  }
}

module.exports = ArtistController;
