const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models/Users');

const { secret } = config;

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    try {
      const dbUser = await User.findOne({ email });

      if (!dbUser) {
        return resp.status(404).json({ error: 'User does not exist' }); // TODO: Manejar errores de autenticación
      }

      if (!bcrypt.compareSync(password, dbUser.password)) {
        return resp.status(404).json({ error: 'Wrong password' });
      }

      const token = jwt.sign(
        { uid: dbUser.id, email: dbUser.email, role: dbUser.role },
        secret,
        { expiresIn: '12h' },
      );

      return resp.status(200).json({ token });
    } catch (error) {
      console.error(error);
    }

    next();
  });

  return nextMain();
};
