import DBConnector from "../database/dbConnector.js";
import MoodModel from "../model/moodModel.js";

export default class MoodService {

  async insertNewMood(newMood) {
    try {
      await DBConnector.setUp();

      const mood = new MoodModel(newMood);
      await mood.save();

      DBConnector.close();
    }
    catch (e) {
      console.error("Insert new mood error: ", e.message);
      throw new Error("Falha ao inserir novo Mood");
    }
  }

}
