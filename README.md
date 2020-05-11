# api-on-nodejs (loftblog)

My experimental attempt to rewrite the original project on async/await

Crud routes:
```
get /artists to get all artists
get /artists/:artistId to get artist by id
post /artists to create new artist
put /artist/:artistId to update artist by id
delete /artist/:artistId to delete artist by id
```

1. Create new mongodb base and user for connecting to it:
```
mongo -u root
use myApi
db.createUser({
  user: 'userName',
  pwd: 'userPassword',
  roles: ['readWrite']
});
exit;
```

2. Create .env file in project root with own settings to rewrite defaults (https://github.com/motdotla/dotenv):
```
DB_HOST=localhost
DB_PORT=27017
DB_BASE=myApi
DB_LOGIN=userName
DB_PASS=userPassword
ARTIST_MODEL_NAME=artists
SERVER_HOST=localhost
SERVER_PORT=3000
```
3. Install dependencies:
`npm i`

4. Start project:
`npm start` or
`npm run watch` for dev
