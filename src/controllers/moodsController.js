import { StatusCodes } from "http-status-codes";

export default class MoodsController {

  newMood(req, res) {
    return res.status(StatusCodes.CREATED).json({
      message: "Mood registered"
    });
  }

}
