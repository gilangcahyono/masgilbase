import { Config, Payload } from "../../types/auth";
import { register } from "./register";

export const createAuth = (config: Config) => {
  return {
    register(payload: Payload) {
      return register(config, payload);
    },
  };
};
