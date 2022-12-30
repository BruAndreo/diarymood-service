import { envVars } from "../config/config.js";
import mongoose from "mongoose";

export default class DBConnector {

  static _getStringConnection() {
    const { HOST, PORT, DBNAME } = envVars.DATABASE;

    return `mongodb://${HOST}:${PORT}/${DBNAME}`;
  }

  static async setUp() {
    return await mongoose.connect(DBConnector._getStringConnection(), {
        authSource: "admin",
        user: envVars.DATABASE.USER,
        pass: envVars.DATABASE.PASSWORD,
        useNewUrlParser: true
      });
  }

  static close() {
    mongoose.disconnect();
  }

}
