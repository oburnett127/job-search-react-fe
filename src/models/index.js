// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Token, Job, Employer, Application, User } = initSchema(schema);

export {
  Token,
  Job,
  Employer,
  Application,
  User
};