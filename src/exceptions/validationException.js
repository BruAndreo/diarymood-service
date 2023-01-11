import { StatusCodes } from "http-status-codes";

export default class ValidationException extends Error {

  constructor(msg, statusCode = StatusCodes.BAD_REQUEST) {
    super(msg);
    this.statusCode = statusCode
  }

}
