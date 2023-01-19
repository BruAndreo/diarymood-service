import { jest } from "@jest/globals";
import MoodsController from "../../../src/controllers/moodsController";
import MoodService from "../../../src/service/moodService";
import requestMock from "../mocks/requestMock";
import responseMock from "../mocks/responseMock";
import {
  bodyPastDate,
  correctBodyWithoutMoodDate,
  bodyFutureDate,
  bodyWithoutContext,
  bodyContextLessTree,
  bodyWithoutBads,
  bodyWithGoodsEmpty,
  bodyWithGoodsWrong,
  bodyWithoutGoods,
  bodyWithBadsEmpty,
  bodyWithBadsWrong
} from "../mocks/bodysMock";

global.console = {
  error: jest.fn(),
  log: jest.fn(),
};

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

  it("Should return error when context isn't past", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyWithoutContext),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(400);
    expect(result.json).toHaveBeenCalledWith({ message: "context is a required field" });
  });

  it("Should return error when context has less than 3 characters", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyContextLessTree),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(400);
    expect(result.json).toHaveBeenCalledWith({ message: "context must be at least 3 characters" });
  });

  it("Should return success when goods is not past", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyWithoutGoods),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(201);
  });

  it("Should return success when goods is empty", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyWithGoodsEmpty),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(201);
  });

  it("Should return error when goods is wrong", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyWithGoodsWrong),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(400);
  });

  it("Should return success when bads is not past", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyWithoutBads),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(201);
  });

  it("Should return success when bads is empty", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyWithBadsEmpty),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(201);
  });

  it("Should return error when bads is wrong", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    const result = await controller.newMood(
      requestMock({}, {}, bodyWithBadsWrong),
      responseMock()
    );

    expect(result.status).toHaveBeenCalledWith(400);
  });

});
