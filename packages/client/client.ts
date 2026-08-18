import { Config } from "../types/auth";
import { createAuth } from "./auth";
import { createStorage } from "./storage";

export const createClient = (config: Config) => {
  return {
    auth: createAuth(config),
    storage: createStorage(config),
  };
};
