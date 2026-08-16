import { Config, Payload } from "../../types/auth";
import { request } from "../request";

export const register = (config: Config, payload: Payload) => {
  return request("/register", "POST", payload);
};
