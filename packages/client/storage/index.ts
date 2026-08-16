import { Config, File } from "../../types/storage";
import { upload } from "./upload";

export const createStorage = (config: Config) => {
  return {
    upload(file: File) {
      return upload(config, file);
    },
  };
};
