// Initializes the `operations` service on path `/operations`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Operations } from './operations.class';
import createModel from '../../models/operations.model';
import hooks from './operations.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'operations': Operations & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/operations', new Operations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('operations');

  service.hooks(hooks);
}
