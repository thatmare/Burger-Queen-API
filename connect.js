const mongoose = require('mongoose');
const config = require('./config');

const { dbUrl } = config;

async function connect() {
  try {
    await mongoose.connect(dbUrl);
    console.log('entrando a db')
    // const db = client.db('burger-queen');
    // return db;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { connect };
