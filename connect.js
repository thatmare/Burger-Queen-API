const mongoose = require('mongoose');
const config = require('./config');

const { dbUrl } = config;

async function connect() {
  try {
    await mongoose.connect(dbUrl);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { connect };
