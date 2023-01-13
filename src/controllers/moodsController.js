import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import ValidationException from "../exceptions/validationException.js";
import MoodService from "../service/moodService.js";
import { validate } from "../validators/moodValidator.js";

// const SCHEMA = yup.object().shape({
//   mood: yup.string().min(3).required(),
//   context: yup.string().min(3).required(),
//   goods: yup.array().of(yup.string()),
//   bads: yup.array().of(yup.string()),
//   moodtime: yup.string().default(new Date().toISOString())
// });

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
