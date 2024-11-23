import * as joi from 'joi';
import 'dotenv/config';

interface EnvsSchema {
  PORT: number;
  MAILER_SERVICE: string;
  MAILER_KEY: string;
  MAILER_EMAIL: string;
  MAILER_NAME: string;
  NAT_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    MAILER_EMAIL: joi.string().required(),
    MAILER_SERVICE: joi.string().required(),
    MAILER_KEY: joi.string().required(),
    MAILER_NAME: joi.string().required(),
    NAT_SERVERS: joi.array().items(joi.string()).required(),

  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NAT_SERVERS: process.env.NAT_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvsSchema = {
  PORT: value.PORT,
  MAILER_SERVICE:value.MAILER_SERVICE,
  MAILER_KEY:value.MAILER_KEY,
  MAILER_EMAIL:value.MAILER_EMAIL,
  MAILER_NAME:value.MAILER_NAME,
  NAT_SERVERS:value.NAT_SERVERS,
};
