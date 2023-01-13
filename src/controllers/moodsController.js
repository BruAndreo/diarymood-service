import { StatusCodes } from "http-status-codes";
import MoodService from "../service/moodService.js";
import { validate } from "../validators/moodValidator.js";

export default class MoodsController {

  async newMood(req, res) {
    try {
      const body = req.body;

      const newMood = validate(body);

      const service = new MoodService();
      await service.insertNewMood(newMood);

      return res.status(StatusCodes.CREATED).json({
        message: "Mood registered"
      });
    }
    catch (e) {
      console.log("ERROR: ", e.message);

      return res.status(e.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: e.message
      });
    }
  }

}
