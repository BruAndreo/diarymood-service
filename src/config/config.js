import { config } from "dotenv";
config();

export const envVars = {
  PORT: process.env.SERVER_PORT,
  DATABASE: {
    DBNAME: process.env.DATABASE_NAME,
    PORT: process.env.DATABASE_PORT,
    HOST: process.env.DATABASE_HOST,
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASS
  }
};
