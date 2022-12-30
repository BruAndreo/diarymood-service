import { jest } from "@jest/globals";
import mockingoose from "mockingoose";
import DBConnector from "../../../src/database/dbConnector.js";
import MoodService from "../../../src/service/moodService.js";
import MoodModel from "../../../src/model/moodModel.js";

global.console = {
  error: jest.fn()
};

describe("Mood Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should connect with DB one time, and close one time", async () => {
    jest.spyOn(DBConnector, 'setUp').mockResolvedValueOnce({});
    jest.spyOn(DBConnector, 'close').mockResolvedValueOnce();
    mockingoose(MoodModel).toReturn({}, 'save');

    const newMood = {
      mood: "test",
      context: "test",
      goods: ["test"],
      bads: ["test"]
    };

    const service = new MoodService();
    await service.insertNewMood(newMood);

    expect(DBConnector.setUp).toHaveBeenCalledTimes(1);
    expect(DBConnector.close).toHaveBeenCalledTimes(1);
  });

  it("Should return error when DB Connection is failed", async () => {
    jest.spyOn(DBConnector, 'setUp').mockRejectedValueOnce(new Error("Mocking error"));

    const t = async () => {
      const service = new MoodService();
      await service.insertNewMood({});
    }

    expect(t).rejects.toThrow(Error);
  });

  it("Should return error when has fail to save new mood", async () => {
    jest.spyOn(DBConnector, 'setUp').mockResolvedValueOnce({});
    jest.spyOn(DBConnector, 'close').mockResolvedValueOnce();

    mockingoose(MoodModel).toReturn(new Error("Mocking Save error"), 'save');

    const t = async () => {
      const service = new MoodService();
      await service.insertNewMood({});
    }

    expect(t).rejects.toThrow(Error);
    expect(DBConnector.setUp).toHaveBeenCalledTimes(1);
    expect(DBConnector.close).toHaveBeenCalledTimes(1);
  });

});
