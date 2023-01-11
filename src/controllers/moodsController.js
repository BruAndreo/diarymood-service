import { StatusCodes } from "http-status-codes";
import ValidationException from "../exceptions/validationException.js";
import MoodService from "../service/moodService.js";

export default class MoodsController {

  async newMood(req, res) {
    try {
      const body = req.body;

      const newMood = {
        ...body,
        moodtime: this.validDate(body.moodtime)
      };

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

  validDate(moodtime) {
    const moodtimeBody = new Date(moodtime);
    const now = new Date();

    if (!moodtime) {
      return now.toISOString();
    }

    if (moodtimeBody.getTime() > now.getTime()) {
      throw new ValidationException("Isn't possible insert a future mood");
    }

    return moodtime;
  }

}
