const dbConnect = async (url, MongoClient) => {
  let db;
  try {
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    db = client.db();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }
  return db;
};

module.exports = dbConnect;
