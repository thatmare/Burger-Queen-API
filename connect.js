const { MongoClient } = require('mongodb');
// const express = require('express');

const config = require('./config');

const client = new MongoClient(config.dbUrl);

// eslint-disable-next-line no-unused-vars
// const { dbUrl } = config;

async function connect() {
  try {
    await client.connect();
    const db = client.db('burger-queen');
    return db;
  } catch (error) {
    console.error(error);
  }
}

// async function testDatabaseConnection() {
//   try {
//     const db = await connect();
//     const collection = db.collection('burger-queen');
// Reemplaza "nombre_de_tu_coleccion" con el nombre real de la colección que deseas consultar

//     // Realizar una consulta de prueba, por ejemplo, obtener todos los documentos en la colección
//     // const documents = await collection.find({}).toArray();
//     // console.log('Documentos en la colección:', documents);

//     // O realizar una inserción de prueba
//     await collection.insertOne({ campo: 'valor' });

//     console.log('Conexión a la base de datos exitosa.');
//   } catch (error) {
//     console.error('Error al conectar a la base de datos:', error);
//   }
// }

// async function startServer() {
//   await testDatabaseConnection(); // Ejecutar la prueba de conexión antes de iniciar el servidor
//   const app = express();
//   // ... configuración y rutas de tu aplicación ...
//   const port = 8080;
//   app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
//   });
// }

// startServer();

// connect();

module.exports = { connect };
