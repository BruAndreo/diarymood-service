import DBConnector from "../database/dbConnector.js";
import MoodModel from "../model/moodModel.js";

export default class MoodService {

  async insertNewMood(newMood) {
    try {
      const conn = await DBConnector.getConnection();

      const moodModel = MoodModel.load(conn);

      const mood = new moodModel(newMood);
      await mood.save();

      DBConnector.close();
    }
    catch (e) {
      console.error("Insert new mood error: ", e.message);
      throw new Error("Falha ao inserir novo Mood");
    }
  }

}
