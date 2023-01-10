import { jest } from "@jest/globals";
import MoodsController from "../../../src/controllers/moodsController";
import MoodService from "../../../src/service/moodService";
import requestMock from "../mocks/requestMock";
import responseMock from "../mocks/responseMock";
import { correctBody } from "../mocks/bodysMock";

describe("Mood Controller", () => {

  let controller;

  beforeAll(() => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));
    controller = new MoodsController();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    controller = null;
  });

  it("Should return success when body was correct", async () => {
    let mockReq = requestMock();
    mockReq.body = correctBody;

    let mockRes = responseMock();

    const result = await controller.newMood(mockReq, mockRes);

    expect(result.status).toHaveBeenCalledWith(201);
    expect(result.json).toHaveBeenCalledWith({ message: "Mood registered" });
  });

  it("Should return success when mood date is past", async () => {

  });

});
