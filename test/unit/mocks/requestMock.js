import { jest } from "@jest/globals";

export default () => {
  const req = {};

  req.body = jest.fn().mockReturnValue(req);
  req.param = jest.fn().mockReturnValue(req);

  return req;
};
