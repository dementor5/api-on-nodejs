require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');

const dbConnect = require('./databases/db');
const ArtistValidator = require('./validators/artist');
const ArtistModel = require('./models/artist');
const ValidationError = require('./errors/validation-error');
const NotFoundError = require('./errors/not-found-error');
const ArtistController = require('./controllers/artist');
const ArtistRouter = require('./routes/artist');
const ErrorHandler = require('./middlewares/error-handler');

const {
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_BASE = 'myApi',
  DB_LOGIN = 'user',
  DB_PASS = 'pwd',
  ARTIST_MODEL_NAME = 'artists',
  SERVER_HOST = 'localhost',
  SERVER_PORT = 3000,
} = process.env;
const url = `mongodb://${DB_LOGIN}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_BASE}`;
const startMessage = `App started on http://${SERVER_HOST}:${SERVER_PORT}/`;

const start = async () => {
  const db = await dbConnect(url, MongoClient);
  const artistValidator = new ArtistValidator(ObjectID);
  const artistModel = new ArtistModel(
    db,
    ARTIST_MODEL_NAME,
    ObjectID,
    artistValidator,
    ValidationError,
    NotFoundError,
  );
  const artistController = new ArtistController(artistModel);
  const artistRouter = ArtistRouter(new express.Router(), artistController);
  const errorHandler = new ErrorHandler(ValidationError, NotFoundError);
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/artists', artistRouter);
  app.use(errorHandler.process);
  app.listen(SERVER_PORT, SERVER_HOST, () => console.info(startMessage));
};

start();
