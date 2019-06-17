import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const mongoose = require ('mongoose');
require ('dotenv').config ();
import routes from '../routes';

const {DATABASE_URL} = process.env;

import {authentication} from '../middleware/auth';
mongoose.Promise = global.Promise;

export async function createApp () {
  const app = express ();

  app.use (bodyParser.json ());
  app.use (bodyParser.urlencoded ({extended: true}));
  app.use (cors ());

  app.use ('/api/*', authentication);
  app.use ('/api', routes);

  app.use ('*', (req, res) => {
    console.log ('req ', req.body);
    res.status (404);
    // respond with json
    return res.send ({
      status: 404,
      message: 'Page Not Found',
      docs: '/api-docs/',
    });
  });
  /**
     * Turn off depreciation warnings for mongoose useFindAndModify
     */
  mongoose.set ('useFindAndModify', false);

  /**
   * Create a connection to the database & perform available migrations.
   */
  await mongoose.connect (DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  return app;
}
