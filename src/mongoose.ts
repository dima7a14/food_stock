import mongoose from 'mongoose';
import { Application } from './declarations';
import logger from './logger';

export default function (app: Application): void {
  const user = app.get('mongo_user');
  const pass = app.get('mongo_pass');
  const host = app.get('mongo_host');
  const port = app.get('mongo_port');
  const db = app.get('mongo_db');
  const connection = `mongodb://${user}:${pass}@${host}:${port}/${db}?authSource=admin`;

  mongoose.connect(
    connection,
    { useCreateIndex: true, useNewUrlParser: true }
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });
  
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
}
