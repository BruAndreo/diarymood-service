import { jest } from "@jest/globals";

export default (params = {}, headers = {}, body = {}) => {
  return {
    params: params,
    headers: headers,
    body: body
  };
};
