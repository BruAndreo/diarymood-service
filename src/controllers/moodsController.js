import { StatusCodes } from "http-status-codes";
import DBConnector from "../database/dbConnector.js";
import MoodModel from "../model/moodModel.js";

export default class MoodsController {

  async newMood(req, res) {
    try {
      const body = req.body;

      const conn = await DBConnector.getConnection();

      const moodModel = MoodModel.load(conn);

      const mood = new moodModel(body);
      await mood.save();

      DBConnector.close();

      return res.status(StatusCodes.CREATED).json({
        message: "Mood registered"
      });
    }
    catch (e) {
      console.error(`ERROR: ${e.message}`);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: e.message
      });
    }
  }

}
