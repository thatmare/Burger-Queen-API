const express = require('express');
const { MongoClient } = require('mongodb');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

const { port, secret } = config;
const app = express();

app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(authMiddleware(secret));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});

const client = new MongoClient(config.dbUrl);

async function run() {
  try {
    const database = client.db('burger-queen');
    const users = database.collection('myCollection');
    const query = { human: 'marissa' };
    const user = await users.findOne(query);
    console.log(user);
  } finally {
    await client.close();
  }
}

run().catch(console.dir); 