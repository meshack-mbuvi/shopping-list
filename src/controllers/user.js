import {User} from '../models/index';
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

export class UsersController {
  static async createUser (req, res) {
    const {body: {firstName, lastName, password, email}} = req;

    // check if user already exists
    const user = await User.findOne ({email: email});
    if (user) {
      return res.status (409).send ({
        message: 'User exists with similar email',
      });
    }

    const passwordHash = bcrypt.hashSync (password, 10);

    const newUser = await User.create ({
      email,
      firstName,
      lastName,
      password: passwordHash,
    });
    // don't show password hash
    newUser.password = undefined;

    return res.status (201).send ({user: newUser});
  }

  static async login (req, res) {
    const {password, email} = req.body;

    const user = await User.findOne ({email});
    if (user && bcrypt.compareSync (password, user.password)) {
      const token = jwt.sign ({id: user._id}, process.env.SECRET_KEY);

      const {firstName, lastName} = user;

      return res.status (200).send ({firstName, lastName, token});
    } else {
      return res.status (401).send ({message: 'Wrong password or email!'});
    }
  }
}
