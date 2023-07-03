export interface EnvVariables {
  ENV: string;

  URL: string;

  PORT: number;

  API_KEY: string;

  DATABASE_URL: string;

  REDIS_MESSAGING_HOST: string;
  REDIS_HOST: string;
  REDIS_PORT: number;

  JWT_SECRET: string;

  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_AUTH_USER: string;
  MAIL_AUTH_PWD: string;
  MAIL_FROM: string;
}
