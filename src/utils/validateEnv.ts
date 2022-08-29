import { cleanEnv, port, str } from 'envalid';

/**
 * @group Utils
 */
const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
  });
};

export default validateEnv;
