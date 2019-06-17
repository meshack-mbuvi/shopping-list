import mongoose from 'mongoose';
import {User} from '../models';
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

export class UsersController {
  static async createUser (req, res) {
    const {body: {firstName, secondName, password, email}} = req;

    // check if user already exists
    const user = await User.findOne ({email: email});
    const passwordHash = bcrypt.hashSync (password, 10);

    const newUser = await User.create ({
      email,
      firstName,
      secondName,
      password: passwordHash,
    });

    return res.status (201).send ({newUser});
  }
}
