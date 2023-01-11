import { jest } from "@jest/globals";
import MoodsController from "../../../src/controllers/moodsController";
import MoodService from "../../../src/service/moodService";
import requestMock from "../mocks/requestMock";
import responseMock from "../mocks/responseMock";
import { bodyPastDate, correctBody } from "../mocks/bodysMock";

describe("Mood Controller", () => {

  let controller;

  beforeAll(() => {
    controller = new MoodsController();
  });

  afterAll(() => {
    controller = null;
  });

  it("Should return success when body was correct", async () => {
    jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    let mockReq = requestMock();
    mockReq.body = correctBody;

    let mockRes = responseMock();

    const result = await controller.newMood(mockReq, mockRes);

    expect(result.status).toHaveBeenCalledWith(201);
    expect(result.json).toHaveBeenCalledWith({ message: "Mood registered" });
  });

  it("Should return success when mood date is past", async () => {
    const serviceSpy = jest.spyOn(MoodService.prototype, 'insertNewMood').mockImplementation(() => Promise.resolve(true));

    let mockReq = requestMock();
    mockReq.body = bodyPastDate;
    let mockRes = responseMock();

    const result = await controller.newMood(mockReq, mockRes);

    expect(serviceSpy). toHaveBeenCalledWith(bodyPastDate);
    expect(result.status).toHaveBeenCalledWith(201);
    expect(result.json).toHaveBeenCalledWith({ message: "Mood registered" });
  });

});
