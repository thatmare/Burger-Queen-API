const bcrypt = require('bcrypt');
const { User } = require('../models/Users');

module.exports = {
  getUsers: async (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`
    console.log(req.query, 'aqui query')
    try {
      const userCol = await User.find();
      return resp
        .status(200)
        .json(userCol);
    } catch (err) {
      console.error(err);
      resp
        .status(500)
        .json({ error: 'An error occurred while saving the user' });
      next(err);
    }
  },

  postUsers: async (req, resp, next) => {
    const { email, password, role } = req.body;

    if (!email && !password && !role) {
      return next(400);
    }

    const newUser = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role,
    });

    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return resp.status(403).json({ error: 'User already exists' });
      }

      const savedUser = await newUser.save();

      resp
        .status(200)
        .json(savedUser);
    } catch (err) {
      console.error(err);
      resp
        .status(500)
        .json({ error: 'An error occurred while saving the user' });
      next(err);
    }
  },
};
