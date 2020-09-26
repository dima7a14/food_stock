// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { data: { email, password, admin, ...other } } = context; // eslint-disable-line @typescript-eslint/no-unused-vars

    return { ...context, data: { email, password, admin: false, ...other } };
  };
};
