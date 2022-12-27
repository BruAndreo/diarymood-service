import { jest } from "@jest/globals";
import DBConnector from "../../../src/database/dbConnector";
import MoodService from "../../../src/service/moodService";

describe("Mood Service", () => {

  jest.mock("../../../src/database/dbConnector.js", () => jest.fn(() => ({
    getConnection: jest.fn(),
    close: jest.fn()
  })));

  jest.mock("../../../src/model/moodModel.js", () => jest.fn(() => ({
    load: jest.fn(() => ({
      model: jest.fn()
    }))
  })));


  test("Should connect with DB one time, and close one time", async () => {
    jest.spyOn(DBConnector, 'getConnection').mockResolvedValueOnce({ model: jest.fn });

    const service = new MoodService();
    await service.insertNewMood();
  });

});
