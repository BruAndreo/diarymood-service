import { jest } from "@jest/globals";
import MoodsController from "../../../src/controllers/moodsController";
import MoodService from "../../../src/service/moodService";
import requestMock from "../mocks/requestMock";
import responseMock from "../mocks/responseMock";
import { bodyPastDate, correctBodyWithoutMoodDate, bodyFutureDate } from "../mocks/bodysMock";

describe("Mood Controller", () => {

  let controller;

  beforeAll(() => {
    controller = new MoodsController();
  });

  afterAll(() => {
    controller = null;
  });

  it("Should return success when body was correct and mood date isnt on body", async () => {
    const serviceSpy = jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, correctBodyWithoutMoodDate),
      responseMock()
    );

    expect(serviceSpy.mock.calls[0][0].moodtime).toBeDefined();
    expect(result.status).toHaveBeenCalledWith(201);
    expect(result.json).toHaveBeenCalledWith({ message: "Mood registered" });
  });

  it("Should return success when mood date is past", async () => {
    const serviceSpy = jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyPastDate),
      responseMock()
    );

    expect(serviceSpy).toHaveBeenCalledWith(bodyPastDate);
    expect(result.status).toHaveBeenCalledWith(201);
    expect(result.json).toHaveBeenCalledWith({ message: "Mood registered" });
  });

  it("Should return error when moodtime is from future", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyFutureDate),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(400);
    expect(result.json).toHaveBeenCalledWith({ message: "Isn't possible insert a future mood" });
  });

});
