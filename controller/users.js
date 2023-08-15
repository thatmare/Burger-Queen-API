const bcrypt = require('bcrypt');
const { User } = require('../models/Users');

module.exports = {
  getUsers: async (req, resp, next) => {
    // TODO: Implementa la función necesaria para traer la colección `users`

    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const usersCollection = await User.find().limit(limit).skip(startIndex);
      const totalUsers = await User.countDocuments();
      const totalPages = Math.ceil(totalUsers / limit);

      const linkHeaders = {
        first: `</users?page=1&limit=${limit}>; rel="first"`,
        prev: `</users?page=${page - 1}&limit=${limit}>; rel="prev"`,
        next: `</users?page=${page + 1}&limit=${limit}>; rel="next"`,
        last: `</users?page=${totalPages}&limit=${limit}>; rel="last"`, // aqui se detiene
      };

      resp.set('link', Object.values(linkHeaders).join(', '));

      return resp.status(200).json(usersCollection);
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

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return resp.status(403).json({ error: 'User already exists' });
    }

    try {
      const savedUser = await newUser.save();

      resp.status(200).json(savedUser);
    } catch (err) {
      console.error(err);
      resp
        .status(500)
        .json({ error: 'An error occurred while saving the user' });
      next(err);
    }
  },

  getUser: async (req, resp, next) => {
    const { uid } = req.params;

    try {
      const user = await User.findOne({ _id: uid });

      if (user) {
        resp.status(200).json(user);
      } else {
        resp.status(404).json({ error: 'User does not exist' });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  patchUser: async (req, resp, next) => {
    const { uid } = req.params;
    const update = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role,
    };

    try {
      const user = await User.findByIdAndUpdate(uid, update, { new: true });
      resp.status(200).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },

  deleteUser: async (req, resp, next) => {
    const { uid } = req.params;

    try {
      await User.findByIdAndDelete(uid);
      resp.status(200).json({ message: 'deleted' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
};
