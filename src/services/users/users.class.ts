import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';

interface IUserData {
  email: string;
  password: string;
  admin?: boolean;
}

export class Users extends Service<IUserData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }
}
